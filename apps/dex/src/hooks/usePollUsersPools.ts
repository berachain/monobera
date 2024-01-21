import { DEX_PRECOMPILE_ABI, useBeraJs } from "@bera/berajs";
import { erc20DexAddress, multicallAddress } from "@bera/config";
import { client, getUserPools, getUserPoolsDetails } from "@bera/graphql";
import {
  formatEther,
  formatUnits,
  getAddress,
  parseEther,
  parseUnits,
} from "ethers";
import { mutate } from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient, type Address } from "wagmi";

export const usePollUsersPools = () => {
  const { isReady, account } = useBeraJs();
  const QUERY_KEY = ["usePollUsersPools", account];
  const publicClient = usePublicClient();

  const swrHook = useSWRImmutable(
    isReady && account ? QUERY_KEY : null,
    async () => {
      try {
        const res = await client.query({
          query: getUserPools,
          variables: { userAddress: account },
        });
        const pools = res.data.userPools ?? [];
        const poolAddresslist = pools
          .filter((pool: any) => Number(pool.shares) !== 0)
          .map((pool: any) => ({
            address: pool.poolAddress,
          }));
        const userPools = await client.query({
          query: getUserPoolsDetails,
          variables: { list: poolAddresslist },
        });

        const totalSharesObj = {};
        try {
          // the reason i am doing this, is the user share/ total share(subgraph) is not accurate at all
          const calls = pools.map((pool: any) => ({
            abi: DEX_PRECOMPILE_ABI,
            address: erc20DexAddress,
            functionName: "getTotalShares",
            args: [pool.poolAddress],
          }));
          const realTotalShares = await publicClient.multicall({
            contracts: calls,
            multicallAddress: multicallAddress,
          });
          realTotalShares.forEach((item: any, index: number) => {
            const totalShares = item.result[1];
            // @ts-ignore
            totalSharesObj[getAddress(pools[index].poolAddress)] =
              totalShares[0].toString();
          });
        } catch (e) {
          //cant find the pool total share
          //which should nenver happen
          console.error(e);
        }

        const finalUserPools = userPools.data.pools.map((pool: any) => {
          const userShares = pools.find(
            (p: any) => getAddress(p.poolAddress) === getAddress(pool.pool),
          ).shares;
          const totalShares = // @ts-ignore
            totalSharesObj[getAddress(pool.pool)] ?? pool.totalShares;
          const balance =
            Number(
              formatEther(parseUnits(userShares, 36) / parseEther(totalShares)),
            ) * Number(pool.tvlUsd);
          return {
            ...pool,
            userBalance: balance,
            totalValue: pool.tvlUsd,
            userShares: userShares,
            formattedSwapFee: formatUnits(pool.swapFee, 16),
            // @ts-ignore
            realTotalShares: totalSharesObj[getAddress(pool.pool)],
          };
        });

        finalUserPools.map((pool: any) => {
          void mutate([...QUERY_KEY, getAddress(pool.pool)], pool);
        });

        return finalUserPools;
      } catch (error) {
        console.error("fetching error", error);
        throw error;
      }
    },
    {
      revalidateOnFocus: false,
    },
  );

  const useUserPool = (poolAddress: Address) => {
    const { data } = useSWRImmutable([...QUERY_KEY, getAddress(poolAddress)]);
    return data;
  };

  return {
    ...swrHook,
    useUserPool,
    refetch: () => void mutate(QUERY_KEY),
    refetchPool: (poolAddress: Address) =>
      void mutate([...QUERY_KEY, getAddress(poolAddress)]),
  };
};
