import { useMemo } from "react";
import { gTokenContractAddress } from "@bera/config";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits, type Address } from "viem";
import { usePublicClient } from "wagmi";

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
      if (!publicClient) return undefined;

      if (isConnected) {
        try {
          const result = await publicClient.readContract({
            address: gTokenContractAddress,
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
      return formatUnits(BigInt(bHoneyBalance) - BigInt(data), 18);
    }, [bHoneyBalance, data]);
  };
  return {
    isLoading,
    useBHoneyPendingWithdraw,
    useFormattedBHoneyPendingWithdraw,
    useBHoneyEligibleWithdraw,
  };
};
