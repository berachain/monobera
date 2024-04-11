import { dexClient, getTokenHoneyPrices } from "@bera/graphql";
import useSWR from "swr";
import { getAddress } from "viem";

import POLLING from "~/config/constants/polling";
import { handleNativeBera } from "~/utils";

/**
 *
 * @returns the current honey price of a series of tokens
 */

export const useTokenHoneyPrices = (
  tokenAddresses: (string | undefined)[] | undefined,
) => {
  const method = "tokenHoneyPrices";
  const QUERY_KEY = [tokenAddresses, method];
  return useSWR(
    QUERY_KEY,
    async () => {
      if (
        !tokenAddresses ||
        tokenAddresses.some((token) => token === undefined)
      ) {
        return [];
      }
      const swappedAddresses = tokenAddresses.map((token: string | undefined) =>
        handleNativeBera(token).toLowerCase(),
      );
      try {
        const res = await dexClient.query({
          query: getTokenHoneyPrices,
          variables: {
            id: swappedAddresses,
          },
        });
        return res.data?.tokenHoneyPrices.reduce(
          (allPrices: any, price: any) => ({
            ...allPrices,
            [getAddress(price.id)]: price.price,
          }),
          {},
        );
      } catch (e) {
        console.log(e);
        return undefined;
      }
    },
    {
      refreshInterval: POLLING.REFRESH_BLOCK_INTERVAL,
    },
  );
};
