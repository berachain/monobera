import useSWR from "swr";
import { usePublicClient } from "wagmi";
import { borrowingAbi } from "~/abi";
import { perpsBorrowingContractAddress } from "@bera/config";

import { useBeraJs } from "~/contexts";
import POLLING from "~/enum/polling";

export const usePollOrdersLiqFeePrices = (indices: number[]) => {
  const publicClient = usePublicClient();
  const { account } = useBeraJs();
  const method = "getTradesLiquidationPrices";
  const QUERY_KEY = [account, "orders", method, indices];
  const { data, isLoading, isValidating } = useSWR(
    QUERY_KEY,
    async () => {
      if (!publicClient) return undefined;
      try {
        if (indices.length === 0) return [];
        const result = await publicClient.readContract({
          address: perpsBorrowingContractAddress,
          abi: borrowingAbi,
          functionName: method,
          args: [indices],
        });
        return result;
      } catch (e) {
        console.error(e);
      }
    },
    {
      refreshInterval: POLLING.NORMAL,
    },
  );

  return {
    isValidating,
    isLoading,
    data,
  };
};
