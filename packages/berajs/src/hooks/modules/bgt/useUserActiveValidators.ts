import { ApolloClient, InMemoryCache } from "@apollo/client";
import { bgtEndpointUrl, bgtStakerSubgraphUrl } from "@bera/config";
import { GetUserValidatorInformation } from "@bera/graphql";
import useSWR from "swr";

import { useBeraJs } from "~/contexts";
import POLLING from "~/enum/polling";
import { UserValidator, Validator } from "~/types";
import { DefaultHookOptions, DefaultHookReturnType } from "~/types/global";

export interface UseUserActiveValidatorsResponse
  extends DefaultHookReturnType<UserValidator[] | undefined> {
  getSelectedUserValidator: (
    validatorAddress: string,
  ) => UserValidator | undefined;
}

export const useUserActiveValidators = (
  options?: DefaultHookOptions,
): UseUserActiveValidatorsResponse => {
  const { account } = useBeraJs();
  const QUERY_KEY = ["useUserActiveValidators", account];
  const swrResponse = useSWR<UserValidator[] | undefined>(
    QUERY_KEY,
    async () => {
      if (!account) return undefined;

      const bgtClient = new ApolloClient({
        uri: bgtStakerSubgraphUrl,
        cache: new InMemoryCache(),
      });

      const userDeposited = await bgtClient.query({
        query: GetUserValidatorInformation,
        variables: { address: account.toLowerCase() },
      });

      const url = `${bgtEndpointUrl}/user/${account}/validators`;
      const validatorList = await fetch(url);
      const temp = await validatorList.json();
      const validatorInfoList =
        temp.userValidators.map((t: any) => t.validator) ?? [];

      const userDepositedData: {
        amountQueued: string;
        amountDeposited: string;
        latestBlock: string;
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
        };
      });
    },
    {
      ...options,
      refreshInterval: options?.opts?.refreshInterval ?? POLLING.SLOW,
      keepPreviousData: true,
    },
  );
  const getSelectedUserValidator = (validatorAddress: string) => {
    const valiList = swrResponse.data;
    return valiList?.find(
      (validator) =>
        validator.coinbase.toLowerCase() === validatorAddress.toLowerCase(),
    );
  };
  return {
    ...swrResponse,
    getSelectedUserValidator,
    refresh: () => swrResponse?.mutate?.(),
  };
};
