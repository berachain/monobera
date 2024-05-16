import { useBeraJs } from "@bera/berajs";
import { perpsEndpoint } from "@bera/config";
import { type ClosedTrade } from "@bera/proto/src";
import useSWR from "swr";

import { POLLING } from "~/utils/constants";
import type { IMarket } from "~/types/market";
import type { IClosedTrade } from "~/types/order-history";
import { TableStateProps } from "~/types/table";

export const usePollClosedTrades = (props: TableStateProps) => {
  const { account } = useBeraJs();
  const queryString =
    Object.entries(props ?? {})
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join("&") ?? "";
  const QUERY_KEY = ["closedTrades", account, queryString];
  const { isLoading, data, isValidating, mutate } = useSWR(
    QUERY_KEY,
    async () => {
      if (account && queryString) {
        const res = await fetch(`${perpsEndpoint}/closedtrades/${account}`);
        const data = await res.json();
        return data ?? {};
      }
      return {};
    },
    {
      refreshInterval: POLLING.NORMAL,
    },
  );

  const useMarketClosedPositions = (markets: IMarket[]): IClosedTrade[] => {
    return data?.result?.map((position: ClosedTrade) => {
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
    closedPositionsPagination: data?.pagination ?? {},
    refetch: () => void mutate(QUERY_KEY),
    useMarketClosedPositions,
  };
};
