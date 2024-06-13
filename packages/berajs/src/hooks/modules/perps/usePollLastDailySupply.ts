import { bhoneyVaultContractAddress } from "@bera/config";
import useSWRImmutable from "swr/immutable";
import { usePublicClient } from "wagmi";

import { bTokenAbi } from "~/abi";

export const usePollLastDailySupply = () => {
  const publicClient = usePublicClient();
  const method = "lastMaxSupplyUpdate";
  const QUERY_KEY = ["bhoney", method];
  const { data, isLoading } = useSWRImmutable(QUERY_KEY, async () => {
    if (!publicClient) return undefined;
    try {
      const result = await publicClient.readContract({
        address: bhoneyVaultContractAddress,
        abi: bTokenAbi,
        functionName: method,
        args: [],
      });
      console.log("the result is", result);
      return result;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  });

  return {
    data,
    isLoading,
  };
};
