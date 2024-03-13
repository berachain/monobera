import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { type Address } from "viem";
import { usePublicClient } from "wagmi";

import { DEX_PRECOMPILE_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraConfig } from "~/contexts";

interface Call {
  abi: any[];
  address: `0x${string}`;
  functionName: string;
  args: any[];
}

export const usePollPoolList = (poolAddress: `0x${string}`) => {
  const publicClient = usePublicClient();
  const { networkConfig } = useBeraConfig();

  const QUERY_KEY = [poolAddress, "poolData"];
  useSWR(
    QUERY_KEY,
    async () => {
      if (!publicClient) return undefined;
      const call: Call[] = [
        {
          abi: DEX_PRECOMPILE_ABI,
          address: networkConfig.precompileAddresses.erc20DexAddress as Address,
          functionName: "getLiquidity",
          args: [poolAddress],
        },
        {
          abi: DEX_PRECOMPILE_ABI,
          address: networkConfig.precompileAddresses.erc20DexAddress as Address,
          functionName: "getTotalShares",
          args: [poolAddress],
        },
      ];

      const result = await publicClient.multicall({
        contracts: call,
        multicallAddress: networkConfig.precompileAddresses
          .multicallAddress as Address,
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
