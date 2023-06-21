import useSWRImmutable from "swr/immutable";
import { formatUnits } from "viem";
import { erc20ABI, usePublicClient } from "wagmi";

import { getContracts } from "~/api/contracts";
import { REWARDS_PRECOMPILE_ABI, REWARDS_PRECOMPILE_ADDRESS } from "~/config";
import { useBeraJs } from "~/contexts";
import { usePollPools, type Pool } from "./usePollPools";

interface Call {
  abi: any[];
  address: `0x${string}`;
  functionName: string;
  args: any[];
}

// TODO: this is so cursed, wen indexing

// TODO: introduce a way to add tokens into our localstorage system such that they can be used globally
interface DepositedPool extends Pool {
  d: bigint;
}

export interface RewardPool extends DepositedPool {
  claimable: string;
  deposited: string;
}
export const usePollUserPoolRewards = () => {
  const publicClient = usePublicClient();
  const { isConnected, account } = useBeraJs();
  const { usePools } = usePollPools();
  const pools: Pool[] | undefined = usePools();
  const QUERY_KEY = [account, pools, "userRewards"];
  useSWRImmutable(QUERY_KEY, async () => {
    try {
      if (isConnected && pools) {
        const call: Call[] = pools.map((pool) => {
          return {
            abi: erc20ABI as unknown as any[],
            address: pool.shareAddress as `0x${string}`,
            functionName: "balanceOf",
            args: [account],
          };
        });
        const contracts = getContracts();
        const result = await publicClient.multicall({
          contracts: call,
          multicallAddress: contracts.multicall as `0x${string}`,
        });
        const depositedPools: (DepositedPool | undefined)[] = pools
          .map((pool: Pool, i) =>
            (result[i]?.result as unknown as bigint) !== 0n
              ? {
                  ...pool,
                  d: result[i]?.result as unknown as bigint,
                }
              : undefined,
          )
          .filter((pool: DepositedPool | undefined) => pool !== undefined);

        const rewardsCall: Call[] = depositedPools?.map((pool) => {
          return {
            abi: REWARDS_PRECOMPILE_ABI,
            address: REWARDS_PRECOMPILE_ADDRESS,
            functionName: "getCurrentRewards",
            args: [account, pool?.address],
          };
        });
        const rewardsResult = await publicClient.multicall({
          contracts: rewardsCall,
          multicallAddress: contracts.multicall as `0x${string}`,
        });
        const rewardsPoolResult: RewardPool[] = depositedPools.map(
          (pool: DepositedPool | undefined, i) => {
            const claimable = formatUnits(
              (rewardsResult[i]?.result as unknown as bigint) ?? 0n,
              18,
            );
            const deposited = formatUnits(pool?.d ?? 0n, 18);

            return {
              ...(pool as DepositedPool), // Type assertion to ensure correct typing
              claimable,
              deposited,
            };
          },
        );

        return rewardsPoolResult;
      }
      return undefined;
    } catch (error) {
      console.log(error);
    }
  });

  const usePoolUserPoolRewards = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };

  return {
    usePoolUserPoolRewards,
  };
};
