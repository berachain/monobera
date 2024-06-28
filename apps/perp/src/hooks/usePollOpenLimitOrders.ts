import { useBeraJs } from "@bera/berajs";
import { perpsEndpoint } from "@bera/config";
import useSWR, { mutate } from "swr";

import { POLLING, API_FILTERS, DEFAULT_QUERY } from "~/utils/constants";
import type { TableStateProps } from "~/types/table";

export const usePollOpenLimitOrders = (props: TableStateProps) => {
  const { account } = useBeraJs();
  const queryString =
    Object.entries(props.orders ?? {})
      .filter(
        ([key, value]) => API_FILTERS.includes(key) && value !== undefined,
      )
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
        // TODO: ask backend to provide a total items in the response
        const totalRes = await fetch(
          `${perpsEndpoint}/openlimitorders/${account}?${DEFAULT_QUERY}`,
        );
        const total = await totalRes.json();
        return { ...data, total: total.pagination.total_items } ?? {};
      }
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
    total: data?.total ?? 0,
  };
};
