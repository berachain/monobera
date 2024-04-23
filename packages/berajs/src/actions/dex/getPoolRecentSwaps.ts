import { ApolloClient, InMemoryCache } from "@apollo/client";
import { getRecentSwaps } from "@bera/graphql";
import { formatUnits } from "viem";

import { BeraConfig, ISwaps, PoolV2, Token } from "~/types";
import { getSafeNumber } from "~/utils";

interface IGetPoolRecentSwapsProps {
  args: { pool: PoolV2 };
  config: BeraConfig;
}

interface ISwapWithHoneyValue extends Omit<ISwaps, "swapIn" | "swapOut"> {
  swapIn?: Token;
  swapOut?: Token;
  estimatedHoneyValue: number;
  swapInAmount: number;
  swapOutAmount: number;
}

type GetPoolRecentSwapsResult = ISwapWithHoneyValue[];

/**
 * Fetchs a list of recent swaps for a given pool
 * @param {PoolV2} param.args.pool - pool of which to fetch recent swaps
 * @param {BeraConfig} param.config - config: required config.subgraphs.dexSubgraph
 * @returns {Promise<GetPoolRecentSwapsResult | undefined>}
 */
export const getPoolRecentSwaps = async ({
  args: { pool },
  config,
}: IGetPoolRecentSwapsProps): Promise<GetPoolRecentSwapsResult | undefined> => {
  if (!pool) {
    return undefined;
  }
  if (!config.subgraphs?.dexSubgraph) {
    throw new Error(
      "getPoolrecentSwaps: missing config from params - config.subgraphs.dexSubgraph",
    );
  }

  const dexClient = new ApolloClient({
    uri: config.subgraphs?.dexSubgraph,
    cache: new InMemoryCache(),
  });

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
          parseFloat(formattedBaseFlow) * parseFloat(swap.baseAssetHoneyPrice) +
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
};
