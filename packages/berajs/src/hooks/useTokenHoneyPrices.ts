import useSWR from "swr";

import { getTokenHoneyPrices } from "~/actions/honey";
import POLLING from "~/config/constants/polling";
import { DefaultHookTypes } from "~/types/global";

/**
 *
 * @returns the current honey price of a series of tokens
 */
export interface UseTokenHoneyPricesRequest extends DefaultHookTypes {
  args?: {
    tokenAddresses: string[] | undefined;
  };
}

export interface UseTokenHoneyPricesResponse {
  isLoading: boolean;
  isValidating: boolean;
  data: string[] | undefined;
}

export const useTokenHoneyPrices = ({
  config,
  args: { tokenAddresses } = { tokenAddresses: undefined },
  opts: { refreshInterval } = {
    refreshInterval: POLLING.REFRESH_BLOCK_INTERVAL,
  },
}: UseTokenHoneyPricesRequest): UseTokenHoneyPricesResponse => {
  if (!config.subgraphs?.dexSubgraph) {
    throw new Error("dex subgraph uri s not found in config");
  }
  const method = "tokenHoneyPrices";
  const QUERY_KEY = [tokenAddresses, method];
  const subgraphEndpoint = config.subgraphs?.dexSubgraph;
  const { data, isLoading, isValidating } = useSWR(
    QUERY_KEY,
    async () => {
      return getTokenHoneyPrices({ tokenAddresses, subgraphEndpoint });
    },
    {
      refreshInterval,
    },
  );

  return {
    isLoading,
    isValidating,
    data,
  };
};
