import { lendOracleAddress, lendPoolImplementationAddress } from "@bera/config";
import useSWR, { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";
import { formatEther } from "viem";
import { usePublicClient, type Address } from "wagmi";

import { lendOracleABI, lendPoolImplementationABI } from "../../../config/abi";

export const usePollReservesPrices = () => {
  const publicClient = usePublicClient();
  const { mutate } = useSWRConfig();

  const QUERY_KEY = ["getAssetsPrices"];
  useSWR(QUERY_KEY, async () => {
    const result = await publicClient.readContract({
      address: lendPoolImplementationAddress,
      abi: lendPoolImplementationABI,
      functionName: "getReservesList",
      args: [],
    });
    if (result && (result as Address[]).length > 0) {
      try {
        const assetsPrices = await publicClient.readContract({
          address: lendOracleAddress,
          abi: lendOracleABI,
          functionName: "getAssetsPrices",
          args: [result as Address[]],
        });
        const assetsPricesDictionary = {};
        (assetsPrices as bigint[]).forEach((price, index) => {
          //@ts-ignore
          assetsPricesDictionary[result[index]] = {
            price,
            formattedPrice: formatEther(price),
          };
          //@ts-ignore
          mutate([...QUERY_KEY, result[index]], {
            price,
            formattedPrice: formatEther(price),
          });
        });
        return assetsPricesDictionary;
      } catch (e) {
        console.log(e);
        return undefined;
      }
    } else {
      return {};
    }
  });

  const useReservesPrices = () => {
    return useSWRImmutable(QUERY_KEY);
  };

  const useSelectedReservePrice = (address: string) => {
    return useSWRImmutable([...QUERY_KEY, address]);
  };

  return {
    mutate,
    useReservesPrices,
    useSelectedReservePrice,
  };
};
