import { gaugeListUrl } from "@bera/config";
import useSWRImmutable from "swr/immutable";

import {
  DefaultHookOptions,
  DefaultHookReturnType,
  useBeraJs,
  type GaugeMetadata,
} from "..";

export const useGaugesMetadata = (
  options?: DefaultHookOptions,
): DefaultHookReturnType<any> => {
  const { config: beraConfig } = useBeraJs();
  const config = options?.beraConfigOverride ?? beraConfig;
  const swrResponse = useSWRImmutable<any>(
    ["gaugesMetadata", config],
    async () => {
      const tokenList = await fetch(gaugeListUrl);
      const temp = await tokenList.json();
      return temp.gauges.reduce((acc: any, cur: any) => {
        acc[cur.vaultAddress] = cur;
        return acc;
      }, {});
    },
    {
      ...options?.opts,
    },
  );

  return {
    ...swrResponse,
    refresh: () => swrResponse?.mutate?.(),
  };
};
