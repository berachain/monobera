import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits } from "viem";
import { usePublicClient } from "wagmi";

import { STAKING_PRECOMPILE_ABI, STAKING_PRECOMPILE_ADDRESS } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraJs } from "~/contexts";

export const usePollAccountDelegations = (validatorAddress: `0x${string}`) => {
  const { account: address, error } = useBeraJs();
  const publicClient = usePublicClient();
  const method = "getDelegation";
  const QUERY_KEY = [address, validatorAddress, method];
  useSWR(
    QUERY_KEY,
    async () => {
      if (address && !error) {
        const result = await publicClient.readContract({
          address: STAKING_PRECOMPILE_ADDRESS,
          abi: STAKING_PRECOMPILE_ABI,
          functionName: method,
          args: [address, validatorAddress],
        });

        const castedDelegation = result as bigint;
        const parsedDelegation = formatUnits(castedDelegation, 18).toString();

        return parsedDelegation;
      }
      return undefined;
    },
    {
      refreshInterval: POLLING.FAST,
    },
  );

  const useSelectedAccountDelegation = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };

  return {
    useSelectedAccountDelegation,
  };
};
