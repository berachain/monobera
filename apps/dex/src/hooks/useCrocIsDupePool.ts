import { mutate } from "swr";
import useSWRImmutable from "swr/immutable";
import { type Token } from "@bera/berajs";
import { client, getCrocSelectedPool } from "@bera/graphql";

export const useCrocIsDupePool = ({
  base,
  quote,
}: {
  base: Token | undefined;
  quote: Token | undefined;
}) => {
  const QUERY_KEY = ["isDupePool", base, quote];
  const { isLoading, isValidating } = useSWRImmutable(QUERY_KEY, async () => {
    if (!base || !quote) {
      return undefined;
    }
    try {
      const poolResult = client
        .query({
          query: getCrocSelectedPool,
          variables: {
            baseAsset: base.address,
            quoteAsset: quote.address,
          },
        })
        .then((result: any) => {
          return result.data.pools.length > 0;
        })
        .catch(() => {
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
