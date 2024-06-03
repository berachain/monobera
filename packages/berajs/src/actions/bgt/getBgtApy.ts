import { ApolloClient, InMemoryCache } from "@apollo/client";
import { Address } from "viem";
import { GetBgtInflation, getTokenHoneyPriceReq } from "@bera/graphql";
import { BeraConfig } from "~/types/global";
import { beraTokenAddress, blockTime } from "@bera/config";

interface GetBgtApyArgs {
  receiptTokenAddress: Address | undefined;
  tvlInHoney: number | undefined;
  config: BeraConfig;
}

/**
 * fetch the current honey price of a given token
 */

export const getBgtApy = async ({
  receiptTokenAddress,
  tvlInHoney,
  config,
}: GetBgtApyArgs): Promise<string | undefined> => {
  if (!config.subgraphs?.bgtSubgraph) {
    throw new Error("bgt subgraph uri is not found in config");
  }
  if (!config.subgraphs?.dexSubgraph) {
    throw new Error("dex subgraph uri is not found in config");
  }
  const bgtClient = new ApolloClient({
    uri: config.subgraphs?.bgtSubgraph,
    cache: new InMemoryCache(),
  });

  const dexClient = new ApolloClient({
    uri: config.subgraphs?.dexSubgraph,
    cache: new InMemoryCache(),
  });

  if (!receiptTokenAddress) {
    return undefined;
  }
  if (!tvlInHoney || tvlInHoney === 0 || !Number.isFinite(tvlInHoney)) {
    return undefined;
  }

  const beraHoneyPrice = await dexClient
    .query({
      query: getTokenHoneyPriceReq,
      variables: {
        id: beraTokenAddress,
      },
    })
    .then((res: any) => {
      return res.data.tokenHoneyPrice?.price;
    })
    .catch((e: any) => {
      console.log(e);
      return "0";
    });
  const rewardRates: {
    baseRate: string;
    rewardRate: string;
  } = await bgtClient
    .query({
      query: GetBgtInflation,
    })
    .then((res: any) => {
      return {
        baseRate: res.data.globalInfo.baseRewardRate,
        rewardRate: res.data.globalInfo.rewardRate,
      };
    })
    .catch((e: any) => {
      console.log(e);
      return {
        baseRate: "0",
        rewardRate: "0",
      };
    });

  const estimatedBgtPerBlock =
    parseFloat(rewardRates.baseRate) + parseFloat(rewardRates.rewardRate);
  const secondsInAYear = 60 * 60 * 24 * 365;
  const blocksPerSecond = 1 / blockTime;
  const blocksPerYear = secondsInAYear * blocksPerSecond;
  const estimatedBgtPerYear = estimatedBgtPerBlock * blocksPerYear;
  const honeyValueEstimatedBgtPerYear =
    estimatedBgtPerYear * parseFloat(beraHoneyPrice);

  const apy = ((honeyValueEstimatedBgtPerYear / tvlInHoney) * 100).toString();
  return apy;
};
