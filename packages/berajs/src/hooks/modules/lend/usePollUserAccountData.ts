import useSWR, { useSWRConfig } from "swr";
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
  const { mutate } = useSWRConfig();
  const { account, config: beraConfig } = useBeraJs();
  const config = options?.beraConfigOverride ?? beraConfig;

  const QUERY_KEY = [account, "getUserAccountData"];
  const { isLoading, isValidating } = useSWR(
    QUERY_KEY,
    async () => {
      if (!publicClient) throw new Error("publicClient is not defined");
      if (!config.contracts?.lendPoolProxyAddress)
        throw new Error("missing contract address lendPoolProxyAddress");
      if (!account) throw new Error("missing account address");

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
    refetch: () => void mutate(QUERY_KEY),
    useUserAccountData,
  };
};
