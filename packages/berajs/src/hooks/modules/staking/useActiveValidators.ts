import { readContract } from "@wagmi/core";
import useSWR, { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";

import abi from "../../../config/abi/modules/staking/IStakingModule.abi";

const REFRESH_INTERVAL = 2000;

// Default Address of the Staking Precompile Contract on Polaris.
// More information here: TODO: Add link to docs
const STAKING_PRECOMPILE_ADDRESS = "0xd9A998CaC66092748FfEc7cFBD155Aae1737C2fF";

export const useGetRawValidators = () => {
  const { mutate } = useSWRConfig();

  useSWR(
    "rawValidators",
    async () => {
      const result = await readContract({
        address: STAKING_PRECOMPILE_ADDRESS,
        abi,
        functionName: "getActiveValidators",
      });

      await mutate([result, "rawValidators"], result);

      return result;
    },
    {
      refreshInterval: REFRESH_INTERVAL,
    },
  );
};

export const useActiveValidators = () => {
  const { data: rawValidators = undefined } = useSWRImmutable("rawValidators");
  return rawValidators;
};
