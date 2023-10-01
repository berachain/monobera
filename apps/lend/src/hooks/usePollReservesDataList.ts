import { lendPoolImplementationAddress, multicallAddress } from "@bera/config";
import useSWR, { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient, type Address } from "wagmi";

import { lendPoolImplementationABI } from "./abi";

interface Call {
  abi: typeof lendPoolImplementationABI;
  address: Address;
  functionName: string;
  args: any[];
}

export const usePollReservesDataList = () => {
  const publicClient = usePublicClient();
  const { mutate } = useSWRConfig();

  const QUERY_KEY = ["getReservesDataList"];
  useSWR(QUERY_KEY, async () => {
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

      await Promise.all(
        reserveDataList.map(async (reserveData, index) => {
          if (reserveData.status === "success") {
            //@ts-ignore
            stableAPRDictionary[reserveAddressList[index]] = reserveData.result;
            await mutate(
              [...QUERY_KEY, reserveAddressList[index]],
              reserveData.result,
            );
          } else {
            await mutate([...QUERY_KEY, reserveAddressList[index]], undefined);
          }
        }),
      );

      return stableAPRDictionary;
    } else {
      return {};
    }
  });

  const useReservesDataList = () => {
    return useSWRImmutable(QUERY_KEY);
  };

  const useSelectedReserveData = (address: string) => {
    return useSWRImmutable([...QUERY_KEY, address]);
  };

  return {
    mutate,
    useReservesDataList,
    useSelectedReserveData,
  };
};
