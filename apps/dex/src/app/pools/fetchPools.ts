import { type Token } from "@bera/berajs";
import { type Address } from "wagmi";
import { crocIndexerEndpoint } from "@bera/config";
import { formatUnits } from "ethers/lib/utils";
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
  return 1 / initialPrice;
};

export const getQuoteCost = (initialPrice: number) => {
  return 1 * initialPrice;
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
    feeRate: 0,
    tvlUsd: 0,
    volumeUsd: 0,
    fees: 0,
    baseTokenHoneyTvl: 0,
    quoteTokenHoneyTvl: 0,
  };
};

export const formatPoolData = (result: any): PoolV2 => {
  console.log({
    result,
  });
  const baseInfo = result.info.baseInfo;
  const quoteInfo = result.info.quoteInfo;

  const baseTvlFormattedAmount = formatUnits(
    BigInt(result.stats.baseTvl),
    baseInfo.decimals,
  );
  const quoteTvlFormattedAmount = formatUnits(
    BigInt(result.stats.quoteTvl),
    quoteInfo.decimals,
  );

  const baseTvlHoneyAmount = formatUnits(
    BigInt(result.stats.baseTvlInHoney),
    baseInfo.decimals,
  );
  const quotTvlHoneyAmount = formatUnits(
    BigInt(result.stats.quoteTvlInHoney),
    quoteInfo.decimals,
  );

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
    feeRate: result.stats.feeRate,
    tvlUsd: totalTvl,
    volumeUsd: 0,
    fees: 0,
    baseTokenHoneyTvl: parseFloat(baseTvlHoneyAmount),
    quoteTokenHoneyTvl: parseFloat(quotTvlHoneyAmount),
  };
};

export const fetchPools = async (
  page: number,
  limit: number,
  sort: string,
  order: string,
): Promise<PoolV2[]> => {
  try {
    const result = await fetch(
      `${crocIndexerEndpoint}/v2/pool_stats?chainId=0x138d5&sortBy=${sort}.${order}&page=${page}&pageLimit=${limit}`,
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
