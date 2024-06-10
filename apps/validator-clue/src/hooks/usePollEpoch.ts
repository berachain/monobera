import { validatorClueEndpoint } from "@bera/config";
import useSWR, { mutate } from "swr";

export const usePollEpoch = (epoch: any) => {
  const QUERY_KEY = ["usePollEpoch"];

  return {
    ...useSWR(
      QUERY_KEY,
      async () => {
        try {
          const poolsRes = await fetch(`${validatorClueEndpoint}/api/v1/epoch`);
          const res = await poolsRes.json();
          return res;
        } catch (e) {
          console.error(`Error fetching epoch: ${e}`);
          return {};
        }
      },
      {
        refreshInterval: 5000,
        fallbackData: epoch,
      },
    ),
    refetch: () => void mutate(QUERY_KEY),
  };
};
