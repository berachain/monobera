import { mutate } from "swr";
import useSWRImmutable from "swr/immutable";

import { GetMarkets, getMarkets } from "~/actions/bgt/getMarket";
import { useBeraJs } from "~/contexts";
import { DefaultHookOptions, DefaultHookReturnType, Market } from "~/types";

export interface UsePollMarketsResponse
  extends DefaultHookReturnType<GetMarkets> {
  marketList: Market[];
  marketDictionary: { [key: string]: Market };
}

export const usePollMarkets = (
  options?: DefaultHookOptions,
): UsePollMarketsResponse => {
  const { config: beraConfig } = useBeraJs();
  const config = options?.beraConfigOverride ?? beraConfig;
  const QUERY_KEY = ["usePollMarkets"];
  const swrResponse = useSWRImmutable<GetMarkets, any, typeof QUERY_KEY>(
    QUERY_KEY,
    async () => await getMarkets(config),
    {
      ...options?.opts,
    },
  );

  return {
    ...swrResponse,
    marketList: swrResponse.data?.marketList ?? [],
    marketDictionary: swrResponse.data?.marketDictionary ?? {},
    refresh: () => mutate(QUERY_KEY),
  };
};
