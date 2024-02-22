"use client";

import { useEffect, useMemo, useState } from "react";
import {
  useGasData,
  usePollAllowance,
  usePollAssetWalletBalance,
  usePollCrocSwap,
  useTokenHoneyPrice,
  useTokenInformation,
  useTokens,
  type Token,
  ICrocSwapStep,
} from "@bera/berajs";
import {
  beraTokenAddress,
  crocMultiSwapAddress,
  nativeTokenAddress,
} from "@bera/config";
import { useSlippage } from "@bera/shared-ui/src/hooks";
import { formatUnits } from "viem";
import { type Address } from "wagmi";

import { isBeratoken } from "~/utils/isBeraToken";

export enum SwapKind {
  GIVEN_IN = 0,
  GIVEN_OUT = 1,
}

// const QUOTING_TOKEN = honeyTokenAddress;
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
      const token = tokenDictionary?.[inputCurrency];

      if (!token) {
        void readInput({ address: inputCurrency });
      } else {
        setSelectedFrom(token);
      }
    }
    if (outputCurrency) {
      const token = tokenDictionary?.[outputCurrency];
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

  const [isTyping, setIsTyping] = useState(false);

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
    isLoading: isSwapLoading,
  } = usePollCrocSwap({
    tokenIn: selectedFrom?.address as Address,
    tokenOut: selectedTo?.address as Address,
    tokenInDecimals: selectedFrom?.decimals ?? 18,
    tokenOutDecimals: selectedTo?.decimals ?? 18,
    amount: swapAmount,
    isTyping: isTyping,
  });

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

  useEffect(() => {
    if (isWrap) return;
    if (swapKind === SwapKind.GIVEN_IN) {
      setToAmount(swapInfo?.formattedReturnAmount);
    } else {
      setFromAmount(swapInfo?.formattedSwapAmount);
    }
  }, [swapInfo, isWrap]);

  useEffect(() => {
    if (
      swapInfo?.formattedAmountIn &&
      swapInfo?.formattedReturnAmount &&
      selectedFrom &&
      selectedTo
    ) {
      try {
        const ratio = normalizeToRatio(
          Number(swapInfo?.formattedAmountIn),
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
  }, [swapInfo, selectedFrom, selectedTo, fromAmount, toAmount]);

  const { useAllowance, refresh: refreshAllowance } = usePollAllowance({
    contract: crocMultiSwapAddress,
    token: selectedFrom,
  });

  const allowance = useAllowance();

  const slippage = useSlippage();
  useEffect(() => {
    if (
      swapInfo?.batchSwapSteps?.length &&
      slippage &&
      selectedFrom &&
      selectedTo
    ) {
      try {
        // parse minutes to blocks
        const sI = BigInt(swapInfo.returnAmount);
        const s = BigInt(slippage * 10 ** 18);
        const minAmountOut =
          (sI ?? 0n) - ((sI ?? 0n) * s) / BigInt(100 * 10 ** 18);

        // @ts-nocheck
        if (selectedFrom && selectedFrom.address === nativeTokenAddress) {
          const swapSteps = [...swapInfo.batchSwapSteps];
          const firstStep = swapSteps[0] as ICrocSwapStep;
          if (swapSteps.length > 0 && firstStep.base && firstStep.quote) {
            if (
              firstStep.base.toLowerCase() === beraTokenAddress.toLowerCase()
            ) {
              firstStep.base = nativeTokenAddress;
            } else if (
              firstStep.quote.toLowerCase() === beraTokenAddress.toLowerCase()
            ) {
              firstStep.quote = nativeTokenAddress;
            }
            swapInfo.batchSwapSteps = swapSteps;
          }
        }

        if (selectedTo && selectedTo.address === nativeTokenAddress) {
          const swapSteps = [...swapInfo.batchSwapSteps];
          if (swapSteps.length > 0) {
            const lastIndex = swapSteps.length - 1;
            const lastStep = swapSteps[lastIndex] as ICrocSwapStep;
            if (lastStep.base && lastStep.quote) {
              if (
                lastStep.base.toLowerCase() === beraTokenAddress.toLowerCase()
              ) {
                lastStep.base = nativeTokenAddress;
              } else if (
                lastStep.quote.toLowerCase() === beraTokenAddress.toLowerCase()
              ) {
                lastStep.quote = nativeTokenAddress;
              }
              swapInfo.batchSwapSteps = swapSteps;
            }
          }
        }

        const payload = [
          swapInfo.batchSwapSteps,
          swapInfo.amountIn,
          minAmountOut,
        ];

        setPayload(payload);
      } catch (e) {
        console.log(e);
        setPayload([]);
      }
    }
  }, [swapInfo, slippage]);

  const onSwitch = () => {
    const tempFrom = selectedFrom;
    const tempTo = selectedTo;

    setSelectedFrom(tempTo);
    setSelectedTo(tempFrom);

    setFromAmount(toAmount);
    setToAmount("");
    setSwapAmount(toAmount ?? "");

    if (isWrap) {
      if (wrapType === WRAP_TYPE.WRAP) {
        setWrapType(WRAP_TYPE.UNWRAP);
      } else {
        setWrapType(WRAP_TYPE.WRAP);
      }
    }
  };

  useEffect(() => {
    if (isWrap) {
      if (fromAmount !== toAmount) {
        setToAmount(fromAmount);
      }
    }
  }, [isWrap]);

  const { data: tokenInPrice } = useTokenHoneyPrice(selectedFrom?.address);
  const { data: tokenOutPrice } = useTokenHoneyPrice(selectedTo?.address);

  const minAmountOut = useMemo(() => {
    if (!payload[2]) return "0";
    const amountOut = payload[2];
    return formatUnits(amountOut ?? 0, selectedTo?.decimals ?? 18);
  }, [payload]);

  return {
    setSwapKind,
    setSelectedFrom,
    setFromAmount,
    setToAmount,
    setSelectedTo,
    setSwapAmount,
    onSwitch,
    setIsTyping,
    refreshAllowance,
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
    exchangeRate,
    gasPrice: gasData?.formatted.gasPrice,
    isRouteLoading: isSwapLoading || isTyping,
    isWrap,
    wrapType,
    isBalanceLoading,
    tokenInPrice,
    tokenOutPrice,
    minAmountOut,
  };
};
