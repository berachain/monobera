import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits, type Address } from "viem";
import { usePublicClient } from "wagmi";

import { BANK_PRECOMPILE_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraConfig } from "~/contexts";

// this is going to be slow for now until we have event indexing
export const usePollBgtSupply = () => {
  const publicClient = usePublicClient();
  const { networkConfig } = useBeraConfig();

  const method = "getSupply";
  const QUERY_KEY = [method];
  useSWR(
    QUERY_KEY,
    async () => {
      if (!publicClient) return undefined;
      const result = await publicClient.readContract({
        address: networkConfig.precompileAddresses.bankAddress as Address,
        abi: BANK_PRECOMPILE_ABI,
        functionName: method,
        args: [process.env.NEXT_PUBLIC_STAKING_TOKEN],
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
