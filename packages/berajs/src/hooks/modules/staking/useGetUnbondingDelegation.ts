import { readContract } from "@wagmi/core";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits } from "viem";

import abi from "../../../config/abi/modules/staking/IStakingModule.abi";
import { useBeraJs } from "../../../contexts";
import { STAKING_PRECOMPILE_ADDRESS } from "./constants";

const REFRESH_INTERVAL = 2000;

export const useSetUnbondingDelegation = (validatorAddress: `0x${string}`) => {
  const { account: address, error } = useBeraJs();
  useSWR(
    [address, validatorAddress, "rawDelegation"],
    async () => {
      if (address && !error) {
        const result = await readContract({
          address: STAKING_PRECOMPILE_ADDRESS,
          abi,
          functionName: "getUnbondingDelegation",
          args: [address, validatorAddress],
        });

        const castedDelegation = result as bigint;
        const parsedDelegation = formatUnits(castedDelegation, 0).toString();

        return parsedDelegation;
      }
      return undefined;
    },
    {
      refreshInterval: REFRESH_INTERVAL,
    },
  );
};

export const useGetUnbondingDelegation = (validatorAddress: `0x${string}`) => {
  const { account } = useBeraJs();

  const { data: unbondingDelegations = undefined } = useSWRImmutable([
    account,
    validatorAddress,
    "unbondingDelegations",
  ]);
  return unbondingDelegations;
};
