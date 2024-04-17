import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient } from "wagmi";
import { referralsAbi } from "~/abi";
import { perpsReferralsAddress } from "@bera/config";

import POLLING from "~/enum/polling";

export const usePollTraderReferral = (traderAddress: string) => {
  const publicClient = usePublicClient();
  const method = "getTraderReferrer";
  const QUERY_KEY = [traderAddress, method];
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      if (!publicClient) return undefined;
      try {
        const result = await publicClient.readContract({
          address: perpsReferralsAddress,
          abi: referralsAbi,
          functionName: method,
          args: [traderAddress],
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

  const useGetTraderReferrer = () => {
    const { data } = useSWRImmutable(QUERY_KEY);
    return data;
  };

  return {
    isLoading,
    useGetTraderReferrer,
  };
};
