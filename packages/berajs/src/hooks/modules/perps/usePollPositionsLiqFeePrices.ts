import useSWR from "swr";
import { usePublicClient } from "wagmi";
import { borrowingAbi } from "~/abi";
import { perpsBorrowingContractAddress } from "@bera/config";

import { useBeraJs } from "~/contexts";
import POLLING from "~/enum/polling";

export const usePollPositionsLiqFeePrices = (indices: number[]) => {
  const publicClient = usePublicClient();
  const { account } = useBeraJs();
  const method = "getTradesLiquidationPrices";
  const QUERY_KEY = publicClient
    ? [account, "positions", method, indices]
    : null;
  const { data, isLoading, isValidating } = useSWR<[bigint[], bigint[]]>(
    QUERY_KEY,
    async () => {
      if (!publicClient) return [[], []];
      if (indices.length === 0) return [[], []];
      const result = await publicClient.readContract({
        address: perpsBorrowingContractAddress,
        abi: borrowingAbi,
        functionName: method,
        args: [indices],
      });
      return result as [bigint[], bigint[]];
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
