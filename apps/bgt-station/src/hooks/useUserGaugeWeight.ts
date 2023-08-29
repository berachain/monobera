import { useBeraJs } from "@bera/berajs";
import useSWR from "swr";

import { indexerUrl } from "~/config";

export const useUserGaugeWeight = () => {
  const { account } = useBeraJs();
  const QUERY_KEY = ["user-gauge-weight", account];
  return useSWR(
    QUERY_KEY,
    () =>
      fetch(`${indexerUrl}/bgt/rewards/delegator/${account}`).then((res) =>
        res.json(),
      ),

    {
      refreshInterval: 5 * 60 * 1000, // 5 mins
    },
  );
};
