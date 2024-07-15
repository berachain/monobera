import { ApolloClient, InMemoryCache } from "@apollo/client";
import { getRecentProvisions } from "@bera/graphql";
import { formatUnits } from "viem";

import { IProvision, PoolV2 } from "~/types";
import { BeraConfig } from "~/types/global";

interface IGetPoolRecentProvisionsProps {
  args: { pool: PoolV2 };
  config: BeraConfig;
}

interface IProvisionWithHoneyValue extends IProvision {
  estimatedUsdValue: number;
}

export type GetPoolRecentProvisionsResult = IProvisionWithHoneyValue[];

/**
 * Fetchs a list of recent provisions for a given pool. provisions withdraw or deposit events in the pool.
 * @param {PoolV2} param.args.pool - pool of which to fetch recent provisions.
 * @param {BeraConfig} param.config - config: required config.subgraphs.dexSubgraph
 * @returns {Promise<GetPoolRecentProvisionsResult | undefined>} returns undefined if no pool
 */
export const getPoolRecentProvisions = async ({
  args: { pool },
  config,
}: IGetPoolRecentProvisionsProps): Promise<
  GetPoolRecentProvisionsResult | undefined
> => {
  if (!pool) {
    return undefined;
  }

  if (!config.subgraphs?.dexSubgraph) {
    throw new Error(
      "getPoolRecentProvisions: missing config from params - config.subgraphs.dexSubgraph",
    );
  }

  const dexClient = new ApolloClient({
    uri: config.subgraphs?.dexSubgraph,
    cache: new InMemoryCache(),
  });

  try {
    const provisions: IProvision[] | undefined = await dexClient
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
      (provision: IProvision) => {
        let estimatedUsdValue = 0;
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
            parseFloat(provision.baseAssetUsdPrice);

          const estimatedQuoteHoneyValue =
            parseFloat(formattedQuoteFlow) *
            parseFloat(provision.quoteAssetUsdPrice);
          estimatedUsdValue =
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
            parseFloat(provision.baseAssetUsdPrice);

          const estimatedQuoteHoneyValue =
            parseFloat(formattedQuoteFlow) *
            -1 *
            parseFloat(provision.quoteAssetUsdPrice);
          estimatedUsdValue =
            estimatedBaseHoneyValue + estimatedQuoteHoneyValue;
        }
        return {
          ...provision,
          estimatedUsdValue,
        };
      },
    );
    return provisionsWithHoneyValue;
  } catch (e) {
    console.log(e);
    return undefined;
  }
};
