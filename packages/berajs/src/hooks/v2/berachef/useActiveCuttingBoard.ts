import useSWRImmutable from "swr/immutable";
import { usePublicClient } from "wagmi";

import { BERACHEF_ABI } from "~/config/v2/abi";
import { useBeraConfig } from "~/contexts";

export const useActiveCuttingBoard = (validatorAddress: `0x${string}`) => {
  const publicClient = usePublicClient();
  const { networkConfig } = useBeraConfig();

  const method = "getActiveCuttingBoard";
  // validatorCoinbaseAddr
  const QUERY_KEY = [validatorAddress, method];
  return useSWRImmutable(QUERY_KEY, async () => {
    const result = await publicClient.readContract({
      address: "0x0", // Berachef contract address
      abi: BERACHEF_ABI,
      functionName: method,
      args: [validatorAddress],
    });

    return result;
  });
};
