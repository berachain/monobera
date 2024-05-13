import { useBeraJs } from "@bera/berajs";
import { perpsEndpoint } from "@bera/config";
import useSWR, { mutate } from "swr";

import { POLLING } from "~/utils/constants";
import type { IMarket } from "~/types/market";
import type { IMarketOrder } from "~/types/order-history";
import { TableStateProps } from "~/types/table";

export const usePollMarketOrders = (props: TableStateProps) => {
  const { account } = useBeraJs();
  const queryString =
    Object.entries(props ?? {})
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join("&") ?? "";
  const QUERY_KEY = ["tradingHistory", account, queryString];
  const { isLoading, data, isValidating } = useSWR(
    QUERY_KEY,
    async () => {
      if (account && queryString) {
        const res = await fetch(
          `${perpsEndpoint}/v2/trading-history/traders/${account}${
            queryString ? `?${queryString}` : ""
          }`,
        );
        const data = await res.json();
        return data ?? {};
      }
      return {};
    },
    {
      refreshInterval: POLLING.NORMAL,
    },
  );

  const useMarketOrders = (markets: IMarket[]): IMarketOrder[] => {
    return data?.result?.map((position: IMarketOrder) => {
      return {
        ...position,
        market: markets.find(
          (market) => market.pair_index === position.pair_index,
        ),
      };
    });
  };

  return {
    isLoading,
    isValidating,
    marketOrdersPagination: data?.pagination ?? {},
    refetch: () => void mutate(QUERY_KEY),
    useMarketOrders,
  };
};
