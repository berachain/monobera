import useSWR, { mutate } from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient } from "wagmi";

import POLLING from "~/config/constants/polling";
import { BGT_ABI } from "~/config/v2/abi";
import { useBeraConfig } from "~/contexts";

export const usePollAllowance = () => {
  const method = "allownace";
  const QUERY_KEY = [method];
  const publicClient = usePublicClient();
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      try {
        const allownace = await publicClient.readContract({
          address: "0x0", // TODO: BGT contract address
          abi: BGT_ABI,
          functionName: method,
          args: [],
        });

        if (!allownace) {
          return undefined;
        }
        return {
          allownace,
        };
      } catch (e) {
        console.log(e);
        return undefined;
      }
    },
    {
      refreshInterval: POLLING.NORMAL,
    },
  );

  const useAllowance = () => {
    const { data = undefined } = useSWRImmutable<number | undefined>(QUERY_KEY);
    return data;
  };

  return {
    isLoading,
    useAllowance,
    refresh: () => void mutate(QUERY_KEY),
  };
};
