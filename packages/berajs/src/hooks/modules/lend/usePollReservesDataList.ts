import useSWR, { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";
import { type Address } from "viem";
import { usePublicClient } from "wagmi";

import { BaseCurrencyData, ReserveData, getReserveData } from "~/actions/lend";
import { DefaultHookTypes } from "~/types";

export const usePollReservesDataList = ({ config, opts }: DefaultHookTypes) => {
  const publicClient = usePublicClient();
  const { mutate } = useSWRConfig();

  const QUERY_KEY = ["getReservesDataList"];
  const { isLoading, isValidating } = useSWR(
    QUERY_KEY,
    async () => {
      if (!publicClient) return undefined;
      if (!config.contracts?.lendUIDataProviderAddress) return undefined;
      if (!config.contracts?.lendAddressProviderAddress) return undefined;
      const result = await getReserveData({
        config,
        client: publicClient,
      });
      if (result) {
        await mutate(
          [...QUERY_KEY, "baseCurrencyData"],
          result.baseCurrencyData,
        );
        return result.formattedReserves;
      }
      await mutate([...QUERY_KEY, "baseCurrencyData"], undefined);
      return [];
    },
    {
      ...opts,
    },
  );

  const useReservesDataList = (): ReserveData[] => {
    const { data = [] } = useSWRImmutable(QUERY_KEY);
    return data;
  };

  const useSelectedReserveData = (
    address: Address,
  ): ReserveData | undefined => {
    const { data: reserves = [] } = useSWRImmutable<ReserveData[]>(QUERY_KEY);
    return reserves.find(
      (reserve: ReserveData) =>
        reserve.underlyingAsset === address ||
        reserve.aTokenAddress === address ||
        reserve.variableDebtTokenAddress === address,
    );
  };

  const useBaseCurrencyData = (): BaseCurrencyData | undefined => {
    const { data: baseCurrency = undefined } =
      useSWRImmutable<BaseCurrencyData>([...QUERY_KEY, "baseCurrencyData"]);
    return baseCurrency;
  };

  const useTotalBorrowed = (): number => {
    const { data: reserves = [] } = useSWRImmutable<ReserveData[]>(QUERY_KEY);
    let totalBorrowed = 0;
    reserves.forEach(
      (reserve: ReserveData) => (totalBorrowed += Number(reserve.totalDebt)),
    );
    return totalBorrowed;
  };

  const useTotalMarketSize = (): number => {
    const { data: reserves = [] } = useSWRImmutable<ReserveData[]>(QUERY_KEY);
    let marketSize = 0;
    reserves.forEach(
      (reserve: ReserveData) => (marketSize += Number(reserve.totalLiquidity)),
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
