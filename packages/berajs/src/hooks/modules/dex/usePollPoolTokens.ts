import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient } from "wagmi";

import { getContracts } from "~/api/contracts";
import { DEX_PRECOMPILE_ABI, DEX_PRECOMPILE_ADDRESS } from "~/config";
import POLLING from "~/config/constants/polling";

interface Call {
  abi: any[];
  address: `0x${string}`;
  functionName: string;
  args: any[];
}

export const usePollPoolTokens = (poolAddress: `0x${string}`) => {
  const publicClient = usePublicClient();

  const QUERY_KEY = [poolAddress, "poolData"];
  useSWR(
    QUERY_KEY,
    async () => {
      const call: Call[] = [
        {
          abi: DEX_PRECOMPILE_ABI,
          address: DEX_PRECOMPILE_ADDRESS,
          functionName: "getLiquidity",
          args: [poolAddress],
        },
        {
          abi: DEX_PRECOMPILE_ABI,
          address: DEX_PRECOMPILE_ADDRESS,
          functionName: "getTotalShares",
          args: [poolAddress],
        },
      ];
      const contracts = getContracts();
      const result = await publicClient.multicall({
        contracts: call,
        multicallAddress: contracts.multicall as `0x${string}`,
      });
      return result;
    },
    {
      refreshInterval: POLLING.NORMAL,
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
