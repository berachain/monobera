import { mutate } from "swr";
import { type PoolV2 } from "~/app/pools/fetchPools";
import useSWRImmutable from "swr/immutable";
import { useTokenHoneyPrices, type Token } from "@bera/berajs";
import { client, getRecentSwaps } from "@bera/graphql";
import { getSafeNumber } from "~/utils/getSafeNumber";
import { formatUnits, getAddress } from "viem";

export interface ISwaps {
  user: string;
  baseFlow: string;
  quoteFlow: string;
  swapIn: Token;
  swapOut: Token;
  swapInAmount: number;
  swapOutAmount: number;
  transactionHash: string;
  time: number;
  estimatedHoneyValue?: number;
}

export const usePoolRecentSwaps = (pool: PoolV2 | undefined) => {
  const { data: prices } = useTokenHoneyPrices([pool?.base, pool?.quote]);
  const basePrice = prices?.[getAddress(pool?.base ?? "")];
  const quotePrice = prices?.[getAddress(pool?.quote ?? "")];

  const QUERY_KEY = ["recentSwaps", pool, basePrice, quotePrice];
  const { isLoading } = useSWRImmutable(QUERY_KEY, async () => {
    if (!pool) {
      return undefined;
    }
    try {
      const swaps: ISwaps[] | undefined = await client
        .query({
          query: getRecentSwaps,
          variables: {
            poolHash: pool.id,
          },
        })
        .then((res: any) => {
          return res.data.swaps;
        })
        .catch((e: any) => {
          console.log(e);
          return undefined;
        });

      if (!swaps) {
        return undefined;
      }

      const swapsWithHoneyValue = swaps.map((swap: ISwaps) => {
        const numberBaseFlow = getSafeNumber(swap.baseFlow);
        const numberQuoteFlow = getSafeNumber(swap.quoteFlow);

        let estimatedHoneyValue = 0;
        let swapIn = undefined;
        let swapOut = undefined;
        let swapInAmount = 0;
        let swapOutAmount = 0;

        if (numberBaseFlow < 0 && numberQuoteFlow > 0) {
          // sell
          const formattedBaseFlow = formatUnits(
            BigInt(swap.baseFlow),
            pool.baseInfo.decimals,
          );
          const formattedQuoteFlow = formatUnits(
            BigInt(swap.quoteFlow),
            pool.quoteInfo.decimals,
          );
          estimatedHoneyValue = parseFloat(formattedQuoteFlow) * quotePrice;

          swapIn = pool.quoteInfo;
          swapOut = pool.baseInfo;
          swapInAmount = parseFloat(formattedQuoteFlow);
          swapOutAmount = parseFloat(formattedBaseFlow) * -1;
        } else if (numberBaseFlow > 0 && numberQuoteFlow < 0) {
          // buy
          const formattedBaseFlow = formatUnits(
            BigInt(swap.baseFlow),
            pool.baseInfo.decimals,
          );
          const formattedQuoteFlow = formatUnits(
            BigInt(swap.quoteFlow),
            pool.quoteInfo.decimals,
          );
          estimatedHoneyValue = parseFloat(formattedBaseFlow) * basePrice;

          swapIn = pool.baseInfo;
          swapOut = pool.quoteInfo;
          swapInAmount = parseFloat(formattedBaseFlow);
          swapOutAmount = parseFloat(formattedQuoteFlow) * -1;
        }
        return {
          ...swap,
          estimatedHoneyValue,
          swapIn,
          swapOut,
          swapInAmount,
          swapOutAmount,
        };
      });
      return swapsWithHoneyValue;
    } catch (e) {
      console.log(e);
      return undefined;
    }
  });

  const useRecentSwaps = () => {
    const { data = undefined } = useSWRImmutable<ISwaps[] | undefined>(
      QUERY_KEY,
    );
    return data;
  };

  return {
    isLoading,
    useRecentSwaps,
    refresh: () => void mutate(QUERY_KEY),
  };
};
