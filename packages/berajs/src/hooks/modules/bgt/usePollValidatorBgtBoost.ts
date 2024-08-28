import { ApolloClient, InMemoryCache } from "@apollo/client";
import { bgtSubgraphUrl } from "@bera/config";
import { GetValidatorBgtBoost } from "@bera/graphql";
import { mutate } from "swr";
import useSWRImmutable from "swr/immutable";
import { Address } from "viem";

import {
  DefaultHookOptions,
  DefaultHookReturnType,
  UserValidatorBoostDeposited,
  UserValidatorBoostQueued,
} from "~/types";

export interface ValidatorBgtBoostSubgraphType {
  userValidatorBoostQueued: UserValidatorBoostQueued[];
  userValidatorBoostDeposited: UserValidatorBoostDeposited[];
}

export const usePollValidatorBgtBoost = (
  id: Address,
  options?: DefaultHookOptions,
): DefaultHookReturnType<ValidatorBgtBoostSubgraphType | undefined> => {
  const QUERY_KEY = ["useValidatorBgtBoostSubgraph", id];
  const swrResponse = useSWRImmutable<
    ValidatorBgtBoostSubgraphType | undefined
  >(
    QUERY_KEY,
    async () => {
      if (!id) return false;
      const bgtClient = new ApolloClient({
        uri: bgtSubgraphUrl,
        cache: new InMemoryCache(),
      });

      const bgtBoost = await bgtClient.query({
        query: GetValidatorBgtBoost,
        variables: {
          address: id.toLowerCase(),
        },
      });

      return bgtBoost?.data;
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
