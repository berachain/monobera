import { readContract } from "@wagmi/core";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits } from "viem";

import abi from "../../../config/abi/modules/staking/IStakingModule.abi";
import { useBeraJs } from "../../../contexts";
import { STAKING_PRECOMPILE_ADDRESS } from "./constants";

const REFRESH_INTERVAL = 2000;

export const useGetAccountDelegation = (validator_address: string) => {
  const { account: address, error } = useBeraJs();
  useSWR(
    [address, validator_address, "rawDelegation"],
    async () => {
      if (address && !error) {
        const result = await readContract({
          address: STAKING_PRECOMPILE_ADDRESS,
          abi,
          functionName: "getDelegation",
          args: [address, validator_address],
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

export const useSelectedAccountDelegation = (validatorAddress: string) => {
  const { account } = useBeraJs();

  const { data: rawDelegation = undefined } = useSWRImmutable([
    account,
    validatorAddress,
    "rawDelegation",
  ]);
  return rawDelegation;
};
