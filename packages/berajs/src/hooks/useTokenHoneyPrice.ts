import { honeyTokenAddress } from "@bera/config";
import { dexClient, getTokenHoneyPrice } from "@bera/graphql";
import useSWR from "swr";
import { type Address } from "viem";

import POLLING from "~/config/constants/polling";
import { handleNativeBera } from "~/utils";

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
      if (!tokenAddress) {
        return "0";
      }
      if (tokenAddress.toLowerCase() === honeyTokenAddress.toLowerCase()) {
        return "1";
      }
      return await dexClient
        .query({
          query: getTokenHoneyPrice,
          variables: {
            id: handleNativeBera(tokenAddress as Address).toLowerCase(),
          },
        })
        .then((res: any) => {
          return res.data.tokenHoneyPrice?.price;
        })
        .catch((e: any) => {
          console.log(e);
          return "0";
        });
    },
    {
      refreshInterval: POLLING.REFRESH_BLOCK_INTERVAL,
    },
  );
};
