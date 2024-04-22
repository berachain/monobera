import useSWR, { useSWRConfig } from "swr";
import { usePublicClient } from "wagmi";

import {
  DefaultHookProps,
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

export type UsePollWalletBalancesRequest = DefaultHookProps<
  {
    externalTokenList?: Token[];
  },
  true
>;

export interface UsePollBalancesResponse
  extends DefaultHookReturnType<BalanceToken[] | undefined> {
  refetch: () => void;
  useSelectedWalletBalance: (address: string) => BalanceToken | undefined;
  useSelectedTagWalletBalances: (tag: string) => BalanceToken[] | undefined;
}

export const usePollWalletBalances = ({
  config,
  args,
  opts,
}: UsePollWalletBalancesRequest): UsePollBalancesResponse => {
  const publicClient = usePublicClient();
  const { mutate } = useSWRConfig();
  const { account, isConnected } = useBeraJs();
  const { data: tokenData } = useTokens({ config });
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
        config,
        publicClient,
      });
    },
    { ...opts, refreshInterval: opts?.refreshInterval ?? POLLING.NORMAL },
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
