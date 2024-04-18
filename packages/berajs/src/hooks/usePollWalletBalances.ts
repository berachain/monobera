import {
  bgtTokenAddress,
  multicallAddress,
  nativeTokenAddress,
} from "@bera/config";
import useSWR, { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";
import { Address, erc20Abi, formatUnits, getAddress } from "viem";
import { usePublicClient } from "wagmi";

import { MULTICALL3_ABI } from "~/abi";
import { DefaultHookTypes, type Token } from "..";
import { getWalletBalances } from "../actions/dex";
import { useBeraJs } from "../contexts";
import useTokens from "./useTokens";

interface BalanceToken extends Token {
  balance: bigint;
  formattedBalance: string;
}

interface Call {
  abi: any;
  address: `0x${string}`;
  functionName: string;
  args: any[];
}

export interface UsePollWalletBalancesRequest extends DefaultHookTypes {
  args?: {
    externalTokenList?: Token[];
  };
}

export interface UsePollBalancesResponse {
  isLoading: boolean;
  isValidating: boolean;
  refetch: () => void;
  useCurrentWalletBalances: () => BalanceToken[] | undefined;
  useSelectedWalletBalance: (address: string) => BalanceToken | undefined;
  useSelectedTagWalletBalances: (tag: string) => BalanceToken[] | undefined;
}

// TODO optimize data access pattern to avoid double store
export const usePollWalletBalances = ({
  config,
  args,
  opts,
}: UsePollWalletBalancesRequest): UsePollBalancesResponse => {
  const publicClient = usePublicClient();
  const { mutate } = useSWRConfig();
  const { account, isConnected } = useBeraJs();
  const { tokenList } = useTokens({ config });
  const QUERY_KEY = [
    account,
    isConnected,
    tokenList,
    "assetWalletBalances",
    args?.externalTokenList,
  ];
  const { isLoading, isValidating } = useSWR(
    QUERY_KEY,
    async () => {
      return getWalletBalances({
        account,
        tokenList,
        externalTokenList: args?.externalTokenList,
        queryKey: QUERY_KEY,
        config,
        publicClient,
        mutate,
      });
    },
    {
      ...opts,
    },
  );

  const useCurrentWalletBalances = (): BalanceToken[] | undefined => {
    const { data = undefined } = useSWRImmutable<BalanceToken[]>(QUERY_KEY);
    return data;
  };

  const useSelectedWalletBalance = (
    address: string,
  ): BalanceToken | undefined => {
    const { data = undefined } = useSWRImmutable<BalanceToken>([
      ...QUERY_KEY,
      address,
    ]);
    return data;
  };

  const useSelectedTagWalletBalances = (
    tag: string,
  ): BalanceToken[] | undefined => {
    const { data = undefined } = useSWRImmutable<BalanceToken[]>(QUERY_KEY);
    return data?.filter((item: Token) => item.tags?.includes(tag));
  };

  return {
    isLoading,
    isValidating,
    refetch: () => void mutate(QUERY_KEY),
    useCurrentWalletBalances,
    useSelectedWalletBalance,
    useSelectedTagWalletBalances,
  };
};
