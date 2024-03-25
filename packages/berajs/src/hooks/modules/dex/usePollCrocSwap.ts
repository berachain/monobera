import {
  beraTokenAddress,
  crocMultiSwapAddress,
  crocRouterEndpoint,
  nativeTokenAddress,
} from "@bera/config";
import useSWR from "swr";
import { formatUnits, getAddress, parseUnits, type Address } from "viem";
import { usePublicClient } from "wagmi";

import { MULTISWAP_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { handleNativeBera } from "~/utils";

interface IUsePollSwaps {
  tokenIn: Address;
  tokenOut: Address;
  tokenInDecimals: number;
  tokenOutDecimals: number;
  amount: string;
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
  tokenIn,
  tokenOut,
  tokenInDecimals,
  tokenOutDecimals,
  amount,
  isTyping,
}: IUsePollSwaps) => {
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

        const swapInfo = await getCrocSwap(
          tokenIn,
          tokenOut,
          tokenInDecimals,
          amount,
        );

        const batchSwapSteps = swapInfo.batchSwapSteps;

        if (batchSwapSteps?.length) {
          const previewBatchSwapSteps = [...batchSwapSteps];

          if (
            previewBatchSwapSteps[0] &&
            getAddress(tokenIn) === getAddress(nativeTokenAddress)
          ) {
            if (previewBatchSwapSteps[0].base === nativeTokenAddress) {
              previewBatchSwapSteps[0].base = beraTokenAddress;
            } else {
              previewBatchSwapSteps[0].quote = beraTokenAddress;
            }
          }

          const result = await publicClient.readContract({
            address: crocMultiSwapAddress,
            abi: MULTISWAP_ABI,
            functionName: "previewMultiSwap",
            args: [previewBatchSwapSteps, swapInfo.amountIn],
          });

          const amountOut = (result as bigint[])[0] as bigint;
          const formattedAmountOut = formatUnits(amountOut, tokenOutDecimals);
          const predictedAmountOut = (result as bigint[])[1] as bigint;
          const formattedPredictedAmountOut = formatUnits(
            predictedAmountOut,
            tokenOutDecimals,
          );

          // @ts-ignore
          return {
            ...swapInfo,
            returnAmount: amountOut,
            formattedReturnAmount: formattedAmountOut,
            predictedAmountOut,
            formattedPredictedAmountOut,
          };
        }

        return swapInfo;
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
      refreshInterval: POLLING.FAST, // 10 seconds to ensure the accurate data
    },
  );
};

export const getCrocSwap = async (
  tokenIn: Address,
  tokenOut: Address,
  tokenInDecimals: number,
  amount: string,
): Promise<SwapInfoV3> => {
  try {
    if (amount === "0" || !tokenIn || !tokenOut || !amount) {
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

    const amountIn = parseUnits(amount, tokenInDecimals);

    const response = await fetch(
      `${crocRouterEndpoint}/dex/route?fromAsset=${handleNativeBera(
        tokenIn,
      )}&toAsset=${handleNativeBera(tokenOut)}&amount=${amountIn.toString()}`,
    );

    const result = await response.json();

    if (!result.steps)
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

    const batchSwapSteps: ICrocSwapStep[] = [...result.steps];

    let value = undefined;
    if (getAddress(tokenIn) === getAddress(nativeTokenAddress)) {
      value = amountIn;
    }

    const swapInfo = {
      batchSwapSteps: batchSwapSteps,
      formattedSwapAmount: amount.toString(),
      formattedAmountIn: amount,
      formattedReturnAmount: "0",
      amountIn,
      returnAmount: 0n,
      tokenIn,
      tokenOut,
      value,
      predictedAmountOut: 0n,
      formattedPredictedAmountOut: "0",
    };

    return swapInfo;
  } catch (e) {
    console.log(e);
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
};
