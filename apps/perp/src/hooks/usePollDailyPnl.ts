import { useBeraJs } from "@bera/berajs";
import { perpsEndpoint } from "@bera/config";
import useSWR, { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";

import { POLLING } from "~/utils/constants";

export const usePollDailyPnl = () => {
  const { account } = useBeraJs();
  const QUERY_KEY = ["dailyPnl", account];
  const { mutate } = useSWRConfig();
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      if (account) {
        const res = await fetch(
          `${perpsEndpoint}/trading-summary/traders/${account}?count_back=1&resolution=1d`,
        );
        const data = await res.json();
        const tradingSummary = data.result[0];
        return tradingSummary.pnl;
      }
      return undefined;
    },
    {
      refreshInterval: POLLING.NORMAL,
    },
  );

  const useDailyPnl = () => {
    const { data } = useSWRImmutable(QUERY_KEY);
    return data;
  };

  return {
    isLoading,
    refetch: () => void mutate(QUERY_KEY),
    useDailyPnl,
  };
};
