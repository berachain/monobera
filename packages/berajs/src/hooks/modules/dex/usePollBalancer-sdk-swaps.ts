import { Path, Swap, SwapKind } from "@balancer/sdk";
import useSWR from "swr";
import { PublicClient, formatUnits, parseUnits } from "viem";
import { usePublicClient } from "wagmi";

import { SwapRequest, type DefaultHookOptions } from "~/types";

// FIXME: this approach throws this error which seems to indicate that potentially we are missing the Router / SOR features?
// ContractFunctionExecutionError: Missing or invalid parameters.
// Double check you have provided the correct parameters.

// URL: https://bartio.rpc.berachain.com/
// Request body: {"method":"eth_call","params":[{"data":"0x7d245e90000000000000000000000000bbc5bde7e68ee3c71ba23f3a04133ad688e41ebf0000000000000000000000007507c1dc16935b82698e4c63f2746a2fcf994df80000000000000000000000000e4aaf1351de4c0264c5c7056ef3777b41bd8e030000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000000"},"latest"]}

// Raw Call Arguments:
//   data:  0x7d245e90000000000000000000000000bbc5bde7e68ee3c71ba23f3a04133ad688e41ebf0000000000000000000000007507c1dc16935b82698e4c63f2746a2fcf994df80000000000000000000000000e4aaf1351de4c0264c5c7056ef3777b41bd8e030000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000000

// Contract Call:
//   function:  querySwapSingleTokenExactIn(address pool, address tokenIn, address tokenOut, uint256 exactAmountIn, bytes userData)
//   args:                                 (0xbbc5bde7e68ee3c71ba23f3a04133ad688e41ebf, 0x7507c1dc16935B82698e4C63f2746A2fCf994dF8, 0x0E4aaF1351de4c0264C5c7056Ef3777b41BD8e03, 1000000000000000000, 0x)

// Docs: https://viem.sh/docs/contract/simulateContract
// Details: invalid opcode: opcode 0xd6 not defined
// Version: viem@2.13.7

type IUsePollSwapsArgs = SwapRequest;
interface IUsePollSwapsOptions extends DefaultHookOptions {
  isTyping?: boolean | undefined;
}

export interface SwapInfo {
  batchSwapSteps: IBalancerSwapStep[];
  formattedSwapAmount: string;
  formattedReturnAmount: string;
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
 * Polls a pair for a single hardcoded pool swap using Balancer SDK for swap simulation
 * test with test with http://localhost:3000/swap/?inputCurrency=WBERA&outputCurrency=HONEY
 */
export const usePollBalancerSwap = (
  args: IUsePollSwapsArgs,
  options?: IUsePollSwapsOptions,
) => {
  const publicClient = usePublicClient() as PublicClient;

  // Hardcoded pool ID for "34WBERA-33HONEY-33STGUSDC"
  const poolId =
    "0xbbc5bde7e68ee3c71ba23f3a04133ad688e41ebf000100000000000000000003";
  const poolAddress = "0xbbc5bde7e68ee3c71ba23f3a04133ad688e41ebf";

  // Destructure input args
  const { tokenIn, tokenOut, amount, tokenInDecimals, tokenOutDecimals } = args;
  const QUERY_KEY = [tokenIn, tokenOut, amount, options?.isTyping];

  return useSWR<SwapInfo | undefined>(
    QUERY_KEY,
    async () => {
      try {
        if (!publicClient || !amount || Number(amount) <= 0) {
          console.error("Invalid amount:", amount);
          return {
            batchSwapSteps: [],
            formattedSwapAmount: "0",
            formattedReturnAmount: "0",
            amountIn: 0n,
            returnAmount: 0n,
            tokenIn,
            tokenOut,
            predictedAmountOut: 0n,
            formattedPredictedAmountOut: "0",
            error: new Error("Invalid swap amount"),
          };
        }

        // Convert the amount to the proper BigInt value
        const safeAmount = BigInt(
          parseUnits(amount, tokenInDecimals ?? 18).toString(),
        );
        console.log("Safe Amount being used for swap:", safeAmount.toString());

        if (safeAmount <= 0n) {
          return {
            batchSwapSteps: [],
            formattedSwapAmount: "0",
            formattedReturnAmount: "0",
            amountIn: 0n,
            returnAmount: 0n,
            tokenIn,
            tokenOut,
            predictedAmountOut: 0n,
            formattedPredictedAmountOut: "0",
            error: new Error("Invalid safeAmount"),
          };
        }

        // Construct a path manually as we're dealing with a single hardcoded pool FIXME something is wrong here
        const paths: Path[] = [
          {
            pools: [poolAddress], // Hardcoded pool
            tokens: [
              { address: tokenIn, decimals: tokenInDecimals ?? 18 }, // Token In
              { address: tokenOut, decimals: tokenOutDecimals ?? 18 }, // Token Out
            ],
            inputAmountRaw: safeAmount,
            outputAmountRaw: 0n, // We will get this value from the swap query
            protocolVersion: 3,
          },
        ];

        // Use the SDK to simulate the swap
        const swap = new Swap({
          chainId: 80084,
          swapKind: SwapKind.GivenIn, // ExactIn swap
          paths,
        });

        const rpcUrl = (await publicClient.transport?.url) || ""; // FIXME: this seems like the wrong way to do this
        const queryOutput = await swap.query(rpcUrl);

        let returnAmount;
        if (queryOutput.swapKind === SwapKind.GivenIn) {
          // ExactIn Swap: we're given input, expect an output
          returnAmount = queryOutput.expectedAmountOut;
        } else {
          // ExactOut Swap: we're given output, expect an input
          returnAmount = queryOutput.expectedAmountIn;
        }

        const formattedReturnAmount = formatUnits(
          returnAmount.amount,
          tokenOutDecimals || 18,
        );

        // FIXME: we are hardcoding this, it should be driven by getRoute and subgraph querying (sorGetSwapPaths)
        const batchSwapSteps: IBalancerSwapStep[] = paths.map((path) => ({
          poolId,
          assetInIndex: 0,
          assetOutIndex: 1,
          amountIn: formatUnits(safeAmount, tokenInDecimals || 18),
          amountOut: formattedReturnAmount,
          kind: "exactIn", // Adjust according to swap type
        }));

        return {
          batchSwapSteps,
          formattedSwapAmount: formatUnits(safeAmount, tokenInDecimals || 18),
          formattedReturnAmount,
          amountIn: safeAmount,
          returnAmount: returnAmount.amount,
          tokenIn,
          tokenOut,
          predictedAmountOut: returnAmount.amount,
          formattedPredictedAmountOut: formattedReturnAmount,
          error: undefined,
        };
      } catch (e) {
        console.error("Error in swap simulation:", e);
        return {
          batchSwapSteps: [],
          formattedSwapAmount: amount,
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
