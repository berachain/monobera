import { ApolloClient, InMemoryCache } from "@apollo/client";
import { Address } from "viem";
import { getApyInfo, getTokenHoneyPriceReq } from "@bera/graphql";
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
        id: beraTokenAddress.toLowerCase(),
      },
    })
    .then((res: any) => {
      return res.data.tokenHoneyPrice?.price;
    })
    .catch((e: any) => {
      console.log(e);
      return "0";
    });
  const apyInfo: any = await bgtClient
    .query({
      query: getApyInfo,
    })
    .then((res: any) => {
      return res
    })
    .catch((e: any) => {
      console.log(e);
      return undefined;
    });

  console.log(apyInfo)
  if (!apyInfo) return "0";

  const globalRewardRate =
    parseFloat(apyInfo.data.globalInfo.baseRate) +
    parseFloat(apyInfo.data.globalInfo.rewardRate);

  const totalBgtStaked = parseFloat(apyInfo.data.globalInfo.totalBgtStaked);

  console.log(receiptTokenAddress, apyInfo.data.globalCuttingBoardWeights)
  const selectedCuttingBoard = apyInfo.data.globalCuttingBoardWeights.find(
    (cb: any) =>
      cb.vault.stakingToken.id.toLowerCase() ===
      receiptTokenAddress.toLowerCase(),
  );

  console.log(selectedCuttingBoard)

  if (!selectedCuttingBoard) return "0";


  const estimatedBgtPerBlock =
    (parseFloat(selectedCuttingBoard.amount) / totalBgtStaked) *
    globalRewardRate;
  const secondsInAYear = 60 * 60 * 24 * 365;
  const blocksPerSecond = 1 / blockTime;
  const blocksPerYear = secondsInAYear * blocksPerSecond;
  const estimatedBgtPerYear = estimatedBgtPerBlock * blocksPerYear;
  const honeyValueEstimatedBgtPerYear =
    estimatedBgtPerYear * parseFloat(beraHoneyPrice);

    console.log({
      honeyValueEstimatedBgtPerYear,
      tvlInHoney,
      apy: ((honeyValueEstimatedBgtPerYear / tvlInHoney) * 100).toString(),
    })
  const apy = ((honeyValueEstimatedBgtPerYear / tvlInHoney) * 100).toString();
  return apy;
  return "0";
};
