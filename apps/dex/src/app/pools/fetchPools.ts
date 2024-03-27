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
  feesUsd: number;
  baseFees: number;
  quoteFees: number;
  baseVolume: number;
  quoteVolume: number;
  baseTokens: string;
  quoteTokens: string;
  volume24h: number;
  fees24h: number;
  baseTokenHoneyTvl: number;
  quoteTokenHoneyTvl: number;
  totalApy: number;
  bgtApy: number;
  shareAddress: string;
}

export const getPoolId = (base: Address, quote: Address) => {
  return base.concat("-").concat(quote);
};

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
    baseFees: 0,
    quoteFees: 0,
    baseVolume: 0,
    quoteVolume: 0,
    tvlUsd: 0,
    volumeUsd: 0,
    volume24h: 0,
    feesUsd: 0,
    fees24h: 0,
    baseTokenHoneyTvl: 0,
    quoteTokenHoneyTvl: 0,
    totalApy: 0,
    bgtApy: 0,
    shareAddress: result.shareAddress?.address,
  };
};

export const formatPoolData = (result: any): PoolV2 => {
  const baseInfo = result.info.baseInfo;
  const quoteInfo = result.info.quoteInfo;

  const getFormattedAmount = (value: number, decimals = 18) => {
    return new BigNumber(value).div(10 ** decimals).toString();
  };

  // format tvl and get total
  const baseTvlFormattedAmount = getFormattedAmount(
    result.stats.baseTvl,
    baseInfo.decimals,
  );
  const quoteTvlFormattedAmount = getFormattedAmount(
    result.stats.quoteTvl,
    quoteInfo.decimals,
  );
  const baseTvlHoneyAmount = getFormattedAmount(result.stats.baseTvlInHoney);
  const quoteTvlHoneyAmount = getFormattedAmount(result.stats.quoteTvlInHoney);

  const totalTvl =
    parseFloat(baseTvlHoneyAmount) + parseFloat(quoteTvlHoneyAmount);

  // format fees and get total
  const baseFeesFormattedAmount = getFormattedAmount(
    result.stats.baseFees,
    baseInfo.decimals,
  );
  const quoteFeesFormattedAmount = getFormattedAmount(
    result.stats.quoteFees,
    quoteInfo.decimals,
  );
  const baseFeesHoneyAmount = getFormattedAmount(result.stats.baseFeesInHoney);
  const quoteFeesHoneyAmount = getFormattedAmount(
    result.stats.quoteFeesInHoney,
  );

  const totalFees =
    parseFloat(baseFeesHoneyAmount) + parseFloat(quoteFeesHoneyAmount);

  // format volume and get total
  const baseVolumeFormattedAmount = getFormattedAmount(
    result.stats.baseVolume,
    baseInfo.decimals,
  );
  const quoteVolumeFormattedAmount = getFormattedAmount(
    result.stats.quoteVolume,
    quoteInfo.decimals,
  );
  const baseVolumeHoneyAmount = getFormattedAmount(
    result.stats.baseVolumeInHoney,
  );
  const quoteVolumeHoneyAmount = getFormattedAmount(
    result.stats.quoteVolumeInHoney,
  );

  const totalVolume =
    parseFloat(baseVolumeHoneyAmount) + parseFloat(quoteVolumeHoneyAmount);

  const volume24h = parseFloat(
    getFormattedAmount(result.stats.volume24HInHoney),
  );
  const fees24h = parseFloat(getFormattedAmount(result.stats.fees24HInHoney));

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
    shareAddress: result.info.shareAddress?.address,
    baseTokens: baseTvlFormattedAmount,
    quoteTokens: quoteTvlFormattedAmount,
    baseFees: parseFloat(baseFeesFormattedAmount.toString()),
    quoteFees: parseFloat(quoteFeesFormattedAmount.toString()),
    baseVolume: parseFloat(baseVolumeFormattedAmount.toString()),
    quoteVolume: parseFloat(quoteVolumeFormattedAmount.toString()),
    feeRate: result.info?.template?.feeRate
      ? result.info.template.feeRate / 10000
      : result.stats.feeRate / 10000,
    tvlUsd: totalTvl,
    volumeUsd: totalVolume,
    feesUsd: totalFees,
    volume24h,
    fees24h,
    baseTokenHoneyTvl: parseFloat(baseTvlHoneyAmount.toString()),
    quoteTokenHoneyTvl: parseFloat(quoteTvlHoneyAmount.toString()),
    totalApy: 0,
    bgtApy: 0,
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
      )}&sortBy=${sort}.${order}&page=${page}&size=${limit}&keyword=${keyword}`,
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

export const fetchPoolByAddress = async (
  shareAddress?: string,
): Promise<PoolV2 | null> => {
  try {
    const result = await fetch(
      `${crocIndexerEndpoint}/v2/pool_stats/${shareAddress}?chainId=0x${chainId.toString(
        16,
      )}`,
    );

    const response = await result.json();

    return formatPoolData(response.data);
  } catch (e) {
    console.log(e);
    return null;
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
      )}&sortBy=${sort}.${order}&page=${page}&size=${limit}&keyword=${keyword}`,
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

export const fetchSelectedPool = async (shareAddress: string) => {
  if (!shareAddress) return null;
  const response = await fetchPoolByAddress(shareAddress);
  return response;
};
