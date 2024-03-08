import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient, type Address } from "wagmi";
import { REFERRALS_ABI } from "~/config";
import { perpsReferralsAddress } from "@bera/config";

import POLLING from "~/config/constants/polling";
import { useBeraJs } from "~/contexts";

export const usePollReferralsDetails = () => {
  const publicClient = usePublicClient();
  const { account } = useBeraJs();
  const method = "referrerDetails";
  const QUERY_KEY = [account, method];
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      try {
        const result = await publicClient.readContract({
          address: perpsReferralsAddress,
          abi: REFERRALS_ABI,
          functionName: method,
          args: [account as Address],
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

  const useGetReferralsDetails = () => {
    const { data } = useSWRImmutable(QUERY_KEY);
    return data;
  };

  return {
    isLoading,
    useGetReferralsDetails,
  };
};
