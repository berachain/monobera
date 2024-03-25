import { perpsEndpoint } from "@bera/config";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

import { POLLING } from "~/utils/constants";

export const usePollFeesApr = () => {
  const QUERY_KEY = ["historical-rewards"];
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      try {
        const res = await fetch(
          `${perpsEndpoint}/historical-rewards?count_back=3&resolution=1d`,
        );
        const data = await res.json();
        const historicalSummary = data.result;
        return historicalSummary;
      } catch (e) {
        return {
          apr: "0",
          combined_fees: "0",
          fees_to_bgt: "0",
          fees_to_honey: "0",
        };
      }
    },
    {
      refreshInterval: POLLING.SLOW,
    },
  );

  const useFeesApr = () => {
    const { data } = useSWRImmutable(QUERY_KEY);
    return data?.apr || "0";
  };

  return {
    isLoading,
    useFeesApr,
  };
};
