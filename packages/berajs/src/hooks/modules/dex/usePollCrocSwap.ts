import useSWR from "swr";
import { type Address } from "viem";
import { usePublicClient } from "wagmi";
import { getSwap } from "~/actions/dex";
import { SwapRequest, type DefaultHookTypes } from "~/types";

interface IUsePollSwaps extends DefaultHookTypes {
  args: SwapRequest;
  isTyping?: boolean | undefined;
}

export interface SwapInfoV3 {
  batchSwapSteps: ICrocSwapStep[];
  formattedSwapAmount: string;
  formattedReturnAmount: string;
  formattedAmountIn: string;
  amountIn: bigint;
  returnAmount: bigint;
  tokenIn: string;
  tokenOut: string;
  value?: bigint;
  predictedAmountOut: bigint;
  formattedPredictedAmountOut: string;
}

export interface ICrocSwapStep {
  poolIdx: bigint;
  base: Address;
  quote: Address;
  isBuy: boolean;
}
export const usePollCrocSwap = ({
  args,
  config,
  opts,
  isTyping,
}: IUsePollSwaps) => {
  const { tokenIn, tokenOut, amount, tokenInDecimals, tokenOutDecimals } = args;
  const publicClient = usePublicClient();
  const QUERY_KEY = [tokenIn, tokenOut, amount, isTyping];
  return useSWR<SwapInfoV3 | undefined>(
    QUERY_KEY,
    async () => {
      try {
        if (!publicClient) return undefined;
        if (isTyping !== undefined && isTyping === true) {
          return {
            batchSwapSteps: [],
            formattedSwapAmount: amount.toString(),
            formattedAmountIn: "0",
            formattedReturnAmount: "0",
            amountIn: 0n,
            returnAmount: 0n,
            tokenIn,
            tokenOut,
            priceImpactPercentage: 0,
            predictedAmountOut: 0n,
            formattedPredictedAmountOut: "0",
          };
        }
        return getSwap({
          args: {
            tokenIn,
            tokenOut,
            tokenInDecimals,
            tokenOutDecimals,
            amount,
          },
          config,
          publicClient,
        });
      } catch (e) {
        // TODO: throws so many errors but this is good 4 debug
        console.error(e);
        return {
          batchSwapSteps: [],
          formattedSwapAmount: amount.toString(),
          formattedAmountIn: "0",
          formattedReturnAmount: "0",
          amountIn: 0n,
          returnAmount: 0n,
          tokenIn,
          tokenOut,
          predictedAmountOut: 0n,
          formattedPredictedAmountOut: "0",
        };
      }
    },
    {
      ...opts,
    },
  );
};
