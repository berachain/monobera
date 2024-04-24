import useSWR, { useSWRConfig } from "swr";
import { usePublicClient } from "wagmi";

import {
  DefaultHookOptions,
  DefaultHookReturnType,
  getWalletBalances,
  type Token,
} from "..";
import { useBeraJs } from "../contexts";
import { useTokens } from "./useTokens";
import POLLING from "~/enum/polling";

export interface BalanceToken extends Token {
  balance: bigint;
  formattedBalance: string;
}

export type UsePollWalletBalancesArgs = {
  externalTokenList?: Token[];
};
export interface UsePollBalancesResponse
  extends DefaultHookReturnType<BalanceToken[] | undefined> {
  refetch: () => void;
  useSelectedWalletBalance: (address: string) => BalanceToken | undefined;
  useSelectedTagWalletBalances: (tag: string) => BalanceToken[] | undefined;
}

export const usePollWalletBalances = (
  args?: UsePollWalletBalancesArgs,
  options?: DefaultHookOptions,
): UsePollBalancesResponse => {
  const publicClient = usePublicClient();
  const { mutate } = useSWRConfig();
  const { account, isConnected, config: beraConfig } = useBeraJs();
  const { data: tokenData } = useTokens({
    beraConfigOverride: options?.beraConfigOverride,
  });
  const QUERY_KEY = [
    account,
    isConnected,
    tokenData?.tokenList,
    "assetWalletBalances",
    args?.externalTokenList,
  ];

  const swrResponse = useSWR<BalanceToken[] | undefined>(
    QUERY_KEY,
    async () => {
      return getWalletBalances({
        account,
        tokenList: [
          ...(tokenData?.tokenList ?? []),
          ...(args?.externalTokenList ?? []),
        ],
        config: options?.beraConfigOverride ?? beraConfig,
        publicClient,
      });
    },
    {
      ...options?.opts,
      refreshInterval: options?.opts?.refreshInterval ?? POLLING.NORMAL,
    },
  );

  const useSelectedWalletBalance = (
    address: string,
  ): BalanceToken | undefined => {
    return swrResponse.data?.find((item: Token) => item.address === address);
  };

  const useSelectedTagWalletBalances = (
    tag: string,
  ): BalanceToken[] | undefined => {
    return swrResponse.data?.filter((item: Token) => item.tags?.includes(tag));
  };

  return {
    ...swrResponse,
    refetch: () => mutate(QUERY_KEY),
    useSelectedWalletBalance,
    useSelectedTagWalletBalances,
  };
};
