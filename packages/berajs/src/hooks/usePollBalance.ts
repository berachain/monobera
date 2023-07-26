import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits } from "viem";
import { erc20ABI, usePublicClient, type Address } from "wagmi";

import POLLING from "~/config/constants/polling";
import { type Token } from "../api/currency/tokens";
import { useBeraConfig, useBeraJs } from "../contexts";

interface BalanceToken extends Token {
  balance: bigint;
  formattedBalance: string;
}

interface Call {
  abi: typeof erc20ABI;
  address: `0x${string}`;
  functionName: string;
  args: any[];
}

export const usePollBalance = ({
  address,
}: {
  address: string | undefined;
}) => {
  const publicClient = usePublicClient();
  const { account, error } = useBeraJs();
  const { networkConfig } = useBeraConfig();

  const QUERY_KEY = [account, address, "balance"];
  useSWR(
    QUERY_KEY,
    async () => {
      if (account && !error && address) {
        const call: Call[] = [
          {
            address: address as `0x${string}`,
            abi: erc20ABI,
            functionName: "balanceOf",
            args: [account],
          },
          {
            address: address as `0x${string}`,
            abi: erc20ABI,
            functionName: "symbol",
            args: [],
          },
          {
            address: address as `0x${string}`,
            abi: erc20ABI,
            functionName: "name",
            args: [],
          },
          {
            address: address as `0x${string}`,
            abi: erc20ABI,
            functionName: "decimals",
            args: [],
          },
        ];
        const result = await publicClient.multicall({
          contracts: call,
          multicallAddress: networkConfig.precompileAddresses
            .multicallAddress as Address,
        });

        const balance: BalanceToken = {
          balance: result[0]?.result as bigint,
          formattedBalance: formatUnits(
            result[0]?.result as bigint,
            (result[3]?.result as number) ?? 18,
          ),
          address: address,
          decimals: result[3]?.result as number,
          symbol: result[1]?.result as string,
          name: result[2]?.result as string,
          default: false,
        };
        return balance;
      }

      return undefined;
    },
    {
      refreshInterval: POLLING.FAST,
    },
  );
  const useBalance = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };
  return {
    useBalance,
  };
};
