import { gTokenContractAddress } from "@bera/config";
import useSWRImmutable from "swr/immutable";
import { formatUnits } from "viem";
import { usePublicClient } from "wagmi";

import { BTOKEN_ABI } from "~/abi";
import { useBeraJs } from "~/contexts";

export const usePollMaxDeposit = () => {
  const publicClient = usePublicClient();
  const method = "maxDeposit";
  const { account } = useBeraJs();
  const QUERY_KEY = [account, method];
  const { isLoading } = useSWRImmutable(QUERY_KEY, async () => {
    try {
      if (!publicClient) return undefined;
      const result = await publicClient.readContract({
        address: gTokenContractAddress,
        abi: BTOKEN_ABI,
        functionName: method,
        args: [account],
      });
      return Number(formatUnits(result as bigint, 18));
    } catch (e) {
      console.error(e);
      return undefined;
    }
  });

  const useMaxDeposit = () => {
    const { data = undefined } = useSWRImmutable<number | undefined>(QUERY_KEY);
    return data;
  };
  return {
    QUERY_KEY,
    useMaxDeposit,
    isLoading,
  };
};
