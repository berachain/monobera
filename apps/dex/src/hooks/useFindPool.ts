import { handleNativeBera } from "@bera/berajs";
import { dexClient, getUniquePoolById } from "@bera/graphql";
import useSWRImmutable from "swr/immutable";

export const useFindPool = (swapFee: number, tokenWeights: any[]) => {
  const id = getPoolId(swapFee, tokenWeights);
  const QUERY_KEY = ["useFindPool", id];
  return useSWRImmutable(
    id ? QUERY_KEY : null,
    async () => {
      try {
        const res = await dexClient.query({
          query: getUniquePoolById,
          variables: { id },
        });
        const poolCount = res.data.uniquePoolIDs;
        if (poolCount.length === 0 || Number(poolCount[0].count) === 0) {
          return false;
        }
        return true;
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

/*
  the reason i am writing this stupid function is because javascript sucks
  const swapFee = 1.1
  const swapFeeStr = (swapFee/100).toString();
  result:
  swapFeeStr = 0.011000000000000001 r u kidding me??
*/
const getSwapFeeInStr = (swapFee: number) => {
  if (swapFee === 1.1) return "0.011";
  if (swapFee === 0.4) return "0.004";
  if (swapFee === 0.15) return "0.0015";
  return (swapFee / 100).toString();
};

const getPoolId = (swapFee: number, tokenWeights: any[]) => {
  let poolId = getSwapFeeInStr(swapFee);
  tokenWeights
    .sort((a, b) =>
      handleNativeBera(a.token?.address ?? "").localeCompare(
        handleNativeBera(b.token?.address ?? ""),
      ),
    )
    .forEach((token: any) => {
      if (!token.token || !token.token.address) return undefined;
      poolId = poolId
        .concat("-")
        .concat(handleNativeBera(token.token.address).toLowerCase())
        .concat("-")
        .concat(token.weight);
    });

  return poolId;
};
