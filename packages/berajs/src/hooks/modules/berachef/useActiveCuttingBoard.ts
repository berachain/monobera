import { erc20BgtAddress } from "@bera/config";
import useSWRImmutable from "swr/immutable";
import { usePublicClient } from "wagmi";

import { BGT_PRECOMPILE_ABI } from "~/config";

export const useActiveCuttingBoard = (validatorAddress: `0x${string}`) => {
  const publicClient = usePublicClient();
  const method = "getActiveCuttingBoard";
  const QUERY_KEY = [validatorAddress, method];
  return useSWRImmutable(QUERY_KEY, async () => {
    if (!publicClient) return undefined;
    const result = await publicClient.readContract({
      address: erc20BgtAddress,
      abi: BGT_PRECOMPILE_ABI,
      functionName: method,
      args: [validatorAddress],
    });

    return result;
  });
};
