// import { BalancerSDK } from "@balancer-labs/sdk";
import useSWR from "swr";

import { balancerClient } from "~/actions";
import { balancerSdkConfig } from "~/config";

export const usePools = () => {
  return useSWR("pools", async () => {
    try {
      console.log("POOL CONFIG", balancerSdkConfig);

      const pools = await balancerClient.pools.all();

      console.log("POOLS", { pools });
      return pools;
    } catch (error) {
      console.error("USEPOOLSERROR", error);
      throw error;
    }
  });
};
