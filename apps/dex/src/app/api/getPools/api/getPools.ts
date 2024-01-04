import { getDayStartTimestampDaysAgo, getLatestDay } from "@bera/bera-router";
import { type Pool } from "@bera/bera-router/dist/services/PoolService/types";
import {
  type InflationRate,
  type PoolDayData,
  type Weight,
} from "@bera/graphql";
import { formatUnits, getAddress } from "viem";
import { type Address } from "wagmi";

import { type MappedTokens } from "../../getPrices/api/getPrices";

export const getParsedPools = (
  pools: Pool[],
  globalCuttingBoard: Weight[] | undefined,
  mappedTokens: MappedTokens,
  inflationData: InflationRate | undefined,
) => {
  try {
    const totalAmount = globalCuttingBoard?.reduce((arr, curr) => {
      return arr + Number(curr.amount);
    }, 0);

    if (pools.length) {
      if (pools)
        pools.map((pool) => {
          const swapFee = Number(formatUnits(BigInt(pool.swapFee) ?? "", 18));
          pool.formattedSwapFee = (swapFee * 100).toString();

          const cuttingBoard: Weight | undefined = globalCuttingBoard?.find(
            (board: Weight) =>
              board.receiver.toLowerCase() === pool.pool.toLowerCase(),
          );

          const bgtPrice =
            mappedTokens[
              getAddress(process.env.NEXT_PUBLIC_WBERA_ADDRESS as string)
            ];

          let poolApy = 0;
          if (cuttingBoard && bgtPrice && totalAmount && inflationData) {
            const recieverWeight = Number(cuttingBoard.amount) / totalAmount;
            const bgtPerYear =
              recieverWeight * Number(inflationData.bgtPerYear);
            const totalCuttingBoardValue =
              Number(bgtPerYear) * Number(bgtPrice);
            poolApy = (totalCuttingBoardValue / Number(pool.tvlUsd)) * 100;
            pool.bgtPerYear = bgtPerYear;
          }

          // extract daily volume from array
          const latestHistoricalEntry: PoolDayData | undefined =
            pool.historicalData ? pool.historicalData[0] : undefined;
          let dailyFees = 0;
          let dailyVolume = 0;
          const dayStartTimeStamp = getLatestDay();
          if (
            latestHistoricalEntry &&
            dayStartTimeStamp === latestHistoricalEntry.date
          ) {
            dailyFees = Number(latestHistoricalEntry.feesUsd);
            dailyVolume = Number(latestHistoricalEntry.volumeUsd);
          }
          pool.dailyFees = dailyFees;
          pool.dailyVolume = dailyVolume;
          const swapApr =
            dailyFees === 0
              ? 0
              : (dailyFees / Number(pool?.tvlUsd)) * 365 * 100;

          pool.feeApy =
            Number.isNaN(swapApr) || !Number.isFinite(swapApr) ? 0 : swapApr;
          pool.bgtApy = Number.isNaN(poolApy) ? 0 : poolApy;
          pool.totalApy = pool.bgtApy + pool.feeApy;
          pool.totalValue = Number(pool.tvlUsd);
        });
      tagPools(pools);
    }
    return pools;
  } catch (e) {
    console.log(e);
    return undefined;
  }
};

export enum PoolTag {
  HOT = "hot",
  NEW = "new",
  BGT_REWARDS = "bgtRewards",
}

const LIQUIDITY_THRESHOLD = 50000; // 50k usd
const PERCENTAGE_INCREASE_THRESHOLD = 50; // 50% increase

// a new pool is a pool created in the past 24 hours with atleast 50k usd in liquidity.
const isNewPool = (pool: Pool) => {
  const currentTime = Date.now() / 1000;

  const twentyFourHoursInMs = 24 * 60 * 60;
  const blockTime = Number(pool.createdTimeStamp);

  const poolCreationTime = new Date(blockTime).getTime();

  return (
    currentTime - poolCreationTime <= twentyFourHoursInMs &&
    (pool?.totalValue ?? 0) >= LIQUIDITY_THRESHOLD
  );
};

const getVolumeIncrease = (pool: Pool) => {
  // const weeklyVolume = pool.weeklyVolume;
  // const today = weeklyVolume ? weeklyVolume[weeklyVolume.length - 1] ?? 0 : 0;
  // const yesterday = weeklyVolume
  //   ? weeklyVolume[weeklyVolume.length - 2] ?? 0
  //   : 0;
  // if (yesterday !== 0) {
  //   const percentageDifference = ((today - yesterday) / yesterday) * 100;
  // if (percentageDifference > PERCENTAGE_INCREASE_THRESHOLD) {
  //   return true;
  // }
  // }
  const todayData: PoolDayData | undefined = pool.historicalData
    ? pool.historicalData[0]
    : undefined;
  const yesterdayData: PoolDayData | undefined = pool.historicalData
    ? pool.historicalData[1]
    : undefined;
  const dayStartTimeStamp = getLatestDay();
  const yesterdayStartTimeStamp = getDayStartTimestampDaysAgo(1);
  if (
    todayData &&
    todayData.date === dayStartTimeStamp &&
    yesterdayData &&
    yesterdayData.date === yesterdayStartTimeStamp
  ) {
    const percentageDifference =
      ((Number(todayData.volumeUsd) - Number(yesterdayData.volumeUsd)) /
        Number(yesterdayData.volumeUsd)) *
      100;
    if (percentageDifference > PERCENTAGE_INCREASE_THRESHOLD) {
      return true;
    }
  }

  return false;
};
// a hot pool is a pool with atleast xxx liquidity and xxx % increase in volume in the past 24 hours
const isHotPool = (pool: Pool) => {
  return (
    (pool?.totalValue ?? 0) >= LIQUIDITY_THRESHOLD && getVolumeIncrease(pool)
  );
};

// a pool with bgt rewards is a pool with a bgt reward contract
const hasBgtRewards = (pool: Pool) => {
  return pool.bgtPerYear !== 0 && pool.bgtPerYear !== undefined;
};

export const tagPools = (pools: Pool[]) => {
  pools.forEach((pool) => {
    if (isNewPool(pool)) {
      pool.tags = [...(pool.tags ?? []), PoolTag.NEW];
    }
    if (isHotPool(pool)) {
      pool.tags = [...(pool.tags ?? []), PoolTag.HOT];
    }
    if (hasBgtRewards(pool)) {
      pool.tags = [...(pool.tags ?? []), PoolTag.BGT_REWARDS];
    }
  });
};

export const getWBeraPriceForToken = (
  prices: MappedTokens,
  token: Address,
  amount: number,
) => {
  if (!prices) return 0;
  if (!token) return 0;
  if (!prices[token]) return 0;
  const priceInBera = Number(prices[token]);
  return priceInBera * amount;
};
