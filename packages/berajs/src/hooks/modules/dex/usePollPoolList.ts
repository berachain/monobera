import { erc20DexAddress, multicallAddress } from "@bera/config";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient } from "wagmi";

import { DEX_PRECOMPILE_ABI } from "~/config";
import POLLING from "~/config/constants/polling";

interface Call {
  abi: any[];
  address: `0x${string}`;
  functionName: string;
  args: any[];
}

export const usePollPoolList = (poolAddress: `0x${string}`) => {
  const publicClient = usePublicClient();
  const QUERY_KEY = [poolAddress, "poolData"];
  useSWR(
    QUERY_KEY,
    async () => {
      if (!publicClient) return undefined;
      const call: Call[] = [
        {
          abi: DEX_PRECOMPILE_ABI,
          address: erc20DexAddress,
          functionName: "getLiquidity",
          args: [poolAddress],
        },
        {
          abi: DEX_PRECOMPILE_ABI,
          address: erc20DexAddress,
          functionName: "getTotalShares",
          args: [poolAddress],
        },
      ];

      const result = await publicClient.multicall({
        contracts: call,
        multicallAddress: multicallAddress,
      });
      return result;
    },
    {
      refreshInterval: POLLING.SLOW,
    },
  );

  const usePoolTokens = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };
  return {
    usePoolTokens,
  };
};
