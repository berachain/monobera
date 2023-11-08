import useSWR, { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits, type Address } from "viem";
import { usePublicClient } from "wagmi";

import { BTOKEN_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraJs } from "~/contexts";

export const usePollPerpsBgtRewards = () => {
  const publicClient = usePublicClient();
  const method = "pendingBGT";
  const { account } = useBeraJs();
  const QUERY_KEY = [account, method];
  const { mutate } = useSWRConfig();
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      try {
        const result = await publicClient.readContract({
          address: process.env.NEXT_PUBLIC_GTOKEN_CONTRACT_ADDRESS as Address,
          abi: BTOKEN_ABI,
          functionName: method,
          args: [account],
        });

        console.log("result", result);

        return Number(formatUnits(result as bigint, 18));
      } catch (e) {
        console.error(e);
        return undefined;
      }
    },
    {
      refreshInterval: POLLING.FAST,
    },
  );

  const useBgtRewards = () => {
    const { data = undefined } = useSWRImmutable<number | undefined>(QUERY_KEY);
    return data;
  };
  return {
    QUERY_KEY,
    refetch: () => mutate(QUERY_KEY),
    useBgtRewards,
    isLoading,
  };
};
