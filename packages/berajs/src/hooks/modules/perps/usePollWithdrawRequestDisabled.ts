import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient, type Address } from "wagmi";

import { PNL_FEED_ABI } from "~/config";
import POLLING from "~/config/constants/polling";

export const usePollWithdrawRequestDisabled = () => {
  const publicClient = usePublicClient();
  const method = "nextEpochValuesRequestCount";
  const QUERY_KEY = [method];
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      try {
        const result = await publicClient.readContract({
          address: process.env.NEXT_PUBLIC_GTOKEN_PNLFEED_ADDRESS as Address,
          abi: PNL_FEED_ABI,
          functionName: method,
          args: [],
        });
        console.log("resulxxxt", result);
        return result;
      } catch (e) {
        console.error(e);
        return 0n;
      }
    },
    {
      refreshInterval: POLLING.NORMAL,
    },
  );

  const useWithdrawDisabled = () => {
    const { data } = useSWRImmutable(QUERY_KEY);
    console.log("data", data);
    return data === 0n;
  };

  return {
    isLoading,
    useWithdrawDisabled,
  };
};
