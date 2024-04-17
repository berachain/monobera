import useSWR, { mutate } from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient } from "wagmi";

import POLLING from "~/enum/polling";
import { getTransactionCount } from "../actions/dex";
import { DefaultHookTypes } from "../types/global";

interface IUserPollTransactionCountRequest extends DefaultHookTypes {
  args?: {
    address: string | undefined;
  };
}

interface IUserPollTransactionCountResponse {
  isLoading: boolean;
  useTransactionCount: () => string;
  refresh: () => void;
}

export const usePollTransactionCount = ({
  config = {},
  args: { address } = { address: undefined },
  opts: { refreshInterval } = {
    refreshInterval: POLLING.SLOW,
  },
}: IUserPollTransactionCountRequest): IUserPollTransactionCountResponse => {
  const publicClient = usePublicClient();
  const QUERY_KEY = [address, "txnCount"];
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      return getTransactionCount({ address, publicClient });
    },
    {
      refreshInterval,
    },
  );
  const useTransactionCount = (): string => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };
  return {
    isLoading,
    useTransactionCount,
    refresh: () => mutate(QUERY_KEY),
  };
};
