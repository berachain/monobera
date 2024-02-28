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

          if (getAddress(tokenIn) === getAddress(nativeTokenAddress)) {
            if (previewBatchSwapSteps[0]) {
              previewBatchSwapSteps[0].base = beraTokenAddress;
            }
          }

          const result = await publicClient.readContract({
            address: crocMultiSwapAddress,
            abi: MULTISWAP_ABI,
            functionName: "previewMultiSwap",
            args: [previewBatchSwapSteps, swapInfo.amountIn],
          });

          const amountOut = result as bigint;
          const formattedAmountOut = formatUnits(amountOut, tokenOutDecimals);
          console.log("weutsdygihuope");
          console.log({
            amountOut,
            formattedAmountOut,
          });
          // @ts-ignore
          return {
            ...swapInfo,
            returnAmount: amountOut,
            formattedReturnAmount: formattedAmountOut,
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
    };
  }
};
