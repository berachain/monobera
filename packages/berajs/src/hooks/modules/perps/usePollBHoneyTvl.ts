import { gTokenContractAddress } from "@bera/config";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits } from "viem";
import { usePublicClient } from "wagmi";

import { bTokenAbi } from "~/abi";
import POLLING from "~/enum/polling";

export const usePollBHoneyTvl = () => {
  const publicClient = usePublicClient();
  const method = "tvl";
  const QUERY_KEY = ["bhoney", method];
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      if (!publicClient) return undefined;
      try {
        const result = await publicClient.readContract({
          address: gTokenContractAddress,
          abi: bTokenAbi,
          functionName: method,
          args: [],
        });
        return result;
      } catch (e) {
        console.error(e);
        return 0;
      }
    },
    {
      refreshInterval: POLLING.FAST,
    },
  );

  const useBHoneyTvl = () => {
    const { data = 0 } = useSWRImmutable(QUERY_KEY);
    return data;
  };

  const useFormattedBHoneyTvl = () => {
    const { data = 0 } = useSWRImmutable(QUERY_KEY);
    return formatUnits(data, 18);
  };
  return {
    useFormattedBHoneyTvl,
    useBHoneyTvl,
    isLoading,
  };
};
