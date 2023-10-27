import { useBeraJs } from "@bera/berajs";
import { perpsEndpoints } from "@bera/config";
import useSWR, { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";

import { POLLING } from "~/utils/constants";

export const usePollOpenOrders = () => {
  const { account } = useBeraJs();
  const QUERY_KEY = ["openPositions", account];
  const { mutate } = useSWRConfig();
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      if (account) {
        const res = await fetch(`${perpsEndpoints}/opentrades/${account}`);
        const data = await res.json();
        return data.open_trades;
      }
      return [];
    },
    {
      refreshInterval: POLLING.NORMAL,
    },
  );

  const useOpenPositions = () => {
    return useSWRImmutable(QUERY_KEY);
  };

  const useTotalPnl = () => {
    return useSWRImmutable(QUERY_KEY);
  };

  const useTotalPositionSize = () => {
    return useSWRImmutable(QUERY_KEY);
  };

  return {
    isLoading,
    refetch: () => void mutate(QUERY_KEY),
    useOpenPositions,
  };
};
