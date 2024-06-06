import useSWR from "swr";

import POLLING from "~/enum/polling";
import { DefaultHookOptions, DefaultHookReturnType } from "~/types/global";
import { useBeraJs } from "~/contexts";
import { UserValidator, Validator } from "~/types";
import { GetUserValidatorInformation } from "@bera/graphql";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { bgtSubgraphUrl } from "@bera/config";

/**
 *
 * @returns the current honey price of a given token
 */

export const useUserActiveValidators = (
  options?: DefaultHookOptions,
): DefaultHookReturnType<UserValidator[] | undefined> => {
  const { account } = useBeraJs();
  const QUERY_KEY = ["useUserValidators", account];
  const swrResponse = useSWR<UserValidator[] | undefined>(
    QUERY_KEY,
    async () => {
      if (!account) return undefined

      const bgtClient = new ApolloClient({
        uri: bgtSubgraphUrl,
        cache: new InMemoryCache(),
      });

      const userDeposited = await bgtClient.query({
        query: GetUserValidatorInformation,
        variables: { address: account.toLowerCase() },
      });

      let url = `http://localhost:3001/berachain/v1alpha1/beacon/user/${account}/validators`;
      const validatorList = await fetch(url);
      const temp = await validatorList.json();
      const validatorInfoList = temp.userValidators.map((t: any) => t.validator) ?? [];

      const userDepositedData: {
        amountQueued: string;
        amountDeposited: string;
        latestBlock: string;
        latestBlockTime: string;
        user: string;
        coinbase: string;
      }[] = userDeposited.data.userValidatorInformations;

      return validatorInfoList.map((validator: Validator) => {
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
    },
    {
      ...options,
      refreshInterval: options?.opts?.refreshInterval ?? POLLING.SLOW * 2,
      keepPreviousData: true,
    },
  );
  return {
    ...swrResponse,
    refresh: () => swrResponse?.mutate?.(),
  };
};
