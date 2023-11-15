import { rewardsAddress } from "@bera/config";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits } from "viem";
import { usePublicClient, type Address } from "wagmi";

import { REWARDS_PRECOMPILE_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraConfig, useBeraJs } from "~/contexts";

interface Call {
  abi: any[];
  address: `0x${string}`;
  functionName: string;
  args: any[];
}

export const usePollUserPendingBgtRewards = (endpoint: string) => {
  const publicClient = usePublicClient();
  const { account } = useBeraJs();
  const { networkConfig } = useBeraConfig();
  const QUERY_KEY = [account, "depositedPool", endpoint];
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      try {
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            "x-vercel-protection-bypass": process.env
              .VERCEL_AUTOMATION_BYPASS_SECRET as string,
          },
        });
        const temp = await response.json();
        if (!temp) return false;
        const pool = temp;

        const shareDenomArray: Address[] = pool.map((item: any) => item.pool);

        const call: Call[] = shareDenomArray.map((item: Address) => {
          return {
            abi: REWARDS_PRECOMPILE_ABI,
            address: rewardsAddress,
            functionName: "getCurrentRewards",
            args: [account, item],
          };
        });

        const result = await publicClient.multicall({
          contracts: call,
          multicallAddress: networkConfig.precompileAddresses
            .multicallAddress as Address,
        });

        const deposited = pool.map((pool: any, i: number) => {
          const formattedUserDeposited = formatUnits(
            (result[i]?.result as unknown as bigint) ?? 0n,
            18,
          );
          const value = Number(formattedUserDeposited).toString().includes("e")
            ? 0
            : Number(formattedUserDeposited);
          return {
            ...pool,
            userDepositedShares: value,
          };
        });

        const filteredDeposted = deposited.filter(
          (pool: any) => pool.userDepositedShares !== 0,
        );

        return filteredDeposted;
      } catch (e) {
        console.log(e);
        return undefined;
      }
    },
    {
      refreshInterval: POLLING.SLOW,
    },
  );

  const usePoolsPendingBgtRewards = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };

  return {
    usePoolsPendingBgtRewards,
    isLoading,
  };
};
