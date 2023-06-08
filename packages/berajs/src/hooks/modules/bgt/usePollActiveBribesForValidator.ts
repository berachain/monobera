import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient } from "wagmi";

import { BGT_PRECOMPILES_ADDRESS, BGT_PRECOMPILE_ABI } from "~/config";
import POLLING from "~/config/constants/polling";

export const usePollActiveBribesForValidator = (
  validatorAddress: `0x${string}`,
) => {
  const publicClient = usePublicClient();

  const method = "getActiveBribesForValidator";
  const QUERY_KEY = [validatorAddress, method];
  useSWR(
    QUERY_KEY,
    async () => {
      const result = await publicClient.readContract({
        address: BGT_PRECOMPILES_ADDRESS,
        abi: BGT_PRECOMPILE_ABI,
        functionName: method,
        args: [validatorAddress],
      });

      return result;
    },
    {
      refreshInterval: POLLING.NORMAL,
    },
  );

  const useActiveBribesForValidator = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };
  return {
    useActiveBribesForValidator,
  };
};
