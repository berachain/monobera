"use client";

import { useEffect, useMemo, useState } from "react";
import {
  useGasData,
  // useLatestBlock,
  usePollAllowance,
  usePollAssetWalletBalance,
  usePollSwaps,
  useTokenInformation,
  useTokens,
  type Token,
} from "@bera/berajs";
import { erc20ModuleAddress } from "@bera/config";
import { useDeadline, useSlippage } from "@bera/shared-ui/src/hooks";
import { formatUnits } from "ethers";
import { type Address } from "wagmi";

import { isBeratoken } from "~/utils/isBeraToken";
import { useTokenHoneyPrice } from "./usePool";

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
  } = usePollSwaps({
    tokenIn: selectedFrom?.address as Address,
    tokenOut: selectedTo?.address as Address,
    swapKind: swapKind === SwapKind.GIVEN_IN ? 0 : 1,
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
      setToAmount(swapInfo?.formattedReturnAmount.toString());
    } else {
      setFromAmount(swapInfo?.formattedSwapAmount);
    }
  }, [swapInfo, isWrap]);

  useEffect(() => {
    if (
      swapInfo &&
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

  const { useAllowance } = usePollAllowance({
    contract: erc20ModuleAddress,
    token: selectedFrom,
  });

  const allowance = useAllowance();

  // const { data: block } = useLatestBlock();

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
        // const d = block ?? BigInt(0) + BigInt(Math.floor((deadline * 60) / 2));

        const newBatchSwapStep: any[] = [...swapInfo.batchSwapSteps];

        const sI = BigInt(swapInfo.returnAmount);
        const s = BigInt(slippage * 10 ** 18);
        const minAmountOut =
          (sI ?? 0n) - ((sI ?? 0n) * s) / BigInt(100 * 10 ** 18);

        newBatchSwapStep[newBatchSwapStep.length - 1].amountOut = minAmountOut;
        // newBatchSwapStep[newBatchSwapStep.length - 1].amountOut = 0n;

        // swapInfo.batchSwapSteps.forEach((value: any) => {
        //   // console.log('v',value)
        //   // console.log('ap',allPools)
        //   // const pool = allPools.find((pool: Pool) => beraToEth(pool.pool).toLowerCase() === value.poolId.toLowerCase())
        //   // console.log('POOL', pool)
        //   // const tokenOut = pool.tokens.find((token: Token) => token.address.toLowerCase() === value.assetOut.toLowerCase())
        //   const sI = BigInt(value.amountOut);
        //   const s = BigInt(slippage * 10 ** 18);

        //   const minAmountOut =
        //     (sI ?? 0n) - ((sI ?? 0n) * s) / BigInt(100 * 10 ** 18);
        //   // swapInfo.batchSwapSteps[
        //   //   (swapInfo?.batchSwapSteps?.length ?? 1) - 1
        //   // ]!.amountOut = formatUnits(minAmountOut, tokenOut.decimals);
        //   if()
        //   const newStep = {
        //     ...value,
        //     amountOut: minAmountOut - 1n, // to guard against router errors, we reduce the minAmountOut
        //   }

        //   // const newStep = {
        //   //   ...value,
        //   //   amountOut: 0n, // to guard against router errors, we reduce the minAmountOut
        //   // };
        //   newBatchSwapStep.push(newStep);
        // });

        // console.log(newBatchSwapStep);
        // const payload = [0n, newBatchSwapStep, d];
        const payload = [0n, newBatchSwapStep, 99999999n];

        // console.log(payload)
        setPayload(payload);
      } catch (e) {
        console.log(e);
        setPayload([]);
      }
    }
  }, [swapInfo, deadline, slippage]);

  const onSwitch = () => {
    const tempFromAmount = fromAmount;
    const tempToAmount = toAmount;

    const tempFrom = selectedFrom;
    const tempTo = selectedTo;

    setSelectedFrom(tempTo);
    setSelectedTo(tempFrom);

    setFromAmount(tempToAmount);
    setToAmount(tempFromAmount);
    setSwapKind(SwapKind.GIVEN_IN);
    setSwapAmount(fromAmount ?? "");

    // if (swapKind === SwapKind.GIVEN_IN) {
    //   setSwapKind(SwapKind.GIVEN_OUT);
    //   setSwapAmount(fromAmount ?? "");
    // } else {
    //   setSwapKind(SwapKind.GIVEN_IN);
    //   setSwapAmount(toAmount ?? "");
    // }
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

  const tokenInPrice = useTokenHoneyPrice(selectedFrom?.address);
  const tokenOutPrice = useTokenHoneyPrice(selectedTo?.address);

  const minAmountOut = useMemo(() => {
    if (!payload[1]) return "0";
    const amountOut = payload[1][payload[1].length - 1]?.amountOut;
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
    isRouteLoading: isSwapLoading || isTyping,
    isWrap,
    wrapType,
    isBalanceLoading,
    tokenInPrice,
    tokenOutPrice,
    minAmountOut,
  };
};
