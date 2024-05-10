import { useBeraJs } from "@bera/berajs";
import { perpsEndpoint } from "@bera/config";
import type { OpenLimitOrder } from "@bera/proto/src";
import useSWR, { mutate } from "swr";

import { POLLING } from "~/utils/constants";
import type { IMarket } from "~/types/market";
import type { ILimitOrder } from "~/types/order-history";
import type { TableStateProps } from "~/types/table";

export const usePollOpenLimitOrders = (props: TableStateProps) => {
  const { account } = useBeraJs();
  const queryString =
    Object.entries(props ?? {})
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join("&") ?? "";
  const QUERY_KEY = ["openLimitOrders", account, queryString];
  const { data, isLoading, isValidating } = useSWR(
    QUERY_KEY,
    async () => {
      if (account && queryString) {
        const res = await fetch(
          `${perpsEndpoint}/openlimitorders/${account}${
            queryString ? `?${queryString}` : ""
          }`,
        );
        const data = await res.json();
        return data ?? {};
      }
    },
    {
      refreshInterval: POLLING.NORMAL,
    },
  );

  const useMarketOpenLimitOrders = (markets: IMarket[]): ILimitOrder[] => {
    return data?.result?.map((limitOrder: OpenLimitOrder) => {
      return {
        ...limitOrder,
        market: markets.find(
          (market) => market.pair_index === limitOrder.pair_index,
        ),
      };
    });
  };

  return {
    isLoading,
    isValidating,
    refresh: () => void mutate(QUERY_KEY),
    data,
    openLimitOrdersPagination: data?.pagination ?? {},
    useMarketOpenLimitOrders,
  };
};
