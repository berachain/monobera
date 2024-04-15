import { chainId, crocIndexerEndpoint } from "@bera/config";
import BigNumber from "bignumber.js";

import { PoolV2 } from "..";

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

export const fetchPoolByAddress = async (
  shareAddress?: string,
): Promise<PoolV2 | null> => {
  if (!shareAddress) return null;
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
