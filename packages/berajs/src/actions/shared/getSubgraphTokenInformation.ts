import { ApolloClient, InMemoryCache } from "@apollo/client";
import { beraTokenAddress, bgtTokenAddress } from "@bera/config";
import { GetTokenInformation } from "@bera/graphql";
import { Address } from "viem";
import { Token } from "~/types";

import { BeraConfig } from "~/types/global";
import { handleNativeBera } from "~/utils";

interface FetchSubgraphTokenInformationArgs {
  tokenAddress?: string | undefined;
  config: BeraConfig;
}

/**
 * fetch the current honey price of a given token
 */

export const getSubgraphTokenInformation = async ({
  tokenAddress,
  config,
}: FetchSubgraphTokenInformationArgs): Promise<Token | undefined> => {
  if (!config.subgraphs?.dexSubgraph) {
    throw new Error("dex subgraph uri s not found in config");
  }
  const subgraphEndpoint = config.subgraphs?.dexSubgraph;
  const dexClient = new ApolloClient({
    uri: subgraphEndpoint,
    cache: new InMemoryCache(),
  });
  if (!tokenAddress) {
    return undefined;
  }
  return await dexClient
    .query({
      query: GetTokenInformation,
      variables: {
        id:
          handleNativeBera(tokenAddress as Address).toLowerCase() ===
          bgtTokenAddress.toLowerCase()
            ? beraTokenAddress.toLowerCase()
            : handleNativeBera(tokenAddress as Address).toLowerCase(),
      },
    })
    .then((res: any) => {
      return res.data.tokenInformation;
    })
    .catch((e: any) => {
      console.log(e);
      return undefined;
    });
};
