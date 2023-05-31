import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits } from "viem";

import abi from "../../../config/abi/modules/staking/IStakingModule.abi";
import { useBeraJs } from "../../../contexts";
import { STAKING_PRECOMPILE_ADDRESS } from "./constants";
import { usePublicClient } from "wagmi";

const REFRESH_INTERVAL = 2000;

export const useGetAccountDelegation = (validatorAddress: `0x${string}`) => {
  const { account: address, error } = useBeraJs();
  const publicClient = usePublicClient()
  useSWR(
    [address, validatorAddress, "rawDelegation"],
    async () => {
      if (address && !error) {
        const result = await publicClient.readContract({
          address: STAKING_PRECOMPILE_ADDRESS,
          abi,
          functionName: "getDelegation",
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

export const useSelectedAccountDelegation = (validatorAddress: string) => {
  const { account } = useBeraJs();

  const { data: rawDelegation = undefined } = useSWRImmutable([
    account,
    validatorAddress,
    "rawDelegation",
  ]);
  return rawDelegation;
};
