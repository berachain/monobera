import { ApolloClient, InMemoryCache } from "@apollo/client";
import { decodeCrocPrice } from "@bera/beracrocswap";
import { chainId, crocQueryAddress, multicallAddress } from "@bera/config";
import { GetUserPools } from "@bera/graphql";
import BigNumber from "bignumber.js";
import { BigNumber as EthersBigNumber } from "ethers";
import {
  Address,
  PublicClient,
  erc20Abi,
  formatUnits,
  getAddress,
  parseUnits,
  toHex,
} from "viem";

import { BERA_VAULT_REWARDS_ABI, bexQueryAbi } from "~/abi";
import { ADDRESS_ZERO } from "~/constants";
import { BeraConfig, IUserPool, PoolV2, IUserPosition } from "~/types";
import { mapPoolToPoolV2 } from "~/utils";
import * as react_hook_form from "react-hook-form";

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

    const positions = response.data.userPools.depositedPools.map(
      (depositedPool: any) => depositedPool.pool,
    );

    const baseTokenAddresses: string[] = [];
    const quoteTokenAddresses: string[] = [];

    for (const pool of positions) {
      baseTokenAddresses.push(pool.base);
      quoteTokenAddresses.push(pool.quote);
    }

    const priceCalls: Call[] = positions.map((pool: any) => {
      return {
        abi: bexQueryAbi,
        address: crocQueryAddress,
        functionName: "queryPrice",
        args: [pool.base, pool.quote, pool.poolIdx],
      };
    });

    // get price of all pools so that we can calculate estimated user postions
    const pricesResult = publicClient.multicall({
      contracts: priceCalls,
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

    const vaultDepositedCalls: Call[] = positions.map((pool: any) => {
      return {
        abi: erc20Abi,
        address: pool?.vault?.vaultAddress ?? ADDRESS_ZERO,
        functionName: "balanceOf",
        args: [account],
      };
    });

    const vaultDepositedResult = publicClient.multicall({
      contracts: vaultDepositedCalls,
      multicallAddress: multicallAddress,
    });

    const vaultEarnedCalls: Call[] = positions.map((pool: any) => ({
      address: pool?.vault?.vaultAddress ?? ADDRESS_ZERO,
      abi: BERA_VAULT_REWARDS_ABI,
      functionName: "earned",
      args: [account],
    }));

    const vaultEarnedResult = publicClient.multicall({
      contracts: vaultEarnedCalls,
      multicallAddress: multicallAddress,
    });

    const [poolPrices, lpBalances, vaultBalances, vaultEarned] =
      await Promise.all([
        pricesResult,
        balanceResult,
        vaultDepositedResult,
        vaultEarnedResult,
      ]);

    const userPositions: IUserPool[] = [];

    positions.forEach((position: any, i: number) => {
      const poolPrice = poolPrices[i]?.result;
      const pool: PoolV2 = mapPoolToPoolV2(position);
      if (!poolPrice) {
        return;
      }

      const { baseAmount, quoteAmount } = getBaseQuoteAmounts(
        lpBalances[i]?.result as any,
        poolPrice as any,
      );

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

      const rawVaultBalance =
        vaultBalances[i].result === undefined ||
        vaultBalances[i]?.result?.toString() === "0x"
          ? 0n
          : (vaultBalances[i].result as unknown as bigint);

      const {
        baseAmount: depositedBaseAmount,
        quoteAmount: depositedQuoteAmount,
      } = getBaseQuoteAmounts(
        (vaultBalances[i]?.result ?? 0n) as any,
        poolPrice as any,
      );

      const formattedDepositedBaseAmount = depositedBaseAmount
        .div(10 ** baseDecimals)
        .toString()
        .includes("e")
        ? "0"
        : depositedBaseAmount.div(10 ** baseDecimals).toString();

      const formattedDepositedQuoteAmount = depositedQuoteAmount
        .div(10 ** quoteDecimals)
        .toString()
        .includes("e")
        ? "0"
        : depositedQuoteAmount.div(10 ** quoteDecimals).toString();

      const estimatedDepositedHoneyValue =
        parseFloat(pool.baseInfo.usdValue ?? "0") *
          parseFloat(formattedDepositedBaseAmount) +
        parseFloat(pool.quoteInfo.usdValue ?? "0") *
          parseFloat(formattedDepositedQuoteAmount);

      const vaultBalance = formatUnits(rawVaultBalance, 18);

      const bgtEarned = formatUnits((vaultEarned[i].result ?? 0n) as any, 18);
      const userPosition: IUserPosition = {
        baseAmount,
        quoteAmount,
        formattedBaseAmount,
        formattedQuoteAmount,
        estimatedHoneyValue,
        vaultBalance: rawVaultBalance,
        formattedVaultBalance: vaultBalance,
        estimatedDepositedHoneyValue,
        bgtEarned,
        seeds: new BigNumber(0),
      };

      userPositions.push({
        ...pool,
        userPosition,
      });
    });
    return userPositions.filter(
      (p: IUserPool) =>
        (p.userPosition?.formattedBaseAmount !== "0" &&
          p.userPosition?.formattedQuoteAmount !== "0") ||
        p.userPosition?.formattedVaultBalance !== "0",
    ) as IUserPool[];
  } catch (e) {
    console.log(e);
    return undefined;
  }
};

export const getBaseQuoteAmounts = (seeds: bigint, price: bigint) => {
  const decodedSpotPrice = decodeCrocPrice(
    EthersBigNumber.from(price.toString()),
  );
  const sqrtPrice = Math.sqrt(decodedSpotPrice);

  const liq = new BigNumber(seeds.toString());
  const baseAmount = liq.times(sqrtPrice);
  const quoteAmount = liq.div(sqrtPrice);

  return {
    baseAmount,
    quoteAmount,
  };
};
