"use client";

import { useEffect, useState } from "react";
import { RouteNotFound, type SwapInfo } from "@bera/bera-router";
import {
  ERC2MODULE_PRECOMPILE_ADDRESS,
  useLatestBlock,
  usePollAllowance,
  usePollAssetWalletBalance,
  usePollPools,
  type Pool,
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

  // const deadline = useReadLocalStorage(LOCAL_STORAGE_KEYS.DEADLINE);

  const [selectedTo, setSelectedTo] = useState<Token | undefined>(undefined);

  const [selectedPool] = useState<Pool | undefined>(undefined);

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
  const { usePools } = usePollPools();

  const pools = usePools();

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
          setError(undefined);
          const result: SwapInfo = await router.getSwaps(
            selectedFrom?.address as Address,
            selectedTo?.address as Address,
            swapKind === SwapKind.GIVEN_IN ? 0 : 1,
            oneTokenUnit,
          );

          setPriceImpactInfo(result);
          return;
        } catch (error) {
          if (error instanceof RouteNotFound) {
            setError("Route not found.");
          }
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
      if (Number(percentageDifference) > 25) {
        setError("Price impact too high!");
      }
    }
  }, [swapInfo, priceImpactInfo, swapAmount]);
  const { useAllowance } = usePollAllowance({
    contract: ERC2MODULE_PRECOMPILE_ADDRESS,
    token: selectedFrom,
  });

  const allowance = useAllowance();

  const block = useLatestBlock();

  useEffect(() => {
    // const parsedDeadline: bigint = deadline === 0 ? block + 10000n : (block as bigint) + calculateBlocksInMinute(deadline as number) as bigint
    if (swapInfo !== undefined && swapInfo.batchSwapSteps.length) {
      const parsedDeadline = block + 1000n;
      if (slippage === 0) {
        const payload = [swapKind, swapInfo?.batchSwapSteps, parsedDeadline];
        setPayload(payload);
      } else {
        const minAmountOut =
          Number(swapInfo?.formattedReturnAmount ?? 0n) *
          (1 - (slippage as number));
        const parsedMinAmountOut = parseUnits(
          `${minAmountOut}`,
          swapInfo?.tokenOutObj?.decimals ?? 18,
        );
        swapInfo.batchSwapSteps[
          (swapInfo?.batchSwapSteps?.length ?? 1) - 1
        ]!.amountOut = parsedMinAmountOut;
        const payload = [swapKind, swapInfo?.batchSwapSteps, parsedDeadline];
        setPayload(payload);
      }
    }
  }, [swapKind, swapInfo]);

  return {
    payload,
    setSwapKind,
    setSelectedFrom,
    selectedFrom,
    allowance,
    selectedTo,
    fromAmount,
    setFromAmount,
    toAmount,
    setToAmount,
    swapKind,
    setSelectedTo,
    setSwapAmount,
    pools,
    selectedPool,
    previewSwapAmount: "0",
    isLoading,
    error,
    swapInfo,
    priceImpact,
  };
};
