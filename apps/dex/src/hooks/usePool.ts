import {
  //   beraTokenAddress,
  honeyTokenAddress,
  //   nativeTokenAddress,
} from "@bera/config";
import {
  client,
  getAllPools,
  getTokenHoneyPrice,
  getTokenHoneyPrices,
} from "@bera/graphql";
import { getAddress } from "ethers";
import useSWR from "swr";
import { type Address } from "wagmi";

export const usePools = () => {
  const { data } = useSWR(
    ["getAllPools"],
    async () => {
      return await client
        .query({
          query: getAllPools,
        })
        .then((res) => res.data.pools)
        .catch((e) => {
          console.log(e);
          return undefined;
        });
    },
    {
      refreshInterval: 5000,
    },
  );
  return data;
};

const handleNativeBera = (token: Address) => {
  if (token === getAddress(process.env.NEXT_PUBLIC_BERA_ADDRESS as string)) {
    return getAddress(process.env.NEXT_PUBLIC_WBERA_ADDRESS as string);
  }
  return token;
};

export const useTokenHoneyPrice = (tokenAddress: string | undefined) => {
  const { data } = useSWR(
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
      refreshInterval: 5000,
    },
  );
  return data;
};

export const useTokenHoneyPrices = (tokenAddresses: string[] | undefined) => {
  const { data } = useSWR(
    ["tokenHoneyPrice", tokenAddresses],
    async () => {
      if (!tokenAddresses) {
        return [];
      }
      return await client
        .query({
          query: getTokenHoneyPrices,
          variables: {
            id: tokenAddresses.map((t) =>
              handleNativeBera(t as Address).toLowerCase(),
            ),
          },
        })
        .then((res: any) => {
          return res.data?.tokenHoneyPrices.reduce((allPrices, price) => {
            return {
              ...allPrices,
              [price.id]: price.price,
            };
          }, {});
        })
        .catch((e: any) => {
          console.log(e);
          return undefined;
        });
    },
    {
      refreshInterval: 5000,
    },
  );
  return data;
};
