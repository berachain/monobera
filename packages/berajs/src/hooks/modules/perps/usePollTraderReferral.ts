import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient, type Address } from "wagmi";
import { REFERRALS_ABI } from "~/config";
import { perpsReferralsAddress } from "@bera/config";

import POLLING from "~/config/constants/polling";

export const usePollTraderReferral = (traderAddress: string) => {
  const publicClient = usePublicClient();
  const method = "getTraderReferrer";
  const QUERY_KEY = [traderAddress, method];
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      try {
        const result = await publicClient.readContract({
          address: perpsReferralsAddress,
          abi: REFERRALS_ABI,
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
