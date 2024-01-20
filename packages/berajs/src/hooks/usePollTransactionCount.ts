import useSWR, { mutate } from "swr";
import useSWRImmutable from "swr/immutable";
import { type Address } from "viem";
import { usePublicClient } from "wagmi";

import POLLING from "~/config/constants/polling";

export const usePollTransactionCount = ({
  address,
}: {
  address: string | undefined;
}) => {
  const publicClient = usePublicClient();
  const QUERY_KEY = [address, "txnCount"];
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      if (address) {
        const transactionCount = await publicClient.getTransactionCount({
          address: address as Address,
        });
        return transactionCount;
      }

      return 0;
    },
    {
      refreshInterval: POLLING.FAST,
    },
  );
  const useTransactionCount = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };
  return {
    isLoading,
    useTransactionCount,
    refresh: () => mutate(QUERY_KEY),
  };
};
