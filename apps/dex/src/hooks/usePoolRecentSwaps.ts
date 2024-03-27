import { mutate } from "swr";
import { type PoolV2 } from "~/app/pools/fetchPools";
import useSWRImmutable from "swr/immutable";
import { type Token } from "@bera/berajs";
import { dexClient, getRecentSwaps } from "@bera/graphql";
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
  baseAssetHoneyPrice: string;
  quoteAssetHoneyPrice: string;
}

export const usePoolRecentSwaps = (pool: PoolV2 | undefined) => {
  const QUERY_KEY = ["recentSwaps", pool];
  const { isLoading } = useSWRImmutable(QUERY_KEY, async () => {
    if (!pool) {
      return undefined;
    }
    try {
      const swaps: ISwaps[] | undefined = await dexClient
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
          estimatedHoneyValue =
            parseFloat(formattedQuoteFlow) *
              parseFloat(swap.quoteAssetHoneyPrice) +
            parseFloat(formattedBaseFlow) *
              -1 *
              parseFloat(swap.baseAssetHoneyPrice);

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
          estimatedHoneyValue =
            parseFloat(formattedBaseFlow) *
              parseFloat(swap.baseAssetHoneyPrice) +
            parseFloat(formattedQuoteFlow) *
              -1 *
              parseFloat(swap.quoteAssetHoneyPrice);

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
