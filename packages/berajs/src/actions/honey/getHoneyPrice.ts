import { honeyTokenAddress } from "@bera/config";
import { dexClient, getTokenHoneyPriceReq } from "@bera/graphql";
import { Address } from "viem";

import { handleNativeBera } from "~/utils";

interface FetchHoneyPriceArgs {
  tokenAddress?: string | undefined;
}

/**
 * fetch the current honey price of a given token
 */

export const getTokenHoneyPrice = async ({
  tokenAddress,
}: FetchHoneyPriceArgs): Promise<string | undefined> => {
  if (!tokenAddress) {
    return "0";
  }
  if (tokenAddress.toLowerCase() === honeyTokenAddress.toLowerCase()) {
    return "1";
  }
  return await dexClient
    .query({
      query: getTokenHoneyPriceReq,
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
};
