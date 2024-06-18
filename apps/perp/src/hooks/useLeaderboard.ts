import { perpsEndpoint } from "@bera/config";
import useSWRImmutable from "swr/immutable";

import { API_FILTERS, POLLING } from "~/utils/constants";
import type { FilterableLeaderboardTableState } from "~/types/table";

export const useLeaderboard = (props: FilterableLeaderboardTableState) => {
  const queryString =
    Object.entries(props ?? {})
      .filter(
        ([key, value]) => API_FILTERS.includes(key) && value !== undefined,
      )
      .map(([key, value]) => `${key}=${value}`)
      .join("&") ?? "";
  const QUERY_KEY = ["leaderboard", queryString];
  const { data, isLoading, isValidating, mutate } = useSWRImmutable(
    QUERY_KEY,
    async () => {
      if (queryString) {
        const res = await fetch(
          `${perpsEndpoint}/trading-leaderboard?${queryString}`,
        );
        const data = await res.json();
        return data;
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
    isLoading,
    isValidating,
    refetch: () => void mutate(QUERY_KEY),
    data,
  };
};
