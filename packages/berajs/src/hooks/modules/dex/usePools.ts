// import { BalancerSDK } from "@balancer-labs/sdk";
import useSWR from "swr";

import { balancerClient } from "~/actions";
import { balancerSdkConfig } from "~/config";

export const usePools = () => {
  return useSWR("pools", async () => {
    try {
      return await balancerClient.pools.all();
    } catch (error) {
      console.error("USEPOOLSERROR", error);
      throw error;
    }
  });
};
