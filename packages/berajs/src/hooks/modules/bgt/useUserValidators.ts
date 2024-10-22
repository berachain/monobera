import { ApolloClient, InMemoryCache } from "@apollo/client";
import { bgtStakerSubgraphUrl } from "@bera/config";
import { GetUserValidatorInformation } from "@bera/graphql";
import useSWR, { useSWRConfig } from "swr";

import { useBeraJs } from "~/contexts";
import POLLING from "~/enum/polling";
import { UserValidator, Validator } from "~/types";
import { DefaultHookOptions, DefaultHookReturnType } from "~/types/global";
import { useUserActiveValidators } from "./useUserActiveValidators";

/**
 *
 * @returns the current honey price of a given token
 */

export const useUserValidators = (
  options?: DefaultHookOptions,
): DefaultHookReturnType<UserValidator[] | undefined> => {
  const { account } = useBeraJs();
  const { mutate } = useSWRConfig();
  const {
    data = [],
    refresh: refreshUserActive,
    isLoading,
    isValidating,
  } = useUserActiveValidators();
  const QUERY_KEY = ["useUserValidators", account, ...data];
  const swrResponse = useSWR<UserValidator[] | undefined>(
    QUERY_KEY,
    async () => {
      if (!data.length) return undefined;
      if (!account) {
        return data.map((validator: Validator) => {
          return {
            ...validator,
            userStaked: "0",
            userQueued: "0",
            latestBlock: "0",
            latestBlockTime: "0",
          };
        });
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

        const userDepositedData: {
          amountQueued: string;
          amountDeposited: string;
          latestBlock: string;
          latestBlockTime: string;
          user: string;
          coinbase: string;
        }[] = userDeposited.data.userValidatorInformations;

        return data.map((validator: Validator) => {
          const userDeposited = userDepositedData.find(
            (data) =>
              data.coinbase.toLowerCase() === validator.coinbase.toLowerCase(),
          );

          return {
            ...validator,
            userStaked: userDeposited?.amountDeposited ?? "0",
            userQueued: userDeposited?.amountQueued ?? "0",
            latestBlock: userDeposited?.latestBlock ?? "0",
            latestBlockTime: userDeposited?.latestBlockTime ?? "0",
          };
        });
      } catch (e) {
        console.log("error", e);
      }
    },
    {
      ...options,
      refreshInterval: options?.opts?.refreshInterval ?? POLLING.FAST * 2,
      keepPreviousData: true,
    },
  );
  return {
    ...swrResponse,
    refresh: () => {
      refreshUserActive();
      mutate(QUERY_KEY);
    },
  };
};
