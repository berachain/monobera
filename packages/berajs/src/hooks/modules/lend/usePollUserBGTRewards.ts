import { lendRewardsAddress, peripheryDebtToken } from "@bera/config";
import useSWR from "swr";
import { usePublicClient } from "wagmi";

import { BERA_VAULT_REWARDS_ABI, lendRewardHelperAbi } from "~/abi";
import { useBeraJs } from "~/contexts";
import POLLING from "~/enum/polling";
import { DefaultHookOptions } from "~/types";

export const usePollLendUserBGTRewards = (options?: DefaultHookOptions) => {
  const publicClient = usePublicClient();
  const { account, config: beraConfig } = useBeraJs();
  const config = options?.beraConfigOverride ?? beraConfig;

  const QUERY_KEY = ["getUserBGTRewardsLend", account];
  const swrResponse = useSWR(
    QUERY_KEY,
    async () => {
      if (!publicClient) throw new Error("publicClient is not defined");
      if (!config) throw new Error("missing beraConfig");
      if (account) {
        try {
          const { result } = await publicClient.simulateContract({
            address: lendRewardsAddress,
            abi: BERA_VAULT_REWARDS_ABI,
            functionName: "getReward",
            account: account,
            args: [account],
          });
          return result;
        } catch (e) {
          console.log(e);
          return;
        }
      }
    },
    {
      ...options?.opts,
      refreshInterval: options?.opts?.refreshInterval ?? POLLING.FAST,
    },
  );

  return {
    ...swrResponse,
    refresh: () => void swrResponse.mutate(),
  };
};
