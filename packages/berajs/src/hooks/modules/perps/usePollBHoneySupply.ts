import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { type Address } from "viem";
import { usePublicClient } from "wagmi";

import { BTOKEN_ABI } from "~/config";
import POLLING from "~/config/constants/polling";

export const usePollBHoneySupply = () => {
  const publicClient = usePublicClient();
  const method = "totalSupply";
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
        return undefined;
      }
    },
    {
      refreshInterval: POLLING.FAST,
    },
  );

  const useBHoneySupply = () => {
    const { data = 0 } = useSWRImmutable(QUERY_KEY);
    return data;
  };

  const useFormattedBHoneySupply = () => {
    const { data = 0 } = useSWRImmutable(QUERY_KEY);
    return Number(data);
  };
  return {
    useFormattedBHoneySupply,
    useBHoneySupply,
    isLoading,
  };
};
