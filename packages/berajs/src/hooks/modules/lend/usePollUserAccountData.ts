import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient } from "wagmi";

import {
  UserAccountData,
  getUserAccountData,
} from "~/actions/lend/getUserAccountData";
import { useBeraJs } from "~/contexts";
import { DefaultHookOptions } from "~/types";

export const usePollUserAccountData = (options?: DefaultHookOptions) => {
  const publicClient = usePublicClient();
  const { account, config: beraConfig } = useBeraJs();
  const config = options?.beraConfigOverride ?? beraConfig;

  const QUERY_KEY = [account, "getUserAccountData"];
  const { isLoading, isValidating, mutate } = useSWR(
    QUERY_KEY,
    async () => {
      if (!publicClient) return undefined;
      if (!config.contracts?.lendPoolProxyAddress) return undefined;
      if (!account) return undefined;
      return await getUserAccountData({
        config,
        client: publicClient,
        account: account,
      });
    },
    {
      ...options?.opts,
    },
  );

  const useUserAccountData = (): UserAccountData | undefined => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };

  return {
    isLoading,
    isValidating,
    refresh: () => mutate?.(),
    useUserAccountData,
  };
};
