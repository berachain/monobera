import {
  bgtTokenAddress,
  multicallAddress,
  nativeTokenAddress,
} from "@bera/config";
import useSWR, { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";
import { type Address, erc20Abi, formatUnits, getAddress } from "viem";
import { usePublicClient } from "wagmi";

import { DefaultHookTypes, MULTICALL3_ABI, type Token } from "..";
import { useBeraJs } from "../contexts";
import useTokens from "./useTokens";

export interface BalanceToken extends Token {
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
      if (!publicClient) return undefined;
      if (!account || !tokenList) return undefined;
      if (!config.contracts?.multicallAddress) {
        throw new Error("Multicall address not found in config");
      }
      if (account && tokenList) {
        const fullTokenList = [
          ...tokenList,
          ...(args?.externalTokenList ?? []),
        ].filter((token: Token) => token.address !== bgtTokenAddress);
        const call: Call[] = fullTokenList.map((item: Token) => {
          if (item.address === nativeTokenAddress) {
            return {
              address: config.contracts?.multicallAddress as Address,
              abi: MULTICALL3_ABI,
              functionName: "getEthBalance",
              args: [account],
            };
          }
          return {
            address: item.address as `0x${string}`,
            abi: erc20Abi,
            functionName: "balanceOf",
            args: [account],
          };
        });
        try {
          const result = await publicClient.multicall({
            contracts: call,
            multicallAddress: multicallAddress,
          });

          const balances = await Promise.all(
            result.map(async (item: any, index: number) => {
              const token = fullTokenList[index];
              if (item.error) {
                await mutate([...QUERY_KEY, getAddress(token?.address ?? "")], {
                  balance: 0n,
                  formattedBalance: "0",
                  ...token,
                });
                return { balance: 0n, formattedBalance: "0", ...token };
              }
              const formattedBalance = formatUnits(
                item.result,
                token?.decimals || 18,
              );

              const resultBalanceToken: BalanceToken = {
                balance: item.result,
                formattedBalance: formattedBalance.includes("e")
                  ? "0"
                  : formattedBalance,
                ...token,
              } as BalanceToken;
              await mutate([...QUERY_KEY, token?.address], resultBalanceToken);
              return resultBalanceToken;
            }),
          );
          return balances;
        } catch (error) {
          console.log(error);
        }
      }
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
