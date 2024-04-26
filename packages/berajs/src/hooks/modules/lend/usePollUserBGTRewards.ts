import useSWR, { useSWRConfig } from "swr";
import { usePublicClient } from "wagmi";

import { useBeraJs } from "~/contexts";
import { DefaultHookOptions } from "~/types";

export const usePollLendUserBGTRewards = (options?: DefaultHookOptions) => {
  const publicClient = usePublicClient();
  const { account } = useBeraJs();

  // const { account, config: beraConfig } = useBeraJs();
  // const config = options?.beraConfigOverride ?? beraConfig;

  const QUERY_KEY = ["getUserBGTRewardsLend", account];
  const swrResponse = useSWR(QUERY_KEY, async () => {
    if (!publicClient) throw new Error("publicClient is not defined");
    // if (account) {
    // try {
    //   const result = await publicClient.readContract({
    //     address: lendRewardsAddress,
    //     abi: lendRewardHelperAbi,
    //     functionName: "getAllRewards",
    //     args: [account],
    //   });
    //   return result;
    // } catch (e) {
    //   console.log(e);
    //   return null;
    // }
    // } else {
    //   return null;
    // }
    return null;
  });

  return {
    ...swrResponse,
    refresh: () => void swrResponse.mutate(),
  };
};
