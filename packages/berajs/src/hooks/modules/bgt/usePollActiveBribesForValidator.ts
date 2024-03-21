import { erc20BribeModule } from "@bera/config";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient } from "wagmi";

import { BRIBE_PRECOMPILE_ABI } from "~/config";
import POLLING from "~/config/constants/polling";

export const usePollActiveBribesForValidator = (
  validatorAddress: `0x${string}`,
) => {
  const publicClient = usePublicClient();
  const method = "getActiveValidatorBribes";
  const QUERY_KEY = [validatorAddress, method];
  useSWR(
    QUERY_KEY,
    async () => {
      if (!validatorAddress) return undefined;
      if (!publicClient) return undefined;
      const result = await publicClient
        .readContract({
          address: erc20BribeModule,
          abi: BRIBE_PRECOMPILE_ABI,
          functionName: method,
          args: [validatorAddress],
        })
        .catch((e) => {
          console.log(e);
          return undefined;
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
