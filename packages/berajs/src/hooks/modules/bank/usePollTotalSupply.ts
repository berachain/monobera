import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits, type Address } from "viem";
import { usePublicClient } from "wagmi";

import { BANK_PRECOMPILE_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraConfig } from "~/contexts";

export const usePollTotalSupply = (denom: string | undefined) => {
  const publicClient = usePublicClient();
  const { networkConfig } = useBeraConfig();

  const method = "getSupply";
  const QUERY_KEY = [denom, method];
  useSWR(
    QUERY_KEY,
    async () => {
      if (!publicClient) return undefined;
      if (!denom) return;
      const result = await publicClient.readContract({
        address: networkConfig.precompileAddresses.bankAddress as Address,
        abi: BANK_PRECOMPILE_ABI,
        functionName: method,
        args: [denom],
      });

      return formatUnits(result as bigint, 18);
    },
    {
      refreshInterval: POLLING.FAST,
    },
  );

  const useTotalSupply = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };
  return {
    useTotalSupply,
  };
};
