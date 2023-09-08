import { useBeraJs } from "@bera/berajs";
import useSWR from "swr";
import { formatUnits, getAddress } from "viem";

import { type MappedTokens } from "~/app/api/getPrice";
import { indexerUrl } from "~/config";
import { usePollPrices } from "./usePollPrices";

export interface Coin {
  amount: string;
  denom: string;
}

export interface TvlData {
  data: any;
  UTCTime: string;
  coins: Coin[];
}

export const getTvlPrices = (
  tvlData: (TvlData | undefined)[],
  prices: MappedTokens | undefined,
) => {
  if (!prices) return new Array(tvlData.length).fill(0);
  const resultArray: number[] = [];
  tvlData?.forEach((tvl) => {
    if (tvl === undefined) {
      resultArray.push(0);
      return;
    } else {
      const total = tvl.data.reduce(
        (
          acc: number,
          cur: { denom: string; amount: string | number | bigint | boolean },
        ) => {
          const price = prices[getAddress(cur.denom)] ?? 0;
          const value = Number(formatUnits(BigInt(cur.amount), 18)) * price;
          return acc + value;
        },
        0,
      );
      resultArray.push(total);
    }
  });
  return resultArray;
};

export const getPoolTvl = async (address: string) => {
  try {
    // const res = await fetch(`${indexerUrl}/bgt/rewards/delegator/${address}`);

    // TODO: narrow window to past day reee
    const now = Math.floor(Date.now() / 1000);
    const yesterday = now - 12000000;
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_ANALYTICS
      }/analytics/tvldaily?from_time=${yesterday}&to_time=${now}&pool=${getAddress(
        address,
      )}`,
    );
    const jsonRes = await res.json();
    return jsonRes.result[jsonRes.result.length - 1] ?? undefined;
  } catch (e) {
    console.log(e);
  }
};

export interface GaugeWeight {
  label: string;
  address: string;
  amount: number;
  percentage: number;
  tvl: number;
}
export const useUserGaugeWeight = () => {
  const { account } = useBeraJs();
  const { usePrices } = usePollPrices();
  const prices = usePrices();
  const QUERY_KEY = ["user-gauge-weight", account, prices];
  return useSWR(
    QUERY_KEY,
    async () => {
      try {
        if (!prices) return undefined;
        const response = await fetch(
          `${indexerUrl}/bgt/rewards/delegator/${account}`,
        );
        const result = await response.json().then((res) => res.result);
        const promiseArray = result.map((w: any) => getPoolTvl(w.address));
        const cbTvlData = await Promise.all(promiseArray);
        const tvl = getTvlPrices(cbTvlData, prices);
        const gaugeWeightArray: GaugeWeight[] = result.map(
          (w: any, i: number) => {
            return {
              label: w.address,
              address: w.address,
              amount: Number(w.amount),
              percentage: Number(w.percentage),
              tvl: tvl[i],
            };
          },
        );
        return gaugeWeightArray;
      } catch (e) {
        console.log(e);
        return undefined;
      }
    },
    {
      refreshInterval: 5 * 60 * 1000, // 5 mins
    },
  );
};

export const useValidatorGaugeWeight = (address: string) => {
  const { usePrices } = usePollPrices();
  const prices = usePrices();
  const QUERY_KEY = ["user-gauge-weight", address, prices];
  return useSWR(
    QUERY_KEY,
    async () => {
      try {
        if (!prices) return undefined;
        const response = await fetch(
          `${indexerUrl}/cuttingboards/active?validators=${address}`,
        );
        const result = await response.json().then((res) => res.result);
        const promiseArray = result[0].weights.map((w: any) =>
          getPoolTvl(w.address),
        );
        const cbTvlData = await Promise.all(promiseArray);
        const tvl = getTvlPrices(cbTvlData, prices);
        const gaugeWeightArray: GaugeWeight[] = result[0].weights.map(
          (w: any, i: number) => {
            return {
              label: w.address,
              address: w.address,
              amount: Number(w.amount),
              percentage: Number(w.percentage),
              tvl: tvl[i],
            };
          },
        );
        return gaugeWeightArray;
      } catch (e) {
        console.log(e);
        return undefined;
      }
    },
    {
      refreshInterval: 5 * 60 * 1000, // 5 mins
    },
  );
};

export const useGlobalValidatorGaugeWeight = () => {
  const { usePrices } = usePollPrices();
  const prices = usePrices();
  const QUERY_KEY = ["global-gauge-weight", prices];
  return useSWR(
    QUERY_KEY,
    async () => {
      try {
        if (!prices) return undefined;
        const response = await fetch(`${indexerUrl}/bgt/rewards`);

        const result = await response.json().then((res) => res.result);
        const promiseArray = result.map((w: any) => getPoolTvl(w.address));
        const cbTvlData = await Promise.all(promiseArray);
        const tvl = getTvlPrices(cbTvlData, prices);
        const gaugeWeightArray: GaugeWeight[] = result.map(
          (w: any, i: number) => {
            return {
              label: w.address,
              address: w.address,
              amount: Number(w.amount),
              percentage: Number(w.percentage),
              tvl: tvl[i],
            };
          },
        );
        return gaugeWeightArray;
      } catch (e) {
        console.log(e);
        return undefined;
      }
    },
    {
      refreshInterval: 5 * 60 * 1000, // 5 mins
    },
  );
};
