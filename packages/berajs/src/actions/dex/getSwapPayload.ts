import { beraTokenAddress, nativeTokenAddress } from "@bera/config";

import { ICrocSwapStep, SwapInfoV3, Token } from "../..";

/**
 * Returns the appropriate payload / arguments for the swap smart contract function
 * @param {SwapInfoV3} swapInfo - the details of the swap from croc swap
 * @param {number} slippage - the slippage tolerance for the transaction between 0.1 and 100
 * @param {Token} baseToken - the token being converted from
 * @param {Token} quoteToken - the token being converted to
 * @returns {[ICrocSwapStep[], bigint, bigint] | undefined} - the payload / arguments for the swap smart contract function, undefined if there was invalid input
 */
export const getSwapPayload = ({
  swapInfo,
  slippage,
  baseToken,
  quoteToken,
}: {
  swapInfo: SwapInfoV3 | undefined;
  slippage: number | undefined;
  baseToken: Token | undefined;
  quoteToken: Token | undefined;
}): [ICrocSwapStep[], bigint, bigint] | undefined => {
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

    // @ts-nocheck
    if (baseToken && baseToken.address === nativeTokenAddress) {
      const swapSteps = [...swapInfo.batchSwapSteps];
      const firstStep = swapSteps[0] as ICrocSwapStep;
      if (swapSteps.length > 0 && firstStep.base && firstStep.quote) {
        if (firstStep.base.toLowerCase() === beraTokenAddress.toLowerCase()) {
          firstStep.base = nativeTokenAddress;
        } else if (
          firstStep.quote.toLowerCase() === beraTokenAddress.toLowerCase()
        ) {
          firstStep.quote = nativeTokenAddress;
        }
        swapInfo.batchSwapSteps = swapSteps;
      }
    }

    if (quoteToken && quoteToken.address === nativeTokenAddress) {
      const swapSteps = [...swapInfo.batchSwapSteps];
      if (swapSteps.length > 0) {
        const lastIndex = swapSteps.length - 1;
        const lastStep = swapSteps[lastIndex] as ICrocSwapStep;
        if (lastStep.base && lastStep.quote) {
          if (lastStep.base.toLowerCase() === beraTokenAddress.toLowerCase()) {
            lastStep.base = nativeTokenAddress;
          } else if (
            lastStep.quote.toLowerCase() === beraTokenAddress.toLowerCase()
          ) {
            lastStep.quote = nativeTokenAddress;
          }
          swapInfo.batchSwapSteps = swapSteps;
        }
      }
    }

    const payload: [ICrocSwapStep[], bigint, bigint] = [
      swapInfo.batchSwapSteps,
      swapInfo.amountIn,
      minAmountOut,
    ];

    return payload;
  } catch (e) {
    console.log("getSwapError:", e);
    return undefined;
  }
};
