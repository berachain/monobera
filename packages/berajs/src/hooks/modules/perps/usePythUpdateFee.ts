import { pythContractAddress } from "@bera/config";
import useSWRImmutable from "swr/immutable";
import { usePublicClient } from "wagmi";

import { pythAbi } from "~/abi";
import { useBeraJs } from "~/contexts";

export const usePythUpdateFee = (
  pricesList: string[] | undefined,
  pairIndex: string | undefined,
) => {
  const publicClient = usePublicClient();
  const method = "getUpdateFee";
  const { account } = useBeraJs();
  const validPrices =
    pricesList && pricesList.length > 0 && pricesList[0] !== "";
  const QUERY_KEY = [account, method, pairIndex, validPrices];
  const { data, isLoading } = useSWRImmutable(QUERY_KEY, async () => {
    if (!publicClient) return undefined;
    if (!validPrices) return undefined;
    try {
      const result = await publicClient.readContract({
        address: pythContractAddress,
        abi: pythAbi,
        functionName: method,
        args: [pricesList],
      });
      return (result as bigint | undefined) ?? 10n;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  });

  return {
    QUERY_KEY,
    data,
    isLoading,
  };
};
