import { ApolloClient, InMemoryCache } from "@apollo/client";
import { honeySubgraphUrl } from "@bera/config";

export const honeyClient = new ApolloClient({
  uri: honeySubgraphUrl,
  cache: new InMemoryCache(),
});

export const ssrHoneyClient = new ApolloClient({
  ssrMode: true,
  uri: honeySubgraphUrl,
  cache: new InMemoryCache(),
});
