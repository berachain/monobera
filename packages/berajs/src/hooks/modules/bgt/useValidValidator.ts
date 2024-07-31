import { bgtSubgraphUrl } from "@bera/config";
import useSWR, { mutate } from "swr";
import { Address, isAddress } from "viem";
import { DefaultHookOptions, DefaultHookReturnType } from "~/types";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GetValidValidator } from "@bera/graphql";

export const useValidValidator = (
  id: Address,
  options?: DefaultHookOptions,
): DefaultHookReturnType<boolean> => {
  const QUERY_KEY = ["useSelectedValidatorSubgraph", id];
  const swrResponse = useSWR<boolean, any, typeof QUERY_KEY>(
    QUERY_KEY,
    async () => {
      if (!id) return false;
      const bgtClient = new ApolloClient({
        uri: bgtSubgraphUrl,
        cache: new InMemoryCache(),
      });

      const validator = await bgtClient.query({
        query: GetValidValidator,
        variables: { address: id.toLowerCase() },
      });

      console.log(validator);
      if (isAddress(validator.data.validator.coinbase)) {
        return true;
      }
      return false;
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
