import useSWR from "swr";

import { balancerClient } from "~/actions";
import { balancerSdkConfig } from "~/config";

export const usePool = ({ id }: { id: string }) => {
  return useSWR(`pool-${id}`, async () => {
    try {
      return await balancerClient.pools.find(id);
    } catch (error) {
      console.error("USEPOOLERROR", error);
      throw error;
    }
  });
};
