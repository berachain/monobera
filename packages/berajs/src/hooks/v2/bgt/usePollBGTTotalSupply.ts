import useSWR, { mutate } from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient } from "wagmi";

import POLLING from "~/config/constants/polling";
import { BGT_ABI } from "~/config/v2/abi";
import { useBeraConfig } from "~/contexts";

export const usePollBGTTotalSupply = () => {
  const method = "totalSupply";
  const QUERY_KEY = [method];
  const publicClient = usePublicClient();
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      try {
        const bgtTotalSupply = await publicClient.readContract({
          address: "0x0", // TODO: BGT contract address
          abi: BGT_ABI,
          functionName: method,
          args: [],
        });

        if (!bgtTotalSupply) {
          return undefined;
        }
        return {
          bgtTotalSupply,
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

  const useTotalBGTSupply = () => {
    const { data = undefined } = useSWRImmutable<number | undefined>(QUERY_KEY);
    return data;
  };

  return {
    isLoading,
    useTotalBGTSupply,
    refresh: () => void mutate(QUERY_KEY),
  };
};
