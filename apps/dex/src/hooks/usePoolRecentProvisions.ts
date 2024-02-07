import { mutate } from "swr";
import { type PoolV2 } from "~/app/pools/fetchPools";
import useSWRImmutable from "swr/immutable";
import { useTokenHoneyPrices } from "@bera/berajs";
import { client, getRecentProvisions } from "@bera/graphql";
import { formatUnits, getAddress } from "viem";

export interface IProvisions {
  user: string;
  baseFlow: number;
  quoteFlow: number;
  changeType: "mint" | "burn";
  transactionHash: string;
  time: number;
  estimatedHoneyValue?: number;
}

export const usePoolRecentProvisions = (pool: PoolV2 | undefined) => {
  const { data: prices } = useTokenHoneyPrices([pool?.base, pool?.quote]);
  const basePrice = prices && prices[getAddress(pool?.base ?? "")];
  const quotePrice = prices && prices[getAddress(pool?.quote ?? "")];

  const QUERY_KEY = ["recentProvisions", pool, basePrice, quotePrice];
  const { isLoading } = useSWRImmutable(QUERY_KEY, async () => {
    if (!pool) {
      return undefined;
    }
    try {
      const provisions: IProvisions[] | undefined = await client
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
              parseFloat(formattedBaseFlow) * basePrice;

            const estimatedQuoteHoneyValue =
              parseFloat(formattedQuoteFlow) * quotePrice;
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
              parseFloat(formattedBaseFlow) * -1 * basePrice;

            const estimatedQuoteHoneyValue =
              parseFloat(formattedQuoteFlow) * -1 * quotePrice;
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
