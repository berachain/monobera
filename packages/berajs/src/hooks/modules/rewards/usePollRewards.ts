import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits, type Address } from "viem";
import { usePublicClient } from "wagmi";

import { REWARDS_PRECOMPILE_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraJs } from "~/contexts";

export const usePollBgtRewards = (receiver: string) => {
  const publicClient = usePublicClient();
  const { account } = useBeraJs();

  const method = "getCurrentRewards";
  const QUERY_KEY = [method, account, receiver];
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      try {
        const result = (await publicClient.readContract({
          address: process.env.NEXT_PUBLIC_REWARDS_ADDRESS as Address,
          abi: REWARDS_PRECOMPILE_ABI,
          functionName: method,
          args: [account, receiver],
        })) as any[];
        return result[0].amount;
      } catch (e) {
        console.log(e);
        return undefined;
      }
    },
    {
      refreshInterval: POLLING.NORMAL,
    },
  );

  const useBgtRewards = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);

    return data === undefined ? 0 : Number(formatUnits(data, 18));
  };

  return {
    useBgtRewards,
    isLoading,
    QUERY_KEY,
  };
};
