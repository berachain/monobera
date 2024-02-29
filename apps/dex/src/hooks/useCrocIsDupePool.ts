import { mutate } from "swr";
import useSWRImmutable from "swr/immutable";
import { type Token } from "@bera/berajs";
import { client, getCrocSelectedPool } from "@bera/graphql";
import { useCrocPoolFromTokens, useCrocToken } from "./useCrocPoolFromTokens";

export const useCrocIsDupePool = ({
  tokenA,
  tokenB,
}: {
  tokenA: Token | undefined;
  tokenB: Token | undefined;
}) => {
  const crocTokenA = useCrocToken(tokenA);
  const crocTokenB = useCrocToken(tokenB);
  const crocPool = useCrocPoolFromTokens(crocTokenA, crocTokenB);
  const QUERY_KEY = ["isDupePool", crocPool];
  const { isLoading, isValidating } = useSWRImmutable(QUERY_KEY, async () => {
    if (!crocPool) {
      return undefined;
    }
    try {
      const poolResult = client
        .query({
          query: getCrocSelectedPool,
          variables: {
            baseAsset: crocPool.baseToken.tokenAddr,
            quoteAsset: crocPool.quoteToken.tokenAddr,
          },
        })
        .then((result: any) => {
          return result.data.pools.length > 0;
        })
        .catch((e) => {
          console.log(e);
          return false;
        });

      return poolResult;
    } catch (e) {
      console.log(e);
      return undefined;
    }
  });

  const useIsDupePool = () => {
    const { data = undefined } = useSWRImmutable<boolean | undefined>(
      QUERY_KEY,
    );
    return data;
  };

  return {
    isLoading: isLoading || isValidating,
    useIsDupePool,
    refresh: () => void mutate(QUERY_KEY),
  };
};
