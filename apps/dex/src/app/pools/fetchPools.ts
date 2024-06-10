import { formatPoolData, type PoolV2 } from "@bera/berajs";
import { chainId, crocIndexerEndpoint } from "@bera/config";
import BigNumber from "bignumber.js";

export const getPoolUrl = (pool: PoolV2, isMyPool = false) => {
  return `/pool/${pool?.shareAddress}${isMyPool ? "?back=my-pools" : ""}`;
};

export const getPoolAddLiquidityUrl = (pool: PoolV2) => {
  return `/add-liquidity/${pool?.shareAddress}`;
};

export const getPoolWithdrawUrl = (pool: PoolV2) => {
  return `/withdraw/${pool?.shareAddress}`;
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
