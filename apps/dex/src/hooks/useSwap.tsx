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
import { erc20ModuleAddress, honeyTokenAddress } from "@bera/config";
import { useDeadline, useSlippage } from "@bera/shared-ui/src/hooks";
import { parseUnits } from "viem";
import { type Address } from "wagmi";

import { usePollSwaps } from "./usePollSwaps";

export enum SwapKind {
  GIVEN_IN = 0,
  GIVEN_OUT = 1,
}

const QUOTING_TOKEN = honeyTokenAddress;
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

  const [fromAmount, setFromAmount] = useState<string | undefined>();

  const [toAmount, setToAmount] = useState<string | undefined>();

  const [swapAmount, setSwapAmount] = useState("");

  const [exchangeRate, setExchangeRate] = useState<undefined | string>(
    undefined,
  );

  const [swapKind, setSwapKind] = useState<SwapKind>(SwapKind.GIVEN_IN);

  const [payload, setPayload] = useState<any[]>([]);

  const { useCurrentAssetWalletBalances } = usePollAssetWalletBalance();
  const { isLoading: isBalanceLoading } = useCurrentAssetWalletBalances();

  // for wrapping
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

  const { data: swapInfo, error: getSwapError } = usePollSwaps({
    tokenIn: selectedFrom?.address as Address,
    tokenOut: selectedTo?.address as Address,
    swapKind: swapKind === SwapKind.GIVEN_IN ? 0 : 1,
    tokenInDecimals: selectedFrom?.decimals ?? 18,
    tokenOutDecimals: selectedTo?.decimals ?? 18,
    // amount:
    //   Number(swapAmount) > Number.MAX_SAFE_INTEGER
    //     ? Number.MAX_SAFE_INTEGER
    //     : Number(swapAmount) ?? 0,
    amount: swapAmount,
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

  const { data: tokenInPriceInfo } = usePollSwaps({
    tokenIn: selectedFrom?.address as Address,
    tokenOut: QUOTING_TOKEN,
    tokenInDecimals: selectedFrom?.decimals ?? 18,
    tokenOutDecimals: 18,
    swapKind: 0,
    amount: "1",
  });

  const { data: tokenOutPriceInfo } = usePollSwaps({
    tokenIn: selectedTo?.address as Address,
    tokenOut: QUOTING_TOKEN,
    tokenInDecimals: selectedTo?.decimals ?? 18,
    tokenOutDecimals: 18,
    swapKind: 0,
    amount: "1",
  });

  useEffect(() => {
    if (isWrap) return;
    if (swapKind === SwapKind.GIVEN_IN) {
      setToAmount(swapInfo?.formattedReturnAmount.toString());
    } else {
      setFromAmount(swapInfo?.formattedAmountIn);
    }
  }, [swapInfo, isWrap]);

  useEffect(() => {
    if (
      swapInfo &&
      swapInfo?.formattedSwapAmount &&
      swapInfo?.formattedReturnAmount &&
      selectedFrom &&
      selectedTo
    ) {
      try {
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
      } catch (e) {
        console.log(e);
        setExchangeRate(undefined);
      }
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
    if (
      swapInfo !== undefined &&
      swapInfo.batchSwapSteps?.length &&
      slippage &&
      selectedFrom &&
      selectedTo &&
      deadline
    ) {
      try {
        // parse minutes to blocks
        const d = block + BigInt(Math.floor((deadline * 60) / 2));

        const s = BigInt(slippage * 10 ** 18);
        const minAmountOut =
          (swapInfo?.returnAmount ?? 0n) -
          ((swapInfo?.returnAmount ?? 0n) * s) / BigInt(100 * 10 ** 18);
        swapInfo.batchSwapSteps[
          (swapInfo?.batchSwapSteps?.length ?? 1) - 1
        ]!.amountOut = minAmountOut;

        if (swapKind === SwapKind.GIVEN_OUT) {
          const fromAmnt =
            Number(fromAmount) > Number.MAX_SAFE_INTEGER
              ? Number.MAX_SAFE_INTEGER
              : Number(fromAmount) ?? 0;
          swapInfo.batchSwapSteps[0]!.amountIn = parseUnits(
            `${fromAmnt ?? 0}`,
            selectedFrom.decimals ?? 18,
          );
        }

        const payload = [swapKind, swapInfo?.batchSwapSteps, d];
        setPayload(payload);
      } catch (e) {
        console.log(e);
        setPayload([]);
      }
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
      setSwapAmount(fromAmount ?? "");
    } else {
      setSwapKind(SwapKind.GIVEN_IN);
      setSwapAmount(toAmount ?? "");
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

  useEffect(() => {
    if (isWrap) {
      if (fromAmount !== toAmount) {
        setToAmount(fromAmount);
      }
    }
  }, [isWrap]);

  const tokenInPrice =
    tokenInPriceInfo === undefined
      ? "0"
      : selectedFrom?.address.toLowerCase() === QUOTING_TOKEN.toLowerCase()
      ? "1"
      : tokenInPriceInfo?.formattedReturnAmount;
  const tokenOutPrice =
    tokenOutPriceInfo === undefined
      ? "0"
      : selectedTo?.address.toLowerCase() === QUOTING_TOKEN.toLowerCase()
      ? "1"
      : tokenOutPriceInfo?.formattedReturnAmount;

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
    value,
    exchangeRate,
    gasPrice: gasData?.formatted.gasPrice,
    isWrap,
    wrapType,
    isBalanceLoading,
    tokenInPrice,
    tokenOutPrice,
  };
};
