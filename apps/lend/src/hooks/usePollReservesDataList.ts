import { formatReserves } from "@aave/math-utils";
import {
  lendPoolAddressProviderAddress,
  lendUIDataProviderAddress,
} from "@bera/config";
import useSWR, { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient } from "wagmi";

import { getReservesHumanized } from "~/utils/aave-reserve-helper";
import { lendUIDataProviderABI } from "./abi";

export const usePollReservesDataList = () => {
  const publicClient = usePublicClient();
  const { mutate } = useSWRConfig();

  const QUERY_KEY = ["getReservesDataList"];
  useSWR(QUERY_KEY, async () => {
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
      // console.log(reservesData, baseCurrencyData);
      await mutate([...QUERY_KEY, "baseCurrencyData"], baseCurrencyData);
      const formattedReserves = formatReserves({
        reserves: reservesData,
        currentTimestamp,
        marketReferenceCurrencyDecimals:
          baseCurrencyData.marketReferenceCurrencyDecimals,
        marketReferencePriceInUsd:
          baseCurrencyData.marketReferenceCurrencyPriceInUsd,
      });
      // console.log("formattedReserves", formattedReserves);
      const reservesDictionary = {};
      formattedReserves.map(async (formattedReserve) => {
        await mutate(
          [...QUERY_KEY, formattedReserve.underlyingAsset],
          formattedReserve,
        );

        //@ts-ignore
        reservesDictionary[formattedReserve.underlyingAsset] = formattedReserve;
      });

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

  return {
    mutate,
    useReservesDataList,
    useSelectedReserveData,
    useBaseCurrencyData,
  };
};
