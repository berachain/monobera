import { multicallAddress, nativeTokenAddress } from "@bera/config";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { erc20Abi, formatEther, formatUnits, getAddress } from "viem";
import { usePublicClient } from "wagmi";

import { multicall3Abi } from "~/abi";
import POLLING from "~/enum/polling";
import { useBeraJs } from "../../contexts";
import { BalanceToken } from "~/types/dex";
import { DefaultHookReturnType } from "..";

interface Call {
  abi: typeof erc20Abi;
  address: `0x${string}`;
  functionName: string;
  args: any[];
}

export const usePollBalance = ({
  address,
  owner,
}: {
  address: string | undefined;
  owner?: string | undefined;
}): DefaultHookReturnType<BalanceToken | undefined> & {
  /**
   *
   * @deprecated you can use data instead
   */
  useBalance: () => BalanceToken | undefined;
} => {
  const publicClient = usePublicClient();
  const { account } = useBeraJs();
  const assetOwner = owner ?? account;

  const QUERY_KEY =
    publicClient && address ? [assetOwner, address, "balance"] : null;

  // TODO: it would be better if we used useSWRImmutable here for token info, and a dynamic query for balance
  const { isLoading, data, ...rest } = useSWR<BalanceToken | undefined>(
    QUERY_KEY,
    async () => {
      if (!publicClient) return undefined;
      if (assetOwner && address) {
        if (address !== nativeTokenAddress) {
          const call: Call[] = [
            {
              address: address as `0x${string}`,
              abi: erc20Abi,
              functionName: "balanceOf",
              args: [assetOwner],
            },
            {
              address: address as `0x${string}`,
              abi: erc20Abi,
              functionName: "symbol",
              args: [],
            },
            {
              address: address as `0x${string}`,
              abi: erc20Abi,
              functionName: "name",
              args: [],
            },
            {
              address: address as `0x${string}`,
              abi: erc20Abi,
              functionName: "decimals",
              args: [],
            },
          ];
          const result = await publicClient.multicall({
            contracts: call,
            multicallAddress: multicallAddress,
            allowFailure: false,
          });

          const balance: BalanceToken = {
            balance: result[0] as bigint,
            formattedBalance: formatUnits(
              result[0] as bigint,
              (result[3] as number) ?? 18,
            ),
            address: getAddress(address),
            decimals: result[3] as number,
            symbol: result[1] as string,
            name: result[2] as string,
          };
          return balance;
        }
        const call = {
          address: multicallAddress,
          abi: multicall3Abi,
          functionName: "getEthBalance",
          args: [assetOwner],
        };
        const result = await publicClient.readContract(call);
        return {
          balance: result as bigint,
          formattedBalance: formatEther((result as bigint) ?? 0n),
          address,
          decimals: 18,
          symbol: "BERA",
          name: "Berachain",
        } satisfies BalanceToken;
      }
      return undefined;
    },
    {
      refreshInterval: POLLING.FAST,
    },
  );

  const useBalance = () => {
    const { data = undefined } = useSWRImmutable<BalanceToken>(QUERY_KEY);
    return data;
  };

  return {
    ...rest,
    isLoading,
    data,
    refresh: () => rest.mutate(),
    useBalance,
  };
};
