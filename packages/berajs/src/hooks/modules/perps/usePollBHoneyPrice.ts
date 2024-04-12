import { gTokenContractAddress } from "@bera/config";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits } from "viem";
import { usePublicClient } from "wagmi";

import { BTOKEN_ABI } from "~/config";
import POLLING from "~/config/constants/polling";

export const usePollBHoneyPrice = () => {
  const publicClient = usePublicClient();
  const method = "shareToAssetsPrice";
  const QUERY_KEY = ["bhoney", method];
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      if (!publicClient) return undefined;
      try {
        const result = await publicClient.readContract({
          address: gTokenContractAddress,
          abi: BTOKEN_ABI,
          functionName: method,
          args: [],
        });
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
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    if (!data) return 0;
    return Number(formatUnits(data, 18));
  };

  const useFormattedHoneyPrice = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    if (!data) return 0;
    return 1 / Number(formatUnits(data, 18));
  };
  return {
    useFormattedHoneyPrice,
    useHoneyPrice,
    isLoading,
  };
};
