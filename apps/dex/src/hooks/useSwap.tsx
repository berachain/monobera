"use client";

import { useEffect, useMemo, useState } from "react";
import {
  TXN_GAS_USED_ESTIMATES,
  useGasData,
  usePollAllowance,
  usePollCrocSwap,
  usePollWalletBalances,
  useTokenHoneyPrice,
  useTokenInformation,
  useSubgraphTokenInformation,
  useTokens,
  type Token,
} from "@bera/berajs";
import { getSwapPayload } from "@bera/berajs/actions";
import {
  beraTokenAddress,
  crocMultiSwapAddress,
  nativeTokenAddress,
} from "@bera/config";
import { POLLING } from "@bera/shared-ui";
import { useSlippage } from "@bera/shared-ui/src/hooks";
import { formatUnits, type Address } from "viem";

import { isBeratoken } from "~/utils/isBeraToken";
import { beraToken } from "@bera/wagmi";

enum SwapKind {
  GIVEN_IN = 0,
  GIVEN_OUT = 1,
}

// const QUOTING_TOKEN = honeyTokenAddress;
interface ISwap {
  inputCurrency?: string | undefined;
  outputCurrency?: string | undefined;
}
function normalizeToRatio(num1: number, num2: number): string {
  const ratio = num2 / num1;
  return ratio.toFixed(6);
}

export enum WRAP_TYPE {
  WRAP = "Wrap",
  UNWRAP = "Unwrap",
}

export const useSwap = ({
  inputCurrency = undefined,
  outputCurrency = undefined,
}: ISwap) => {
  const { data: pendingInputToken } = useTokenInformation({
    address: inputCurrency,
  });
  const { data: pendingOutputToken } = useTokenInformation({
    address: outputCurrency,
  });

  const [selectedTo, setSelectedTo] = useState<Token | undefined>(undefined);

  const [selectedFrom, setSelectedFrom] = useState<Token | undefined>(
    undefined,
  );

  const [inputAddTokenDialogOpen, setInputAddTokenDialogOpen] = useState(false);
  const [outputAddTokenDialogOpen, setOutputAddTokenDialogOpen] =
    useState(false);

  const { data: tokenListData } = useTokens();

  useEffect(() => {
    if (!inputCurrency || !outputCurrency) return;
    if (inputCurrency === outputCurrency) return;
    if (!tokenListData) return;

    const doesInputTokenExist = tokenListData?.tokenList?.some(
      (t) => t.address.toLowerCase() === inputCurrency.toLowerCase(),
    );
    if (!doesInputTokenExist) {
      setInputAddTokenDialogOpen(true);
      return;
    }
    const doesOuputTokenExist = tokenListData?.tokenList?.some(
      (t) => t.address.toLowerCase() === outputCurrency.toLowerCase(),
    );
    if (!doesOuputTokenExist) {
      setOutputAddTokenDialogOpen(true);
      return;
    }
    if (inputCurrency === nativeTokenAddress) {
      setSelectedFrom(beraToken);
    }
    if (pendingInputToken && inputCurrency) {
      setSelectedFrom(pendingInputToken);
    }
    if (pendingOutputToken && outputCurrency) {
      setSelectedTo(pendingOutputToken);
    }
    return;
  }, [
    pendingInputToken,
    pendingOutputToken,
  ]);
  const { data: inputTokenInfo } = useSubgraphTokenInformation({
    tokenAddress: selectedFrom?.address,
  });
  const { data: outputTokenInfo } = useSubgraphTokenInformation({
    tokenAddress: selectedTo?.address,
  });

  const tokenInPrice = inputTokenInfo?.usdValue;
  const tokenOutPrice = outputTokenInfo?.usdValue;

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

  const { isLoading: isBalanceLoading } = usePollWalletBalances();

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
  } = usePollCrocSwap(
    {
      tokenIn: selectedFrom?.address as Address,
      tokenOut: selectedTo?.address as Address,
      tokenInDecimals: selectedFrom?.decimals ?? 18,
      tokenOutDecimals: selectedTo?.decimals ?? 18,
      amount: swapAmount,
    },
    {
      opts: {
        refreshInterval: POLLING.FAST,
      },
      isTyping: isTyping,
    },
  );

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

    const usdIn =
      Number(tokenInPrice ?? 0) * Number(swapInfo?.formattedAmountIn);
    const usdOut =
      Number(tokenOutPrice ?? 0) * Number(swapInfo?.formattedReturnAmount);
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

  const { data: allowance, refresh: refreshAllowance } = usePollAllowance({
    spender: crocMultiSwapAddress,
    token: selectedFrom,
  });

  const slippage = useSlippage();
  const swapPayload = useMemo(
    () =>
      getSwapPayload({
        args: {
          swapInfo,
          slippage,
          baseToken: selectedFrom,
          quoteToken: selectedTo,
        },
      }),
    [swapInfo, slippage, selectedFrom, selectedTo],
  );

  const onSwitch = () => {
    const tempFrom = selectedFrom;
    const tempTo = selectedTo;

    setSelectedFrom(tempTo);
    setSelectedTo(tempFrom);

    setFromAmount(toAmount);
    setSwapAmount(toAmount ?? "");

    if (isWrap) {
      if (wrapType === WRAP_TYPE.WRAP) {
        setWrapType(WRAP_TYPE.UNWRAP);
      } else {
        setWrapType(WRAP_TYPE.WRAP);
      }
      setToAmount(toAmount);
    } else {
      setToAmount("");
    }
  };

  useEffect(() => {
    if (isWrap) {
      if (fromAmount !== toAmount) {
        setToAmount(fromAmount);
      }
    }
  }, [isWrap]);

  const minAmountOutFormatted = swapPayload?.payload?.[2]
    ? formatUnits(swapPayload?.payload[2] ?? 0, selectedTo?.decimals ?? 18)
    : "";

  const { estimatedBeraFee } = useGasData({
    gasUsedOverride: TXN_GAS_USED_ESTIMATES.SWAP * 8 * 2, // multiplied by 8 for the multiswap steps assumption in a swap, then by 2 to allow for a follow up swap
  });

  const beraInUsd = useTokenHoneyPrice({
    tokenAddress: nativeTokenAddress,
  });

  // Format and output final gas price
  const beraGasPriceToUSD = (priceInBera?: number) => {
    return beraInUsd.data && priceInBera
      ? parseFloat(beraInUsd.data) * priceInBera
      : null;
  };

  const formattedGasPrice = estimatedBeraFee
    ? beraGasPriceToUSD(estimatedBeraFee)
    : 0;

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
    setInputAddTokenDialogOpen,
    setOutputAddTokenDialogOpen,
    pendingInputToken,
    pendingOutputToken,
    inputAddTokenDialogOpen,
    outputAddTokenDialogOpen,
    swapAmount,
    payload: swapPayload?.payload,
    payloadValue: swapPayload?.value,
    selectedFrom,
    allowance,
    selectedTo,
    fromAmount,
    toAmount,
    swapKind,
    error: getSwapError,
    swapInfo,
    exchangeRate,
    gasEstimateInBera: estimatedBeraFee,
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
