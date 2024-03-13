import { type Token } from "@bera/berajs";
import { chainId, crocIndexerEndpoint } from "@bera/config";
import BigNumber from "bignumber.js";
import { type Address } from "viem";

export interface PoolV2 {
  id: string; // concat base-quote-poolidx
  base: Address;
  quote: Address;
  baseInfo: Token;
  quoteInfo: Token;
  timeCreate: number;
  poolIdx: number;
  poolName: string; // concat {BASE}-{QUOTE}
  tokens: Token[];
  tvlUsd: number;
  volumeUsd: number;
  feeRate: number;
  fees: number;
  baseTokens: string;
  quoteTokens: string;
  baseTokenHoneyTvl: number;
  quoteTokenHoneyTvl: number;
  totalApy: number;
  bgtApy: number;
  shareAddress: string;
}

export const getPoolId = (base: Address, quote: Address) => {
  return base.concat("-").concat(quote);
};

export const getPoolUrl = (pool: PoolV2) => {
  return `/pool?base=${pool.base}&quote=${pool.quote}`;
};

export const getPoolAddLiquidityUrl = (pool: PoolV2) => {
  return `/add-liquidity?base=${pool.base}&quote=${pool.quote}`;
};

export const getPoolWithdrawUrl = (pool: PoolV2) => {
  return `/withdraw?base=${pool.base}&quote=${pool.quote}`;
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

export const formatSubgraphPoolData = (result: any): PoolV2 => {
  return {
    id: result.id,
    base: result.base,
    quote: result.quote,
    baseInfo: result.baseInfo,
    quoteInfo: result.quoteInfo,
    timeCreate: result.timeCreate,
    poolIdx: result.poolIdx,
    poolName: result.baseInfo.symbol
      .concat("-")
      .concat(result.quoteInfo.symbol),
    tokens: [result.baseInfo, result.quoteInfo],
    baseTokens: "0",
    quoteTokens: "0",
    feeRate: Number(result.template.feeRate) / 10000,
    tvlUsd: 0,
    volumeUsd: 0,
    fees: 0,
    baseTokenHoneyTvl: 0,
    quoteTokenHoneyTvl: 0,
    totalApy: 0,
    bgtApy: 0,
    shareAddress: "",
  };
};

export const formatPoolData = (result: any): PoolV2 => {
  const baseInfo = result.info.baseInfo;
  const quoteInfo = result.info.quoteInfo;

  const baseTvlFormattedAmount = new BigNumber(result.stats.baseTvl)
    .div(10 ** baseInfo.decimals)
    .toString();
  const quoteTvlFormattedAmount = new BigNumber(result.stats.quoteTvl)
    .div(10 ** quoteInfo.decimals)
    .toString();
  const baseTvlHoneyAmount = new BigNumber(result.stats.baseTvlInHoney)
    .div(10 ** 18)
    .toString();
  const quotTvlHoneyAmount = new BigNumber(result.stats.quoteTvlInHoney)
    .div(10 ** 18)
    .toString();
  const totalTvl =
    parseFloat(baseTvlHoneyAmount) + parseFloat(quotTvlHoneyAmount);

  return {
    id: result.info.id,
    base: result.info.base,
    quote: result.info.quote,
    baseInfo,
    quoteInfo,
    timeCreate: result.info.timeCreate,
    poolIdx: result.info.poolIdx,
    poolName: result.info.baseInfo.symbol
      .concat("-")
      .concat(result.info.quoteInfo.symbol),
    tokens: [result.info.baseInfo, result.info.quoteInfo],
    baseTokens: baseTvlFormattedAmount,
    quoteTokens: quoteTvlFormattedAmount,
    feeRate: result.stats.feeRate / 10000,
    tvlUsd: totalTvl,
    volumeUsd: 0,
    fees: 0,
    baseTokenHoneyTvl: parseFloat(baseTvlHoneyAmount.toString()),
    quoteTokenHoneyTvl: parseFloat(quotTvlHoneyAmount.toString()),
    totalApy: 0,
    bgtApy: 0,
    shareAddress: "",
  };
};

export const fetchPools = async (
  page: number,
  limit: number,
  sort: string,
  order: string,
  keyword = "",
): Promise<PoolV2[]> => {
  try {
    const result = await fetch(
      `${crocIndexerEndpoint}/v2/pool_stats?chainId=0x${chainId.toString(
        16,
      )}&sortBy=${sort}.${order}&page=${page}&pageLimit=${limit}&keyword=${keyword}`,
    );

    const response = await result.json();
    const formattedPools: PoolV2[] = response.data.pools.map((result: any) => {
      return formatPoolData(result);
    });

    return formattedPools;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const fetchPoolsWithKeyword = async (
  page: number,
  limit: number,
  sort: string,
  order: string,
  keyword: string,
): Promise<PoolV2[]> => {
  try {
    const result = await fetch(
      `${crocIndexerEndpoint}/v2/pool_stats?chainId=0x${chainId.toString(
        16,
      )}&sortBy=${sort}.${order}&page=${page}&pageLimit=${limit}&keyword=${keyword}`,
    );

    const response = await result.json();
    const formattedPools: PoolV2[] = response.data.pools.map((result: any) => {
      return formatPoolData(result);
    });

    return formattedPools;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const fetchSelectedPool = async (base: string, quote: string) => {
  const response = await fetchPools(0, 100, "tvl", "desc");

  return response.find((pool) => {
    return pool.base === base && pool.quote === quote;
  });
};
