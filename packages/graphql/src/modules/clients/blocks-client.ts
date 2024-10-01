import { ApolloClient, InMemoryCache } from "@apollo/client";
import { blocksSubgraphUrl } from "@bera/config";

export const blocksClient = new ApolloClient({
  uri: blocksSubgraphUrl,
  cache: new InMemoryCache(),
});

export const ssrBlocksClient = new ApolloClient({
  ssrMode: true,
  uri: blocksSubgraphUrl,
  cache: new InMemoryCache(),
});
