import { get } from "lodash";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { erc20Abi, formatUnits, type Address } from "viem";
import { usePublicClient } from "wagmi";

import { getHoneyBalance } from "~/actions/dex/getHoneyBalance";
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
      return getHoneyBalance({ publicClient, config });
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
