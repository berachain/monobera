import useSWR from "swr";

import { GaugeFilter, GetGaugeData, getGauges } from "~/actions/bgt/getGauges";
import {
  DefaultHookOptions,
  DefaultHookReturnType,
  Gauge,
  useBeraJs,
} from "../../..";

export interface IUseGaugessResponse
  extends DefaultHookReturnType<GetGaugeData> {
  gaugeCounts: number;
  gaugeList: Gauge[];
  gaugeDictionary: { [key: string]: Gauge };
}

export const usePollGauges = (
  filter?: GaugeFilter,
  options?: DefaultHookOptions,
): IUseGaugessResponse => {
  const { config: beraConfig, account } = useBeraJs();
  const config = options?.beraConfigOverride ?? beraConfig;
  const QUERY_KEY = ["defaultGaugeList", config, account, filter];
  const swrResponse = useSWR<GetGaugeData, any, typeof QUERY_KEY>(
    QUERY_KEY,
    async () => await getGauges(config, filter),
    {
      ...options?.opts,
    },
  );

  return {
    ...swrResponse,
    gaugeCounts: swrResponse.data?.gaugeCounts ?? 0,
    gaugeList: swrResponse.data?.gaugeList ?? [],
    gaugeDictionary: swrResponse.data?.gaugeDictionary ?? {},
    refresh: swrResponse.mutate,
  };
};
