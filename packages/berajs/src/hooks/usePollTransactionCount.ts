import useSWR, { mutate } from "swr";
import { usePublicClient } from "wagmi";

import POLLING from "~/enum/polling";
import { getTransactionCount } from "../actions/dex";
import { DefaultHookReturnType } from "~/types/global";

export interface UserPollTransactionCountRequest {
  address: string | undefined;
}

export interface UserPollTransactionCountResponse
  extends DefaultHookReturnType<number | undefined> {
  refresh: () => void;
}

export const usePollTransactionCount = ({
  address,
}: UserPollTransactionCountRequest): UserPollTransactionCountResponse => {
  const publicClient = usePublicClient();
  const QUERY_KEY = [address, "txnCount"];
  const swrResponse = useSWR<number | undefined>(
    QUERY_KEY,
    async () => {
      return getTransactionCount({ address, publicClient });
    },
    {
      refreshInterval: POLLING.SLOW,
    },
  );

  return {
    ...swrResponse,
    refresh: () => mutate(QUERY_KEY),
  };
};
