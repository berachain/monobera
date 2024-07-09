import useSWR from "swr";

import { PoolHistoryResponse, getPoolHistoricalData } from "~/actions";
import { useBeraJs } from "~/contexts";
import { DefaultHookOptions, DefaultHookReturnType } from "~/types/global";

type UsePoolHistoricalDataArgs = {
  shareAddress: string | undefined;
};
export const usePoolHistoricalData = (
  { shareAddress }: UsePoolHistoricalDataArgs,
  options?: DefaultHookOptions,
): DefaultHookReturnType<PoolHistoryResponse> => {
  const { config: beraConfig } = useBeraJs();
  const config = options?.beraConfigOverride ?? beraConfig;
  const QUERY_KEY = ["pool_history", shareAddress];
  const swrResponse = useSWR<PoolHistoryResponse, any, any>(
    QUERY_KEY,
    async () => {
      if (!shareAddress) return undefined;
      return await getPoolHistoricalData({ shareAddress, config });
    },
  );

  return {
    ...swrResponse,
    refresh: () => void swrResponse.mutate(),
  };
};
