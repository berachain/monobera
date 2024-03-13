import useSWR, { mutate } from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient } from "wagmi";

import POLLING from "~/config/constants/polling";
import { BERACHAIN_REWARDS_VAULT_ABI } from "~/config/v2/abi";

export const usePollBGTReward = (userAddress: `0x${string}`) => {
  const method = "rewards";
  const QUERY_KEY = [method, userAddress];
  const publicClient = usePublicClient();
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      if (!publicClient) return undefined;
      try {
        const bgtReward = await publicClient.readContract({
          address: "0x0", // TODO: BERACHAIN_REWARDS_VAULT contract address
          abi: BERACHAIN_REWARDS_VAULT_ABI,
          functionName: method,
          args: [],
        });

        if (!bgtReward) {
          return undefined;
        }
        return {
          bgtReward,
        };
      } catch (e) {
        console.log(e);
        return undefined;
      }
    },
    {
      refreshInterval: POLLING.NORMAL,
    },
  );

  const useBGTReward = () => {
    const { data = undefined } = useSWRImmutable<number | undefined>(QUERY_KEY);
    return data;
  };

  return {
    isLoading,
    useBGTReward,
    refresh: () => void mutate(QUERY_KEY),
  };
};
