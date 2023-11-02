import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits, type Address } from "viem";
import { usePublicClient } from "wagmi";

import { BTOKEN_ABI } from "~/config";
import POLLING from "~/config/constants/polling";

export const usePollBHoneyTvl = () => {
  const publicClient = usePublicClient();
  const method = "tvl";
  const QUERY_KEY = ["bhoney", method];
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      try {
        const result = await publicClient.readContract({
          address: process.env.NEXT_PUBLIC_GTOKEN_CONTRACT_ADDRESS as Address,
          abi: BTOKEN_ABI,
          functionName: method,
          args: [],
        });
        return result;
      } catch (e) {
        console.error(e);
        return 0;
      }
    },
    {
      refreshInterval: POLLING.FAST,
    },
  );

  const useBHoneyTvl = () => {
    const { data = 0 } = useSWRImmutable(QUERY_KEY);
    return data;
  };

  const useFormattedBHoneyTvl = () => {
    const { data = 0 } = useSWRImmutable(QUERY_KEY);
    return formatUnits(data, 18);
  };
  return {
    useFormattedBHoneyTvl,
    useBHoneyTvl,
    isLoading,
  };
};
