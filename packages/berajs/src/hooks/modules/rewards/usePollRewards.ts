import { multicallAddress, rewardsAddress } from "@bera/config";
import useSWR, { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";
import { formatEther, type Address } from "viem";
import { usePublicClient } from "wagmi";

import { REWARDS_PRECOMPILE_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraJs } from "~/contexts";

export const usePollBgtRewards = (receivers: string[]) => {
  const publicClient = usePublicClient();
  const { account } = useBeraJs();
  const { mutate } = useSWRConfig();
  const method = "getCurrentRewards";
  const QUERY_KEY = [method, account, ...receivers];
  const swrResponse = useSWR(
    QUERY_KEY,
    async () => {
      const calls: any[] = receivers.map((receiver: string) => ({
        address: rewardsAddress,
        abi: REWARDS_PRECOMPILE_ABI,
        functionName: method,
        args: [account, receiver],
      }));

      try {
        console.log("calls", calls);
        const result = await publicClient.multicall({
          contracts: calls,
          multicallAddress,
          allowFailure: true,
        });
        const bgtRewards = {};
        await Promise.all(
          result.map(async (item: any, index: number) => {
            if (item.error) {
              await mutate([...QUERY_KEY, receivers[index]], "0");
              //@ts-ignore
              bgtRewards[receivers[index]] = "0";
            } else {
              await mutate(
                [...QUERY_KEY, receivers[index]],
                formatEther(item.result[0].amount || 0n),
              );
              //@ts-ignore
              bgtRewards[receivers[index]] = formatEther(
                item.result[0].amount || 0n,
              );
            }
          }),
        );
        return bgtRewards;
      } catch (e) {
        console.log(e);
        return undefined;
      }
    },
    {
      refreshInterval: POLLING.NORMAL,
    },
  );

  const useBgtRewards = () => {
    return useSWRImmutable(QUERY_KEY);
  };

  const useBgtReward = (address: string) => {
    return useSWRImmutable([...QUERY_KEY, address]);
  };

  return {
    ...swrResponse,
    useBgtRewards,
    useBgtReward,
    refetch: () => void mutate(QUERY_KEY),
  };
};
