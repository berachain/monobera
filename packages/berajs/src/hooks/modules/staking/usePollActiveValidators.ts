import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient } from "wagmi";

import { STAKING_PRECOMPILE_ABI, STAKING_PRECOMPILE_ADDRESS } from "~/config";

const REFRESH_INTERVAL = 2000;

export const usePollRawValidators = () => {
  const publicClient = usePublicClient();
  useSWR(
    "getValidators",
    async () => {
      const result = await publicClient.readContract({
        address: STAKING_PRECOMPILE_ADDRESS,
        abi: STAKING_PRECOMPILE_ABI,
        functionName: "getValidators",
        args: [],
      });

      return result;
    },
    {
      refreshInterval: REFRESH_INTERVAL,
    },
  );
  const useActiveValidators = () => {
    const { data = undefined } = useSWRImmutable("getValidators");
    return data;
  };
  return {
    useActiveValidators,
  };
};
