import { client, getUniquePoolById } from "@bera/graphql";
import useSWRImmutable from "swr/immutable";

export const useFindPool = (swapFee: string, tokenWeights: any[]) => {
  const id = getPoolId(swapFee, tokenWeights);
  const QUERY_KEY = ["useFindPool", id];
  return useSWRImmutable(
    id ? QUERY_KEY : null,
    async () => {
      try {
        const res = await client.query({
          query: getUniquePoolById,
          variables: { id },
        });
        const poolCount = res.data.uniquePoolIDs;
        if (poolCount.length === 0 || Number(poolCount[0].count) === 0) {
          return false;
        } else {
          return true;
        }
      } catch (error) {
        console.error("fetching error", error);
        throw error;
      }
    },
    {
      revalidateOnFocus: false,
    },
  );
};

const getPoolId = (swapFee: string, tokenWeights: any[]) => {
  let poolId = swapFee;
  tokenWeights
    .sort((a, b) =>
      (a.token?.address ?? "").localeCompare(b.token?.address ?? ""),
    )
    .forEach((token: any) => {
      if (!token.token || !token.token.address) return undefined;
      poolId = poolId
        .concat("-")
        .concat(token.token.address.toLowerCase())
        .concat("-")
        .concat(token.weight);
    });
  return poolId;
};
