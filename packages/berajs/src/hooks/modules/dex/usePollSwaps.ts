import { nativeTokenAddress } from "@bera/config";
import useSWR from "swr";
import { formatUnits, getAddress, parseUnits, type Address } from "viem";
import { usePublicClient } from "wagmi";

import { DEX_PRECOMPILE_ABI } from "~/config";
import { useBeraConfig } from "~/contexts";
import { handleNativeBera } from "~/utils";
import POLLING from "../../../config/constants/polling";

interface IUsePollSwaps {
  tokenIn: Address;
  tokenOut: Address;
  tokenInDecimals: number;
  tokenOutDecimals: number;
  swapKind: number;
  amount: string;
  isTyping?: boolean | undefined;
}

export interface SwapInfoV2 {
  batchSwapSteps: BatchSwapStep[];
  formattedSwapAmount: string;
  formattedReturnAmount: string;
  formattedAmountIn: string;
  returnAmount: bigint;
  tokenIn: string;
  tokenOut: string;
}

export const usePollSwaps = ({
  tokenIn,
  tokenOut,
  tokenInDecimals,
  tokenOutDecimals,
  swapKind,
  amount,
  isTyping,
}: IUsePollSwaps) => {
  const { networkConfig } = useBeraConfig();
  const publicClient = usePublicClient();
  const QUERY_KEY = [tokenIn, tokenOut, swapKind, amount, isTyping];
  // console.log(QUERY_KEY);
  return useSWR<SwapInfoV2 | undefined>(
    QUERY_KEY,
    async () => {
      try {
        if (isTyping !== undefined && isTyping === true) {
          return {
            batchSwapSteps: [],
            formattedSwapAmount: amount.toString(),
            formattedAmountIn: "0",
            formattedReturnAmount: "0",
            returnAmount: 0n,
            tokenIn,
            tokenOut,
          };
        }

        const swapInfo = await getSwap(
          tokenIn,
          tokenOut,
          tokenInDecimals,
          tokenOutDecimals,
          swapKind,
          amount,
        );

        const batchSwapSteps = swapInfo.batchSwapSteps;

        if (batchSwapSteps && batchSwapSteps.length) {
          const result = await publicClient.readContract({
            address: networkConfig.precompileAddresses
              .erc20DexAddress as Address,
            abi: DEX_PRECOMPILE_ABI,
            functionName: "getPreviewBatchSwap",
            args: [0, batchSwapSteps],
          });

          const amountOut = (result as [string, bigint])[1];
          const formattedAmountOut = formatUnits(amountOut, tokenOutDecimals);
          // @ts-ignore
          batchSwapSteps[batchSwapSteps.length - 1].amountOut = 0n;
          return {
            ...swapInfo,
            batchSwapSteps: batchSwapSteps,
            returnAmount: amountOut,
            formattedReturnAmount: formattedAmountOut,
          };
        }

        return swapInfo;
      } catch (e) {
        // console.log(e);
        // TODO: throws so many errors but this is good 4 debug
        console.error(e);
        return {
          batchSwapSteps: [],
          formattedSwapAmount: amount.toString(),
          formattedAmountIn: "0",
          formattedReturnAmount: "0",
          returnAmount: 0n,
          tokenIn,
          tokenOut,
        };
      }
    },
    {
      refreshInterval: POLLING.SLOW,
      // use: [laggy],
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
  value?: bigint;
}

export const getSwap = async (
  tokenIn: Address,
  tokenOut: Address,
  tokenInDecimals: number,
  tokenOutDecimals: number,
  swapType: number,
  amount: string,
): Promise<SwapInfoV2> => {
  try {
    if (amount === "0" || !tokenIn || !tokenOut || !amount) {
      return {
        batchSwapSteps: [],
        formattedSwapAmount: amount.toString(),
        formattedAmountIn: "0",
        formattedReturnAmount: "0",
        returnAmount: 0n,
        tokenIn,
        tokenOut,
      };
    }

    const type = swapType === 0 ? "given_in" : "given_out";
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_INDEXER_ENDPOINT
      }/dex/route?quoteAsset=${handleNativeBera(
        tokenOut,
      )}&baseAsset=${handleNativeBera(tokenIn)}&amount=${parseUnits(
        `${amount}`,
        tokenInDecimals,
      )}&swap_type=${type}`,
    );

    const result = await response.json();

    if (!result.steps)
      return {
        batchSwapSteps: [],
        formattedSwapAmount: amount.toString(),
        formattedAmountIn: "0",
        formattedReturnAmount: "0",
        returnAmount: 0n,
        tokenIn,
        tokenOut,
      };

    const batchSwapSteps: BatchSwapStep[] = result.steps.map((step: any) => {
      return {
        poolId: step.pool,
        assetIn: step.assetIn,
        amountIn: BigInt(step.amountIn),
        assetOut: step.assetOut,
        amountOut: 0n,
        userData: "",
      };
    });

    // call rpc set last amount out as result

    if (getAddress(tokenIn) === getAddress(nativeTokenAddress)) {
      if (batchSwapSteps[0]) {
        batchSwapSteps[0].assetIn = nativeTokenAddress;
        batchSwapSteps[0].value = batchSwapSteps[0].amountIn;
      }
    }

    const swapInfo = {
      batchSwapSteps: batchSwapSteps,
      formattedSwapAmount: amount.toString(),
      formattedAmountIn: formatUnits(
        BigInt(result.steps[0].amountIn),
        tokenInDecimals ?? 18,
      ),
      formattedReturnAmount: formatUnits(
        BigInt(result.steps[result.steps.length - 1].amountOut),
        tokenOutDecimals ?? 18,
      ),
      returnAmount: BigInt(result.steps[result.steps.length - 1].amountOut),
      tokenIn,
      tokenOut,
    };

    return swapInfo;
  } catch (e) {
    console.log(e);
    return {
      batchSwapSteps: [],
      formattedSwapAmount: amount.toString(),
      formattedAmountIn: "0",
      formattedReturnAmount: "0",
      returnAmount: 0n,
      tokenIn,
      tokenOut,
    };
  }
};
