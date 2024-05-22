import { useState } from "react";
import useSWR, { mutate } from "swr";

import { getMarkets } from "~/actions/bgt/getMarket";
import { useBeraJs } from "~/contexts";
import { DefaultHookOptions, DefaultHookReturnType, Market } from "~/types";

export interface UsePollMarketsResponse
  extends DefaultHookReturnType<Market[]> {}

export const usePollMarkets = (
  options?: DefaultHookOptions,
): UsePollMarketsResponse => {
  const { config: beraConfig } = useBeraJs();
  const config = options?.beraConfigOverride ?? beraConfig;
  const QUERY_KEY = ["usePollMarkets"];
  const swrResponse = useSWR<Market[], any, typeof QUERY_KEY>(
    QUERY_KEY,
    async () => await getMarkets(),
    {
      ...options?.opts,
    },
  );

  return {
    ...swrResponse,
    refresh: () => mutate(QUERY_KEY),
  };
};
