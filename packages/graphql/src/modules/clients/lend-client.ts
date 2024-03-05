import { ApolloClient, InMemoryCache } from "@apollo/client";
import { lendSubgraphUrl } from "@bera/config";

export const lendClient = new ApolloClient({
  uri: lendSubgraphUrl,
  cache: new InMemoryCache(),
});

export const ssrLendClient = new ApolloClient({
  ssrMode: true,
  uri: lendSubgraphUrl,
  cache: new InMemoryCache(),
});
