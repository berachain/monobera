import { ApolloClient, InMemoryCache } from "@apollo/client";
import { getTokenHoneyPricesReq } from "@bera/graphql";
import { getAddress } from "viem";

import { handleNativeBera } from "~/utils";

interface FetchHoneyPricesArgs {
  tokenAddresses?: string[] | undefined;
  subgraphEndpoint?: string | undefined;
}

/**
 * fetch the current honey prices of a series of tokens
 */

export const getTokenHoneyPrices = async ({
  tokenAddresses,
  subgraphEndpoint,
}: FetchHoneyPricesArgs): Promise<string[] | undefined> => {
  const dexClient = new ApolloClient({
    uri: subgraphEndpoint,
    cache: new InMemoryCache(),
  });

  if (!tokenAddresses || tokenAddresses.some((token) => token === undefined)) {
    return [];
  }
  const swappedAddresses = tokenAddresses.map((token: string | undefined) =>
    handleNativeBera(token).toLowerCase(),
  );
  try {
    const res = await dexClient.query({
      query: getTokenHoneyPricesReq,
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
};
