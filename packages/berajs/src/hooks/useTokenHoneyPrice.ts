import useSWR from "swr";

import { getTokenHoneyPriceReq } from "~/actions/honey";
import POLLING from "~/config/constants/polling";

/**
 *
 * @returns the current honey price of a given token
 */

export const useTokenHoneyPrice = (tokenAddress: string | undefined) => {
  const method = "tokenHoneyPrice";
  const QUERY_KEY = [tokenAddress, method];
  return useSWR(
    QUERY_KEY,
    async () => {
      return getTokenHoneyPriceReq({ tokenAddress });
    },
    {
      refreshInterval: POLLING.REFRESH_BLOCK_INTERVAL,
    },
  );
};
