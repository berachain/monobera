import { governanceTokenAddress } from "@bera/config";
import useSWR from "swr";
import { Address, formatEther } from "viem";
import { usePublicClient } from "wagmi";

import { BGT_ABI } from "~/abi";
import { useBeraJs } from "~/contexts";
import POLLING from "~/enum/polling";
import { DefaultHookOptions, DefaultHookReturnType } from "~/types";

export const usePollUserDelegates = (
  options?: DefaultHookOptions,
): DefaultHookReturnType<{
  delegate: Address;
  currentVotes: string | undefined;
}> => {
  const { isReady, account } = useBeraJs();
  const publicClient = usePublicClient();
  const QUERY_KEY = isReady ? ["usePollUserDelegates", account] : null;

  const swrResponse = useSWR<
    { delegate: Address; currentVotes: string | undefined },
    any,
    typeof QUERY_KEY
  >(
    QUERY_KEY,
    async () => {
      if (!publicClient || !account) {
        throw new Error("usePollUserDelegates needs publicClient and account");
      }

      // use promise all to better catch errors and have type safety
      const [delegate, currentVotes] = await Promise.all([
        publicClient.readContract({
          address: governanceTokenAddress,
          abi: BGT_ABI,
          functionName: "delegates",
          args: [account],
        }),
        publicClient.readContract({
          address: governanceTokenAddress,
          abi: BGT_ABI,
          functionName: "getVotes",
          args: [account],
        }),
      ]);

      return {
        delegate: delegate,
        currentVotes: formatEther(currentVotes),
      };
    },
    {
      ...options?.opts,
      refreshInterval: options?.opts?.refreshInterval ?? POLLING.SLOW,
    },
  );

  return {
    ...swrResponse,
    refresh: () => swrResponse?.mutate?.(),
  };
};
