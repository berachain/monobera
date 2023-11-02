import useSWRImmutable from "swr/immutable";
import { type Address } from "viem";
import { usePublicClient } from "wagmi";

import { TRADING_ABI } from "~/config";
import { useBeraJs } from "~/contexts";

export const useIsDelegated = () => {
  const publicClient = usePublicClient();
  const method = "delegations";
  const { account } = useBeraJs();
  const QUERY_KEY = [account, method];
  const { data: isDelegated, isLoading } = useSWRImmutable(
    QUERY_KEY,
    async () => {
      try {
        const result = await publicClient.readContract({
          address: process.env.NEXT_PUBLIC_TRADING_CONTRACT_ADDRESS as Address,
          abi: TRADING_ABI,
          functionName: method,
          args: [account],
        });
        return (
          result !== undefined &&
          result !== "0x0000000000000000000000000000000000000000"
        );
      } catch (e) {
        console.error(e);
        return false;
      }
    },
  );

  return {
    QUERY_KEY,
    isDelegated,
    isLoading,
  };
};
