import { type BatchSwapStep } from "@bera/bera-router";
import { POLLING } from "@bera/shared-ui/src/utils";
import useSWR from "swr";
import { formatUnits } from "viem";
import { type Address } from "wagmi";

import { getSwap } from "~/app/api/getPrices/api/getPrices";
import { laggy } from "./laggy";

interface IUsePollSwaps {
  tokenIn: Address;
  tokenOut: Address;
  swapKind: number;
  amount: number;
}

export interface SwapInfoV2 {
  batchSwapSteps: BatchSwapStep[];
  formattedSwapAmount: string;
  formattedReturnAmount: string;
}

export const usePollSwaps = ({
  tokenIn,
  tokenOut,
  swapKind,
  amount,
}: IUsePollSwaps) => {
  const QUERY_KEY = [tokenIn, tokenOut, swapKind, amount];
  return useSWR<SwapInfoV2 | undefined>(
    QUERY_KEY,
    async () => {
      try {
        const result = await getSwap(tokenIn, tokenOut, swapKind, amount);

        if (!result.steps)
          return {
            batchSwapSteps: [],
            formattedSwapAmount: amount.toString(),
            formattedReturnAmount: "0",
          };

        const batchSwapSteps: BatchSwapStep[] = result.steps.map(
          (step: any) => {
            return {
              poolId: step.pool,
              assetIn: step.assetIn,
              amountIn: BigInt(step.amountIn),
              assetOut: step.assetOut,
              amountOut: step.amountOut,
              userData: "",
            };
          },
        );
        const swapInfo = {
          batchSwapSteps: batchSwapSteps,
          formattedSwapAmount: amount.toString(),
          formattedReturnAmount: formatUnits(
            BigInt(result.steps[result.steps.length - 1].amountOut),
            18,
          ),
        };
        return swapInfo;
      } catch (e) {
        // console.log(e);
        // TODO: throws so many errors but this is good 4 debug
        // console.error(e);
        return {
          batchSwapSteps: [],
          formattedSwapAmount: amount.toString(),
          formattedReturnAmount: "0",
        };
      }
    },
    {
      refreshInterval: POLLING.FAST,
      use: [laggy],
    },
  );
};
