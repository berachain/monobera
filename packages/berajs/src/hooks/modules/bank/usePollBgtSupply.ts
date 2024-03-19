import { bankAddress, stakingToken } from "@bera/config";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits } from "viem";
import { usePublicClient } from "wagmi";

import { BANK_PRECOMPILE_ABI } from "~/config";
import POLLING from "~/config/constants/polling";

// this is going to be slow for now until we have event indexing
export const usePollBgtSupply = () => {
  const publicClient = usePublicClient();

  const method = "getSupply";
  const QUERY_KEY = [method];
  useSWR(
    QUERY_KEY,
    async () => {
      if (!publicClient) return undefined;
      const result = await publicClient.readContract({
        address: bankAddress,
        abi: BANK_PRECOMPILE_ABI,
        functionName: method,
        args: [stakingToken],
      });

      return formatUnits(result as bigint, 18);
    },
    {
      refreshInterval: POLLING.FAST,
    },
  );

  const useBgtSupply = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };
  return {
    useBgtSupply,
  };
};
