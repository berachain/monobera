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

const getVolume = (
  prices: MappedTokens,
  volumeData: CoinsData[],
  pool: Pool,
) => {
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
const BERA = "0x9AaDD801144A825B1Dc45fb110DeB96F3E6CdAfd";

export const getWBeraPriceDictForPoolTokens = async (
  pools: Pool[],
  router: RouterService,
) => {
  let mappedTokens: MappedTokens = {};
  if (pools.length) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
              return {
                tokenIn: token.address,
              };
            }),
        );

      allPoolPromises.push(tokenPromises);
    });

    const allPoolData = await Promise.all(allPoolPromises.flat());

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
      const dailyVolumeResponse = fetch(
        `http://k8s-devnet-apinlb-25cc83ec5c-24b3d2c710b46250.elb.us-east-2.amazonaws.com/events/dex/historical_volumes?pool=${pool.pool}&num_of_days=1`,
        { cache: "no-store" },
      );

      const weeklyVolumeResponse = fetch(
        `http://k8s-devnet-apinlb-25cc83ec5c-24b3d2c710b46250.elb.us-east-2.amazonaws.com/events/dex/historical_volumes?pool=${pool.pool}&num_of_days=7`,
        { cache: "no-store" },
      );

      const monthlyVolumeResponse = fetch(
        `http://k8s-devnet-apinlb-25cc83ec5c-24b3d2c710b46250.elb.us-east-2.amazonaws.com/events/dex/historical_volumes?pool=${pool.pool}&num_of_days=30`,
        { cache: "no-store" },
      );

      const quarterlyVolumeResponse = fetch(
        `http://k8s-devnet-apinlb-25cc83ec5c-24b3d2c710b46250.elb.us-east-2.amazonaws.com/events/dex/historical_volumes?pool=${pool.pool}&num_of_days=90`,
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
        pool.weeklyVolume = formatVolume(weeklyVolumeArray, 7);
        pool.weeklyFees = pool.weeklyVolume.map((volume) => volume * swapFee);
        pool.weeklyFeesTotal = weeklyVolumeTotal * swapFee;
        pool.weeklyVolumeTotal = weeklyVolumeTotal;
      }
      if (monthlyVolumeArray.length) {
        pool.monthlyVolume = formatVolume(monthlyVolumeArray, 30);
        pool.monthlyFees = pool.monthlyVolume.map((volume) => volume * swapFee);
        pool.monthlyFeesTotal = monthlyVolumeTotal * swapFee;
        pool.monthlyVolumeTotal = monthlyVolumeTotal;
      }
      if (quarterlyVolumeArray.length) {
        pool.quarterlyVolume = formatVolume(quarterlyVolumeArray, 90);
        pool.quarterlyFees = pool.quarterlyVolume.map(
          (volume) => volume * swapFee,
        );
        pool.quarterlyFeesTotal = quarterlyVolumeTotal * swapFee;
        pool.monthlyVolumeTotal = quarterlyVolumeTotal;
      }
      pool.totalValue = pool.tokens.reduce((acc, cur) => {
        const tokenValue = mappedTokens[cur.address];
        const tokenBalance = formatUnits(cur.balance, cur.decimals);
        if (!tokenValue) {
          return acc;
        }
        const totalTokenValue = tokenValue * Number(tokenBalance);
        return acc + totalTokenValue;
      }, 0);
    });
  }
  return mappedTokens;
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
