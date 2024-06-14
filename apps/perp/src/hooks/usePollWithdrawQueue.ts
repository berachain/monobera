import { useBeraJs } from "@bera/berajs";
import { perpsEndpoint } from "@bera/config";
import { type HoneyWithdrawalRequest } from "@bera/proto/src";
import useSWR, { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";

import { POLLING } from "~/utils/constants";

export const usePollWithdrawQueue = () => {
  const { account } = useBeraJs();
  const method = "vaultwithdrawals";
  const QUERY_KEY = [method, account];
  const { mutate } = useSWRConfig();
  const { data, isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      if (account) {
        try {
          const res = await fetch(`${perpsEndpoint}/${method}/${account}`);
          const data = await res.json();
          return data;
        } catch (e) {
          return undefined;
        }
      }
      return undefined;
    },
    {
      refreshInterval: POLLING.NORMAL,
    },
  );

  return {
    isLoading,
    refetch: () => void mutate(QUERY_KEY),
    data,
  };
};
