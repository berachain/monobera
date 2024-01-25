import { honeyTokenAddress } from "@bera/config";
import { client, getTokenHoneyPrice, getTokenHoneyPrices } from "@bera/graphql";
import useSWR from "swr";
import { type Address } from "viem";

import { handleNativeBera } from "~/utils";

export const useTokenHoneyPrices = (tokenAddresses: string[] | undefined) => {
  return useSWR(
    ["tokenHoneyPrices", tokenAddresses],
    async () => {
      if (!tokenAddresses) {
        return [];
      }

      const swappedAddresses = tokenAddresses.map((token: string) =>
        handleNativeBera(token).toLowerCase(),
      );

      return await client
        .query({
          query: getTokenHoneyPrices,
          variables: {
            id: swappedAddresses,
          },
        })
        .then((res: any) => {
          return res.data.tokenHoneyPrices;
        })
        .catch((e: any) => {
          console.log(e);
          return undefined;
        });
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
      return await client
        .query({
          query: getTokenHoneyPrice,
          variables: {
            id: handleNativeBera(tokenAddress as Address).toLowerCase(),
          },
        })
        .then((res: any) => {
          return res.data.tokenHoneyPrices[0].price;
        })
        .catch((e: any) => {
          console.log(e);
          return undefined;
        });
    },
    {
      refreshInterval: 10000,
    },
  );
};
