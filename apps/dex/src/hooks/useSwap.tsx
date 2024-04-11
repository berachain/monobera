"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ICrocSwapStep,
  MULTISWAP_ABI,
  WBERA_ABI,
  getSwapPayload,
  useBeraJs,
  useGasData,
  usePollAllowance,
  usePollAssetWalletBalance,
  usePollCrocSwap,
  useTokenHoneyPrice,
  useTokenInformation,
  useTokens,
  type Token,
} from "@bera/berajs";
import {
  beraTokenAddress,
  crocMultiSwapAddress,
  nativeTokenAddress,
} from "@bera/config";
import { POLLING } from "@bera/shared-ui";
import { useSlippage } from "@bera/shared-ui/src/hooks";
import { beraJsConfig } from "@bera/wagmi";
import {
  formatEther,
  formatGwei,
  formatUnits,
  parseUnits,
  type Address,
} from "viem";
import { useGasPrice } from "wagmi";

import { isBeratoken } from "~/utils/isBeraToken";

enum SwapKind {
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

  const { data: tokenInPrice } = useTokenHoneyPrice(selectedFrom?.address);
  const { data: tokenOutPrice } = useTokenHoneyPrice(selectedTo?.address);

  const [isWrap, setIsWrap] = useState(false);

  const [wrapType, setWrapType] = useState<WRAP_TYPE | undefined>(undefined);

  const [fromAmount, setFromAmount] = useState<string | undefined>();

  const [toAmount, setToAmount] = useState<string | undefined>();

  const [swapAmount, setSwapAmount] = useState("");

  const [exchangeRate, setExchangeRate] = useState<undefined | string>(
    undefined,
  );

  const [swapKind, setSwapKind] = useState<SwapKind>(SwapKind.GIVEN_IN);

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
    args: {
      tokenIn: selectedFrom?.address as Address,
      tokenOut: selectedTo?.address as Address,
      tokenInDecimals: selectedFrom?.decimals ?? 18,
      tokenOutDecimals: selectedTo?.decimals ?? 18,
      amount: swapAmount,
    },
    opts: {
      refreshInterval: POLLING.FAST,
    },
    config: beraJsConfig,
    isTyping: isTyping,
  });

  const priceImpactPercentage =
    swapInfo?.formattedReturnAmount &&
    swapInfo?.formattedPredictedAmountOut &&
    !Number.isNaN(parseFloat(swapInfo.formattedReturnAmount)) &&
    !Number.isNaN(parseFloat(swapInfo.formattedPredictedAmountOut)) &&
    parseFloat(swapInfo.formattedPredictedAmountOut) !== 0
      ? (parseFloat(swapInfo.formattedReturnAmount) /
          parseFloat(swapInfo.formattedPredictedAmountOut)) *
          100 -
        100
      : 0;

  const [differenceUSD, setDifferenceUSD] = useState<number | null>(null);
  // update price impact
  useEffect(() => {
    if (
      !swapInfo?.batchSwapSteps?.length ||
      !swapInfo?.batchSwapSteps?.length
    ) {
      setDifferenceUSD(0);
      return;
    }

    const usdIn = tokenInPrice * Number(swapInfo?.formattedAmountIn);
    const usdOut = tokenOutPrice * Number(swapInfo?.formattedReturnAmount);
    const differenceUSD = (usdOut / usdIn) * 100 - 100;
    setDifferenceUSD(parseFloat(differenceUSD.toFixed(2)));
  }, [swapInfo, tokenInPrice, tokenOutPrice]);

  useEffect(() => {
    if (
      selectedTo !== undefined &&
      selectedFrom !== undefined &&
      isBeratoken(selectedTo) &&
      isBeratoken(selectedFrom)
    ) {
      setIsWrap(true);
      if (selectedFrom.address === nativeTokenAddress) {
        setWrapType(WRAP_TYPE.WRAP);
      }
      if (selectedFrom.address === beraTokenAddress) {
        setWrapType(WRAP_TYPE.UNWRAP);
      }
    } else {
      setIsWrap(false);
      setWrapType(undefined);
    }
  }, [selectedTo, selectedFrom]);

  // populate field of calculated swap amount
  useEffect(() => {
    if (isWrap) return;
    if (!swapInfo?.batchSwapSteps?.length) {
      setToAmount(swapInfo?.formattedReturnAmount);
    }
    if (swapKind === SwapKind.GIVEN_IN) {
      setToAmount(swapInfo?.formattedReturnAmount);
    } else {
      setFromAmount(swapInfo?.formattedSwapAmount);
    }
  }, [swapInfo, isWrap]);

  // calculate exchange rate
  useEffect(() => {
    if (!swapInfo?.batchSwapSteps?.length) return;
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
  // useEffect(() => {

  // }, [swapInfo, slippage]);
  const payload = getSwapPayload({
    swapInfo,
    slippage,
    baseToken: selectedFrom,
    quoteToken: selectedTo,
  });

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

  const minAmountOutFormatted = payload?.[2]
    ? formatUnits(payload[2] ?? 0, selectedTo?.decimals ?? 18)
    : "";

  // Calculate gas for connected wallet user (more accurate)
  const { account } = useBeraJs();

  let gasParams = null;
  if (isWrap) {
    gasParams = {
      address: beraTokenAddress,
      abi: WBERA_ABI,
      functionName: wrapType === WRAP_TYPE.WRAP ? "deposit" : "withdraw",
      args:
        wrapType === WRAP_TYPE.WRAP ? [] : [parseUnits(`${swapAmount}`, 18)],
      value: wrapType === WRAP_TYPE.WRAP ? parseUnits(`${swapAmount}`, 18) : 0n,
      account,
    };
  } else if (payload && payload?.length > 1) {
    gasParams = {
      address: crocMultiSwapAddress,
      abi: MULTISWAP_ABI,
      functionName: "multiSwap",
      args: payload,
      value: swapInfo?.value,
      account,
    };
  }
  const gasData = useGasData({ contractArgs: gasParams });
  const beraInUsd = useTokenHoneyPrice(nativeTokenAddress);
  const formattedGasPriceInBera = gasData ? parseFloat(formatGwei(gasData)) : 0;

  // Calculate general gas for unconnected wallet user (less accurate)
  const generalGasEstimateData = useGasPrice();
  const generalGasEstimateInBera = generalGasEstimateData.data
    ? parseFloat(
        formatEther(
          BigInt(parseFloat(`${generalGasEstimateData.data}`) * 30000),
        ),
      )
    : 0;

  // Format and output final gas price
  const beraGasPriceToUSD = (priceInBera: number) => {
    return beraInUsd.data && priceInBera
      ? parseFloat(beraInUsd.data) * priceInBera
      : null;
  };
  const formattedGasPrice = formattedGasPriceInBera
    ? beraGasPriceToUSD(formattedGasPriceInBera)
    : beraGasPriceToUSD(generalGasEstimateInBera);

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
    gasPrice: formattedGasPrice,
    isRouteLoading: isSwapLoading || isTyping,
    isWrap,
    wrapType,
    isBalanceLoading,
    tokenInPrice,
    tokenOutPrice,
    minAmountOut: minAmountOutFormatted,
    priceImpact: priceImpactPercentage,
    differenceUSD,
  };
};
