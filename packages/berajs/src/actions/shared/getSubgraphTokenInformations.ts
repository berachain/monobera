import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GetTokenInformations } from "@bera/graphql";
import { getAddress } from "viem";

import type { BeraConfig, Token } from "~/types";
import { handleNativeBera } from "~/utils";

interface FetchSubgraphTokenInformationsArgs {
  tokenAddresses?: string[] | undefined;
  config: BeraConfig;
}

export interface SubgraphTokenInformations {
  [key: string]: Token;
}
/**
 * fetch the current honey prices of a series of tokens
 */

export const getSubgraphTokenInformations = async ({
  tokenAddresses,
  config,
}: FetchSubgraphTokenInformationsArgs): Promise<
  SubgraphTokenInformations | undefined
> => {
  if (!config.subgraphs?.dexSubgraph) {
    throw new Error("dex subgraph uri s not found in config");
  }
  const subgraphEndpoint = config.subgraphs?.dexSubgraph;
  const dexClient = new ApolloClient({
    uri: subgraphEndpoint,
    cache: new InMemoryCache(),
  });

  if (!tokenAddresses || tokenAddresses.some((token) => token === undefined)) {
    return {};
  }
  const swappedAddresses = tokenAddresses.map((token: string | undefined) =>
    handleNativeBera(token).toLowerCase(),
  );
  try {
    const res = await dexClient.query({
      query: GetTokenInformations,
      variables: {
        id: swappedAddresses,
      },
    });
    return res.data?.tokenInformations.reduce(
      (allPrices: any, tokenInformation: Token) => ({
        ...allPrices,
        [getAddress(tokenInformation.address)]: tokenInformation.usdValue,
      }),
      {},
    ) as SubgraphTokenInformations;
  } catch (e) {
    console.log(e);
    return undefined;
  }
};
