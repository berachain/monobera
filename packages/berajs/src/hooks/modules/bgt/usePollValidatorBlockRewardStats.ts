import { ApolloClient, InMemoryCache } from "@apollo/client";
import { bgtSubgraphUrl } from "@bera/config";
import { GetValidatorBlockRewardStats } from "@bera/graphql";
import { mutate } from "swr";
import useSWRImmutable from "swr/immutable";
import { Address } from "viem";

import {
  BlockRewardStatsByValidators,
  DefaultHookOptions,
  DefaultHookReturnType,
} from "~/types";
import { formatDaysToTimestamps } from "~/utils";

interface ValidatorBlockRewardStatsSubgraphType {
  blockRewardStatsByValidators: BlockRewardStatsByValidators[];
}

export const usePollValidatorBlockRewardStats = (
  id: Address,
  daysRange: number,
  options?: DefaultHookOptions,
): DefaultHookReturnType<ValidatorBlockRewardStatsSubgraphType | undefined> => {
  const QUERY_KEY = ["useValidatorBlockRewardStatsSubgraph", id, daysRange];
  const swrResponse = useSWRImmutable<
    ValidatorBlockRewardStatsSubgraphType | undefined
  >(
    QUERY_KEY,
    async () => {
      if (!id) return false;
      const bgtClient = new ApolloClient({
        uri: bgtSubgraphUrl,
        cache: new InMemoryCache(),
      });

      const result = await bgtClient.query({
        query: GetValidatorBlockRewardStats,
        variables: {
          address: id.toLowerCase(),
          timestamp: formatDaysToTimestamps(daysRange),
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
