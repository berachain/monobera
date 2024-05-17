import { useEffect } from "react";
import useSWR, { mutate } from "swr";
import { useLocalStorage } from "usehooks-ts";

import { getMarkets } from "~/actions/bgt/getMarket";
import { useBeraJs } from "~/contexts";
import { DefaultHookOptions, DefaultHookReturnType, Market } from "~/types";

type MarketDictionary = Record<string, { market: Market; checked: boolean }>;

export interface UsePollMarketsResponse
  extends DefaultHookReturnType<Market[]> {
  marketDict: MarketDictionary;
  setMarketDict: (value: MarketDictionary) => void;
}

export const usePollMarkets = (
  options?: DefaultHookOptions,
): UsePollMarketsResponse => {
  const { config: beraConfig } = useBeraJs();
  const config = options?.beraConfigOverride ?? beraConfig;
  const QUERY_KEY = ["usePollMarkets"];
  const [marketDict, setMarketDict] = useLocalStorage<MarketDictionary>(
    "BERA_GAUGE_MARKET",
    {},
  );

  const swrResponse = useSWR<Market[], any, typeof QUERY_KEY>(
    QUERY_KEY,
    async () => await getMarkets(),
    {
      ...options?.opts,
    },
  );

  useEffect(() => {
    // Only update the market dictionary if it's currently empty and we have new data
    if (Object.keys(marketDict).length === 0 && swrResponse.data) {
      const newMarketDict: MarketDictionary = {};
      swrResponse.data.forEach((market) => {
        newMarketDict[market.id] = { market, checked: false };
      });
      setMarketDict(newMarketDict);
    }
  }, [swrResponse.data]);

  return {
    ...swrResponse,
    marketDict,
    setMarketDict,
    refresh: () => mutate(QUERY_KEY),
  };
};
