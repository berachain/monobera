import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits } from "viem";
import { usePublicClient, type Address } from "wagmi";

import { STAKING_PRECOMPILE_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraConfig, useBeraJs } from "~/contexts";

export const usePollAccountDelegations = (validatorAddress: `0x${string}`) => {
  const { account: address, error } = useBeraJs();
  const { networkConfig } = useBeraConfig();

  const publicClient = usePublicClient();
  const method = "getDelegation";
  const QUERY_KEY = [address, validatorAddress, method];
  useSWR(
    QUERY_KEY,
    async () => {
      if (address && !error) {
        const result = await publicClient.readContract({
          address: networkConfig.precompileAddresses.stakingAddress as Address,
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
