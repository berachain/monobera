import { useBeraJs } from "@bera/berajs";
import { client, getUserPools, getUserPoolsDetails } from "@bera/graphql";
import {
  formatEther,
  formatUnits,
  getAddress,
  parseEther,
  parseUnits,
} from "ethers";
import useSWRImmutable from "swr/immutable";

export const usePollUsersPools = () => {
  const { isReady, account } = useBeraJs();
  const QUERY_KEY = ["usePollUsersPools", account];

  return useSWRImmutable(
    isReady && account ? QUERY_KEY : null,
    async () => {
      try {
        const res = await client.query({
          query: getUserPools,
          variables: { userAddress: account },
        });
        const pools = res.data.userPools ?? [];
        const poolAddresslist = pools.map((pool: any) => ({
          address: pool.poolAddress,
        }));
        const userPools = await client.query({
          query: getUserPoolsDetails,
          variables: { list: poolAddresslist },
        });
        return userPools.data.pools.map((pool: any) => {
          const userShares = pools.find(
            (p: any) => getAddress(p.poolAddress) === getAddress(pool.pool),
          ).shares;
          const balance =
            Number(
              formatEther(
                parseUnits(userShares, 36) / parseEther(pool.totalShares),
              ),
            ) * Number(pool.tvlUsd);

          return {
            ...pool,
            userBalance: balance,
            totalValue: pool.tvlUsd,
            userShares: userShares,
            formattedSwapFee: formatUnits(pool.swapFee, 16),
          };
        });
      } catch (error) {
        console.error("fetching error", error);
        throw error;
      }
    },
    {
      revalidateOnFocus: false,
    },
  );
};
