import { ApolloClient, InMemoryCache } from "@apollo/client";
import { bgtSubgraphUrl } from "@bera/config";
import { GetValidatorBgtStakedDelta } from "@bera/graphql";
import { mutate } from "swr";
import useSWRImmutable from "swr/immutable";
import { Address } from "viem";

import {
  DefaultHookOptions,
  DefaultHookReturnType,
  ValidatorBgtStakedDelta,
} from "~/types";
import { formatDaysToTimestamps } from "~/utils";

interface ValidatorBgtStakedDeltaSubgraphType {
  validatorBgtStakedDelta: ValidatorBgtStakedDelta[];
}

export const usePollValidatorBgtStakedDelta = (
  id: Address,
  daysRange: number,
  options?: DefaultHookOptions,
): DefaultHookReturnType<ValidatorBgtStakedDeltaSubgraphType | undefined> => {
  const QUERY_KEY = ["useValidatorBgtStakedDeltaSubgraph", id, daysRange];
  const swrResponse = useSWRImmutable<
    ValidatorBgtStakedDeltaSubgraphType | undefined
  >(
    QUERY_KEY,
    async () => {
      if (!id) return false;
      const bgtClient = new ApolloClient({
        uri: bgtSubgraphUrl,
        cache: new InMemoryCache(),
      });

      const result = await bgtClient.query({
        query: GetValidatorBgtStakedDelta,
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
