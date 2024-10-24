import { BalancerSDK, BatchSwap, SwapType } from "@balancer-labs/sdk";
import {
  Slippage,
  Swap,
  SwapBuildCallInput,
  SwapInput,
  SwapKind,
  Token,
  TokenAmount,
} from "@balancer/sdk";
import { chainId, jsonRpcUrl } from "@bera/config";
import { parseFixed } from "@ethersproject/bignumber";
import { BigNumber } from "ethers";
import useSWR from "swr";
import { parseUnits } from "viem";
import { usePublicClient } from "wagmi";

import { balancerClient } from "~/actions";
import { balancerApi } from "~/actions/dex/b-sdk";
import { useBeraJs } from "~/contexts";
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
  const poolAddress = "0xbbc5bde7e68ee3c71ba23f3a04133ad688e41ebf";
  // const { tokenIn, tokenOut, amount, tokenInDecimals, tokenOutDecimals } = args; FIXME: hardcoding this
  const tokenIn = "0x0e4aaf1351de4c0264c5c7056ef3777b41bd8e03" as `0x${string}`; // HONEY
  const tokenOut =
    "0xd6d83af58a19cd14ef3cf6fe848c9a4d21e5727c" as `0x${string}`; // USDC
  const amount = "1";
  const tokenInDecimals = 18;
  const tokenOutDecimals = 6;
  const publicClient = usePublicClient();
  const { account } = useBeraJs();
  const QUERY_KEY = [tokenIn, tokenOut, amount, options?.isTyping];

  return useSWR(
    QUERY_KEY,
    async () => {
      try {
        if (!publicClient || !account) return undefined;
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

        // some data that we are hardcoding for the swap from HONEY -> USDC 0 -> 2
        // http://localhost:3000/swap/?inputCurrency=HONEY&outputCurrency=USDC
        const inIndex = 0;
        const outIndex = 2;
        const amountBI = parseUnits("1", tokenInDecimals ?? 18);
        const amountBN = BigNumber.from(amountBI); // FIXME: this seems really dumb that we have to do this
        const gasPrice = parseFixed("1", 9); // FIXME: we should be doing this dynamically
        const deadline = 10000n; // FIXME: this is a placeholder

        ////////////////////////////// V2 SDK w/ SOR way: /////////////////////////////
        // await swaps.fetchPools(); // FIXME: this throws because fetchPools fails
        // const maxPools = 4;
        // const swapInfo = await swaps.findRouteGivenIn({
        //   tokenIn,
        //   tokenOut,
        //   amount: amountBN,
        //   gasPrice: gasPrice, // BigNumber current gas price
        //   maxPools, // NOTE: more than 4 pools is usually a high gas price
        // });
        // const returnAmount = swapInfo.returnAmount;
        // const formattedReturnAmount = returnAmount.toString();
        // const predictedAmountOut = swapInfo.returnAmountConsideringFees;
        // const formattedPredictedAmountOut = predictedAmountOut.toString();

        // ///////////////////////////// V2 way w/manual swap input (bypassing SOR): /////////////////////////////
        // const { swaps } = balancerClient; // Swaps module is abstracting SOR
        // const batchSwap: BatchSwap = {
        //   swaps: [
        //     {
        //       poolId: poolId,
        //       assetInIndex: inIndex,
        //       assetOutIndex: outIndex,
        //       amount: amountBI.toString(),
        //       userData: "0x",
        //     },
        //   ],
        //   assets: [tokenIn, tokenOut],
        //   funds: {
        //     sender: account,
        //     recipient: account,
        //     fromInternalBalance: false,
        //     toInternalBalance: false,
        //   },
        //   limits: [amountBI, BigNumber.from(0)],
        //   deadline,
        //   kind: SwapType.SwapExactIn,
        // };
        // const batchSwapStringified = JSON.stringify(batchSwap, (key, value) =>
        //   typeof value === "bigint" ? value.toString() : value,
        // );
        // console.log(batchSwapStringified);
        // const rawSwapInfo = await swaps.queryBatchSwap(batchSwap); // FIXME:  queryBatchSwap call error: queryBatchSwap call error: Error: call revert exception [ See: https://links.ethers.org/v5-errors-CALL_EXCEPTION ] (method="queryBatchSwap(uint8,(bytes32,uint256,uint256,uint256,bytes)[],address[],(address,bool,address,bool))", data="0x", errorArgs=null, errorName=null, errorSignature=null, reason=null, code=CALL_EXCEPTION, version=abi/5.7.0)
        // // Returns an array with the net Vault asset balance deltas. Positive amounts represent tokens (or ETH) sent to the
        // // * Vault, and negative amounts represent tokens (or ETH) sent by the Vault. Each delta corresponds to the asset[]
        // const predictedAmountOut = rawSwapInfo[1];
        // const formattedPredictedAmountOut = predictedAmountOut.toString();
        // const returnAmount = rawSwapInfo[1];
        // const formattedReturnAmount = returnAmount.toString();

        // ///////////////////////////// V3 SDK with SOR /////////////////////////////
        // const tokenInV3 = new Token(chainId, tokenIn, tokenInDecimals ?? 18);
        // const tokenOutV3 = new Token(chainId, tokenOut, tokenOutDecimals ?? 6);
        // const tokenAmount = TokenAmount.fromHumanAmount(tokenInV3, "1");
        // const swapKind = SwapKind.GivenIn;
        // const sorPaths = await balancerApi.sorSwapPaths.fetchSorSwapPaths({
        //   // FIXME: this throws: There was an error with swap simulation: Error: Unsupported API chain: 80084
        //   chainId,
        //   tokenIn: tokenInV3.address,
        //   tokenOut: tokenOutV3.address,
        //   swapKind,
        //   swapAmount: tokenAmount,
        // });
        // const swapInput = {
        //   chainId,
        //   paths: sorPaths,
        //   swapKind,
        //   userData: "0x" as `0x${string}`,
        // };
        // const swap = new Swap(swapInput);
        // const queryOutput = await swap.query(jsonRpcUrl);
        // if (!queryOutput.pathAmounts) {
        //   throw new Error("No path amounts returned");
        // }
        // console.log("queryOutput:", queryOutput);
        // const returnAmount = queryOutput.pathAmounts[1];
        // const formattedReturnAmount = returnAmount.toString();
        // const predictedAmountOut = queryOutput.pathAmounts[1];
        // const formattedPredictedAmountOut = predictedAmountOut.toString();

        ///////////////////////////// V3 SDK way w/manual swap input (bypassing SOR): /////////////////////////////
        const minimalTokenIn = {
          address: tokenIn,
          decimals: tokenInDecimals ?? 18,
          index: inIndex,
        };
        const minimalTokenOut = {
          address: tokenOut,
          decimals: tokenOutDecimals ?? 6,
          index: outIndex,
        };
        const swapInput: SwapInput = {
          chainId: 80084,
          paths: [
            {
              pools: [poolId],
              tokens: [minimalTokenIn, minimalTokenOut],
              inputAmountRaw: amountBI,
              outputAmountRaw: 0n, // placeholder
              protocolVersion: 2, // we have deployed v2 contracts
            },
          ],
          swapKind: SwapKind.GivenIn,
        };
        const swap = new Swap(swapInput);
        const queryOutput = await swap.query(jsonRpcUrl);
        if (!queryOutput.pathAmounts) {
          throw new Error("No path amounts returned ");
        }
        console.log("queryOutput:", queryOutput);
        const returnAmount = queryOutput.pathAmounts[1];
        const formattedReturnAmount = returnAmount.toString();
        const predictedAmountOut = queryOutput.pathAmounts[1];
        const formattedPredictedAmountOut = predictedAmountOut.toString();

        // ///////////////////// V3 SDK way just trying to build a swap tx without any query at all: ///////////////////////////
        // FIXME: "Cannot read properties of undefined (reading 'wrapped')"
        // const minimalTokenIn = {
        //   address: tokenIn,
        //   decimals: tokenInDecimals ?? 18,
        //   index: inIndex,
        // };
        // const minimalTokenOut = {
        //   address: tokenOut,
        //   decimals: tokenOutDecimals ?? 6,
        //   index: outIndex,
        // };
        // const tokenInV3 = new Token(chainId, tokenIn, tokenInDecimals ?? 18);
        // const tokenOutV3 = new Token(chainId, tokenOut, tokenOutDecimals ?? 6);
        // const tokenInAmount = TokenAmount.fromHumanAmount(tokenInV3, "1");
        // const tokenOutAmount = TokenAmount.fromHumanAmount(tokenOutV3, "1");
        // const swapInput: SwapInput = {
        //   chainId: 80084,
        //   paths: [
        //     {
        //       pools: [poolAddress],
        //       tokens: [minimalTokenIn, minimalTokenOut],
        //       inputAmountRaw: amountBI,
        //       outputAmountRaw: 0n, // placeholder
        //       protocolVersion: 3,
        //     },
        //   ],
        //   swapKind: SwapKind.GivenIn,
        // };
        // const swap = new Swap(swapInput);
        // const buildCallInput: SwapBuildCallInput = {
        //   deadline: undefined,
        //   slippage: Slippage.fromPercentage("1"),
        //   wethIsEth: true,
        //   queryOutput: {
        //     swapKind: SwapKind.GivenIn,
        //     amountIn: tokenInAmount,
        //     expectedAmountOut: tokenOutAmount,
        //   },
        // };
        // const call = swap.buildCall(buildCallInput);
        // console.log("queryOutput:", call);
        // const returnAmount = amountBI;
        // const formattedReturnAmount = "1";
        // const predictedAmountOut = amountBI;
        // const formattedPredictedAmountOut = "1";

        return {
          // FIXME: the values in here are jumbled up w.r.t their typing, we should just use the balancer SDK types too if we can
          batchSwapSteps: [
            {
              poolId: poolId,
              assetInIndex: inIndex,
              assetOutIndex: outIndex,
              amountIn: amount.toString(),
              amountOut: predictedAmountOut.toString(),
              kind: "exactIn",
            },
          ],
          formattedSwapAmount: amount,
          formattedAmountIn: amount,
          formattedReturnAmount: formattedReturnAmount,
          amountIn: amountBI,
          returnAmount,
          tokenIn,
          tokenOut,
          predictedAmountOut,
          formattedPredictedAmountOut,
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
