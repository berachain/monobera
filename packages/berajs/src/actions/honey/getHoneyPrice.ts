import { ApolloClient, InMemoryCache } from "@apollo/client";
import {
  beraTokenAddress,
  bgtTokenAddress,
  honeyTokenAddress,
} from "@bera/config";
import { getTokenHoneyPriceReq } from "@bera/graphql";
import { Address } from "viem";

import { BeraConfig } from "~/types/global";
import { handleNativeBera } from "~/utils";

interface FetchHoneyPriceArgs {
  tokenAddress?: string | undefined;
  config: BeraConfig;
}

/**
 * fetch the current honey price of a given token
 */

export const getTokenHoneyPrice = async ({
  tokenAddress,
  config,
}: FetchHoneyPriceArgs): Promise<string | undefined> => {
  if (!config.subgraphs?.bgtSubgraph) {
    throw new Error("dex subgraph uri s not found in config");
  }
  const subgraphEndpoint = config.subgraphs?.bgtSubgraph;
  const bgtClient = new ApolloClient({
    uri: subgraphEndpoint,
    cache: new InMemoryCache(),
  });
  if (!tokenAddress) {
    return "0";
  }
  if (tokenAddress.toLowerCase() === honeyTokenAddress.toLowerCase()) {
    return "1";
  }
  return await bgtClient
    .query({
      query: getTokenHoneyPriceReq,
      variables: {
        id:
          handleNativeBera(tokenAddress as Address).toLowerCase() ===
          bgtTokenAddress.toLowerCase()
            ? beraTokenAddress.toLowerCase()
            : handleNativeBera(tokenAddress as Address).toLowerCase(),
      },
    })
    .then((res: any) => {
      return res.data.tokenInformation?.usdValue;
    })
    .catch((e: any) => {
      console.log(e);
      return "0";
    });
};
