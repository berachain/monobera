import { useBeraJs } from "@bera/berajs";
import useSWR from "swr";
import { type Address } from "viem";

import { indexerUrl } from "~/config";

export const useFetchValidatorUptime = (address: Address) => {
  const { account } = useBeraJs();
  const QUERY_KEY = ["validator-uptime", address];
  return useSWR(
    QUERY_KEY,
    () =>
      fetch(`${indexerUrl}/validators/${account}/status`).then((res) =>
        res.json(),
      ),

    {
      refreshInterval: 5 * 60 * 1000, // 5 mins
    },
  );
};
