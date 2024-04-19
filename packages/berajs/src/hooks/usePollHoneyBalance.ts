import useSWR, { mutate } from "swr";
import { usePublicClient } from "wagmi";

import { getHoneyBalance } from "~/actions/dex/getHoneyBalance";
import POLLING from "~/enum/polling";
import {
  DefaultHookProps,
  DefaultHookReturnType,
  TokenBalance,
} from "~/types/global";
import { useBeraJs } from "../contexts";
export interface UsePollHoneyBalancesResponse
  extends DefaultHookReturnType<TokenBalance | undefined> {
  refetch: () => void;
}

export const usePollHoneyBalance = ({
  config,
  opts,
}: DefaultHookProps): UsePollHoneyBalancesResponse => {
  const publicClient = usePublicClient();
  const { account } = useBeraJs();
  const QUERY_KEY = [account, "honeyBalance"];
  const swrResponse = useSWR<TokenBalance | undefined>(
    QUERY_KEY,
    async () => {
      return getHoneyBalance({ publicClient, config, account });
    },
    { ...opts, refreshInterval: opts?.refreshInterval ?? POLLING.NORMAL },
  );
  return {
    ...swrResponse,
    refetch: () => void mutate(QUERY_KEY),
  };
};
