import { type SwapInfo } from "@bera/bera-router";
import { POLLING } from "@bera/shared-ui/src/utils";
import useSWR from "swr";
import { parseUnits } from "viem";
import { type Address } from "wagmi";

import { laggy } from "./laggy";
import { usePollSwaps } from "./usePollSwaps";
import { SwapKind } from "./useSwap";

interface IUsePollSwaps {
  tokenIn: Address;
  tokenOut: Address;
  tokenInDecimals: number;
  tokenOutDecimals: number;
  swapKind: number;
  swapInfo: SwapInfo | undefined;
  swapAmount: number;
  isSwapLoading: boolean;
}

export const usePollPriceImpact = ({
  tokenIn,
  tokenOut,
  tokenInDecimals,
  tokenOutDecimals,
  swapKind,
  swapInfo,
  swapAmount,
}: IUsePollSwaps) => {
  const { data: priceImpactSwapInfo } = usePollSwaps({
    tokenIn: tokenIn,
    tokenOut: tokenOut,
    swapKind,
    amount: parseUnits(
      `${1}`,
      swapKind === SwapKind.GIVEN_IN ? tokenInDecimals : tokenOutDecimals,
    ),
  });

  const QUERY_KEY = [
    tokenIn,
    tokenOut,
    swapKind,
    swapInfo?.formattedReturnAmount,
  ];

  return useSWR(
    QUERY_KEY,
    () => {
      const bestResult =
        swapAmount * Number(priceImpactSwapInfo?.formattedReturnAmount);

      const actualResult = Number(swapInfo?.formattedReturnAmount);
      const percentageDifference =
        (Math.abs(bestResult - actualResult) / bestResult) * 100;
      return percentageDifference;
    },
    {
      refreshInterval: POLLING.FAST,
      use: [laggy],
    },
  );
};
