import { POLLING } from "@bera/shared-ui";
import useSWRImmutable from "swr/immutable";
import { BalancerApi, PoolState } from "@balancer/sdk";
import { chainId } from "@bera/config";

export const usePoolState = (poolId: string) => {
  const QUERY_KEY = ["usePoolState", poolId];
  return useSWRImmutable<PoolState | undefined>(
    QUERY_KEY,
    async () => {
      try {
        const balancerApi = new BalancerApi(
          "https://api-v3.balancer.fi/",
          chainId,
        );
        const poolState = await balancerApi.pools.fetchPoolState(poolId);
        return poolState;
      } catch (e) {
        return undefined;
      }
    },
    {
      refreshInterval: POLLING.NORMAL,
    },
  );
};
