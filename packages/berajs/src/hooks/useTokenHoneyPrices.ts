import {
  beraTokenAddress,
  honeyTokenAddress,
  nativeTokenAddress,
} from "@bera/config";
import { client, getTokenHoneyPrice, getTokenHoneyPrices } from "@bera/graphql";
import useSWR from "swr";
import { getAddress, type Address } from "viem";

export const useTokenHoneyPrices = (tokenAddresses: string[] | undefined) => {
  return useSWR(
    ["tokenHoneyPrices", tokenAddresses],
    async () => {
      if (!tokenAddresses) {
        return [];
      }

      const swappedAddresses = tokenAddresses.map((token: string) => {
        if (token.toLowerCase() === nativeTokenAddress.toLowerCase()) {
          return beraTokenAddress.toLowerCase();
        }
        return token.toLowerCase();
      });

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

const handleNativeBera = (token: Address) => {
  if (getAddress(token) === getAddress(nativeTokenAddress)) {
    return getAddress(beraTokenAddress);
  }
  return token;
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
