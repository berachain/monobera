import useSWR from "swr";
import { usePublicClient } from "wagmi";

import { getHoneyBalance } from "~/actions/dex/getHoneyBalance";
import POLLING from "~/enum/polling";
import {
  DefaultHookOptions,
  DefaultHookReturnType,
  TokenBalance,
} from "~/types/global";
import { useBeraJs } from "../contexts";

export const usePollHoneyBalance = (
  options?: DefaultHookOptions,
): DefaultHookReturnType<TokenBalance | undefined> => {
  const publicClient = usePublicClient();
  const { account, config: beraConfig } = useBeraJs();
  const QUERY_KEY = [account, "honeyBalance"];
  const swrResponse = useSWR<TokenBalance | undefined>(
    QUERY_KEY,
    async () => {
      return getHoneyBalance({
        publicClient,
        config: options?.beraConfigOverride ?? beraConfig,
        account,
      });
    },
    {
      ...options?.opts,
      refreshInterval: options?.opts?.refreshInterval ?? POLLING.NORMAL,
    },
  );
  return {
    ...swrResponse,
    refresh: () => swrResponse?.mutate?.(),
  };
};
