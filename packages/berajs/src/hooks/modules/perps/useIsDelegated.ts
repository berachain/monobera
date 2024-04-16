import { tradingContractAddress } from "@bera/config";
import useSWRImmutable from "swr/immutable";
import { usePublicClient } from "wagmi";

import { TRADING_ABI } from "~/enum";
import { useBeraJs } from "~/contexts";

export const useIsDelegated = () => {
  const publicClient = usePublicClient();
  const method = "delegations";
  const { account } = useBeraJs();
  const QUERY_KEY = [account, method];
  const { data: isDelegated, isLoading } = useSWRImmutable(
    QUERY_KEY,
    async () => {
      if (!publicClient) return undefined;
      try {
        const result = await publicClient.readContract({
          address: tradingContractAddress,
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
