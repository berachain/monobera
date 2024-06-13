import { bhoneyVaultContractAddress } from "@bera/config";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits } from "viem";
import { usePublicClient } from "wagmi";

import { bTokenAbi } from "~/abi";
import POLLING from "~/enum/polling";
import { useBeraJs } from "~/contexts";

export const usePollBalanceOfAssets = () => {
  const publicClient = usePublicClient();
  const method = "completeBalanceOfAssets";
  const { account } = useBeraJs();
  const QUERY_KEY = ["bhoney", method, account];
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      if (!publicClient) return undefined;
      try {
        if (account) {
          const result = await publicClient.readContract({
            address: bhoneyVaultContractAddress,
            abi: bTokenAbi,
            functionName: method,
            args: [account],
          });
          return result;
        }
        return undefined;
      } catch (e) {
        console.error(e);
        return undefined;
      }
    },
    {
      refreshInterval: POLLING.FAST,
    },
  );

  const useBalanceOfAssets = () => {
    const { data = 0 } = useSWRImmutable(QUERY_KEY);
    return data;
  };

  const useFormattedBalanceOfAssets = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    if (!data) return 0;
    return Number(formatUnits(data, 18));
  };
  return {
    useFormattedBalanceOfAssets,
    useBalanceOfAssets,
    isLoading,
  };
};
