import useSWR from "swr";

import { type GetPoolRecentProvisionsResult } from "~/actions";
import { useBeraJs } from "~/contexts";
import POLLING from "~/enum/polling";
import { DefaultHookOptions, DefaultHookReturnType } from "~/types";

// interface IUsePoolRecentProvisionsArgs {}

export const usePollAllProposals = (
  // {}: IUsePoolRecentProvisionsArgs,
  options?: DefaultHookOptions,
): DefaultHookReturnType<GetPoolRecentProvisionsResult | undefined> => {
  const { config: beraConfig } = useBeraJs();
  const config = options?.beraConfigOverride ?? beraConfig;
  const QUERY_KEY = ["usePollAllProposals"];
  const swrResponse = useSWR<
    GetPoolRecentProvisionsResult | undefined,
    any,
    typeof QUERY_KEY
  >(
    QUERY_KEY,
    async () => {
      return Promise.all([]);
    },
    {
      ...options?.opts,
      refreshInterval: options?.opts?.refreshInterval ?? POLLING.FAST,
    },
  );

  return { ...swrResponse, refresh: () => swrResponse?.mutate?.() };
};
