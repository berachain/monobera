import { type PoolV2 } from "@bera/berajs";
import { isIPFS } from "@bera/config";
import BigNumber from "bignumber.js";

export const getPoolUrl = (
  pool: PoolV2 | undefined,
  isMyPool = false,
): string => {
  if (!pool) return "";
  if (isIPFS) {
    return `/pool?address=${pool?.shareAddress}${
      isMyPool ? "&back=my-pools" : ""
    }`;
  }
  return `/pool/${pool?.shareAddress}${isMyPool ? "?back=my-pools" : ""}`;
};

export const getPoolAddLiquidityUrl = (pool: PoolV2 | undefined) => {
  if (!pool) return "";

  if (isIPFS) {
    return `/add-liquidity?address=${pool?.shareAddress}`;
  }

  return `/add-liquidity/${pool?.shareAddress}`;
};

export const getPoolWithdrawUrl = (pool: PoolV2 | undefined) => {
  if (!pool) return "";
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
