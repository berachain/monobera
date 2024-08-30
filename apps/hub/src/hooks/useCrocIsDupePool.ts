import { mutate } from "swr";
import useSWRImmutable from "swr/immutable";
import { type Token } from "@bera/berajs";
import { dexClient, getCrocSelectedPoolOLD } from "@bera/graphql";
import { useCrocPoolFromTokens, useCrocToken } from "./useCrocPoolFromTokens";

export const useCrocIsDupePool = ({
  tokenA,
  tokenB,
  poolIdx,
}: {
  tokenA: Token | undefined;
  tokenB: Token | undefined;
  poolIdx: number;
}) => {
  const crocTokenA = useCrocToken(tokenA);
  const crocTokenB = useCrocToken(tokenB);
  const crocPool = useCrocPoolFromTokens(crocTokenA, crocTokenB);
  const QUERY_KEY = ["isDupePool", crocPool, poolIdx];
  const { isLoading, isValidating } = useSWRImmutable(QUERY_KEY, async () => {
    if (!crocPool) {
      return undefined;
    }
    try {
      // const poolResult = dexClient
      //   .query({
      //     query: getCrocSelectedPoolNEW,
      //     variables: {
      //       baseAsset: crocPool.baseToken.tokenAddr,
      //       quoteAsset: crocPool.quoteToken.tokenAddr,
      //       poolIdx: poolIdx.toString(),
      //     },
      //   })
      //   .then((result: any) => {
      //     console.log(result);
      //     return result.data.pools.length > 0;
      //   })
      //   .catch((e: any) => {
      //     console.log(e);
      //     return false;
      //   });

      // console.log(poolResult);
      // return poolResult;
      const poolResult = dexClient
        .query({
          query: getCrocSelectedPoolOLD,
          variables: {
            baseAsset: crocPool.baseToken.tokenAddr,
            quoteAsset: crocPool.quoteToken.tokenAddr,
          },
        })
        .then((result: any) => {
          return result.data.pools.length > 0;
        })
        .catch((e: any) => {
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
