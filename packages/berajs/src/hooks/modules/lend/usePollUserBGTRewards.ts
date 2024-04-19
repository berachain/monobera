import useSWR, { useSWRConfig } from "swr";
import { usePublicClient } from "wagmi";

import { lendRewardHelperAbi } from "~/abi";
import { useBeraJs } from "~/contexts";
import { DefaultHookProps } from "~/types";

export const usePollLendUserBGTRewards = ({
  config,
  opts,
}: DefaultHookProps) => {
  const publicClient = usePublicClient();
  const { mutate } = useSWRConfig();
  const { account } = useBeraJs();
  const QUERY_KEY = ["getUserBGTRewardsLend", account];
  const swrResponce = useSWR(QUERY_KEY, async () => {
    if (!publicClient) return undefined;
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
    refetch: () => void mutate(QUERY_KEY),
    ...swrResponce,
  };
};
