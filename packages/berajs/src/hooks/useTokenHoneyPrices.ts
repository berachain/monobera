import useSWR from "swr";

import { getTokenHoneyPrices } from "~/actions/honey";
import POLLING from "~/config/constants/polling";
import { DefaultHookTypes } from "~/types/global";

/**
 *
 * @returns the current honey price of a series of tokens
 */
interface UseTokenHoneyPricesRequest extends DefaultHookTypes {
  args?: {
    tokenAddresses: string[] | undefined;
  };
}

export const useTokenHoneyPrices = ({
  args: { tokenAddresses } = { tokenAddresses: undefined },
  opts: { refreshInterval } = {
    refreshInterval: POLLING.REFRESH_BLOCK_INTERVAL,
  },
}: UseTokenHoneyPricesRequest) => {
  const method = "tokenHoneyPrices";
  const QUERY_KEY = [tokenAddresses, method];
  return useSWR(
    QUERY_KEY,
    async () => {
      return getTokenHoneyPrices({ tokenAddresses });
    },
    {
      refreshInterval,
    },
  );
};
