import { gTokenContractAddress } from "@bera/config";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits } from "viem";
import { usePublicClient } from "wagmi";

import { BTOKEN_ABI } from "~/abi";
import POLLING from "~/enum/polling";

export const usePollBHoneyCollateralization = () => {
  const publicClient = usePublicClient();
  const method = "collateralizationP";
  const QUERY_KEY = ["bhoney", method];
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      try {
        if (!publicClient) return undefined;
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

  const useBHoneyCollateralization = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    if (!data) return 0;
    return Number(formatUnits(data, 18));
  };

  return {
    useBHoneyCollateralization,
    isLoading,
  };
};
