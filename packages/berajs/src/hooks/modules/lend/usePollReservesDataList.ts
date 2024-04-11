import { formatReserves } from "@aave/math-utils";
import {
  lendPoolAddressProviderAddress,
  lendUIDataProviderAddress,
} from "@bera/config";
import useSWR, { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";
import { type Address } from "viem";
import { usePublicClient } from "wagmi";

import { lendUIDataProviderABI } from "../../../config/abi";
import { getReservesHumanized } from "../../../utils";

export const usePollReservesDataList = () => {
  const publicClient = usePublicClient();
  const { mutate } = useSWRConfig();

  const QUERY_KEY = ["getReservesDataList"];
  const { isLoading, isValidating } = useSWR(QUERY_KEY, async () => {
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
      return formattedReserves;
    } catch (e) {
      console.log(e);
      return [];
    }
  });

  const useReservesDataList = (): any[] => {
    const { data = [] } = useSWRImmutable(QUERY_KEY);
    return data;
  };

  const useSelectedReserveData = (address: Address): any => {
    const { data: reserves = [] } = useSWRImmutable(QUERY_KEY);
    return reserves.find(
      (reserve: any) =>
        reserve?.underlyingAsset === address ||
        reserve?.aTokenAddress === address ||
        reserve?.variableDebtTokenAddress === address,
    );
  };

  const useBaseCurrencyData = (): any => {
    const { data: baseCurrency = undefined } = useSWRImmutable([
      ...QUERY_KEY,
      "baseCurrencyData",
    ]);
    return baseCurrency;
  };

  const useTotalBorrowed = (): number => {
    const { data: reserves = [] } = useSWRImmutable(QUERY_KEY);
    let totalBorrowed = 0;
    reserves.forEach(
      (reserve: any) => (totalBorrowed += Number(reserve.totalDebt)),
    );
    return totalBorrowed;
  };

  const useTotalMarketSize = (): number => {
    const { data: reserves = [] } = useSWRImmutable(QUERY_KEY);
    let marketSize = 0;
    reserves.forEach(
      (reserve: any) => (marketSize += Number(reserve.totalLiquidity)),
    );
    return marketSize;
  };

  return {
    isLoading,
    isValidating,
    refetch: () => void mutate(QUERY_KEY),
    useReservesDataList,
    useSelectedReserveData,
    useBaseCurrencyData,
    useTotalBorrowed,
    useTotalMarketSize,
  };
};
