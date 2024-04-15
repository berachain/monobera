import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { erc20Abi, formatUnits, type Address } from "viem";
import { usePublicClient } from "wagmi";

import POLLING from "~/config/constants/polling";
import { DefaultHookTypes } from "~/types/global";
import { useBeraJs } from "../contexts";

export interface UsePollHoneyBalancesResponse {
  isLoading: boolean;
  isValidating: boolean;
  useHoneyBalance: () => string | undefined;
  useRawHoneyBalance: () => bigint | undefined;
}

export const usePollHoneyBalance = ({
  config,
  opts: { refreshInterval } = {
    refreshInterval: POLLING.FAST,
  },
}: DefaultHookTypes): UsePollHoneyBalancesResponse => {
  const publicClient = usePublicClient();
  const { isConnected, account } = useBeraJs();
  const QUERY_KEY = [account, isConnected, "honeyBalance"];
  const { isLoading, isValidating } = useSWR(
    QUERY_KEY,
    async () => {
      if (!publicClient) return undefined;
      if (isConnected) {
        try {
          const result = await publicClient.readContract({
            address: config.contracts?.honeyAddress,
            abi: erc20Abi,
            functionName: "balanceOf",
            args: [account as Address],
          });
          return result;
        } catch (e) {
          console.error(e);
        }
      }
      return undefined;
    },
    {
      refreshInterval,
    },
  );
  const useHoneyBalance = (): string | undefined => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return formatUnits(data ?? 0n, 18);
  };
  const useRawHoneyBalance = (): bigint | undefined => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };
  return {
    isLoading,
    isValidating,
    useHoneyBalance,
    useRawHoneyBalance,
  };
};
