import { gTokenContractAddress } from "@bera/config";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits } from "viem";
import { usePublicClient } from "wagmi";

import { BTOKEN_ABI } from "~/config";
import POLLING from "~/config/constants/polling";

export const usePollBHoneySupply = () => {
  const publicClient = usePublicClient();
  const method = "totalSupply";
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

  const useBHoneySupply = () => {
    const { data = 0 } = useSWRImmutable(QUERY_KEY);
    return data;
  };

  const useFormattedBHoneySupply = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    if (!data) return 0;
    return Number(formatUnits(data, 18));
  };
  return {
    useFormattedBHoneySupply,
    useBHoneySupply,
    isLoading,
  };
};
