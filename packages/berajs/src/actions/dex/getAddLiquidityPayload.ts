import {
  PriceRange,
  encodeWarmPath,
  transformLimits,
} from "@bera/beracrocswap";
import { nativeTokenAddress } from "@bera/config";
import { Address } from "viem";
import { AddLiquidityRequest, PayloadReturnType } from "~/types";

const getPathId = (
  baseTokenAddress: Address,
  quoteTokenAddress: Address,
  isAmountBaseDenominated: boolean,
) => {
  if (baseTokenAddress === nativeTokenAddress) {
    return 31;
  }
  if (quoteTokenAddress === nativeTokenAddress) {
    return 32;
  }
  if (isAmountBaseDenominated) {
    return 31;
  }

  return 32;
};

const getAmount = (
  baseTokenAddress: Address,
  quoteTokenAddress: Address,
  isAmountBaseDenominated: boolean,
  baseAmount: bigint,
  quoteAmount: bigint,
) => {
  if (baseTokenAddress === nativeTokenAddress) {
    return baseAmount;
  }
  if (quoteTokenAddress === nativeTokenAddress) {
    return quoteAmount;
  }
  if (isAmountBaseDenominated) {
    return baseAmount;
  }

  return quoteAmount;
};

/**
 * generates a payload used to add liquidity to bex
 */

export const getAddLiquidityPayload = async ({
  args,
}: {
  args: AddLiquidityRequest;
}): Promise<PayloadReturnType | undefined> => {
  const {
    slippage,
    poolPrice,
    baseToken,
    quoteToken,
    isAmountBaseDenominated,
    baseAmount,
    quoteAmount,
    poolIdx,
  } = args;
  try {
    const priceLimits = {
      min: poolPrice * (1 - (slippage ?? 1) / 100),
      max: poolPrice * (1 + (slippage ?? 1) / 100),
    };
    const limits: PriceRange = [priceLimits.min, priceLimits.max];

    const transformedLimits = transformLimits(
      limits,
      baseToken.decimals,
      quoteToken.decimals,
    );

    let totalValue = 0n;

    if (baseToken.address === nativeTokenAddress) {
      totalValue = baseAmount;
    }

    if (quoteToken.address === nativeTokenAddress) {
      totalValue = quoteAmount;
    }

    const pathId = getPathId(
      baseToken.address,
      quoteToken.address,
      isAmountBaseDenominated,
    );

    const mintCalldata = await encodeWarmPath(
      baseToken.address as string,
      quoteToken.address as string,
      pathId,
      0,
      0,
      getAmount(
        baseToken.address,
        quoteToken.address,
        isAmountBaseDenominated,
        baseAmount,
        quoteAmount,
      ),
      transformedLimits[0],
      transformedLimits[1],
      0,
      poolIdx,
    );

    return {
      payload: [2, mintCalldata],
      value: totalValue,
    };
  } catch (e) {
    console.log(e);
    return undefined;
  }
};
