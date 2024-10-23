import { BalancerSDK } from "@balancer-labs/sdk";
import { parseFixed } from "@ethersproject/bignumber";
import { BigNumber } from "ethers";
import useSWR from "swr";
import { parseUnits } from "viem";
import { usePublicClient } from "wagmi";

import { balancerSdkConfig } from "~/config/balancer";
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
 * Polls a pair for the optimal route and amount for a swap using Balancer SDK
 * test with test with http://localhost:3000/swap/?inputCurrency=WBERA&outputCurrency=HONEY
 */
export const usePollBalancerSwap = (
  args: IUsePollSwapsArgs,
  options?: IUsePollSwapsOptions,
) => {
  const poolId =
    "0xbbc5bde7e68ee3c71ba23f3a04133ad688e41ebf000100000000000000000003";
  const { tokenIn, tokenOut, amount, tokenInDecimals, tokenOutDecimals } = args;
  const publicClient = usePublicClient();
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

        // Custom Balancer network configuration for Berachain

        const amountBN = parseUnits(amount, tokenInDecimals ?? 18);
        const safeAmount = amountBN.toString();

        // Full SDK configuration for Balancer SDK initialization

        const { swaps } = new BalancerSDK(balancerSdkConfig);

        // // Single pool swap logic with a known pool
        // const swapInfo = await sdk.swaps.queryBatchSwap({
        //   kind: SwapType.SwapExactIn,
        //   swaps: [
        //     {
        //       poolId: poolId,
        //       assetInIndex: 0,
        //       assetOutIndex: 1,
        //       amount: safeAmount,
        //       userData: "0x",
        //     },
        //   ],
        //   assets: [tokenIn, tokenOut],
        // });

        // FIXME: what we really want to do is this: https://docs.balancer.fi/sdk/technical-reference/swaps.html#querybatchswap
        // const { swaps } = sdk; // Swaps module is abstracting SOR
        await swaps.fetchPools();
        const maxPools = 4;

        const swapInfo = await swaps.findRouteGivenIn({
          tokenIn: tokenIn, // address of tokenIn
          tokenOut: tokenOut, // address of tokenOut
          amount: BigNumber.from(safeAmount), // FIXME: this seems really dumb that we have to use BigNumber here and below
          gasPrice: parseFixed("1", 9), // BigNumber current gas price
          maxPools, // number of pool included in path, above 4 is usually a high gas price
        });

        // FIXME: check these values.
        const returnAmounts = swapInfo.returnAmount;
        const predictedAmountOut = swapInfo.returnAmountConsideringFees;

        return {
          // FIXME: the values in here are jumbled up w.r.t their typing.
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
          returnAmount: predictedAmountOut,
          tokenIn,
          tokenOut,
          predictedAmountOut: predictedAmountOut,
          formattedPredictedAmountOut: predictedAmountOut,
          error: undefined,
        };
      } catch (e) {
        console.log("queryBatchSwap call error:", e);
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
