import { POLLING } from "@bera/shared-ui/src/utils";
import { formatUnits, parseUnits } from "ethers";
import useSWR from "swr";
import { type Address } from "wagmi";

import { laggy } from "./laggy";
import { SwapInfoV2, usePollSwaps } from "@bera/berajs";

interface IUsePollSwaps {
  tokenIn: Address;
  tokenOut: Address;
  tokenInDecimals: number;
  tokenOutDecimals: number;
  swapKind: number;
  swapInfo: SwapInfoV2 | undefined;
  swapAmount: string;
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
    tokenInDecimals: 18,
    tokenOutDecimals: 18,
    swapKind,
    amount: "1",
  });

  const QUERY_KEY = [tokenIn, tokenOut, swapKind, swapInfo?.returnAmount];

  return useSWR(
    QUERY_KEY,
    () => {
      const bestResult =
        (parseUnits(swapAmount, 18) *
          BigInt(priceImpactSwapInfo?.returnAmount ?? 0n)) /
        parseUnits("100", 18);

      const actualResult = BigInt(swapInfo?.returnAmount ?? 0n);

      const formattedBestResult = Number(formatUnits(bestResult, 18));
      const formattedActualResult = Number(formatUnits(actualResult, 18));

      // const percentageDifference =
      //   ((formattedBestResult - formattedActualResult)/ formattedBestResult) * 100;

      const percentageDifference = calculatePercentageDifference(
        formattedBestResult,
        formattedActualResult,
      );

      return percentageDifference < -100 ? -100 : percentageDifference;
    },
    {
      refreshInterval: POLLING.FAST,
      use: [laggy],
    },
  );
};

function calculatePercentageDifference(a: number, b: number): number {
  const percentageDifference = ((b - a) / ((b + a) / 2)) * 100;
  return percentageDifference;
}
