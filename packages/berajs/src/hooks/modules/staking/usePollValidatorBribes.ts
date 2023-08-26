import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient, type Address } from "wagmi";

import { BRIBE_PRECOMPILE_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraConfig } from "~/contexts";

export const usePollValidatorBribes = (
  validatorAddress: Address | undefined,
) => {
  const publicClient = usePublicClient();
  const { networkConfig } = useBeraConfig();

  const method = "getValidatorBribes";
  const QUERY_KEY = [validatorAddress, method];
  useSWR(
    QUERY_KEY,
    async () => {
      if (!validatorAddress) return undefined;
      const result = await publicClient
        .readContract({
          address: networkConfig.precompileAddresses
            .erc20BribeModule as Address,
          abi: BRIBE_PRECOMPILE_ABI,
          functionName: method,
          args: [validatorAddress],
        })
        .catch((e) => {
          console.log(e);
          return undefined;
        });
      console.log(result);
      return result;
    },
    {
      refreshInterval: POLLING.SLOW,
    },
  );

  const useValidatorBribes = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };

  return {
    useValidatorBribes,
  };
};
