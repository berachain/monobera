import useSWR from "swr";

import { GetGaugeData, getGauges } from "~/actions/bgt/getGauges";
import {
  DefaultHookOptions,
  DefaultHookReturnType,
  Gauge,
  useBeraJs,
} from "../../..";

export interface IUseGaugessResponse
  extends DefaultHookReturnType<GetGaugeData> {
  gaugeList: Gauge[];
  gaugeDictionary: { [key: string]: Gauge };
}

export const usePollGauges = (
  options?: DefaultHookOptions,
): IUseGaugessResponse => {
  const { config: beraConfig } = useBeraJs();
  const config = options?.beraConfigOverride ?? beraConfig;
  const QUERY_KEY = "defaultGaugeList";
  const swrResponse = useSWR<GetGaugeData, any, typeof QUERY_KEY>(
    QUERY_KEY,
    async () => await getGauges(config),
    {
      ...options?.opts,
    },
  );

  return {
    ...swrResponse,
    gaugeList: swrResponse.data?.gaugeList ?? [],
    gaugeDictionary: swrResponse.data?.gaugeDictionary ?? {},
    refresh: swrResponse.mutate,
  };
};
