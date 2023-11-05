"use client";

import { useEffect, useMemo, useState } from "react";
import {
  useGasData,
  useLatestBlock,
  usePollAllowance,
  usePollAssetWalletBalance,
  useTokenInformation,
  useTokens,
  type Token,
} from "@bera/berajs";
import { beraTokenAddress, erc20ModuleAddress } from "@bera/config";
import { useDeadline, useSlippage } from "@bera/shared-ui/src/hooks";
import { parseUnits } from "viem";
import { type Address } from "wagmi";

import { usePollPriceImpact } from "./usePollPriceImpact";
import { usePollSwaps } from "./usePollSwaps";

export enum SwapKind {
  GIVEN_IN = 0,
  GIVEN_OUT = 1,
}

const QUOTING_TOKEN = beraTokenAddress;
interface ISwap {
  inputCurrency?: Address | undefined;
  outputCurrency?: Address | undefined;
}
function normalizeToRatio(num1: number, num2: number): string {
  const ratio = num2 / num1;

  return ratio.toFixed(6);
}

export enum WRAP_TYPE {
  WRAP = "Wrap",
  UNWRAP = "Unwrap",
}

export const useSwap = ({ inputCurrency, outputCurrency }: ISwap) => {
  const { read: readInput, tokenInformation: inputToken } =
    useTokenInformation();
  const { read: readOutput, tokenInformation: outputToken } =
    useTokenInformation();
  const { tokenDictionary } = useTokens();

  // TODO: get honey price
  const gasData = useGasData();

  useEffect(() => {
    if (inputCurrency) {
      const token = tokenDictionary && tokenDictionary[inputCurrency];

      if (!token) {
        void readInput({ address: inputCurrency });
      } else {
        setSelectedFrom(token);
      }
    }
    if (outputCurrency) {
      const token = tokenDictionary && tokenDictionary[outputCurrency];
      if (!token) {
        void readOutput({ address: outputCurrency });
      } else {
        setSelectedTo(token);
      }
    }
  }, [tokenDictionary]);

  useEffect(() => {
    if (inputToken && !selectedFrom) {
      setSelectedFrom(inputToken);
      // addNewToken(inputToken);
    }
    if (outputToken && !selectedTo) {
      setSelectedTo(outputToken);
      // addNewToken(outputToken);
    }
  }, [inputToken, outputToken]);

  const [selectedTo, setSelectedTo] = useState<Token | undefined>(outputToken);

  const [selectedFrom, setSelectedFrom] = useState<Token | undefined>(
    inputToken,
  );

  const [isWrap, setIsWrap] = useState(false);

  const [wrapType, setWrapType] = useState<WRAP_TYPE | undefined>(undefined);

  const [fromAmount, setFromAmount] = useState<number | undefined>();

  const [toAmount, setToAmount] = useState<number | undefined>();

  const [swapAmount, setSwapAmount] = useState(0);

  const [exchangeRate, setExchangeRate] = useState<undefined | string>(
    undefined,
  );

  const [swapKind, setSwapKind] = useState<SwapKind>(SwapKind.GIVEN_IN);

  const [payload, setPayload] = useState<any[]>([]);

  const [showPriceImpact, setShowPriceImpact] = useState(false);

  const { useCurrentAssetWalletBalances } = usePollAssetWalletBalance();
  const { isLoading: isBalanceLoading } = useCurrentAssetWalletBalances();
  useEffect(() => {
    if (isWrap) {
      if (swapKind === SwapKind.GIVEN_IN) {
        setToAmount(fromAmount);
      }
      if (swapKind === SwapKind.GIVEN_OUT) {
        setFromAmount(toAmount);
      }
    }
  }, [swapAmount]);
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
        ? Number.MAX_SAFE_INTEGER
        : swapAmount ?? 0,
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

  const isBeratoken = (token: Token | undefined) => {
    if (token === undefined) return false;
    if (
      token.address === process.env.NEXT_PUBLIC_WBERA_ADDRESS ||
      token.address === process.env.NEXT_PUBLIC_BERA_ADDRESS
    )
      return true;
    return false;
  };

  useEffect(() => {
    if (
      selectedTo !== undefined &&
      selectedFrom !== undefined &&
      isBeratoken(selectedTo) &&
      isBeratoken(selectedFrom)
    ) {
      setIsWrap(true);
      if (selectedFrom.address === process.env.NEXT_PUBLIC_BERA_ADDRESS) {
        setWrapType(WRAP_TYPE.WRAP);
      }
      if (selectedFrom.address === process.env.NEXT_PUBLIC_WBERA_ADDRESS) {
        setWrapType(WRAP_TYPE.UNWRAP);
      }
    } else {
      setIsWrap(false);
      setWrapType(undefined);
    }
  }, [selectedTo, selectedFrom]);

  useMemo(() => {
    if (priceImpact && priceImpact > 15) {
      setShowPriceImpact(true);
    } else {
      setShowPriceImpact(false);
    }
  }, [priceImpact]);

  const { data: tokenInPriceInfo } = usePollSwaps({
    tokenIn: selectedFrom?.address as Address,
    tokenOut: QUOTING_TOKEN,
    swapKind: 0,
    amount: 1,
  });

  const { data: tokenOutPriceInfo } = usePollSwaps({
    tokenIn: selectedTo?.address as Address,
    tokenOut: QUOTING_TOKEN,
    swapKind: 0,
    amount: 1,
  });

  useEffect(() => {
    if (isWrap) return;
    if (swapKind === SwapKind.GIVEN_IN) {
      setToAmount(Number(swapInfo?.formattedReturnAmount));
    } else {
      setFromAmount(Number(swapInfo?.formattedReturnAmount));
    }
  }, [swapInfo]);

  useEffect(() => {
    if (
      swapInfo &&
      swapInfo?.formattedSwapAmount &&
      swapInfo?.formattedReturnAmount &&
      selectedFrom &&
      selectedTo
    ) {
      const ratio = normalizeToRatio(
        Number(swapInfo?.formattedSwapAmount),
        Number(swapInfo?.formattedReturnAmount),
      );

      if (Number.isNaN(Number(ratio))) {
        setExchangeRate(undefined);
        return;
      }

      const exchangeRate = `1 ${selectedFrom?.symbol} = ${ratio} ${selectedTo?.symbol}`;
      setExchangeRate(exchangeRate);
    } else {
      setExchangeRate(undefined);
    }
  }, [swapInfo, selectedFrom, selectedTo]);

  const { useAllowance } = usePollAllowance({
    contract: erc20ModuleAddress,
    token: selectedFrom,
  });

  const allowance = useAllowance();

  const block = useLatestBlock();

  const slippage = useSlippage();
  const deadline = useDeadline();
  useEffect(() => {
    if (swapInfo !== undefined && swapInfo.batchSwapSteps?.length) {
      // parse minutes to blocks
      const d = block + BigInt(Math.floor(((deadline as number) * 60) / 2));

      // calculate min amount out & set last batch swap step as the min amount out
      const percentage = (100 - (slippage as number)) / 100;
      const minAmountOut =
        Number(swapInfo?.formattedReturnAmount ?? 0n) * percentage;

      const parsedMinAmountOut = parseUnits(`${minAmountOut}`, 18);

      swapInfo.batchSwapSteps[
        (swapInfo?.batchSwapSteps?.length ?? 1) - 1
      ]!.amountOut = parsedMinAmountOut;

      if (swapKind === SwapKind.GIVEN_OUT) {
        swapInfo.batchSwapSteps[0]!.amountIn = parseUnits(
          `${fromAmount ?? 0}`,
          18,
        );
      }

      const payload = [swapKind, swapInfo?.batchSwapSteps, d];
      setPayload(payload);
    }
  }, [swapKind, swapInfo, selectedFrom, selectedTo, deadline, slippage]);

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
      setSwapAmount(fromAmount ?? 0);
    } else {
      setSwapKind(SwapKind.GIVEN_IN);
      setSwapAmount(toAmount ?? 0);
    }

    if (isWrap) {
      if (wrapType === WRAP_TYPE.WRAP) {
        setWrapType(WRAP_TYPE.UNWRAP);
      } else {
        setWrapType(WRAP_TYPE.WRAP);
      }
    }
  };

  const value: bigint | undefined = useMemo(() => {
    if (!swapInfo) {
      return undefined;
    }
    if (
      swapInfo.batchSwapSteps[0]?.assetIn ===
      (process.env.NEXT_PUBLIC_BERA_ADDRESS as Address)
    ) {
      return swapInfo.batchSwapSteps[0]?.value;
    }
    return undefined;
  }, [swapInfo]);
  return {
    setSwapKind,
    setSelectedFrom,
    setFromAmount,
    setToAmount,
    setSelectedTo,
    setSwapAmount,
    onSwitch,
    swapAmount,
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
    value,
    showPriceImpact,
    exchangeRate,
    gasPrice: gasData?.formatted.gasPrice,
    isWrap,
    wrapType,
    isBalanceLoading,
    tokenInPrice:
      tokenInPriceInfo === undefined
        ? selectedFrom?.address === QUOTING_TOKEN
          ? "1"
          : undefined
        : tokenInPriceInfo?.formattedReturnAmount,
    tokenOutPrice:
      tokenOutPriceInfo === undefined
        ? selectedTo?.address === QUOTING_TOKEN
          ? "1"
          : undefined
        : tokenOutPriceInfo?.formattedReturnAmount,
  };
};
