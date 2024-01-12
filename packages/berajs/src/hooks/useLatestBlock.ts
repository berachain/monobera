import useSWR from "swr";
import { usePublicClient } from "wagmi";

import POLLING from "~/config/constants/polling";
import { useBeraJs } from "~/contexts";

export const useLatestBlock = () => {
  const publicClient = usePublicClient();
  const method = "latestBlock";
  const { account } = useBeraJs();
  const QUERY_KEY = [account, method];
  const { data, isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      try {
        const result = await publicClient.getBlock();
        return result.number;
      } catch (e) {
        console.error(e);
        return false;
      }
    },
    {
      refreshInterval: POLLING.SLOW,
    },
  );

  return {
    QUERY_KEY,
    data,
    isLoading,
  };
};
