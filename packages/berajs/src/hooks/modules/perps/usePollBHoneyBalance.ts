import { bhoneyVaultContractAddress } from "@bera/config";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits, type Address } from "viem";
import { usePublicClient } from "wagmi";

import { bTokenAbi } from "~/abi";
import { useBeraJs } from "~/contexts";
import POLLING from "~/enum/polling";

export const usePollBHoneyBalance = () => {
  const publicClient = usePublicClient();
  const { isConnected, account } = useBeraJs();
  const method = "completeBalanceOf";
  const QUERY_KEY = [account, isConnected, method];
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      if (!publicClient) return undefined;

      if (isConnected) {
        try {
          const result = await publicClient.readContract({
            address: bhoneyVaultContractAddress,
            abi: bTokenAbi,
            functionName: method,
            args: [account as Address],
          });
          return result;
        } catch (e) {
          console.error(e);
        }
      }
      return 0;
    },
    {
      refreshInterval: POLLING.FAST,
    },
  );

  const useBHoneyBalance = (): bigint => {
    const { data = 0n } = useSWRImmutable(QUERY_KEY);
    return data;
  };

  const useFormattedBHoneyBalance = () => {
    const { data = 0n } = useSWRImmutable(QUERY_KEY);
    return formatUnits(data, 18);
  };
  return {
    isLoading,
    useBHoneyBalance,
    useFormattedBHoneyBalance,
  };
};
