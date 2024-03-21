import { stakingAddress } from "@bera/config";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits } from "viem";
import { usePublicClient } from "wagmi";

import { STAKING_PRECOMPILE_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraJs } from "~/contexts";

export const usePollAccountDelegations = (
  validatorAddress: `0x${string}` | undefined,
) => {
  const { account: address } = useBeraJs();
  const publicClient = usePublicClient();
  const method = "getDelegation";
  const QUERY_KEY = [address, validatorAddress, method];
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      if (!publicClient) return undefined;
      if (address && validatorAddress) {
        const result = await publicClient
          .readContract({
            address: stakingAddress,
            abi: STAKING_PRECOMPILE_ABI,
            functionName: method,
            args: [address, validatorAddress],
          })
          .catch(() => {
            return undefined;
          });

        const castedDelegation = result as bigint;
        const parsedDelegation = formatUnits(castedDelegation, 18);

        return parsedDelegation;
      }
      return undefined;
    },
    {
      refreshInterval: POLLING.SLOW,
    },
  );

  const useSelectedAccountDelegation = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };

  return {
    isLoading,
    useSelectedAccountDelegation,
  };
};
