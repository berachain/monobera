import { useBeraJs } from "@bera/berajs";
import { perpsEndpoints } from "@bera/config";
import useSWR, { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";

import { POLLING } from "~/utils/constants";

export const usePollAccountTradingSummary = () => {
  const { account } = useBeraJs();
  const QUERY_KEY = ["acountTradingSummary", account];
  const { mutate } = useSWRConfig();
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      if (account) {
        const res = await fetch(
          `${perpsEndpoints}/trading-summary/traders/${account}`,
        );
        const data = await res.json();
        const tradingSummary = data.result[0];
        return tradingSummary;
      }
      return undefined;
    },
    {
      refreshInterval: POLLING.NORMAL,
    },
  );

  const useAccountTradingSummary = () => {
    return useSWRImmutable(QUERY_KEY);
  };

  return {
    isLoading,
    refetch: () => void mutate(QUERY_KEY),
    useAccountTradingSummary,
  };
};
