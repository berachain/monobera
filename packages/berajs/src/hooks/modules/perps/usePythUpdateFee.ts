import { pythContractAddress } from "@bera/config";
import useSWRImmutable from "swr/immutable";
import { Address } from "viem";
import { usePublicClient } from "wagmi";

import { pythAbi } from "~/abi";
import { useBeraJs } from "~/contexts";

export const usePythUpdateFee = (
  pricesList: Address[] | undefined,
  pairIndex: string | undefined,
) => {
  const publicClient = usePublicClient();
  const method = "getUpdateFee";
  const { account } = useBeraJs();
  const validPrices = pricesList && pricesList.length > 0;
  const QUERY_KEY = [account, method, pairIndex, validPrices];
  const { data, isLoading } = useSWRImmutable<bigint>(QUERY_KEY, async () => {
    // Default update fee: fetched prices * 2
    const DEFAULT_UPDATE_FEE = 10n;

    if (!publicClient || !validPrices) return DEFAULT_UPDATE_FEE;

    try {
      const result = await publicClient.readContract({
        address: pythContractAddress,
        abi: pythAbi,
        functionName: method,
        args: [pricesList],
      });
      return result;
    } catch (e) {
      console.error(e);
      return DEFAULT_UPDATE_FEE;
    }
  });

  return {
    QUERY_KEY,
    data,
    isLoading,
  };
};
