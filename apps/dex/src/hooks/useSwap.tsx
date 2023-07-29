"use client";

import { useEffect, useState } from "react";
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
import { type Address } from "wagmi";

import { LOCAL_STORAGE_KEYS } from "~/utils/constants";
import { erc20ModuleAddress } from "~/config";
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
export const useSwap = ({ inputCurrency, outputCurrency }: ISwap) => {
  const { read: readInput, tokenInformation: inputToken } =
    useTokenInformation();
  const { read: readOutput, tokenInformation: outputToken } =
    useTokenInformation();
  const { tokenList, addNewToken } = useTokens();

  useEffect(() => {
    if (inputCurrency) {
      const token = tokenList.find((t) => t.address === inputCurrency);
      if (!token) {
        void readInput({ address: inputCurrency }).catch(() =>
          console.error("input currency not a token"),
        );
      } else {
        setSelectedFrom(token);
      }
    }
    if (outputCurrency) {
      const token = tokenList.find((t) => t.address === outputCurrency);
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

  const slippage = useReadLocalStorage(LOCAL_STORAGE_KEYS.SLIPPAGE_TOLERANCE);

  const deadline = useReadLocalStorage(LOCAL_STORAGE_KEYS.DEADLINE);

  const [fromAmount, setFromAmount] = useState(0);

  const [toAmount, setToAmount] = useState(0);

  const [swapAmount, setSwapAmount] = useState(0);

  const [swapKind, setSwapKind] = useState<SwapKind>(SwapKind.GIVEN_IN);

  // eslint-disable-next-line
  const [payload, setPayload] = useState<any[]>([]);

  usePollAssetWalletBalance();

  const {
    data: swapInfo,
    error: getSwapError,
    isLoading,
  } = usePollSwaps({
    tokenIn: selectedFrom?.address as Address,
    tokenOut: selectedTo?.address as Address,
    swapKind: swapKind === SwapKind.GIVEN_IN ? 0 : 1,
    amount: parseUnits(`${swapAmount ?? 0}`, selectedFrom?.decimals ?? 18),
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

  // useEffect(() => {
  //   if (swapInfo && priceImpactInfo) {
  //     const bestResult =
  //       swapAmount * Number(priceImpactInfo.formattedReturnAmount);
  //     const actualResult = Number(swapInfo.formattedReturnAmount);
  //     const percentageDifference = (
  //       (Math.abs(bestResult - actualResult) / bestResult) *
  //       100
  //     ).toFixed(4);
  //     setPriceImpact(percentageDifference);
  //   }
  // }, [swapInfo, priceImpactInfo, swapAmount]);

  const { useAllowance } = usePollAllowance({
    contract: erc20ModuleAddress,
    token: selectedFrom,
  });

  const allowance = useAllowance();

  const block = useLatestBlock();

  useEffect(() => {
    const d =
      deadline === "auto"
        ? block + 10000n
        : block + BigInt(Math.floor(((deadline as number) * 60) / 2));
    if (swapInfo !== undefined && swapInfo.batchSwapSteps?.length) {
      if (swapKind === SwapKind.GIVEN_OUT) {
        swapInfo.batchSwapSteps[0]!.amountIn = parseUnits(
          `${fromAmount}`,
          selectedTo?.decimals ?? 18,
        );
      }
      if (slippage === "auto") {
        swapInfo.batchSwapSteps[
          (swapInfo?.batchSwapSteps?.length ?? 1) - 1
        ]!.amountOut = 0n;
        const payload = [swapKind, swapInfo?.batchSwapSteps, d];
        setPayload(payload);
      } else {
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
        const payload = [swapKind, swapInfo?.batchSwapSteps, d];
        setPayload(payload);
      }
    }
  }, [swapKind, swapInfo, slippage]);

  return {
    setSwapKind,
    setSelectedFrom,
    setFromAmount,
    setToAmount,
    setSelectedTo,
    setSwapAmount,
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
  };
};
