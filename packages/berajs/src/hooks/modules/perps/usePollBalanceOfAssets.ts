import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits, type Address } from "viem";
import { usePublicClient } from "wagmi";

import { BTOKEN_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraJs } from "~/contexts";

export const usePollBalanceOfAssets = () => {
  const publicClient = usePublicClient();
  const method = "balanceOfAssets";
  const { account } = useBeraJs();
  const QUERY_KEY = ["bhoney", method, account];
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      try {
        if (account) {
          const result = await publicClient.readContract({
            address: process.env.NEXT_PUBLIC_GTOKEN_CONTRACT_ADDRESS as Address,
            abi: BTOKEN_ABI,
            functionName: method,
            args: [account],
          });

          return result;
        }
        return undefined;
      } catch (e) {
        console.error(e);
        return undefined;
      }
    },
    {
      refreshInterval: POLLING.FAST,
    },
  );

  const useBalanceOfAssets = () => {
    const { data = 0 } = useSWRImmutable(QUERY_KEY);
    return data;
  };

  const useFormattedBalanceOfAssets = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    if (!data) return 0;
    return Number(formatUnits(data, 18));
  };
  return {
    useFormattedBalanceOfAssets,
    useBalanceOfAssets,
    isLoading,
  };
};
