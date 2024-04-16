import useSWR from "swr";

import { getTokenHoneyPrices } from "~/actions/honey";
import POLLING from "~/enum/polling";
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
  const method = "tokenHoneyPrices";
  const QUERY_KEY = [tokenAddresses, method];
  const { data, isLoading, isValidating } = useSWR(
    QUERY_KEY,
    async () => {
      return getTokenHoneyPrices({ tokenAddresses, config });
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
