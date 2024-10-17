import { ApolloClient, InMemoryCache } from "@apollo/client";
import { governanceSubgraphUrl } from "@bera/config";

// import { subgraphUrl } from "@bera/config";

export const governanceClient = new ApolloClient({
  uri: governanceSubgraphUrl,
  cache: new InMemoryCache(),
});

export const ssrGovernanceClient = new ApolloClient({
  ssrMode: true,
  uri: governanceSubgraphUrl,
  cache: new InMemoryCache(),
});
