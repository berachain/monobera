import useSWR, { mutate } from "swr";
import { usePublicClient } from "wagmi";

import { getBeraBalance } from "~/actions/dex/getBeraBalance";
import POLLING from "~/enum/polling";
import {
  DefaultHookProps,
  DefaultHookReturnType,
  TokenBalance,
} from "~/types/global";
import { useBeraJs } from "../contexts";

export type UsePollBeraBalanceRequest = DefaultHookProps;

export interface UsePollBeraBalancesResponse
  extends DefaultHookReturnType<TokenBalance | undefined> {
  refetch: () => void;
}

export const usePollBeraBalance = ({
  opts,
}: UsePollBeraBalanceRequest): UsePollBeraBalancesResponse => {
  const publicClient = usePublicClient();
  const { account } = useBeraJs();
  const QUERY_KEY = [account, "beraBalance"];
  const swrResponse = useSWR(
    QUERY_KEY,
    async () => {
      return await getBeraBalance({ account, publicClient });
    },
    { ...opts, refreshInterval: opts?.refreshInterval ?? POLLING.NORMAL },
  );
  return {
    ...swrResponse,
    refetch: () => void mutate(QUERY_KEY),
  };
};
