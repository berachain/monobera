import { pythContractAddress } from "@bera/config";
import useSWRImmutable from "swr/immutable";
import { usePublicClient } from "wagmi";

import { pythAbi } from "~/abi";
import { useBeraJs } from "~/contexts";

export const usePythUpdateFee = (
  wsConnected: boolean,
  pricesList: string[] | undefined,
) => {
  const publicClient = usePublicClient();
  const method = "getUpdateFee";
  const { account } = useBeraJs();
  const QUERY_KEY = [account, method, wsConnected];
  const { data: updateFee, isLoading } = useSWRImmutable(
    QUERY_KEY,
    async () => {
      if (!publicClient) return undefined;
      if (!pricesList) return undefined;
      if (!wsConnected) return undefined;
      try {
        const result = await publicClient.readContract({
          address: pythContractAddress,
          abi: pythAbi,
          functionName: method,
          args: [pricesList],
        });
        return result as bigint | undefined;
      } catch (e) {
        console.error(e);
        return undefined;
      }
    },
  );

  return {
    QUERY_KEY,
    updateFee,
    isLoading,
  };
};
