import {
  PriceRange,
  encodeWarmPath,
  transformLimits,
} from "@bera/beracrocswap";
import { nativeTokenAddress } from "@bera/config";
import { Address } from "viem";
import {
  AddLiquidityRequest,
  AddLiquidityRequest2,
  PayloadReturnType,
} from "~/types";
const getPathId = (
  baseTokenAddress: Address,
  quoteTokenAddress: Address,
  isAmountBaseDenominated: boolean,
  poolIdx: number,
) => {
  if (poolIdx === 36003) {
    // return 1
    if (baseTokenAddress === nativeTokenAddress) {
      return 11;
    }
    if (quoteTokenAddress === nativeTokenAddress) {
      return 12;
    }
    if (isAmountBaseDenominated) {
      return 11;
    }
    return 12;
  }
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

export const getAddLiquidityPayload2 = async ({
  args,
}: {
  args: AddLiquidityRequest2;
}): Promise<PayloadReturnType | undefined> => {
  const { isStablePool, amounts, poolId, slippage } = args;
  try {
    return {
      payload: [128],
      value: 0n,
    };
  } catch (e) {
    console.log(e);
    return undefined;
  }
};
