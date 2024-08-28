import { ApolloClient, InMemoryCache } from "@apollo/client";
import { bgtSubgraphUrl } from "@bera/config";
import { GetValidatorBgtUsage } from "@bera/graphql";
import { mutate } from "swr";
import useSWRImmutable from "swr/immutable";
import { Address } from "viem";

import {
  DefaultHookOptions,
  DefaultHookReturnType,
  ValidatorUsage,
} from "~/types";
import { formatDaysToTimestamps } from "~/utils";

interface ValidatorBgtDistributedSubgraphType {
  validatorUsages: ValidatorUsage[];
}

export const usePollValidatorBgtDistributed = (
  id: Address,
  daysRange: number,
  options?: DefaultHookOptions,
): DefaultHookReturnType<ValidatorBgtDistributedSubgraphType | undefined> => {
  const QUERY_KEY = ["useValidatorBgtDistributedSubgraph", id, daysRange];
  const swrResponse = useSWRImmutable<
    ValidatorBgtDistributedSubgraphType | undefined
  >(
    QUERY_KEY,
    async () => {
      if (!id) return false;
      const bgtClient = new ApolloClient({
        uri: bgtSubgraphUrl,
        cache: new InMemoryCache(),
      });

      const bgtUsage = await bgtClient.query({
        query: GetValidatorBgtUsage,
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
