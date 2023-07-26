import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient, type Address } from "wagmi";

import { BGT_PRECOMPILE_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraConfig } from "~/contexts";

export const usePollActiveBribesForValidator = (
  validatorAddress: `0x${string}`,
) => {
  const publicClient = usePublicClient();
  const { networkConfig } = useBeraConfig();

  const method = "getActiveBribesForValidator";
  const QUERY_KEY = [validatorAddress, method];
  useSWR(
    QUERY_KEY,
    async () => {
      const result = await publicClient.readContract({
        address: networkConfig.precompileAddresses.erc20BgtAddress as Address,
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
