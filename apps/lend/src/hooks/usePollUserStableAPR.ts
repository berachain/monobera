import { useBeraJs } from "@bera/berajs";
import { lendPoolImplementationAddress, multicallAddress } from "@bera/config";
import useSWR, { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits } from "viem";
import { usePublicClient, type Address } from "wagmi";

import { lendPoolImplementationABI } from "./abi";

interface Call {
  abi: typeof lendPoolImplementationABI;
  address: Address;
  functionName: string;
  args: any[];
}

export const usePollUserStableAPR = () => {
  const publicClient = usePublicClient();
  const { mutate } = useSWRConfig();
  const { account, error } = useBeraJs();

  const QUERY_KEY = [account, "getUserStableAPR"];
  useSWR(QUERY_KEY, async () => {
    if (account && !error) {
      const call: Call[] = [
        {
          address: lendPoolImplementationAddress,
          abi: lendPoolImplementationABI,
          functionName: "getReservesList",
          args: [],
        },
      ];
      const result = await publicClient.multicall({
        //@ts-ignore
        contracts: call,
        multicallAddress: multicallAddress,
      });
      const reserveAddressList = result[0]?.result as Address[];
      if (result[0]?.status === "success" && reserveAddressList.length > 0) {
        const calls: Call[] = reserveAddressList.map((address: Address) => ({
          address: lendPoolImplementationAddress,
          abi: lendPoolImplementationABI,
          functionName: "getReserveData",
          args: [address],
        }));
        const reserveDataList = await publicClient.multicall({
          //@ts-ignore
          contracts: calls,
          multicallAddress: multicallAddress,
        });
        const stableAPRDictionary = {};
        reserveDataList.forEach((reserveData, index) => {
          if (reserveData.status === "success") {
            //@ts-ignore
            stableAPRDictionary[reserveAddressList[index]] = formatUnits(
              (reserveData.result as any).currentStableBorrowRate,
              36,
            );
          }
        });
        return stableAPRDictionary;
      } else {
        return {};
      }
    } else return {};
  });

  const useUserStableAPR = () => {
    return useSWRImmutable(QUERY_KEY);
  };

  return {
    mutate,
    useUserStableAPR,
  };
};
