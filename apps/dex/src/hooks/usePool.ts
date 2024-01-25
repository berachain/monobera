import { client, getAllPools } from "@bera/graphql";
import useSWR from "swr";

export const usePools = () => {
  const { data } = useSWR(
    ["getAllPools"],
    async () => {
      return await client
        .query({
          query: getAllPools,
        })
        .then((res) => res.data.pools)
        .catch((e) => {
          console.log(e);
          return undefined;
        });
    },
    {
      refreshInterval: 5000,
    },
  );
  return data;
};
