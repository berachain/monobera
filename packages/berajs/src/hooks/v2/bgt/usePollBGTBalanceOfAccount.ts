import useSWR, { mutate } from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient } from "wagmi";

import POLLING from "~/config/constants/polling";
import { BGT_ABI } from "~/config/v2/abi";
import { useBeraConfig } from "~/contexts";

export const usePollBGTBalanceOfAccount = (accountAddress: `0x${string}`) => {
  const method = "balanceOf";
  const QUERY_KEY = [method, accountAddress];
  const publicClient = usePublicClient();
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      try {
        const bgtBalanceOfAccount = await publicClient.readContract({
          address: "0x0", // TODO: BGT contract address
          abi: BGT_ABI,
          functionName: method,
          args: [],
        });

        if (!bgtBalanceOfAccount) {
          return undefined;
        }
        return {
          bgtBalanceOfAccount,
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

  const useBGTBalanceOfAccount = () => {
    const { data = undefined } = useSWRImmutable<number | undefined>(QUERY_KEY);
    return data;
  };

  return {
    isLoading,
    useBGTBalanceOfAccount,
    refresh: () => void mutate(QUERY_KEY),
  };
};
