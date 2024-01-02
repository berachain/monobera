import { ApolloClient, InMemoryCache } from "@apollo/client";
import { subgraphUrl } from "@bera/config";

export const client = new ApolloClient({
  uri: subgraphUrl,
  cache: new InMemoryCache(),
});

export const ssrClient = new ApolloClient({
  ssrMode: true,
  uri: subgraphUrl,
  cache: new InMemoryCache(),
});

