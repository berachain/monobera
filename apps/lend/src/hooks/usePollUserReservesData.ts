import { useBeraJs } from "@bera/berajs";
import {
  lendPoolAddressProviderAddress,
  lendUIDataProviderAddress,
} from "@bera/config";
import useSWR, { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient } from "wagmi";

import { lendUIDataProviderABI } from "./abi";

export const usePollUserReservesData = () => {
  const publicClient = usePublicClient();
  const { mutate } = useSWRConfig();
  const { account, error } = useBeraJs();
  const QUERY_KEY = [account, "getUserReservesData"];
  useSWR(QUERY_KEY, async () => {
    if (!error && account) {
      try {
        const result = (await publicClient.readContract({
          address: lendUIDataProviderAddress,
          abi: lendUIDataProviderABI,
          functionName: "getUserReservesData",
          args: [lendPoolAddressProviderAddress, account],
        })) as [any[], any];
        const reservesDictionary = {};
        await Promise.all(
          result[0].map(async (reserve) => {
            await mutate([...QUERY_KEY, reserve.underlyingAsset], reserve);
            //@ts-ignore
            reservesDictionary[reserve.underlyingAsset] = reserve;
          }),
        );
        return reservesDictionary;
      } catch (e) {
        console.log(e);
        return {};
      }
    } else {
      return {};
    }
  });

  const useUserReservesData = () => {
    return useSWRImmutable(QUERY_KEY);
  };

  const useSelectedUserReservesData = (address: string) => {
    return useSWRImmutable([...QUERY_KEY, address]);
  };

  return {
    refetch: () => void mutate(QUERY_KEY),
    useUserReservesData,
    useSelectedUserReservesData,
  };
};
