import useSWR, { mutate } from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient } from "wagmi";

import POLLING from "~/enum/polling";
import { getTransactionCount } from "../actions/dex";

export interface IUserPollTransactionCountRequest {
  address: string | undefined;
}

export interface IUserPollTransactionCountResponse {
  isLoading: boolean;
  isValidating: boolean;
  useTransactionCount: () => string;
  refresh: () => void;
}

export const usePollTransactionCount = ({
  address,
}: IUserPollTransactionCountRequest): IUserPollTransactionCountResponse => {
  const publicClient = usePublicClient();
  const QUERY_KEY = [address, "txnCount"];
  const { isLoading, isValidating } = useSWR(
    QUERY_KEY,
    async () => {
      return getTransactionCount({ address, publicClient });
    },
    {
      refreshInterval: POLLING.SLOW,
    },
  );
  const useTransactionCount = (): string => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };
  return {
    isLoading,
    isValidating,
    useTransactionCount,
    refresh: () => mutate(QUERY_KEY),
  };
};
