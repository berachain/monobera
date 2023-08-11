// TODO fix any

import { type RouterService } from "@bera/bera-router";
import { type Pool } from "@bera/bera-router/dist/services/PoolService/types";
import { formatUnits, parseUnits } from "viem";
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

const getAPIendPointForDays = (pool: Pool, days: number) => {
  return `http://${process.env.NEXT_PUBLIC_INDEXER_ENDPOINT}/events/dex/historical_volumes?pool=${pool.pool}&num_of_days=${days}`;
};

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
      const token = pool.tokens.find((token) => token.address === cur.denom);
      const tokenValue = prices[cur.denom];
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
const BERA = process.env.NEXT_PUBLIC_WBERA_ADDRESS as Address;

export const getWBeraPriceDictForPoolTokens = async (
  pools: Pool[],
  router: RouterService,
) => {
  let mappedTokens: MappedTokens = {};

  if (pools.length) {
    const allPoolPromises: any[] = [];
    pools.forEach((pool) => {
      const tokenPromises = pool.tokens
        .filter((token) => token.address !== BERA)
        .map((token) =>
          router
            .getSwaps(
              token.address,
              BERA,
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
          acc[cur.tokenIn] = cur.formattedReturnAmount;
          return acc;
        },
        { [BERA]: "1" },
      );

    const allPoolVolumePromises: any[] = [];
    pools.forEach((pool) => {
      const volumePromises = Promise.all([
        fetch(getAPIendPointForDays(pool, 1)),
        fetch(getAPIendPointForDays(pool, 7)),
        fetch(getAPIendPointForDays(pool, 30)),
        fetch(getAPIendPointForDays(pool, 90)),
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

    pools.map((pool, i) => {
      const volumes = responses[i] ?? [];

      const { volumeArray: dailyVolumeArray, volumeTotal: dailyVolumeTotal } =
        getVolume(mappedTokens, volumes[0], pool);
      const { volumeArray: weeklyVolumeArray, volumeTotal: weeklyVolumeTotal } =
        getVolume(mappedTokens, volumes[1], pool);
      const {
        volumeArray: monthlyVolumeArray,
        volumeTotal: monthlyVolumeTotal,
      } = getVolume(mappedTokens, volumes[2], pool);
      const {
        volumeArray: quarterlyVolumeArray,
        volumeTotal: quarterlyVolumeTotal,
      } = getVolume(mappedTokens, volumes[1], pool);

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
        pool.monthlyFees = pool.monthlyVolume.map((volume) => volume * swapFee);
        pool.monthlyFeesTotal = monthlyVolumeTotal * swapFee;
        pool.monthlyVolumeTotal = monthlyVolumeTotal;
      }
      if (quarterlyVolumeArray.length) {
        pool.quarterlyVolume = formatVolume(quarterlyVolumeArray.reverse(), 90);
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

const LIQUIDITY_THRESHOLD = 50000;

// a new pool is a pool created in the past 24 hours with atleast 50k usd in liquidity.
const isNewPool = (pool: Pool) => {
  const currentTime = Date.now();

  const twentyFourHoursInMs = 24 * 60 * 60 * 1000;
  const poolCreationTime = Date.parse(pool.metadata.blockTime);

  return (
    currentTime - poolCreationTime <= twentyFourHoursInMs &&
    (pool?.totalValue ?? 0) >= LIQUIDITY_THRESHOLD
  );
};

// a hot pool is a pool with atleast xxx liquidity and xxx % increase in volume in the past 24 hours
const isHotPool = (_pool: Pool) => {
  return true;
};

// a pool with bgt rewards is a pool with a bgt reward contract
const hasBgtRewards = (_pool: Pool) => {
  // get the global BGT cutting board
  // use pool address to get BGT rewards / yr
  return true;
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
