import useSWR from "swr";
import { formatUnits, parseUnits, type Address } from "viem";

import { laggy } from "~/hooks/laggy";
import POLLING from "../../../config/constants/polling";

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
        return result;
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

interface BatchSwapStep {
  poolId: Address;
  assetIn: Address;
  amountIn: bigint;
  assetOut: Address;
  amountOut: bigint;
  userData: string;
}
export const getSwap = async (
  tokenIn: Address,
  tokenOut: Address,
  swapType: number,
  amount: number,
) => {
  try {
    const type = swapType === 0 ? "given_in" : "given_out";
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_INDEXER_ENDPOINT
      }/dex/route?quote_asset=${tokenOut}&base_asset=${tokenIn}&amount=${parseUnits(
        `${amount}`,
        18,
      )}&swap_type=${type}`,
    );

    const result = await response.json();
    if (!result.steps)
      return {
        batchSwapSteps: [],
        formattedSwapAmount: amount.toString(),
        formattedReturnAmount: "0",
        tokenIn,
        tokenOut,
      };

    const batchSwapSteps: BatchSwapStep[] = result.steps.map((step: any) => {
      return {
        poolId: step.pool,
        assetIn: step.assetIn,
        amountIn: BigInt(step.amountIn),
        assetOut: step.assetOut,
        amountOut: step.amountOut,
        userData: "",
      };
    });
    const swapInfo = {
      batchSwapSteps: batchSwapSteps,
      formattedSwapAmount: amount.toString(),
      formattedReturnAmount: formatUnits(
        BigInt(result.steps[result.steps.length - 1].amountOut),
        18,
      ),
      tokenIn,
      tokenOut,
    };
    return swapInfo;
  } catch (e) {
    return {
      batchSwapSteps: [],
      formattedSwapAmount: amount.toString(),
      formattedReturnAmount: "0",
      tokenIn,
      tokenOut,
    };
  }
};
