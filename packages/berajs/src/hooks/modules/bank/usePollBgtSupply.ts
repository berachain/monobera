import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient } from "wagmi";

import { BANK_PRECOMPILE_ABI, BANK_PRECOMPILE_ADDRESS } from "~/config";
import POLLING from "~/config/constants/polling";

// this is going to be slow for now until we have event indexing
export const usePollBgtSupply = () => {
  const publicClient = usePublicClient();

  const method = "getSupply";
  const QUERY_KEY = [method];
  useSWR(
    QUERY_KEY,
    async () => {
      const result = await publicClient.readContract({
        address: BANK_PRECOMPILE_ADDRESS,
        abi: BANK_PRECOMPILE_ABI,
        functionName: method,
        args: ["abgt"],
      });

      return result;
    },
    {
      refreshInterval: POLLING.SLOW,
    },
  );

  const useBgtSupply = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };
  return {
    useBgtSupply,
  };
};
