import { POLLING } from "@bera/shared-ui/src/utils";
import useSWR from "swr";
import { type Address } from "wagmi";

import { laggy } from "./laggy";
import { usePollSwaps, type SwapInfoV2 } from "./usePollSwaps";

interface IUsePollSwaps {
  tokenIn: Address;
  tokenOut: Address;
  tokenInDecimals: number;
  tokenOutDecimals: number;
  swapKind: number;
  swapInfo: SwapInfoV2 | undefined;
  swapAmount: number;
  isSwapLoading: boolean;
}

export const usePollPriceImpact = ({
  tokenIn,
  tokenOut,
  swapKind,
  swapInfo,
  swapAmount,
}: IUsePollSwaps) => {
  const { data: priceImpactSwapInfo } = usePollSwaps({
    tokenIn: tokenIn,
    tokenOut: tokenOut,
    swapKind,
    amount: 1,
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
      return percentageDifference < -100 ? -100 : percentageDifference;
    },
    {
      refreshInterval: POLLING.FAST,
      use: [laggy],
    },
  );
};
