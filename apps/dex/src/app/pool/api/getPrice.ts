import { type RouterService } from "@bera/bera-router";
import { type Pool } from "@bera/bera-router/dist/services/PoolService/types";
import { type CuttingBoard } from "@bera/berajs";
import { formatUnits, getAddress, parseUnits } from "viem";
import { type Address } from "wagmi";

import { type MappedTokens } from "../[address]/types";

async function parseResponse(response: any) {
  const json = await response.json();
  return json;
}

interface Coin {
  denom: string;
  amount: string;
}

interface CoinsData {
  coins: Coin[];
}

const getVolume = (
  prices: MappedTokens,
  volumeData: CoinsData[],
  pool: Pool,
) => {
  if (!volumeData) return { volumeArray: [], volumeTotal: 0 };
  const volumeArray: number[] = [];
  let volumeTotal = 0;
  volumeData?.forEach((data) => {
    if (!data.coins) return;
    const total = data.coins?.reduce((acc, cur) => {
      const token = pool.tokens.find(
        (token) => token.address.toLowerCase() === cur.denom.toLowerCase(),
      );
      const tokenValue = prices[getAddress(cur.denom)] ?? 0;
      const tokenBalance = formatUnits(
        BigInt(cur.amount),
        token?.decimals ?? 18,
      );

      if (!tokenValue) {
        return 0;
      }
      const totalTokenValue = tokenValue * Number(tokenBalance);
      return acc + totalTokenValue;
    }, 0);
    volumeArray.push(total);
    volumeTotal += total;
  });

  return { volumeArray, volumeTotal };
};

const formatVolume = (volume: number[], desiredLength: number) => {
  while (volume.length < desiredLength) {
    volume.unshift(0);
  }
  return volume;
};
const BASE_TOKEN = process.env.NEXT_PUBLIC_HONEY_ADDRESS as Address;

export const getWBeraPriceDictForPoolTokens = async (
  pools: Pool[],
  globalCuttingBoard: CuttingBoard[] | undefined,
  router: RouterService,
) => {
  let mappedTokens: MappedTokens = {};

  if (pools.length) {
    const allPoolPromises: any[] = [];
    pools.forEach((pool) => {
      const tokenPromises = pool.tokens
        .filter((token) => token.address !== BASE_TOKEN)
        .map((token) =>
          router
            .getSwaps(
              token.address,
              BASE_TOKEN,
              0,
              parseUnits(`${1}`, token.decimals),
            )
            .catch(() => {
              return undefined;
            }),
        );

      allPoolPromises.push(tokenPromises);
    });

    const allPoolData = (await Promise.all(allPoolPromises.flat())).filter(
      (pool) => pool !== undefined,
    );

    mappedTokens =
      allPoolData?.length &&
      allPoolData?.reduce(
        (acc, cur) => {
          acc[getAddress(cur.tokenIn)] = cur.formattedReturnAmount;
          return acc;
        },
        { [getAddress(BASE_TOKEN)]: "1" },
      );

    const allPoolVolumePromises: any[] = [];
    pools.forEach((pool) => {
      const dailyVolumeResponse = fetch(
        `${
          process.env.NEXT_PUBLIC_INDEXER_ENDPOINT
        }/events/dex/historical_volumes?pool=${getAddress(
          pool.pool,
        )}&num_of_days=1`,
        { cache: "no-store" },
      );

      const weeklyVolumeResponse = fetch(
        `${
          process.env.NEXT_PUBLIC_INDEXER_ENDPOINT
        }/events/dex/historical_volumes?pool=${getAddress(
          pool.pool,
        )}&num_of_days=7`,
        { cache: "no-store" },
      );

      const monthlyVolumeResponse = fetch(
        `${
          process.env.NEXT_PUBLIC_INDEXER_ENDPOINT
        }/events/dex/historical_volumes?pool=${getAddress(
          pool.pool,
        )}&num_of_days=30`,
        { cache: "no-store" },
      );

      const quarterlyVolumeResponse = fetch(
        `${
          process.env.NEXT_PUBLIC_INDEXER_ENDPOINT
        }/events/dex/historical_volumes?pool=${getAddress(
          pool.pool,
        )}&num_of_days=90`,
        { cache: "no-store" },
      );

      const volumePromises = Promise.all([
        dailyVolumeResponse,
        weeklyVolumeResponse,
        monthlyVolumeResponse,
        quarterlyVolumeResponse,
      ]);
      allPoolVolumePromises.push(volumePromises);
    });

    const allPoolVolumeData = await Promise.all(allPoolVolumePromises.flat());

    const responses = await Promise.all(
      allPoolVolumeData
        .map(async (response) => {
          return await Promise.all(
            response.map(
              async (res: any) =>
                await parseResponse(res).then((res) => res.result),
            ),
          );
        })
        .flat(),
    );

    if (pools)
      pools.map((pool, i) => {
        const volumes = responses[i] ?? [];

        const { volumeArray: dailyVolumeArray, volumeTotal: dailyVolumeTotal } =
          getVolume(mappedTokens, volumes[0], pool);
        const {
          volumeArray: weeklyVolumeArray,
          volumeTotal: weeklyVolumeTotal,
        } = getVolume(mappedTokens, volumes[1], pool);
        const {
          volumeArray: monthlyVolumeArray,
          volumeTotal: monthlyVolumeTotal,
        } = getVolume(mappedTokens, volumes[2], pool);
        const {
          volumeArray: quarterlyVolumeArray,
          volumeTotal: quarterlyVolumeTotal,
        } = getVolume(mappedTokens, volumes[3], pool);

        const swapFee = Number(formatUnits(BigInt(pool.swapFee) ?? "", 18));
        pool.formattedSwapFee = (swapFee * 100).toString();

        if (dailyVolumeArray.length) {
          pool.dailyVolume = dailyVolumeTotal;
          pool.dailyFees = (pool?.dailyVolume ?? 0) * swapFee;
        }
        if (weeklyVolumeArray.length) {
          pool.weeklyVolume = formatVolume(weeklyVolumeArray.reverse(), 7);
          pool.weeklyFees = pool.weeklyVolume.map((volume) => volume * swapFee);
          pool.weeklyFeesTotal = weeklyVolumeTotal * swapFee;
          pool.weeklyVolumeTotal = weeklyVolumeTotal;
        }
        if (monthlyVolumeArray.length) {
          pool.monthlyVolume = formatVolume(monthlyVolumeArray.reverse(), 30);
          pool.monthlyFees = pool.monthlyVolume.map(
            (volume) => volume * swapFee,
          );
          pool.monthlyFeesTotal = monthlyVolumeTotal * swapFee;
          pool.monthlyVolumeTotal = monthlyVolumeTotal;
        }
        if (quarterlyVolumeArray.length) {
          pool.quarterlyVolume = formatVolume(
            quarterlyVolumeArray.reverse(),
            90,
          );
          pool.quarterlyFees = pool.quarterlyVolume.map(
            (volume) => volume * swapFee,
          );
          pool.quarterlyFeesTotal = quarterlyVolumeTotal * swapFee;
          pool.monthlyVolumeTotal = quarterlyVolumeTotal;
        }
        pool.totalValue = pool.tokens.reduce((acc, cur) => {
          const tokenValue = mappedTokens[cur.address];
          const tokenBalance = cur.balance;
          if (!tokenValue) {
            return acc;
          }
          const totalTokenValue = tokenValue * Number(tokenBalance);
          return acc + totalTokenValue;
        }, 0);

        const cuttingBoard = globalCuttingBoard?.find(
          (board) => board.address.toLowerCase() === pool.pool.toLowerCase(),
        );
        const bgtPrice =
          mappedTokens[process.env.NEXT_PUBLIC_WBERA_ADDRESS as string];

        let poolApy = 0;
        if (cuttingBoard && bgtPrice) {
          const totalCuttingBoardValue =
            Number(cuttingBoard.amount) * Number(bgtPrice);
          poolApy = (totalCuttingBoardValue / pool.totalValue) * 100;
          pool.bgtPerYear = Number(cuttingBoard.amount);
        }
        const fees =
          (Number(pool?.formattedSwapFee) / 100) * Number(pool?.dailyVolume);
        const swapApr = (fees / Number(pool?.totalValue)) * 365 * 100;
        pool.fees = fees;
        pool.feeApy = Number.isNaN(swapApr) ? 0 : swapApr;
        pool.bgtApy = Number.isNaN(poolApy) ? 0 : poolApy;
        pool.totalApy = pool.bgtApy + pool.feeApy;
      });
    tagPools(pools);
  }

  return mappedTokens;
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
  const blockTime = Number(pool.metadata.blockTime);

  const poolCreationTime = new Date(blockTime).getTime();

  return (
    currentTime - poolCreationTime <= twentyFourHoursInMs &&
    (pool?.totalValue ?? 0) >= LIQUIDITY_THRESHOLD
  );
};

const getVolumeIncrease = (pool: Pool) => {
  const weeklyVolume = pool.weeklyVolume;
  const today = weeklyVolume ? weeklyVolume[weeklyVolume.length - 1] ?? 0 : 0;
  const yesterday = weeklyVolume
    ? weeklyVolume[weeklyVolume.length - 2] ?? 0
    : 0;
  if (yesterday !== 0) {
    const percentageDifference = ((today - yesterday) / yesterday) * 100;
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
