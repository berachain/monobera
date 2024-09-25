import { ApolloClient, InMemoryCache } from "@apollo/client";
import { bgtSubgraphUrl } from "@bera/config";
import { GetGauges } from "@bera/graphql";
import { mutate } from "swr";
import useSWRImmutable from "swr/immutable";

import { DefaultHookOptions, DefaultHookReturnType } from "~/types";

// interface GaugesSubgraphType {
// }

export const usePollGaugesData = (
  options?: DefaultHookOptions,
): DefaultHookReturnType<any | undefined> => {
  const QUERY_KEY = ["useGaugesSubgraph"];
  const swrResponse = useSWRImmutable<any | undefined>(
    QUERY_KEY,
    async () => {
      const bgtClient = new ApolloClient({
        uri: bgtSubgraphUrl,
        cache: new InMemoryCache(),
      });

      const result = await bgtClient.query({
        query: GetGauges,
      });

      return result;
    },
    {
      ...options?.opts,
    },
  );

  return {
    ...swrResponse,
    refresh: () => mutate(QUERY_KEY),
  };
};
