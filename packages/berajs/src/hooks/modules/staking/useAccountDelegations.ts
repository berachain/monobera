import { readContract } from "@wagmi/core";
import useSWR, { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits } from "viem";

import abi from "../../../config/abi/modules/staking/IStakingModule.abi";
import { useBeraJs } from "../../../contexts";

const REFRESH_INTERVAL = 2000;

// Default Address of the Staking Precompile Contract on Polaris.
// More information here: TODO: Add link to docs
const STAKING_PRECOMPILE_ADDRESS = "0xd9A998CaC66092748FfEc7cFBD155Aae1737C2fF";

export const useGetAccountDelegation = (validator_address: string) => {
  const { mutate } = useSWRConfig();
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

        await mutate(
          [address, validator_address, parsedDelegation, "rawDelegation"],
          parsedDelegation,
        );

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
