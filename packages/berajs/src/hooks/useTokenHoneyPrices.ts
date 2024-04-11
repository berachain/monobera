import { dexClient, getTokenHoneyPrices } from "@bera/graphql";
import useSWR from "swr";
import { getAddress } from "viem";

import { getTokenHoneyPricesReq } from "~/actions/honey/getHoneyPricesReq";
import POLLING from "~/config/constants/polling";

/**
 *
 * @returns the current honey price of a series of tokens
 */

export const useTokenHoneyPrices = (tokenAddresses: string[] | undefined) => {
  const method = "tokenHoneyPrices";
  const QUERY_KEY = [tokenAddresses, method];
  return useSWR(
    QUERY_KEY,
    async () => {
      return getTokenHoneyPricesReq({ tokenAddresses });
    },
    {
      refreshInterval: POLLING.REFRESH_BLOCK_INTERVAL,
    },
  );
};
