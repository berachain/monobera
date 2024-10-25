import { ApolloClient, InMemoryCache } from "@apollo/client";
import { bgtStakerSubgraphUrl } from "@bera/config";
import { GetUserValidatorInformation } from "@bera/graphql";
import useSWR, { useSWRConfig } from "swr";

import { useBeraJs } from "~/contexts";
import POLLING from "~/enum/polling";
import { SubgraphUserValidator } from "~/types";
import { DefaultHookOptions, DefaultHookReturnType } from "~/types/global";

/**
 *
 * @returns the current honey price of a given token
 */

export const useUserValidatorsSubgraph = (
  options?: DefaultHookOptions,
): DefaultHookReturnType<SubgraphUserValidator[] | undefined> => {
  const { account } = useBeraJs();
  const { mutate } = useSWRConfig();
  const QUERY_KEY = ["useUserValidatorsSubgraph", account];
  const swrResponse = useSWR<SubgraphUserValidator[] | undefined>(
    QUERY_KEY,
    async () => {
      if (!account) {
        return undefined;
      }

      try {
        const bgtClient = new ApolloClient({
          uri: bgtStakerSubgraphUrl,
          cache: new InMemoryCache(),
        });

        // TODO: we should make sure that we run another query if validator exceeds 1000
        const userDeposited = await bgtClient.query({
          query: GetUserValidatorInformation,
          variables: { address: account.toLowerCase() },
        });

        const userDepositedData: SubgraphUserValidator[] =
          userDeposited.data.userValidatorInformations;

        return userDepositedData;
      } catch (e) {
        console.log("error", e);
      }
    },
    {
      ...options,
      refreshInterval: options?.opts?.refreshInterval ?? POLLING.FAST,
      keepPreviousData: true,
    },
  );

  return {
    ...swrResponse,
    refresh: () => {
      mutate(QUERY_KEY);
    },
  };
};
