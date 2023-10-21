import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits, type Address } from "viem";
import { usePublicClient } from "wagmi";

import { PRICE_AGGREGATOR_ABI } from "~/config";
import POLLING from "~/config/constants/polling";

export const usePollBHoneyPrice = () => {
  const publicClient = usePublicClient();
  const method = "tokenPriceDai";
  const QUERY_KEY = ["bhoney", method];
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      try {
        const result = await publicClient.readContract({
          address: process.env
            .NEXT_PUBLIC_PRICE_AGGREGATOR_CONTRACT_ADDRESS as Address,
          abi: PRICE_AGGREGATOR_ABI,
          functionName: method,
          args: [],
        });
        console.log("result", result);
        return result;
      } catch (e) {
        console.error(e);
        return undefined;
      }
    },
    {
      refreshInterval: POLLING.FAST,
    },
  );

  const useHoneyPrice = () => {
    const { data = 0 } = useSWRImmutable(QUERY_KEY);
    return data;
  };

  const useFormattedHoneyPrice = () => {
    const { data = 0 } = useSWRImmutable(QUERY_KEY);
    return formatUnits(data, 10);
  };
  return {
    useFormattedHoneyPrice,
    useHoneyPrice,
    isLoading,
  };
};
