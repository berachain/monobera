import useSWR from "swr";
import { usePublicClient } from "wagmi";
import {
  UserAccountData,
  getUserAccountData,
} from "~/actions/lend/getUserAccountData";
import { useBeraJs } from "~/contexts";
import POLLING from "~/enum/polling";
import { DefaultHookOptions, DefaultHookReturnType } from "~/types";

export interface UsePollUserAccountDataResponse
  extends DefaultHookReturnType<UserAccountData | undefined> {}

export const usePollUserAccountData = (
  options?: DefaultHookOptions,
): UsePollUserAccountDataResponse => {
  const publicClient = usePublicClient();
  const { account, config: beraConfig } = useBeraJs();
  const config = options?.beraConfigOverride ?? beraConfig;

  const QUERY_KEY = [account, "getUserAccountData"];
  const swrResponse = useSWR(
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
      refreshInterval: options?.opts?.refreshInterval ?? POLLING.FAST,
    },
  );

  return {
    ...swrResponse,
    refresh: () => void swrResponse.mutate(),
  };
};
