import useSWR from "swr";

import { PoolDayData, getPoolHistoricalData } from "~/actions";
import { useBeraJs } from "~/contexts";
import { DefaultHookOptions, DefaultHookReturnType } from "~/types/global";

type UsePoolHistoricalDataArgs = {
  poolId: string | undefined;
};
export const usePoolHistoricalData = (
  { poolId }: UsePoolHistoricalDataArgs,
  options?: DefaultHookOptions,
): DefaultHookReturnType<PoolDayData[] | undefined> => {
  const { config: beraConfig } = useBeraJs();
  const config = options?.beraConfigOverride ?? beraConfig;
  const QUERY_KEY = ["pool_history", poolId];
  const swrResponse = useSWR<PoolDayData[] | undefined, any, any>(
    QUERY_KEY,
    async () => {
      if (!poolId) return undefined;
      return await getPoolHistoricalData({ poolId, config });
    },
  );

  return {
    ...swrResponse,
    refresh: () => void swrResponse.mutate(),
  };
};
