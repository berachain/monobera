import useSWR from "swr";

import { balancerClient } from "~/actions";
import { balancerApi } from "~/actions/dex/b-sdk";

export const usePool = ({ id }: { id: string }) => {
  return useSWR(`pool-${id}`, async () => {
    try {
      const [v2Pool, v3Pool] = await Promise.all([
        balancerClient.pools.find(id),
        balancerApi.pools.fetchPoolStateWithBalances(id),
      ]);
      return { v2Pool, v3Pool };
    } catch (error) {
      console.error("USEPOOLERROR", error);
      throw error;
    }
  });
};
