import useSWR from "swr";

import { getTokenHoneyPrice } from "~/actions/honey";
import POLLING from "~/config/constants/polling";
import { DefaultHookTypes } from "~/types/global";

/**
 *
 * @returns the current honey price of a given token
 */

interface UseTokenHoneyPriceRequest extends DefaultHookTypes {
  args?: {
    tokenAddress: `0x${string}` | undefined;
  };
}

export const useTokenHoneyPrice = ({
  args: { tokenAddress } = { tokenAddress: undefined },
  opts: { refreshInterval } = {
    refreshInterval: POLLING.REFRESH_BLOCK_INTERVAL,
  },
}: UseTokenHoneyPriceRequest) => {
  const method = "tokenHoneyPrice";
  const QUERY_KEY = [tokenAddress, method];
  return useSWR(
    QUERY_KEY,
    async () => {
      return getTokenHoneyPrice({ tokenAddress });
    },
    {
      refreshInterval,
    },
  );
};
