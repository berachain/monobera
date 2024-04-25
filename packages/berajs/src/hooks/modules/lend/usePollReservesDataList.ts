import useSWR from "swr";
import { type Address } from "viem";
import { usePublicClient } from "wagmi";

import { BaseCurrencyData, ReserveData, getReserveData } from "~/actions/lend";
import { useBeraJs } from "~/contexts";
import POLLING from "~/enum/polling";
import { DefaultHookOptions, DefaultHookReturnType } from "~/types";

export interface UsePollReservesDataListResponse
  extends DefaultHookReturnType<
    | {
        formattedReserves: ReserveData[];
        baseCurrencyData: BaseCurrencyData;
      }
    | undefined
  > {
  useSelectedReserveData: (address: Address) => ReserveData | undefined;
  formattedReserves: ReserveData[];
  baseCurrencyData: BaseCurrencyData | undefined;
  totalBorrowed: number;
  marketSize: number;
}

export const usePollReservesDataList = (
  options?: DefaultHookOptions,
): UsePollReservesDataListResponse => {
  const publicClient = usePublicClient();
  const { config: beraConfig } = useBeraJs();
  const config = options?.beraConfigOverride ?? beraConfig;
  const QUERY_KEY = ["getReservesDataList"];
  const swrResponse = useSWR(
    QUERY_KEY,
    async () => {
      if (!publicClient) throw new Error("publicClient is not defined");
      if (!config?.contracts?.lendUIDataProviderAddress)
        throw new Error("missing contract address lendUIDataProviderAddress");
      if (!config?.contracts?.lendAddressProviderAddress)
        throw new Error("missing contract address lendAddressProviderAddress");
      return await getReserveData({
        config,
        client: publicClient,
      });
    },
    {
      ...options?.opts,
      refreshInterval: options?.opts?.refreshInterval ?? POLLING.NORMAL,
    },
  );

  const useSelectedReserveData = (
    address: Address,
  ): ReserveData | undefined => {
    const reserves = swrResponse.data?.formattedReserves ?? [];
    return reserves.find(
      (reserve: ReserveData) =>
        reserve.underlyingAsset === address ||
        reserve.aTokenAddress === address ||
        reserve.variableDebtTokenAddress === address,
    );
  };

  const formattedReserves = swrResponse.data?.formattedReserves ?? [];
  const baseCurrencyData = swrResponse.data?.baseCurrencyData;

  let totalBorrowed = 0;
  let marketSize = 0;
  formattedReserves.forEach((reserve: ReserveData) => {
    totalBorrowed += Number(reserve.totalDebt);
    marketSize += Number(reserve.totalLiquidity);
  });

  return {
    ...swrResponse,
    refresh: () => swrResponse.mutate(),
    useSelectedReserveData,
    formattedReserves,
    baseCurrencyData,
    totalBorrowed,
    marketSize,
  };
};
