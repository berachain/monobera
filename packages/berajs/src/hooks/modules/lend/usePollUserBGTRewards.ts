import { lendRewardsAddress } from "@bera/config";
import useSWR, { useSWRConfig } from "swr";
import { usePublicClient } from "wagmi";

import { LEND_REWARD_HELPER_ABI } from "~/config/abi";
import { useBeraJs } from "~/contexts";

export const usePollLendUserBGTRewards = () => {
  const publicClient = usePublicClient();
  const { mutate } = useSWRConfig();
  const { account } = useBeraJs();
  const QUERY_KEY = ["getUserBGTRewardsLend", account];
  const swrResponce = useSWR(QUERY_KEY, async () => {
    if (account) {
      try {
        const result = await publicClient.readContract({
          address: lendRewardsAddress,
          abi: LEND_REWARD_HELPER_ABI,
          functionName: "getAllRewards",
          args: [account],
        });
        return result;
      } catch (e) {
        console.log(e);
        return null;
      }
    } else {
      return null;
    }
  });

  return {
    refetch: () => void mutate(QUERY_KEY),
    ...swrResponce,
  };
};
