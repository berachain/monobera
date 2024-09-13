import useSWR, { SWRResponse } from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient } from "wagmi";
import { referralsAbi } from "~/abi";
import { perpsReferralsAddress } from "@bera/config";

import POLLING from "~/enum/polling";
import { Address } from "viem";

export const usePollTraderReferral = (
  traderAddress?: Address,
): {
  isLoading: boolean;
  useGetTraderReferrer: () => Address | undefined;
} => {
  const publicClient = usePublicClient();
  const method = "getTraderReferrer";
  const QUERY_KEY = [traderAddress, method];
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      if (!publicClient || !traderAddress) return undefined;
      try {
        const result = await publicClient.readContract({
          address: perpsReferralsAddress,
          abi: referralsAbi,
          functionName: method,
          args: [traderAddress],
        });
        return result;
      } catch (e) {}
    },
    {
      refreshInterval: POLLING.NORMAL,
    },
  );

  const useGetTraderReferrer = () => {
    const { data } = useSWRImmutable(QUERY_KEY);
    return data;
  };

  return {
    isLoading,
    useGetTraderReferrer,
  };
};
