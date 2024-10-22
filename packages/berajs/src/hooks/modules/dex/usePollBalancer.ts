import { balancerVaultAddress } from "@bera/config";
import useSWR from "swr";
import { PublicClient, formatUnits, parseUnits } from "viem";
import { usePublicClient } from "wagmi";

import { balancerVaultAbi } from "~/abi";
import { useBeraJs } from "~/contexts";
import { SwapRequest } from "~/types";

// Define the structure of BatchSwapStep
export interface IBalancerSwapStep {
  poolId: string;
  assetInIndex: bigint;
  assetOutIndex: bigint;
  amount: bigint;
  userData: string;
}

// SwapType (either exactIn or exactOut)
enum SwapType {
  SwapExactIn = 0,
  SwapExactOut = 1,
}

// The response type from queryBatchSwap
export interface SwapInfo {
  batchSwapSteps: IBalancerSwapStep[];
  amountIn: bigint;
  returnAmount: bigint;
  formattedAmountIn: string;
  formattedReturnAmount: string;
  formattedPredictedAmountOut: string;
  error: any;
}

/**
 * Polls a pair for a hardcoded pool swap using queryBatchSwap
 * test with http://localhost:3000/swap/?inputCurrency=WBERA&outputCurrency=HONEY
 */
export const usePollBalancerSwap = (args: SwapRequest) => {
  const publicClient = usePublicClient() as PublicClient;

  // Destructure input args
  const { tokenIn, tokenOut, amount, tokenInDecimals, tokenOutDecimals } = args;
  const QUERY_KEY = [tokenIn, tokenOut, amount];
  const { account } = useBeraJs();

  return useSWR<SwapInfo | undefined>(QUERY_KEY, async () => {
    try {
      if (!publicClient || !amount || Number(amount) <= 0) {
        throw new Error("Invalid amount");
      }

      // Convert the amount to BigInt
      const safeAmount = BigInt(
        parseUnits(amount, tokenInDecimals ?? 18).toString(),
      );

      if (safeAmount <= 0n) {
        throw new Error("Invalid safeAmount");
      }

      // hardcoded swap step (single step) FIXME: implement getRoute and poll subgraph to construct this.
      const batchSwapSteps: IBalancerSwapStep[] = [
        {
          poolId:
            "0xbbc5bde7e68ee3c71ba23f3a04133ad688e41ebf000100000000000000000003", // HONEY POOL "34WBERA-33HONEY-33STGUSDC"
          assetInIndex: 0n,
          assetOutIndex: 1n,
          amount: safeAmount,
          userData: "0x",
        },
      ];

      // Define the assets involved in the swap
      const assets = [tokenIn, tokenOut];

      const options = {
        sender: account,
        fromInternalBalance: false,
        recipient: account,
        toInternalBalance: false,
      };

      // Perform the contract call using queryBatchSwap
      const result = await publicClient.readContract({
        address: balancerVaultAddress,
        abi: balancerVaultAbi,
        functionName: "queryBatchSwap",
        args: [SwapType.SwapExactIn, batchSwapSteps, assets, options],
      });

      if (!result) {
        throw new Error("Query failed");
      }

      const returnAmounts = result as bigint[];

      // Format the return amount
      const formattedReturnAmount = formatUnits(
        returnAmounts[1],
        tokenOutDecimals || 18,
      );
      const formattedAmountIn = formatUnits(safeAmount, tokenInDecimals || 18);
      const formattedPredictedAmountOut = formattedReturnAmount; // FIXME: this is not correct.

      return {
        batchSwapSteps,
        amountIn: safeAmount,
        returnAmount: returnAmounts[1],
        formattedAmountIn,
        formattedReturnAmount,
        formattedPredictedAmountOut,
        error: undefined,
      };
    } catch (e) {
      console.error("Error in swap simulation:", e);
      return {
        batchSwapSteps: [],
        amountIn: 0n,
        returnAmount: 0n,
        formattedAmountIn: "0",
        formattedReturnAmount: "0",
        formattedPredictedAmountOut: "0",
        error: e,
      };
    }
  });
};
