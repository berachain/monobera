import { gTokenContractAddress } from "@bera/config";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { erc20Abi, formatUnits, type Address } from "viem";
import { usePublicClient } from "wagmi";

import POLLING from "~/config/constants/polling";
import { useBeraJs } from "~/contexts";

export const usePollBHoneyBalance = () => {
  const publicClient = usePublicClient();
  const { isConnected, account } = useBeraJs();
  const QUERY_KEY = [account, isConnected, "bhoneyBalance"];
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      if (!publicClient) return undefined;

      if (isConnected) {
        try {
          const result = await publicClient.readContract({
            address: gTokenContractAddress,
            abi: erc20Abi,
            functionName: "balanceOf",
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
