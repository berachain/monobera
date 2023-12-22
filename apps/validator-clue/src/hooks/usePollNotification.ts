import { validatorClueEndpoint } from "@bera/config";
import useSWR, { mutate } from "swr";

export const usePollNotification = (notifications: any[]) => {
  const QUERY_KEY = ["usePollNotification"];

  return {
    ...useSWR(
      QUERY_KEY,
      async () => {
        try {
          const poolsRes = await fetch(
            `${validatorClueEndpoint}/api/v1/notifications`,
          );
          const res = await poolsRes.json();
          return res;
        } catch (e) {
          console.error(`Error fetching notifications: ${e}`);
          return [];
        }
      },
      {
        refreshInterval: 5000,
        fallbackData: notifications,
      },
    ),
    refetch: () => void mutate(QUERY_KEY),
  };
};
