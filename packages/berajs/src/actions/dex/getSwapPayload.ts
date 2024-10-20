import { beraTokenAddress, nativeTokenAddress } from "@bera/config";

import { IBalancerSwapStep, SwapInfo, Token } from "../..";
import { PayloadReturnType } from "./../../types/global";

/**
 * Returns the appropriate payload / arguments for the swap smart contract function
 * @param {SwapInfo} swapInfo - the details of the swap from balancer
 * @param {number} slippage - the slippage tolerance for the transaction between 0.1 and 100
 * @param {Token} baseToken - the token being converted from
 * @param {Token} quoteToken - the token being converted to
 * @returns {[IBalancerSwapStep[], bigint, bigint] | undefined} - the payload / arguments for the swap smart contract function, undefined if there was invalid input
 */
export const getSwapPayload = ({
  args: { swapInfo, slippage, baseToken, quoteToken },
}: {
  args: {
    swapInfo: SwapInfo | undefined;
    slippage: number | undefined;
    baseToken: Token | undefined;
    quoteToken: Token | undefined;
  };
}): PayloadReturnType<[IBalancerSwapStep[], bigint, bigint]> | undefined => {
  if (
    !(swapInfo?.batchSwapSteps?.length && slippage && baseToken && quoteToken)
  ) {
    return;
  }
  try {
    // parse minutes to blocks
    const sI = BigInt(swapInfo.returnAmount);
    const s = BigInt(slippage * 10 ** 18);
    const minAmountOut = (sI ?? 0n) - ((sI ?? 0n) * s) / BigInt(100 * 10 ** 18);

    // TODO (#multistep): revisit this logic for multi-step swaps
    // if (baseToken && baseToken.address === nativeTokenAddress) {
    //   const swapSteps = [...swapInfo.batchSwapSteps];
    //   const firstStep = swapSteps[0] as IBalancerSwapStep;
    //   if (swapSteps.length > 0 && firstStep.base && firstStep.quote) {
    //     if (firstStep.base.toLowerCase() === beraTokenAddress.toLowerCase()) {
    //       firstStep.base = nativeTokenAddress;
    //     } else if (
    //       firstStep.quote.toLowerCase() === beraTokenAddress.toLowerCase()
    //     ) {
    //       firstStep.quote = nativeTokenAddress;
    //     }
    //     swapInfo.batchSwapSteps = swapSteps;
    //   }
    // }
    //
    // if (quoteToken && quoteToken.address === nativeTokenAddress) {
    //   const swapSteps = [...swapInfo.batchSwapSteps];
    //   if (swapSteps.length > 0) {
    //     const lastIndex = swapSteps.length - 1;
    //     const lastStep = swapSteps[lastIndex] as IBalancerSwapStep;
    //     if (lastStep.base && lastStep.quote) {
    //       if (lastStep.base.toLowerCase() === beraTokenAddress.toLowerCase()) {
    //         lastStep.base = nativeTokenAddress;
    //       } else if (
    //         lastStep.quote.toLowerCase() === beraTokenAddress.toLowerCase()
    //       ) {
    //         lastStep.quote = nativeTokenAddress;
    //       }
    //       swapInfo.batchSwapSteps = swapSteps;
    //     }
    //   }
    // }

    // TODO (#multiswap): value is only relevant for swaps with ETH/native token of the chain (belongs in getRoute.ts)
    const value =
      baseToken?.address === nativeTokenAddress ? swapInfo.amountIn : 0n;

    const payload: [IBalancerSwapStep[], bigint, bigint] = [
      swapInfo.batchSwapSteps,
      swapInfo.amountIn,
      minAmountOut,
    ];

    return { payload, value: value };
  } catch (e) {
    console.log("getSwapError:", e);
    return undefined;
  }
};
