import { dexClient, getTokenHoneyPrices } from "@bera/graphql";
import { Address, getAddress } from "viem";

import { handleNativeBera } from "~/utils";

interface FetchHoneyPricesArgs {
  tokenAddresses?: string[] | undefined;
}

/**
 * fetch the current honey prices of a series of tokens
 */

export const getTokenHoneyPricesReq = async ({
  tokenAddresses,
}: FetchHoneyPricesArgs): Promise<string[] | undefined> => {
  if (!tokenAddresses || tokenAddresses.some((token) => token === undefined)) {
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
};
