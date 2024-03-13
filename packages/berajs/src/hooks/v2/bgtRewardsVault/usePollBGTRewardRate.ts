import useSWR, { mutate } from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient } from "wagmi";

import POLLING from "~/config/constants/polling";
import { BLOCK_REWARD_CONTROLLER_ABI } from "~/config/v2/abi";

export const usePollBGTRewardRate = () => {
  const method = "rewardRate";
  const QUERY_KEY = [method];
  const publicClient = usePublicClient();
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      if (!publicClient) return undefined;
      try {
        const bgtRewardRate = await publicClient.readContract({
          address: "0x0", // TODO: BLOCK_REWARD_CONTROLLER contract address
          abi: BLOCK_REWARD_CONTROLLER_ABI,
          functionName: method,
          args: [],
        });

        if (!bgtRewardRate) {
          return undefined;
        }
        return {
          bgtRewardRate,
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

  const useBGTRewardRate = () => {
    const { data = undefined } = useSWRImmutable<number | undefined>(QUERY_KEY);
    return data;
  };

  return {
    isLoading,
    useBGTRewardRate,
    refresh: () => void mutate(QUERY_KEY),
  };
};
