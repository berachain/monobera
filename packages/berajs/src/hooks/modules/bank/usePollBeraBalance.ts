import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits } from "viem";
import { usePublicClient } from "wagmi";

import { BANK_PRECOMPILE_ABI, BANK_PRECOMPILE_ADDRESS } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraJs } from "~/contexts";

// this is going to be slow for now until we have event indexing
export const usePollBeraBalance = () => {
  const publicClient = usePublicClient();
  const { isConnected, account } = useBeraJs();
  const method = "getBalance";
  const denom = 'abera'
  const QUERY_KEY = [account, method, denom];
  useSWR(
    QUERY_KEY,
    async () => {
      if (isConnected) {
        try {
          const result = await publicClient.readContract({
            address: BANK_PRECOMPILE_ADDRESS,
            abi: BANK_PRECOMPILE_ABI,
            functionName: method,
            args: [account, denom],
          });
          return formatUnits(result as bigint, 18);

        } catch(e) {
          console.error(e)
        }
      }
      return undefined;
    },
    {
      refreshInterval: POLLING.FAST,
    },
  );

  const useBeraBalance = () => {
    const { data = 0 } = useSWRImmutable(QUERY_KEY);
    return Number(data).toFixed(4);
  };
  return {
    useBeraBalance,
  };
};
