import useSWR from "swr";
import { Address } from "viem";
import { usePublicClient } from "wagmi";
import POLLING from "~/enum/polling";
import { DefaultHookOptions, DefaultHookReturnType } from "~/types/global";
import { bgtSubgraphUrl } from "@bera/config";
import { GetStakingToken } from "@bera/graphql";
import { ApolloClient, InMemoryCache } from "@apollo/client";

// TODO: REFACTOR ON REDEPLOY
export const useGaugeAddress = (
  receiptTokenAddress: Address | undefined,
  options?: DefaultHookOptions,
): DefaultHookReturnType<string | undefined> => {
  const publicClient = usePublicClient();
  const QUERY_KEY = ["useGaugeAddress", receiptTokenAddress];

  const swrResponse = useSWR<string | undefined>(
    QUERY_KEY,
    async () => {
      if (!receiptTokenAddress || !publicClient) return undefined;
      const bgtClient = new ApolloClient({
        uri: bgtSubgraphUrl,
        cache: new InMemoryCache(),
      });

      const userDeposited = await bgtClient.query({
        query: GetStakingToken,
        variables: { stakingToken: receiptTokenAddress.toLowerCase() },
      });

      if (!userDeposited || userDeposited.data.length === 0) return undefined;

      return userDeposited.data.vaults[0].id;
    },
    {
      ...options,
      refreshInterval: options?.opts?.refreshInterval ?? POLLING.NORMAL,
    },
  );

  return {
    ...swrResponse,
    refresh: () => swrResponse.mutate(),
  };
};
