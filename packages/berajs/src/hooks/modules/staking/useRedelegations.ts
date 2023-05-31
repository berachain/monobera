// Exports the following hooks by consumption in bgt-station:
// usePollRedelegations - get a list of redelegations for connected account
// useGetRedelegations - get a list of redelegations for a given account from SWR cache
// useGetRedelegationForSrcValidator - do we need this?
// useGetRedelegationForDstValidator - do we need this?

import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient } from "wagmi";

import abi from "../../../config/abi/modules/staking/IStakingModule.abi";
import POLLING from "../../../config/constants/polling";
import { useBeraJs } from "../../../contexts";
import { STAKING_PRECOMPILE_ADDRESS } from "./constants";

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
  // Grab the user account from bera.js
  const { account: delegatorAddress, error } = useBeraJs();
  useSWR(
    [delegatorAddress, "redelegations"],
    async () => {
      if (delegatorAddress && !error) {
        const result = (await publicClient
          .readContract({
            address: STAKING_PRECOMPILE_ADDRESS,
            abi,
            functionName: "getRedelegations",
            args: [delegatorAddress, srcValidator, dstValidator],
          })
          .catch((e) => {
            console.log(e);
          })) as Array<RedelegationEntry>;

        if (result.length) {
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
};

export const useGetRedelegations = () => {
  const { account: delegatorAddress } = useBeraJs();
  const { data: redelegations = [] } = useSWRImmutable([
    delegatorAddress,
    "redelegations",
  ]);
  return redelegations;
};
