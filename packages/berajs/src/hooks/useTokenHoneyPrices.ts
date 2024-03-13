import { honeyTokenAddress } from "@bera/config";
import {
  dexClient,
  getTokenHoneyPrice,
  getTokenHoneyPrices,
} from "@bera/graphql";
import useSWR from "swr";
import { getAddress, type Address } from "viem";

import { handleNativeBera } from "~/utils";

export const useTokenHoneyPrices = (
  tokenAddresses: (string | undefined)[] | undefined,
) => {
  return useSWR(
    ["tokenHoneyPrices", tokenAddresses],
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
      refreshInterval: 50000,
    },
  );
};

export const useTokenHoneyPrice = (tokenAddress: string | undefined) => {
  return useSWR(
    ["tokenHoneyPrice", tokenAddress],
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
          return res.data.tokenHoneyPrice.price;
        })
        .catch((e: any) => {
          console.log(e);
          return "0";
        });
    },
    {
      refreshInterval: 10000,
    },
  );
};
