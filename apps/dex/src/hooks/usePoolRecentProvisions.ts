import { mutate } from "swr";
import { type PoolV2 } from "~/app/pools/fetchPools";
import useSWRImmutable from "swr/immutable";
import { dexClient, getRecentProvisions } from "@bera/graphql";
import { formatUnits, getAddress } from "viem";

export interface IProvisions {
  user: string;
  baseFlow: number;
  quoteFlow: number;
  changeType: "mint" | "burn";
  transactionHash: string;
  time: number;
  estimatedHoneyValue?: number;
  baseAssetHoneyPrice: string;
  quoteAssetHoneyPrice: string;
}

export const usePoolRecentProvisions = (pool: PoolV2 | undefined) => {
  const QUERY_KEY = ["recentProvisions", pool];
  const { isLoading } = useSWRImmutable(QUERY_KEY, async () => {
    if (!pool) {
      return undefined;
    }
    try {
      const provisions: IProvisions[] | undefined = await dexClient
        .query({
          query: getRecentProvisions,
          variables: {
            poolHash: pool.id,
          },
        })
        .then((res: any) => {
          return res.data.liquidityChanges;
        })
        .catch((e: any) => {
          console.log(e);
          return undefined;
        });

      const provisionsWithHoneyValue = provisions?.map(
        (provision: IProvisions) => {
          let estimatedHoneyValue = 0;
          if (provision.changeType === "mint") {
            const formattedQuoteFlow = formatUnits(
              BigInt(provision.quoteFlow),
              pool.quoteInfo.decimals,
            );
            const formattedBaseFlow = formatUnits(
              BigInt(provision.baseFlow),
              pool.baseInfo.decimals,
            );
            const estimatedBaseHoneyValue =
              parseFloat(formattedBaseFlow) *
              parseFloat(provision.baseAssetHoneyPrice);

            const estimatedQuoteHoneyValue =
              parseFloat(formattedQuoteFlow) *
              parseFloat(provision.quoteAssetHoneyPrice);
            estimatedHoneyValue =
              estimatedBaseHoneyValue + estimatedQuoteHoneyValue;
          } else if (provision.changeType === "burn") {
            const formattedQuoteFlow = formatUnits(
              BigInt(provision.quoteFlow),
              pool.quoteInfo.decimals,
            );
            const formattedBaseFlow = formatUnits(
              BigInt(provision.baseFlow),
              pool.baseInfo.decimals,
            );
            const estimatedBaseHoneyValue =
              parseFloat(formattedBaseFlow) *
              -1 *
              parseFloat(provision.baseAssetHoneyPrice);

            const estimatedQuoteHoneyValue =
              parseFloat(formattedQuoteFlow) *
              -1 *
              parseFloat(provision.quoteAssetHoneyPrice);
            estimatedHoneyValue =
              estimatedBaseHoneyValue + estimatedQuoteHoneyValue;
          }
          return {
            ...provision,
            estimatedHoneyValue,
          };
        },
      );
      return provisionsWithHoneyValue;
    } catch (e) {
      console.log(e);
      return undefined;
    }
  });

  const useRecentProvisions = () => {
    const { data = undefined } = useSWRImmutable<IProvisions[] | undefined>(
      QUERY_KEY,
    );
    return data;
  };

  return {
    isLoading,
    useRecentProvisions,
    refresh: () => void mutate(QUERY_KEY),
  };
};
