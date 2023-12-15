import { useBeraJs } from "@bera/berajs";
import { validatorClueEndpoint } from "@bera/config";
import useSWR from "swr";
import { useLocalStorage } from "usehooks-ts";

export const usePollMe = () => {
  const { isConnected, account } = useBeraJs();
  const [authToken, _] = useLocalStorage<{ token: string; address: string }>(
    "VALCLUE_AUTH_TOKEN",
    { token: "", address: "" },
  );

  const QUERY_KEY = ["usePollMe", account, authToken?.token];

  return useSWR(
    QUERY_KEY,
    async () => {
      if (isConnected) {
        try {
          const meRes = await fetch(`${validatorClueEndpoint}/api/v1/me`, {
            headers: { Authorization: `Bearer ${authToken.token}` },
          });
          return await meRes.json();
        } catch (e) {
          console.error(`Error fetching me: ${e}`);
          return undefined;
        }
      }
      return undefined;
    },
    {
      refreshInterval: 50000,
    },
  );
};
