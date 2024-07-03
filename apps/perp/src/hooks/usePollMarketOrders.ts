import { useBeraJs } from "@bera/berajs";
import { perpsEndpoint } from "@bera/config";
import useSWR, { mutate } from "swr";

import { POLLING, API_FILTERS } from "~/utils/constants";
import { TableStateProps } from "~/types/table";

export const usePollMarketOrders = (props: TableStateProps) => {
  const { account } = useBeraJs();
  const queryString =
    Object.entries(props.history ?? {})
      .filter(
        ([key, value]) => API_FILTERS.includes(key) && value !== undefined,
      )
      .map(([key, value]) => `${key}=${value}`)
      .join("&") ?? "";
  const QUERY_KEY = ["tradingHistory", account, queryString];
  const { isLoading, data, isValidating } = useSWR(
    QUERY_KEY,
    async () => {
      if (account && queryString) {
        const res = await fetch(
          `${perpsEndpoint}/trading-history/traders/${account}${
            queryString ? `?${queryString}` : ""
          }`,
        );
        const data = await res.json();
        return data ?? {};
      }
      return {};
    },
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
      refreshInterval: POLLING.SLOW,
    },
  );

  const refresh = () => void mutate(QUERY_KEY);

  return {
    isLoading,
    isValidating,
    refresh,
    multiRefresh: () => {
      refresh();
      setTimeout(refresh, 2500);
      setTimeout(refresh, 5000);
    },
    data,
    pagination: data?.pagination ?? {},
  };
};
