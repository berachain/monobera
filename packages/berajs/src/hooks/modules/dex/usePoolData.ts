import useSWRImmutable from "swr/immutable";
import { usePublicClient } from "wagmi";

import { getContracts } from "~/api/contracts";
import { DEX_PRECOMPILE_ABI, DEX_PRECOMPILE_ADDRESS } from "~/config";

interface Call {
  abi: any[];
  address: `0x${string}`;
  functionName: string;
  args: any[];
}

export const usePoolData = (poolAddress: `0x${string}`) => {
  const publicClient = usePublicClient();

  const QUERY_KEY = [poolAddress, "poolData"];
  return useSWRImmutable(QUERY_KEY, async () => {
    const call: Call[] = [
      {
        abi: DEX_PRECOMPILE_ABI,
        address: DEX_PRECOMPILE_ADDRESS,
        functionName: "getPoolName",
        args: [poolAddress],
      },
      {
        abi: DEX_PRECOMPILE_ABI,
        address: DEX_PRECOMPILE_ADDRESS,
        functionName: "getPoolOptions",
        args: [poolAddress],
      },
    ];
    const contracts = getContracts();
    const result = await publicClient.multicall({
      contracts: call,
      multicallAddress: contracts.multicall as `0x${string}`,
    });
    return result;
  });
};
