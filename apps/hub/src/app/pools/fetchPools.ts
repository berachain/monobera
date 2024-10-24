import { PoolWithMethods } from "@balancer-labs/sdk";
import { isIPFS } from "@bera/config";
import BigNumber from "bignumber.js";

export const getPoolUrl = (
  pool: PoolWithMethods | undefined,
  isMyPool = false,
): string => {
  if (!pool) return "";
  if (isIPFS) {
    return `/pool?address=${pool?.address}${isMyPool ? "&back=my-pools" : ""}`;
  }
  return `/pool/${pool?.address}${isMyPool ? "?back=my-pools" : ""}`;
};

export const getPoolAddLiquidityUrl = (pool: PoolWithMethods | undefined) => {
  if (!pool) return "";

  if (isIPFS) {
    return `/add-liquidity?address=${pool?.address}`;
  }

  return `/add-liquidity/${pool?.address}`;
};

export const getPoolWithdrawUrl = (pool: PoolWithMethods | undefined) => {
  if (!pool) return "";
  return `/withdraw/${pool?.address}`;
};

export const getBaseCost = (initialPrice: number) => {
  if (initialPrice === 0) return 0;
  return 1 / initialPrice;
};

export const getQuoteCost = (initialPrice: number) => {
  if (initialPrice === 0) return 0;
  return 1 * initialPrice;
};

export const getBaseCostBN = (initialPrice: string): string => {
  const bnInitialPrice = new BigNumber(initialPrice);
  if (bnInitialPrice.isZero()) return "0";
  // Perform division and convert the result to a string
  return new BigNumber(1).dividedBy(bnInitialPrice).toFixed();
};

export const getQuoteCostBN = (initialPrice: string): string => {
  const bnInitialPrice = new BigNumber(initialPrice);
  if (bnInitialPrice.isZero()) return "0";
  // Perform multiplication (though unnecessary as it's by 1) and convert the result to a string
  return new BigNumber(1).multipliedBy(bnInitialPrice).toFixed();
};
