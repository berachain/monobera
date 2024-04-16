import useSWR from "swr";

import { getTokenHoneyPrice } from "~/actions/honey";
import POLLING from "~/enum/polling";
import { DefaultHookTypes } from "~/types/global";

/**
 *
 * @returns the current honey price of a given token
 */

export interface UseTokenHoneyPriceRequest extends DefaultHookTypes {
  args?: {
    tokenAddress: `0x${string}` | undefined;
  };
  config: {
    subgraphs?: {
      dexSubgraph?: string;
    };
  };
}

export interface UseTokenHoneyPriceResponse {
  isLoading: boolean;
  isValidating: boolean;
  data: string | undefined;
}

export const useTokenHoneyPrice = ({
  config,
  args: { tokenAddress } = { tokenAddress: undefined },
  opts: { refreshInterval } = {
    refreshInterval: POLLING.REFRESH_BLOCK_INTERVAL,
  },
}: UseTokenHoneyPriceRequest) => {
  if (!config.subgraphs?.dexSubgraph) {
    throw new Error("dex subgraph uri s not found in config");
  }
  const method = "tokenHoneyPrice";
  const QUERY_KEY = [tokenAddress, method];
  const subgraphEndpoint = config.subgraphs?.dexSubgraph;
  const { data, isLoading, isValidating } = useSWR(
    QUERY_KEY,
    async () => {
      return getTokenHoneyPrice({ tokenAddress, subgraphEndpoint });
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
