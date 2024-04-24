import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient } from "wagmi";
import { referralsAbi } from "~/abi";
import { perpsReferralsAddress } from "@bera/config";

import { useBeraJs } from "~/contexts";
import { type Address } from "viem";
import POLLING from "~/enum/polling";

export const usePollReferralsDetails = () => {
  const publicClient = usePublicClient();
  const { account } = useBeraJs();
  const method = "referrerDetails";
  const QUERY_KEY = [account, method];
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      if (!publicClient) return undefined;
      try {
        const result = await publicClient.readContract({
          address: perpsReferralsAddress,
          abi: referralsAbi,
          functionName: method,
          args: [account as Address],
        });
        return result;
      } catch (e) {}
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
