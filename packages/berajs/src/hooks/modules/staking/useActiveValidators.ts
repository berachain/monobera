import { readContract } from "@wagmi/core";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

import abi from "../../../config/abi/modules/staking/IStakingModule.abi";
import { STAKING_PRECOMPILE_ADDRESS } from "./constants";

const REFRESH_INTERVAL = 2000;

export const useGetRawValidators = () => {
  useSWR(
    "rawValidators",
    async () => {
      const result = await readContract({
        address: STAKING_PRECOMPILE_ADDRESS,
        abi,
        functionName: "getActiveValidators",
      });

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
