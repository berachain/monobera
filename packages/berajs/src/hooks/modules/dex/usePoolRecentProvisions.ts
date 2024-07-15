import useSWR from "swr";

import {
  getPoolRecentProvisions,
  type GetPoolRecentProvisionsResult,
} from "~/actions";
import { useBeraJs } from "~/contexts";
import POLLING from "~/enum/polling";
import { DefaultHookOptions, DefaultHookReturnType, PoolV2 } from "~/types";

interface IUsePoolRecentProvisionsArgs {
  pool: PoolV2 | undefined;
}

export const usePoolRecentProvisions = (
  { pool }: IUsePoolRecentProvisionsArgs,
  options?: DefaultHookOptions,
): DefaultHookReturnType<GetPoolRecentProvisionsResult | undefined> => {
  const { config: beraConfig } = useBeraJs();
  const config = options?.beraConfigOverride ?? beraConfig;
  const QUERY_KEY = ["usePoolRecentProvisions", pool?.shareAddress];
  const swrResponse = useSWR<
    GetPoolRecentProvisionsResult | undefined,
    any,
    typeof QUERY_KEY
  >(
    QUERY_KEY,
    async () => {
      if (!pool) return undefined;
      return await getPoolRecentProvisions({
        args: {
          pool,
        },
        config,
      });
    },
    {
      ...options?.opts,
      refreshInterval: options?.opts?.refreshInterval ?? POLLING.FAST,
    },
  );

  return { ...swrResponse, refresh: () => swrResponse?.mutate?.() };
};
