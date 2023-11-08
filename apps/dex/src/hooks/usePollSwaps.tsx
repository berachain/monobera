import { type BatchSwapStep } from "@bera/bera-router";
import { POLLING } from "@bera/shared-ui/src/utils";
import useSWR from "swr";
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
  returnAmount: bigint;
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
        return result;
      } catch (e) {
        console.log(e);
        // TODO: throws so many errors but this is good 4 debug
        console.error(e);
        return {
          batchSwapSteps: [],
          formattedSwapAmount: amount.toString(),
          formattedReturnAmount: "0",
          returnAmount: BigInt(0),
        };
      }
    },
    {
      refreshInterval: POLLING.FAST,
      use: [laggy],
    },
  );
};
