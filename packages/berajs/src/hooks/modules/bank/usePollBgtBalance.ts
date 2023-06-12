import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits } from "viem";
import { usePublicClient } from "wagmi";

import { BANK_PRECOMPILE_ABI, BANK_PRECOMPILE_ADDRESS } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraJs } from "~/contexts";

// this is going to be slow for now until we have event indexing
export const usePollBgtBalance = () => {
  const publicClient = usePublicClient();
  const { isConnected, account } = useBeraJs();
  const method = "getBalance";
  const QUERY_KEY = [account, method];
  useSWR(
    QUERY_KEY,
    async () => {
      if (isConnected) {
        const result = await publicClient.readContract({
          address: BANK_PRECOMPILE_ADDRESS,
          abi: BANK_PRECOMPILE_ABI,
          functionName: method,
          args: [account, "abgt"],
        });

        return formatUnits(result as bigint, 18);
      }
      return undefined;
    },
    {
      refreshInterval: POLLING.NORMAL,
    },
  );

  const useBgtBalance = () => {
    const { data = 0 } = useSWRImmutable(QUERY_KEY);
    return data;
  };
  return {
    useBgtBalance,
  };
};
