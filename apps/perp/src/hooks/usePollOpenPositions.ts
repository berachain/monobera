import { useBeraJs } from "@bera/berajs";
import { perpsEndpoint } from "@bera/config";
import useSWR, { mutate } from "swr";

import { API_FILTERS, DEFAULT_QUERY, POLLING } from "~/utils/constants";
import type { TableStateProps } from "~/types/table";

export const usePollOpenPositions = (props: TableStateProps) => {
  const { account } = useBeraJs();
  const queryString =
    Object.entries(props.positions ?? {})
      .filter(
        ([key, value]) => API_FILTERS.includes(key) && value !== undefined,
      )
      .map(([key, value]) => `${key}=${value}`)
      .join("&") ?? "";
  const QUERY_KEY = ["openPositions", account, queryString];
  const { data, isLoading, isValidating } = useSWR(
    QUERY_KEY,
    async () => {
      if (account && queryString) {
        const res = await fetch(
          `${perpsEndpoint}/opentrades/traders/${account}${
            queryString ? `?${queryString}` : ""
          }`,
        );
        const data = await res.json();
        // TODO: ask backend to provide a total items in the response
        const totalRes = await fetch(
          `${perpsEndpoint}/opentrades/traders/${account}?${DEFAULT_QUERY}`,
        );
        const total = await totalRes.json();
        return { ...data, total: total.pagination.total_items } ?? {};
      }
      return {};
    },
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
      refreshInterval: POLLING.SLOW,
    },
  );

  return {
    data: data ?? { result: [], pagination: {}, total: 0 },
    isLoading,
    isValidating,
    total: data?.total ?? 0,
    pagination: data?.pagination ?? {},
    refresh: () => void mutate(QUERY_KEY),
  };
};
