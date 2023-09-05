import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { type Address } from "viem";
import { usePublicClient } from "wagmi";

import { REWARDS_PRECOMPILE_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraJs } from "~/contexts";

export const usePollBgtRewards = () => {
  const publicClient = usePublicClient();
  const { account } = useBeraJs();

  const method = "getAllBribeRewards";
  const QUERY_KEY = [method, account];
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      const result = (await publicClient.readContract({
        address: process.env.NEXT_PUBLIC_REWARDS_ADDRESS as Address,
        abi: REWARDS_PRECOMPILE_ABI,
        functionName: method,
        args: [account],
      })) as any[];
      return result;
    },
    {
      refreshInterval: POLLING.NORMAL, // make it rlly slow TODO CHANGE
    },
  );

  const useBgtRewards = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };

  return {
    useBgtRewards,
    isLoading,
    QUERY_KEY,
  };
};
