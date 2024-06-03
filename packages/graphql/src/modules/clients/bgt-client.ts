import { ApolloClient, InMemoryCache } from "@apollo/client";
import { bgtSubgraphUrl } from "@bera/config";

export const bgtClient = new ApolloClient({
  uri: bgtSubgraphUrl,
  cache: new InMemoryCache(),
});

export const ssrBgtClient = new ApolloClient({
  ssrMode: true,
  uri: bgtSubgraphUrl,
  cache: new InMemoryCache(),
});
