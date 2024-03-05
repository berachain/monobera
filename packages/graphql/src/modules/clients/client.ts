import { ApolloClient, InMemoryCache } from "@apollo/client";
import { crocSubgraphEndpoint } from "@bera/config";
// import { subgraphUrl } from "@bera/config";

export const client = new ApolloClient({
  uri: crocSubgraphEndpoint,
  cache: new InMemoryCache(),
});

export const ssrClient = new ApolloClient({
  ssrMode: true,
  uri: crocSubgraphEndpoint,
  cache: new InMemoryCache(),
});
