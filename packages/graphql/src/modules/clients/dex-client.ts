import { ApolloClient, InMemoryCache } from "@apollo/client";
import { crocSubgraphEndpoint } from "@bera/config";
// import { subgraphUrl } from "@bera/config";

export const dexClient = new ApolloClient({
  uri: crocSubgraphEndpoint,
  cache: new InMemoryCache(),
});

export const ssrDexClient = new ApolloClient({
  ssrMode: true,
  uri: crocSubgraphEndpoint,
  cache: new InMemoryCache(),
});
