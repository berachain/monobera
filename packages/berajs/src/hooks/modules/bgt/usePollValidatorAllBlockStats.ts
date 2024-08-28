import { ApolloClient, InMemoryCache } from "@apollo/client";
import { bgtSubgraphUrl } from "@bera/config";
import { GetAllValidatorBlockCount } from "@bera/graphql";
import { mutate } from "swr";
import useSWRImmutable from "swr/immutable";

import {
  AllTimeValidatorBlockCount,
  DefaultHookOptions,
  DefaultHookReturnType,
} from "~/types";

interface ValidatorAllBlockStatsSubgraphType {
  blockStatsByValidators: AllTimeValidatorBlockCount[];
}

export const usePollValidatorAllBlockStats = (
  options?: DefaultHookOptions,
): DefaultHookReturnType<ValidatorAllBlockStatsSubgraphType | undefined> => {
  const QUERY_KEY = ["useValidatorAllBlockStatsSubgraph"];
  const swrResponse = useSWRImmutable<
    ValidatorAllBlockStatsSubgraphType | undefined
  >(
    QUERY_KEY,
    async () => {
      const timestamp = Math.floor(Date.now() - 60 * 120 * 1000) * 1000;
      const bgtClient = new ApolloClient({
        uri: bgtSubgraphUrl,
        cache: new InMemoryCache(),
      });

      const result = await bgtClient.query({
        query: GetAllValidatorBlockCount,
        variables: {
          timestamp: timestamp.toString(),
        },
      });

      return result?.data;
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
