"use client";

import { useEffect, useMemo, useState } from "react";
import {
  useLatestBlock,
  usePollAllowance,
  usePollAssetWalletBalance,
  useTokenInformation,
  useTokens,
  type Token,
} from "@bera/berajs";
import { useReadLocalStorage } from "usehooks-ts";
import { formatUnits, parseUnits } from "viem";
import { useFeeData, type Address } from "wagmi";

import {
  DEFAULT_DEADLINE,
  DEFAULT_SLIPPAGE,
  LOCAL_STORAGE_KEYS,
} from "~/utils/constants";
import { erc20ModuleAddress, honeyTokenAddress } from "~/config";
import { usePollPriceImpact } from "./usePollPriceImpact";
import { usePollSwaps } from "./usePollSwaps";

export enum SwapKind {
  GIVEN_IN = 0,
  GIVEN_OUT = 1,
}

interface ISwap {
  inputCurrency?: Address | undefined;
  outputCurrency?: Address | undefined;
}
function normalizeToRatio(num1: number, num2: number): string {
  const ratio = num2 / num1;

  return ratio.toFixed(6);
}

export const useSwap = ({ inputCurrency, outputCurrency }: ISwap) => {
  const { read: readInput, tokenInformation: inputToken } =
    useTokenInformation();
  const { read: readOutput, tokenInformation: outputToken } =
    useTokenInformation();
  const { tokenList, addNewToken } = useTokens();

  // TODO: get honey price
  const { data: gasData } = useFeeData();

  useEffect(() => {
    if (inputCurrency) {
      const token = tokenList?.find((t) => t.address === inputCurrency);
      if (!token) {
        void readInput({ address: inputCurrency }).catch(() =>
          console.error("input currency not a token"),
        );
      } else {
        setSelectedFrom(token);
      }
    }
    if (outputCurrency) {
      const token = tokenList?.find((t) => t.address === outputCurrency);
      if (!token) {
        void readOutput({ address: outputCurrency }).catch(() =>
          console.error("output currency not a token"),
        );
      } else {
        setSelectedTo(token);
      }
    }
  }, []);

  useEffect(() => {
    if (inputToken) {
      setSelectedFrom(inputToken);
      addNewToken(inputToken);
    }
    if (outputToken) {
      setSelectedTo(outputToken);
      addNewToken(outputToken);
    }
  }, [inputToken, outputToken]);

  const [selectedTo, setSelectedTo] = useState<Token | undefined>(outputToken);

  const [selectedFrom, setSelectedFrom] = useState<Token | undefined>(
    inputToken,
  );

  const slippageType = useReadLocalStorage(
    LOCAL_STORAGE_KEYS.SLIPPAGE_TOLERANCE_TYPE,
  );

  const slippageValue = useReadLocalStorage(
    LOCAL_STORAGE_KEYS.SLIPPAGE_TOLERANCE_VALUE,
  );

  const deadlineType = useReadLocalStorage(LOCAL_STORAGE_KEYS.DEADLINE_TYPE);

  const deadlineValue = useReadLocalStorage(LOCAL_STORAGE_KEYS.DEADLINE_VALUE);

  const [fromAmount, setFromAmount] = useState(0);

  const [toAmount, setToAmount] = useState(0);

  const [swapAmount, setSwapAmount] = useState(0);

  const [exchangeRate, setExchangeRate] = useState<undefined | string>(
    undefined,
  );

  const [swapKind, setSwapKind] = useState<SwapKind>(SwapKind.GIVEN_IN);

  const [payload, setPayload] = useState<any[]>([]);

  const [showPriceImpact, setShowPriceImpact] = useState(false);

  usePollAssetWalletBalance();

  const {
    data: swapInfo,
    error: getSwapError,
    isLoading,
  } = usePollSwaps({
    tokenIn: selectedFrom?.address as Address,
    tokenOut: selectedTo?.address as Address,
    swapKind: swapKind === SwapKind.GIVEN_IN ? 0 : 1,
    amount:
      swapAmount > Number.MAX_SAFE_INTEGER
        ? parseUnits(`${Number.MAX_SAFE_INTEGER}`, selectedFrom?.decimals ?? 18)
        : parseUnits(`${swapAmount ?? 0}`, selectedFrom?.decimals ?? 18),
  });

  const { data: priceImpact } = usePollPriceImpact({
    tokenIn: selectedFrom?.address as Address,
    tokenOut: selectedTo?.address as Address,
    tokenInDecimals: selectedFrom?.decimals ?? 18,
    tokenOutDecimals: selectedTo?.decimals ?? 18,
    swapKind: swapKind === SwapKind.GIVEN_IN ? 0 : 1,
    swapInfo: swapInfo,
    swapAmount: swapAmount,
    isSwapLoading: isLoading,
  });

  useMemo(() => {
    if (priceImpact && priceImpact > 15) {
      setShowPriceImpact(true);
    } else {
      setShowPriceImpact(false);
    }
  }, [priceImpact]);

  const { data: tokenInPriceInfo } = usePollSwaps({
    tokenIn: selectedFrom?.address as Address,
    tokenOut: honeyTokenAddress,
    swapKind: 0,
    amount: parseUnits(`${1n}`, selectedFrom?.decimals ?? 18),
  });

  const { data: tokenOutPriceInfo } = usePollSwaps({
    tokenIn: selectedTo?.address as Address,
    tokenOut: honeyTokenAddress,
    swapKind: 0,
    amount: parseUnits(`${1n}`, selectedTo?.decimals ?? 18),
  });

  useEffect(() => {
    if (swapKind === SwapKind.GIVEN_IN) {
      setToAmount(
        Number(
          formatUnits(swapInfo?.returnAmount ?? 0n, selectedTo?.decimals ?? 18),
        ),
      );
    } else {
      setFromAmount(
        Number(
          formatUnits(
            swapInfo?.returnAmount ?? 0n,
            selectedFrom?.decimals ?? 18,
          ),
        ),
      );
    }
  }, [swapInfo]);

  useEffect(() => {
    if (
      swapInfo &&
      swapInfo?.formattedSwapAmount &&
      swapInfo?.formattedReturnAmount
    ) {
      const ratio = normalizeToRatio(
        Number(swapInfo?.formattedSwapAmount),
        Number(swapInfo?.formattedReturnAmount),
      );

      const exchangeRate = `1 ${swapInfo?.tokenInObj?.symbol} = ${ratio} ${swapInfo?.tokenOutObj?.symbol}`;
      setExchangeRate(exchangeRate);
    } else {
      setExchangeRate(undefined);
    }
  }, [swapInfo]);

  const { useAllowance } = usePollAllowance({
    contract: erc20ModuleAddress,
    token: selectedFrom,
  });

  const allowance = useAllowance();

  const block = useLatestBlock();

  useEffect(() => {
    if (swapInfo !== undefined && swapInfo.batchSwapSteps?.length) {
      const slippage =
        slippageType === "auto" || slippageType === null
          ? DEFAULT_SLIPPAGE
          : slippageValue;
      const deadline =
        deadlineType === "auto" || deadlineType === null
          ? DEFAULT_DEADLINE
          : deadlineValue;

      // parse minutes to blocks
      const d = block + BigInt(Math.floor(((deadline as number) * 60) / 2));

      // calculate min amount out & set last batch swap step as the min amount out
      const percentage = (100 - (slippage as number)) / 100;
      const minAmountOut =
        Number(swapInfo?.formattedReturnAmount ?? 0n) * percentage;

      const parsedMinAmountOut = parseUnits(
        `${minAmountOut}`,
        swapInfo?.tokenOutObj?.decimals ?? 18,
      );

      swapInfo.batchSwapSteps[
        (swapInfo?.batchSwapSteps?.length ?? 1) - 1
      ]!.amountOut = parsedMinAmountOut;

      if (swapKind === SwapKind.GIVEN_OUT) {
        swapInfo.batchSwapSteps[0]!.amountIn = parseUnits(
          `${fromAmount}`,
          selectedTo?.decimals ?? 18,
        );
      }

      const payload = [swapKind, swapInfo?.batchSwapSteps, d];
      setPayload(payload);
    }
  }, [swapKind, swapInfo, slippageType, deadlineType]);

  const onSwitch = () => {
    const tempFromAmount = fromAmount;
    const tempToAmount = toAmount;

    const tempFrom = selectedFrom;
    const tempTo = selectedTo;

    setSelectedFrom(tempTo);
    setSelectedTo(tempFrom);

    setFromAmount(tempToAmount);
    setToAmount(tempFromAmount);

    if (swapKind === SwapKind.GIVEN_IN) {
      setSwapKind(SwapKind.GIVEN_OUT);
      setSwapAmount(fromAmount);
    } else {
      setSwapKind(SwapKind.GIVEN_IN);
      setSwapAmount(toAmount);
    }
  };

  return {
    setSwapKind,
    setSelectedFrom,
    setFromAmount,
    setToAmount,
    setSelectedTo,
    setSwapAmount,
    onSwitch,
    payload,
    selectedFrom,
    allowance,
    selectedTo,
    fromAmount,
    toAmount,
    swapKind,
    error: getSwapError,
    swapInfo,
    priceImpact,
    showPriceImpact,
    exchangeRate,
    gasPrice: gasData?.formatted.gasPrice,
    tokenInPrice:
      tokenInPriceInfo === undefined
        ? selectedFrom?.address === honeyTokenAddress
          ? "1"
          : undefined
        : tokenInPriceInfo?.formattedReturnAmount,
    tokenOutPrice:
      tokenOutPriceInfo === undefined
        ? selectedTo?.address === honeyTokenAddress
          ? "1"
          : undefined
        : tokenOutPriceInfo?.formattedReturnAmount,
  };
};
