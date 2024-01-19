import { useBeraJs } from "@bera/berajs";
import { client, getUserPools } from "@bera/graphql";
import useSWRImmutable from "swr/immutable";

export const usePollUsersPools = () => {
  const { isReady, account } = useBeraJs();
  const QUERY_KEY = ["usePollUsersPools", account];

  return useSWRImmutable(
    isReady && account ? QUERY_KEY : null,
    async () => {
      try {
        const res = await client.query({
          query: getUserPools,
          variables: { userAddress: account },
        });
        const userPools = res.data.uniquePoolIDs;
        console.log("userPools", userPools)
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
  else if (swapFee === 0.4) return "0.004";
  else if (swapFee === 0.15) return "0.0015";
  else return (swapFee / 100).toString();
};

const getPoolId = (swapFee: number, tokenWeights: any[]) => {
  let poolId = getSwapFeeInStr(swapFee);
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
