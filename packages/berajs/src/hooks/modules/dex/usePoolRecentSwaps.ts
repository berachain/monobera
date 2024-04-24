import useSWR from "swr";

import { GetPoolRecentSwapsResult, getPoolRecentSwaps } from "~/actions";
import { useBeraJs } from "~/contexts";
import POLLING from "~/enum/polling";
import { DefaultHookOptions, DefaultHookReturnType, PoolV2 } from "~/types";

interface IUsePoolRecentSwapsArgs {
  pool: PoolV2;
}

export const usePoolRecentSwaps = (
  { pool }: IUsePoolRecentSwapsArgs,
  options?: DefaultHookOptions,
): DefaultHookReturnType<GetPoolRecentSwapsResult | undefined> => {
  const { config: beraConfig } = useBeraJs();
  const config = options?.beraConfigOverride ?? beraConfig;
  const QUERY_KEY = ["usePoolRecentSwaps", pool.poolIdx];
  const swrResponse = useSWR<
    GetPoolRecentSwapsResult | undefined,
    any,
    typeof QUERY_KEY
  >(
    QUERY_KEY,
    async () => {
      return await getPoolRecentSwaps({
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
