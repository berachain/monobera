import { ApolloClient, InMemoryCache } from "@apollo/client";
import { subgraphUrl } from "@bera/config";

export const client = new ApolloClient({
  uri: "http://127.0.0.1:8000/subgraphs/name/berachain-subgraph2",
  cache: new InMemoryCache(),
});

export const ssrClient = new ApolloClient({
  ssrMode: true,
  uri: subgraphUrl,
  cache: new InMemoryCache(),
});
