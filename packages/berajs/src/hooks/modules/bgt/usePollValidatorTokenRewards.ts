import { ApolloClient, InMemoryCache } from "@apollo/client";
import { bgtSubgraphUrl } from "@bera/config";
import { GetValidatorTokenRewardUsages } from "@bera/graphql";
import { mutate } from "swr";
import useSWRImmutable from "swr/immutable";
import { Address } from "viem";

import {
  DefaultHookOptions,
  DefaultHookReturnType,
  ValidatorTokenRewardUsages,
  ValidatorUsages,
} from "~/types";
import { formatDaysToTimestamps } from "~/utils";

interface ValidatorTokenRewardsSubgraphType {
  validatorTokenRewardUsages: ValidatorTokenRewardUsages[];
  validatorUsages: ValidatorUsages[];
}

export const usePollValidatorTokenRewards = (
  id: Address,
  daysRange: number,
  options?: DefaultHookOptions,
): DefaultHookReturnType<ValidatorTokenRewardsSubgraphType | undefined> => {
  const QUERY_KEY = ["usePollValidatorTokenRewardsSubgraph", id, daysRange];
  const swrResponse = useSWRImmutable<
    ValidatorTokenRewardsSubgraphType | undefined
  >(
    QUERY_KEY,
    async () => {
      if (!id) return false;
      const bgtClient = new ApolloClient({
        uri: bgtSubgraphUrl,
        cache: new InMemoryCache(),
      });

      const bgtUsage = await bgtClient.query({
        query: GetValidatorTokenRewardUsages,
        variables: {
          address: id.toLowerCase(),
          timestamp: formatDaysToTimestamps(daysRange),
        },
      });

      return bgtUsage?.data;
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
