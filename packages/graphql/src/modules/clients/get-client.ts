import { ApolloClient, InMemoryCache } from "@apollo/client";

export const getClient = (subgraphEndpoint: string) =>
  new ApolloClient({
    uri: subgraphEndpoint,
    cache: new InMemoryCache(),
  });

export const getSSRClient = (subgraphEndpoint: string) =>
  new ApolloClient({
    ssrMode: true,
    uri: subgraphEndpoint,
    cache: new InMemoryCache(),
  });
