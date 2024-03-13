// Exports the following hooks by consumption in bgt-station:
// usePollRedelegations - get a list of redelegations for connected account
// useGetRedelegations - get a list of redelegations for a given account from SWR cache
// useGetRedelegationForSrcValidator - do we need this?
// useGetRedelegationForDstValidator - do we need this?

import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { type Address } from "viem";
import { usePublicClient } from "wagmi";

import { STAKING_PRECOMPILE_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraConfig, useBeraJs } from "~/contexts";

// Returns a list of delegatorAddress's redelegating bonds from srcValidator to dstValidator
// delegatorAddress: useBeraJs().account
// srcValidator: srcValidatorAddress `0x${string}`
// dstValidator: dstValidatorAddress `0x${string}`

export type RedelegationEntry = {
  // creationHeight is the height which the redelegation took place
  creatorHeight: string; // ???
  // completionTime is the unix time for redelegation completion, formatted as a string
  completionTime: string;
  // initialBalance defines the initial balance when redelegation started
  initialBalance: bigint;
  // sharesDst is the amount of destination-validatorAddress shares created by redelegation
  sharesDst: bigint;
  // unbondingId is the incrementing id that uniquely identifies this entry
  unbondingId: string;
};

export const usePollRedelegations = (
  srcValidator: `0x${string}`,
  dstValidator: `0x${string}`,
) => {
  const publicClient = usePublicClient();
  const { account, error } = useBeraJs();
  const { networkConfig } = useBeraConfig();

  const method = "getRedelegations";
  const QUERY_KEY = [account, method];
  useSWR(
    QUERY_KEY,
    async () => {
      if (!publicClient) return undefined;
      if (account && !error) {
        const result = await publicClient.readContract({
          address: networkConfig.precompileAddresses.stakingAddress as Address,
          abi: STAKING_PRECOMPILE_ABI,
          functionName: method,
          args: [account, srcValidator, dstValidator],
        });

        if ((result as RedelegationEntry[]).length) {
          return result;
        }
        return [];
      }
      return undefined;
    },
    {
      refreshInterval: POLLING.FAST,
    },
  );
  const useGetRedelegations = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };

  return {
    useGetRedelegations,
  };
};
