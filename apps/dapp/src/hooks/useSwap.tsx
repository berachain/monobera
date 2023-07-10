"use client";

import { useEffect, useState } from "react";
import { RouteNotFound, type SwapInfo } from "@bera/bera-router";
import {
  ERC2MODULE_PRECOMPILE_ADDRESS,
  useLatestBlock,
  usePollAllowance,
  usePollAssetWalletBalance,
  type Token,
} from "@bera/berajs";
import { useReadLocalStorage } from "usehooks-ts";
import { formatUnits, parseUnits } from "viem";
import { type Address } from "wagmi";

import { LOCAL_STORAGE_KEYS } from "~/utils/constants";
import { useRouter } from "~/context/routerContext";

export enum SwapKind {
  GIVEN_IN = 0,
  GIVEN_OUT = 1,
}

export const useSwap = () => {
  const slippage = useReadLocalStorage(LOCAL_STORAGE_KEYS.SLIPPAGE_TOLERANCE);

  const deadline = useReadLocalStorage(LOCAL_STORAGE_KEYS.DEADLINE);

  const [selectedTo, setSelectedTo] = useState<Token | undefined>(undefined);

  const [fromAmount, setFromAmount] = useState(0);

  const [toAmount, setToAmount] = useState(0);

  const [swapAmount, setSwapAmount] = useState(0);

  const [swapKind, setSwapKind] = useState<SwapKind>(SwapKind.GIVEN_IN);

  const [error, setError] = useState<string | undefined>(undefined);

  // eslint-disable-next-line
  const [payload, setPayload] = useState<any[]>([]);

  const [swapInfo, setSwapInfo] = useState<SwapInfo | undefined>(undefined);

  const [priceImpactInfo, setPriceImpactInfo] = useState<SwapInfo | undefined>(
    undefined,
  );

  const [priceImpact, setPriceImpact] = useState<string | undefined>(undefined);

  usePollAssetWalletBalance();

  const { router } = useRouter();

  const [selectedFrom, setSelectedFrom] = useState<Token | undefined>(
    undefined,
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSwapInfo = async () => {
      if (selectedFrom && selectedTo) {
        const parsedSwapAmount = parseUnits(
          `${swapAmount ?? 0}`,
          swapKind === SwapKind.GIVEN_IN
            ? selectedFrom.decimals
            : selectedTo.decimals,
        );

        try {
          setIsLoading(true);
          setError(undefined);
          const result: SwapInfo = await router.getSwaps(
            selectedFrom?.address as Address,
            selectedTo?.address as Address,
            swapKind === SwapKind.GIVEN_IN ? 0 : 1,
            parsedSwapAmount,
          );

          if (swapKind === SwapKind.GIVEN_IN) {
            setToAmount(
              Number(
                formatUnits(
                  result.returnAmount ?? 0n,
                  selectedTo?.decimals ?? 18,
                ),
              ),
            );
          } else {
            setFromAmount(
              Number(
                formatUnits(
                  result.returnAmount ?? 0n,
                  selectedFrom?.decimals ?? 18,
                ),
              ),
            );
          }
          setIsLoading(false);
          setSwapInfo(result);
          return;
        } catch (error) {
          if (error instanceof RouteNotFound) {
            setError("Route not found.");
          }
          console.log(error);
          setIsLoading(false);
          return;
        }
      }
    };

    void fetchSwapInfo();
  }, [selectedFrom, selectedTo, fromAmount, toAmount, swapAmount]);

  useEffect(() => {
    const fetchPriceImpactData = async () => {
      if (selectedFrom && selectedTo) {
        const oneTokenUnit = parseUnits(
          `${1}`,
          swapKind === SwapKind.GIVEN_IN
            ? selectedFrom.decimals
            : selectedTo.decimals,
        );
        try {
          const result: SwapInfo = await router.getSwaps(
            selectedFrom?.address as Address,
            selectedTo?.address as Address,
            swapKind === SwapKind.GIVEN_IN ? 0 : 1,
            oneTokenUnit,
          );

          setPriceImpactInfo(result);
          return;
        } catch (error) {
          return;
        }
      }
    };

    void fetchPriceImpactData();
  }, [swapInfo]);

  useEffect(() => {
    if (swapInfo && priceImpactInfo) {
      const bestResult =
        swapAmount * Number(priceImpactInfo.formattedReturnAmount);
      const actualResult = Number(swapInfo.formattedReturnAmount);
      const percentageDifference = (
        (Math.abs(bestResult - actualResult) / bestResult) *
        100
      ).toFixed(4);
      setPriceImpact(percentageDifference);
    }
  }, [swapInfo, priceImpactInfo, swapAmount]);

  const { useAllowance } = usePollAllowance({
    contract: ERC2MODULE_PRECOMPILE_ADDRESS,
    token: selectedFrom,
  });

  const allowance = useAllowance();

  const block = useLatestBlock();

  useEffect(() => {
    const d = deadline === 'auto' ? block + 10000n : block + BigInt(Math.floor((deadline as number) * 60 / 2))
    if (swapInfo !== undefined && swapInfo.batchSwapSteps?.length) {
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
    isLoading,
    error,
    swapInfo,
    priceImpact,
  };
};
