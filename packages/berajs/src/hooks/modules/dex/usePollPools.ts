import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient } from "wagmi";

import { DEX_PRECOMPILE_ABI, DEX_PRECOMPILE_ADDRESS } from "~/config";
import POLLING from "~/config/constants/polling";

// this is going to be slow for now until we have event indexing
export const usePollPools = () => {
  const publicClient = usePublicClient();

  const method = "getAllPoolAddresses";
  const QUERY_KEY = [method];
  useSWR(
    QUERY_KEY,
    async () => {
      const result = await publicClient.readContract({
        address: DEX_PRECOMPILE_ADDRESS,
        abi: DEX_PRECOMPILE_ABI,
        functionName: method,
        args: [],
      });

      return result;
    },
    {
      refreshInterval: POLLING.SLOW,
    },
  );

  const usePools = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };
  return {
    usePools,
  };
};
