import { nativeTokenAddress } from "@bera/config";
import { getAddress, parseUnits } from "viem";

import { defaultBeraConfig } from "~/constants";
import { ICrocSwapStep, SwapInfoV3 } from "~/hooks";
import { SwapRequest } from "~/types";
import { BeraConfig } from "~/types/global";
import { handleNativeBera } from "~/utils";

/**
 * Queries router for optimal swap path from one token to another
 */

export interface GetRoute {
  args: SwapRequest;
  config?: BeraConfig;
}
export const getRoute = async ({
  args,
  config = defaultBeraConfig,
}: GetRoute): Promise<SwapInfoV3> => {
  const { tokenIn, tokenOut, tokenInDecimals, amount } = args;
  const emptyRoute = {
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
  try {
    if (!config.endpoints?.dexRouter) {
      console.error("Dex router endpoint not found");
      return emptyRoute;
    }
    if (amount === "0" || !tokenIn || !tokenOut || !amount) {
      return emptyRoute;
    }

    const amountIn = parseUnits(amount, tokenInDecimals);

    const response = await fetch(
      `${config.endpoints.dexRouter}/dex/route?fromAsset=${handleNativeBera(
        tokenIn,
      )}&toAsset=${handleNativeBera(tokenOut)}&amount=${amountIn.toString()}`,
    );

    const result = await response.json();

    if (!result.steps) return emptyRoute;

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
    return emptyRoute;
  }
};
