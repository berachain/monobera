import { governanceTokenAddress } from "@bera/config";
import useSWR from "swr";
import { Address, formatEther } from "viem";
import { usePublicClient } from "wagmi";

import { IVotes_ABI } from "~/abi";
import { useBeraJs } from "~/contexts";
import POLLING from "~/enum/polling";
import { DefaultHookOptions, DefaultHookReturnType } from "~/types";

export const usePollUserDelegates = (
  options?: DefaultHookOptions,
): DefaultHookReturnType<{
  delegate: Address;
  currentVotes: string | undefined;
}> => {
  const { config: beraConfig, isReady, account } = useBeraJs();
  const publicClient = usePublicClient();
  const config = options?.beraConfigOverride ?? beraConfig;
  const QUERY_KEY = ["usePollUserDelegates", account];
  const swrResponse = useSWR<any, any, typeof QUERY_KEY>(
    QUERY_KEY,
    async () => {
      if (
        !isReady ||
        !account ||
        !publicClient ||
        !config.contracts?.multicallAddress
      ) {
        return undefined;
      }
      const calls = [
        {
          address: governanceTokenAddress,
          abi: IVotes_ABI,
          functionName: "delegates",
          args: [account],
        },
        {
          address: governanceTokenAddress,
          abi: IVotes_ABI,
          functionName: "getVotes",
          args: [account],
        },
      ];
      const results = (await publicClient.multicall({
        // @ts-ignore
        contracts: calls,
        multicallAddress: config.contracts.multicallAddress,
      })) as { result: any }[];
      return {
        delegate: results[0].result,
        currentVotes: formatEther(results[1].result),
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
