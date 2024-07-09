import { ApolloClient, InMemoryCache } from "@apollo/client";
import { decodeCrocPrice } from "@bera/beracrocswap";
import {
  chainId,
  crocIndexerEndpoint,
  crocQueryAddress,
  multicallAddress,
} from "@bera/config";
import {
  GetUserPools,
  getTokenHoneyPricesReq,
  searchFilteredPoolList,
} from "@bera/graphql";
import BigNumber from "bignumber.js";
import { BigNumber as EthersBigNumber } from "ethers";
import { Address, PublicClient, erc20Abi, getAddress, toHex } from "viem";

import { bexQueryAbi } from "~/abi";
import { BeraConfig, IUserPool, PoolV2, IUserPosition } from "~/types";
import { mapPoolToPoolV2 } from "~/utils";

interface Call {
  abi: any[];
  address: `0x${string}`;
  functionName: string;
  args: any[];
}

interface GetUserPoolsProps {
  args: { account: Address; keyword?: string };
  config: BeraConfig;
  publicClient: PublicClient;
}

export const searchUserPools = async ({
  args: { account, keyword = "" },
  config,
  publicClient,
}: GetUserPoolsProps): Promise<IUserPool[] | undefined> => {
  if (!publicClient) return undefined;
  const hexChainId = toHex(chainId);
  if (!account || !hexChainId) {
    return undefined;
  }
  if (!config.subgraphs?.dexSubgraph) {
    throw new Error(
      "getUserPools: missing config from params - config.subgraphs.dexSubgraph",
    );
  }
  const subgraphEndpoint = config.subgraphs?.dexSubgraph;
  const dexClient = new ApolloClient({
    uri: subgraphEndpoint,
    cache: new InMemoryCache(),
  });

  try {
    const response = await dexClient.query({
      query: GetUserPools,
      variables: {
        user: account.toLowerCase(),
      },
    });

    console.log(response);
    const positions = response.data.userPools.depositedPools.map(
      (depositedPool: any) => depositedPool.pool,
    );

    const baseTokenAddresses: string[] = [];
    const quoteTokenAddresses: string[] = [];

    for (const pool of positions) {
      baseTokenAddresses.push(pool.base);
      quoteTokenAddresses.push(pool.quote);
    }

    const calls: Call[] = positions.map((pool: any) => {
      return {
        abi: bexQueryAbi,
        address: crocQueryAddress,
        functionName: "queryPrice",
        args: [pool.base, pool.quote, pool.poolIdx],
      };
    });

    // get price of all pools so that we can calculate estimated user postions
    const result = publicClient.multicall({
      contracts: calls,
      multicallAddress: multicallAddress,
    });

    const balanceCalls: Call[] = positions.map((pool: any) => {
      return {
        abi: erc20Abi,
        address: pool.shareAddress.address,
        functionName: "balanceOf",
        args: [account],
      };
    });

    const balanceResult = publicClient.multicall({
      contracts: balanceCalls,
      multicallAddress: multicallAddress,
    });

    const [poolPrices, lpBalances] = await Promise.all([result, balanceResult]);

    const userPositions: IUserPool[] = [];

    console.log("poolPrices", poolPrices);
    console.log("lpBalances", lpBalances);

    positions.forEach((position: any, i: number) => {
      const poolPrice = poolPrices[i]?.result;
      const pool: PoolV2 = mapPoolToPoolV2(position);
      if (!poolPrice) {
        return;
      }
      const decodedSpotPrice = decodeCrocPrice(
        EthersBigNumber.from(poolPrice.toString()),
      );

      const sqrtPrice = Math.sqrt(decodedSpotPrice);
      const liq = new BigNumber((lpBalances[i]?.result as any).toString());

      const baseAmount = liq.times(sqrtPrice);
      const quoteAmount = liq.div(sqrtPrice);

      const baseDecimals = pool.baseInfo.decimals;
      const quoteDecimals = pool.quoteInfo.decimals;

      const formattedBaseAmount = baseAmount
        .div(10 ** baseDecimals)
        .toString()
        .includes("e")
        ? "0"
        : baseAmount.div(10 ** baseDecimals).toString();
      const formattedQuoteAmount = quoteAmount
        .div(10 ** quoteDecimals)
        .toString()
        .includes("e")
        ? "0"
        : quoteAmount.div(10 ** quoteDecimals).toString();

      const estimatedHoneyValue =
        parseFloat(pool.baseInfo.usdValue ?? "0") *
          parseFloat(formattedBaseAmount) +
        parseFloat(pool.quoteInfo.usdValue ?? "0") *
          parseFloat(formattedQuoteAmount);
      const userPosition: IUserPosition = {
        baseAmount,
        quoteAmount,
        formattedBaseAmount,
        formattedQuoteAmount,
        estimatedHoneyValue,
        seeds: BigInt(0),
      };

      userPositions.push({
        ...pool,
        userPosition,
      });
    });
    return userPositions.filter(
      (p: IUserPool) =>
        p.userPosition?.formattedBaseAmount !== "0" &&
        p.userPosition?.formattedQuoteAmount !== "0",
    ) as IUserPool[];
  } catch (e) {
    console.log(e);
    return undefined;
  }
};
