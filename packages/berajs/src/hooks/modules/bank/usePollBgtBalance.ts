import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits, type Address } from "viem";
import { usePublicClient } from "wagmi";

import { BANK_PRECOMPILE_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraConfig, useBeraJs } from "~/contexts";

export const usePollBgtBalance = () => {
  const publicClient = usePublicClient();
  const { isConnected, account } = useBeraJs();
  const { networkConfig } = useBeraConfig();

  const method = "getBalance";
  const denom = process.env.NEXT_PUBLIC_STAKING_TOKEN;
  const QUERY_KEY = [account, method, denom, isConnected];
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      if (isConnected) {
        try {
          const result = await publicClient.readContract({
            address: networkConfig.precompileAddresses.bankAddress as Address,
            abi: BANK_PRECOMPILE_ABI,
            functionName: method,
            args: [account, denom],
          });
          return formatUnits(result as bigint, 18);
        } catch (e) {
          console.error(e);
        }
      }
      return undefined;
    },
    {
      refreshInterval: POLLING.FAST,
    },
  );

  const useBgtBalance = () => {
    const { data = 0 } = useSWRImmutable(QUERY_KEY);

    return Number(data).toFixed(4);
  };
  return {
    isLoading,
    useBgtBalance,
  };
};
