import { useMemo } from "react";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits } from "viem";
import { usePublicClient, type Address } from "wagmi";

import { BTOKEN_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraJs } from "~/contexts";
import { usePollBHoneyBalance } from "./usePollBHoneyBalance";

export const usePollBHoneyPendingWithdraw = () => {
  const publicClient = usePublicClient();
  const { useBHoneyBalance } = usePollBHoneyBalance();
  const { isConnected, account } = useBeraJs();
  const QUERY_KEY = [account, isConnected, "maxWithdraw"];
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      if (isConnected) {
        try {
          const result = await publicClient.readContract({
            address: process.env.NEXT_PUBLIC_GTOKEN_CONTRACT_ADDRESS as Address,
            abi: BTOKEN_ABI,
            functionName: "totalSharesBeingWithdrawn",
            args: [account as Address],
          });
          return result;
        } catch (e) {
          console.error(e);
          return 0;
        }
      }
      return 0;
    },
    {
      refreshInterval: POLLING.FAST,
    },
  );

  const useBHoneyPendingWithdraw = () => {
    const { data = 0 } = useSWRImmutable(QUERY_KEY);
    return data;
  };

  const useFormattedBHoneyPendingWithdraw = () => {
    const { data = 0 } = useSWRImmutable(QUERY_KEY);
    return Number(formatUnits(data as bigint, 18));
  };

  const useBHoneyEligibleWithdraw = () => {
    const bHoneyBalance = useBHoneyBalance();
    const { data = 0 } = useSWRImmutable(QUERY_KEY);
    return useMemo(() => {
      return Number(formatUnits(BigInt(bHoneyBalance) - BigInt(data), 18));
    }, [bHoneyBalance, data]);
  };
  return {
    isLoading,
    useBHoneyPendingWithdraw,
    useFormattedBHoneyPendingWithdraw,
    useBHoneyEligibleWithdraw,
  };
};
