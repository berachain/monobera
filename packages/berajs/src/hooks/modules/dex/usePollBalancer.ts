import { SwapType } from "@balancer-labs/sdk";
import { balancerVaultAddress } from "@bera/config";
import useSWR from "swr";
import { Address, PublicClient, parseUnits } from "viem";
import { usePublicClient } from "wagmi";

import { balancerVaultAbi } from "~/abi";
import { SwapRequest, type DefaultHookOptions } from "~/types";

type IUsePollSwapsArgs = SwapRequest;
interface IUsePollSwapsOptions extends DefaultHookOptions {
  isTyping?: boolean | undefined;
}

export interface SwapInfo {
  batchSwapSteps: IBalancerSwapStep[];
  formattedSwapAmount: string;
  formattedReturnAmount: string;
  formattedAmountIn: string;
  amountIn: bigint;
  returnAmount: bigint;
  tokenIn: string;
  tokenOut: string;
  predictedAmountOut: bigint;
  formattedPredictedAmountOut: string;
  error: any;
}

export interface IBalancerSwapStep {
  poolId: string;
  assetInIndex: number;
  assetOutIndex: number;
  amountIn: string;
  amountOut: string;
  kind: "exactIn" | "exactOut";
}

/**
 * Polls a pair for the optimal route and amount for a swap using direct contract calls
 */
export const usePollBalancerSwap = (
  args: IUsePollSwapsArgs,
  options?: IUsePollSwapsOptions,
) => {
  const poolId =
    "0xbbc5bde7e68ee3c71ba23f3a04133ad688e41ebf000100000000000000000003"; // WBERA : HONEY
  const { tokenIn, tokenOut, amount, tokenInDecimals } = args;
  const publicClient = usePublicClient() as PublicClient;
  const QUERY_KEY = [tokenIn, tokenOut, amount, options?.isTyping];

  return useSWR<SwapInfo | undefined>(
    QUERY_KEY,
    async () => {
      try {
        if (!publicClient) return undefined;
        if (options?.isTyping !== undefined && options?.isTyping === true) {
          return {
            batchSwapSteps: [],
            formattedSwapAmount: amount,
            formattedAmountIn: "0",
            formattedReturnAmount: "0",
            amountIn: 0n,
            returnAmount: 0n,
            tokenIn,
            tokenOut,
            predictedAmountOut: 0n,
            formattedPredictedAmountOut: "0",
            error: undefined,
          };
        }

        // Convert the input amount to its smallest unit (e.g., wei for ETH)
        const safeAmount = parseUnits(amount, tokenInDecimals ?? 18).toString();

        // Perform a direct contract call using viem's `readContract` method
        const result = await publicClient.readContract({
          address: balancerVaultAddress as Address,
          abi: balancerVaultAbi,
          functionName: "queryBatchSwap",
          args: [
            SwapType.SwapExactIn, // Swap type (Exact input)
            [
              {
                poolId,
                assetInIndex: 0,
                assetOutIndex: 1,
                amount: safeAmount,
                userData: "0x",
              },
            ],
            [tokenIn, tokenOut], // TODO (#multiswap): this should be a list of tokens discovered from a getRoute (gqlSorSwapRoute)
          ],
        });

        if (!result) {
          throw new Error("Contract call failed");
        }

        // Result contains amounts after swap; this should be properly typed
        const returnAmounts = result as bigint[];
        const predictedAmountOut = returnAmounts[1]?.toString() || "0";

        return {
          batchSwapSteps: [
            {
              poolId: poolId,
              assetInIndex: 0,
              assetOutIndex: 1,
              amountIn: amount,
              amountOut: predictedAmountOut,
              kind: "exactIn",
            },
          ],
          formattedSwapAmount: amount,
          formattedAmountIn: amount,
          formattedReturnAmount: predictedAmountOut,
          amountIn: BigInt(amount),
          returnAmount: BigInt(predictedAmountOut),
          tokenIn,
          tokenOut,
          predictedAmountOut: BigInt(predictedAmountOut),
          formattedPredictedAmountOut: predictedAmountOut,
          error: undefined,
        };
      } catch (e) {
        console.log("Error in swap logic:", e);
        return {
          batchSwapSteps: [],
          formattedSwapAmount: amount,
          formattedAmountIn: "0",
          formattedReturnAmount: "0",
          amountIn: 0n,
          returnAmount: 0n,
          tokenIn,
          tokenOut,
          predictedAmountOut: 0n,
          formattedPredictedAmountOut: "0",
          error: e,
        };
      }
    },
    {
      ...options?.opts,
    },
  );
};
