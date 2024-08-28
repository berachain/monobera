import { ApolloClient, InMemoryCache } from "@apollo/client";
import { bgtSubgraphUrl } from "@bera/config";
import { GetValidatorBlockStats } from "@bera/graphql";
import { mutate } from "swr";
import useSWRImmutable from "swr/immutable";
import { Address } from "viem";

import {
  AllTimeBlockCount,
  DefaultHookOptions,
  DefaultHookReturnType,
} from "~/types";

interface ValidatorBlockStatsSubgraphType {
  blockStatsByValidators: AllTimeBlockCount[];
  blockStats_collection: AllTimeBlockCount[];
}

export const usePollValidatorBlockStats = (
  id: Address,
  options?: DefaultHookOptions,
): DefaultHookReturnType<ValidatorBlockStatsSubgraphType | undefined> => {
  const QUERY_KEY = ["useValidatorBlockStatsSubgraph", id];
  const swrResponse = useSWRImmutable<
    ValidatorBlockStatsSubgraphType | undefined
  >(
    QUERY_KEY,
    async () => {
      if (!id) return false;
      const bgtClient = new ApolloClient({
        uri: bgtSubgraphUrl,
        cache: new InMemoryCache(),
      });

      const result = await bgtClient.query({
        query: GetValidatorBlockStats,
        variables: {
          address: id.toLowerCase(),
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
