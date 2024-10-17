import { beraChefAddress } from "@bera/config";
import useSWR from "swr";
import { Address } from "viem";
import { usePublicClient } from "wagmi";

import { BERA_CHEF_ABI } from "~/abi";
import POLLING from "~/enum/polling";

export const useIsFriendOfTheChef = (address?: Address) => {
  const publicClient = usePublicClient();
  const QUERY_KEY =
    publicClient && address ? ["useIsFriendOfTheChef", address] : null;

  return useSWR(
    QUERY_KEY,
    async () => {
      return publicClient!.readContract({
        address: beraChefAddress,
        abi: BERA_CHEF_ABI,
        functionName: "isFriendOfTheChef",
        args: [address!],
      });
    },
    {
      refreshInterval: POLLING.SLOW,
    },
  );
};
