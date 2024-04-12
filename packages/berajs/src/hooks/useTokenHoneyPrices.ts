import useSWR from "swr";

import { getTokenHoneyPrices } from "~/actions/honey";
import POLLING from "~/config/constants/polling";
import { DefaultHookTypes } from "~/types/global";

/**
 *
 * @returns the current honey price of a series of tokens
 */
export interface IUseTokenHoneyPricesRequest extends DefaultHookTypes {
  args?: {
    tokenAddresses: string[] | undefined;
  };
}

export const useTokenHoneyPrices = ({
  config,
  args: { tokenAddresses } = { tokenAddresses: undefined },
  opts: { refreshInterval } = {
    refreshInterval: POLLING.REFRESH_BLOCK_INTERVAL,
  },
}: IUseTokenHoneyPricesRequest) => {
  if (!config.subgraphs?.dexSubgraph) {
    throw new Error("dex subgraph uri s not found in config");
  }
  const method = "tokenHoneyPrices";
  const QUERY_KEY = [tokenAddresses, method];
  const subgraphEndpoint = config.subgraphs?.dexSubgraph;
  return useSWR(
    QUERY_KEY,
    async () => {
      return getTokenHoneyPrices({ tokenAddresses, subgraphEndpoint });
    },
    {
      refreshInterval,
    },
  );
};
