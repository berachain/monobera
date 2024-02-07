import { ApolloClient, InMemoryCache } from "@apollo/client";
// import { subgraphUrl } from "@bera/config";

export const client = new ApolloClient({
  uri: "https://api.goldsky.com/api/public/project_clqy1ct1fqf18010n972w2xg7/subgraphs/crocgraph/v0.0.13/gn",
  cache: new InMemoryCache(),
});

export const ssrClient = new ApolloClient({
  ssrMode: true,
  uri: "https://api.goldsky.com/api/public/project_clqy1ct1fqf18010n972w2xg7/subgraphs/crocgraph/v0.0.13/gn",
  cache: new InMemoryCache(),
});
