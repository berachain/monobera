import { ApolloClient, InMemoryCache } from "@apollo/client";
import { bgtSubgraphUrl } from "@bera/config";
import { GetValidatorBgtStaked } from "@bera/graphql";
import { mutate } from "swr";
import useSWRImmutable from "swr/immutable";
import { Address } from "viem";

import {
  DefaultHookOptions,
  DefaultHookReturnType,
  ValidatorBgtStaked,
} from "~/types";
import { formatDaysToTimestamps } from "~/utils";

interface ValidatorBgtStakedSubgraphType {
  validatorBgtStaked: ValidatorBgtStaked[];
}

export const usePollValidatorBgtStaked = (
  id: Address,
  daysRange: number,
  options?: DefaultHookOptions,
): DefaultHookReturnType<ValidatorBgtStakedSubgraphType | undefined> => {
  const QUERY_KEY = ["useValidatorBgtStakedSubgraph", id, daysRange];
  const swrResponse = useSWRImmutable<
    ValidatorBgtStakedSubgraphType | undefined
  >(
    QUERY_KEY,
    async () => {
      if (!id) return false;
      const bgtClient = new ApolloClient({
        uri: bgtSubgraphUrl,
        cache: new InMemoryCache(),
      });

      const result = await bgtClient.query({
        query: GetValidatorBgtStaked,
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
