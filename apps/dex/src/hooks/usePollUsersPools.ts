import { useBeraJs } from "@bera/berajs";
import { client, getUserPools, getUserPoolsDetails } from "@bera/graphql";
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
        return userPools.data.pools;
      } catch (error) {
        console.error("fetching error", error);
        throw error;
        return [];
      }
    },
    {
      revalidateOnFocus: false,
    },
  );
};
