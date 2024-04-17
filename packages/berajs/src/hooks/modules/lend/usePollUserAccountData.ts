import useSWR, { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient } from "wagmi";

import {
  UserAccountData,
  getUserAccountData,
} from "~/actions/lend/getUserAccountData";
import { useBeraJs } from "~/contexts";
import { DefaultHookTypes } from "~/types";

export const usePollUserAccountData = ({ config, opts }: DefaultHookTypes) => {
  const publicClient = usePublicClient();
  const { mutate } = useSWRConfig();
  const { account } = useBeraJs();

  const QUERY_KEY = [account, "getUserAccountData"];
  const { isLoading, isValidating } = useSWR(
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
      ...opts,
    },
  );

  const useUserAccountData = (): UserAccountData | undefined => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };

  return {
    isLoading,
    isValidating,
    refetch: () => void mutate(QUERY_KEY),
    useUserAccountData,
  };
};
