import useSWR from "swr";
import { usePublicClient } from "wagmi";

import POLLING from "~/enum/polling";

export const usePollEstimateFeesPerGas = () => {
  const publicClient = usePublicClient();
  const method = "estimateFeesForGas";
  const QUERY_KEY = [method];
  const { data, isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      try {
        if (!publicClient) return undefined;
        const result = await publicClient?.estimateFeesPerGas();
        return result;
      } catch (e) {
        console.error(e);
        return undefined;
      }
    },
    {
      refreshInterval: POLLING.NORMAL,
    },
  );

  return {
    data,
    isLoading,
  };
};
