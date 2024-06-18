import useSWR from "swr";
import { Address } from "viem";
import { useAccount, usePublicClient } from "wagmi";

import { searchUserPools } from "~/actions";
import { useBeraJs } from "~/contexts";
import { IUserPool } from "~/types";
import { DefaultHookOptions, DefaultHookReturnType } from "~/types/global";

type UseUserPoolsDataArgs = {
  account?: Address;
  keyword?: string;
};

/**
 * An SWR hook that fetches all the pools that a given wallet address' user has a stake in currently
 * @param param0.account (Optional) - blockchain address of user whose pools we want to fetch, defaults to current connected wagmi wallet
 * @param param0.keyword (Optional) - search keyword for pool names
 * @param options (Optional) - Default hook options with beraConfigOverride and SWR config `opts`
 * @returns {DefaultHookReturnType<IUserPool[] | undefined>} - SWR response with data as nullable list of pools that the user provided (or connected if none provided) has a stake in
 */
export const useUserPools = (
  args?: UseUserPoolsDataArgs,
  options?: DefaultHookOptions,
): DefaultHookReturnType<IUserPool[] | undefined> => {
  const { account, keyword = "" } = args || {};
  const { config: beraConfig, account: currentAccount } = useBeraJs();
  const config = options?.beraConfigOverride ?? beraConfig;
  const publicClient = usePublicClient();
  const QUERY_KEY = ["UseUserPools", account, currentAccount, keyword];
  const swrResponse = useSWR<IUserPool[] | undefined, any, any>(
    QUERY_KEY,
    async () => {
      if (!account && !currentAccount) return;
      if (!publicClient) return;
      return (
        (await searchUserPools({
          args: { account: account ?? currentAccount!, keyword },
          config,
          publicClient,
        })) ?? null
      );
    },
  );

  return {
    ...swrResponse,
    refresh: () => void swrResponse.mutate(),
  };
};
