import { formatReserves } from "@aave/math-utils";
import {
  lendPoolAddressProviderAddress,
  lendUIDataProviderAddress,
} from "@bera/config";
import useSWR, { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient } from "wagmi";

import { lendUIDataProviderABI } from "../../../config/abi";
import { getReservesHumanized } from "../../../utils";

export const usePollReservesDataList = () => {
  const publicClient = usePublicClient();
  const { mutate } = useSWRConfig();

  const QUERY_KEY = ["getReservesDataList"];
  const swrResponse = useSWR(QUERY_KEY, async () => {
    if (!publicClient) return undefined;
    try {
      const result = (await publicClient.readContract({
        address: lendUIDataProviderAddress,
        abi: lendUIDataProviderABI,
        functionName: "getReservesData",
        args: [lendPoolAddressProviderAddress],
      })) as [any[], any];
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const { reservesData, baseCurrencyData } = getReservesHumanized(
        result[0],
        result[1],
      );
      await mutate([...QUERY_KEY, "baseCurrencyData"], baseCurrencyData);
      const formattedReserves = formatReserves({
        reserves: reservesData,
        currentTimestamp,
        marketReferenceCurrencyDecimals:
          baseCurrencyData.marketReferenceCurrencyDecimals,
        marketReferencePriceInUsd:
          baseCurrencyData.marketReferenceCurrencyPriceInUsd,
      });
      const reservesDictionary = {};
      await Promise.all(
        formattedReserves.map(async (formattedReserve) => {
          await mutate(
            [...QUERY_KEY, formattedReserve.underlyingAsset],
            formattedReserve,
          );

          //@ts-ignore
          reservesDictionary[formattedReserve.underlyingAsset] =
            formattedReserve;
        }),
      );

      return reservesDictionary;
    } catch (e) {
      console.log(e);
      return {};
    }
  });

  const useReservesDataList = () => {
    return useSWRImmutable(QUERY_KEY);
  };

  const useSelectedReserveData = (address: string) => {
    return useSWRImmutable([...QUERY_KEY, address]);
  };

  const useBaseCurrencyData = () => {
    return useSWRImmutable([...QUERY_KEY, "baseCurrencyData"]);
  };

  const useTotalBorrowed = () => {
    const { data } = useReservesDataList();
    let totalBorrowed = 0;
    Object.keys(data ?? {}).forEach(
      (key) => (totalBorrowed += Number(data[key].totalDebt)),
    );
    return totalBorrowed;
  };

  const useTotalMarketSize = () => {
    const { data } = useReservesDataList();
    let marketSize = 0;
    Object.keys(data ?? {}).forEach(
      (key) => (marketSize += Number(data[key].totalLiquidity)),
    );
    return marketSize;
  };

  return {
    ...swrResponse,
    refetch: () => void mutate(QUERY_KEY),
    useReservesDataList,
    useSelectedReserveData,
    useBaseCurrencyData,
    useTotalBorrowed,
    useTotalMarketSize,
  };
};
