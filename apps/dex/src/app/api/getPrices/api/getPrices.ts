import { type BatchSwapStep, type Pool } from "@bera/bera-router";
import { formatUnits, getAddress, parseUnits } from "viem";
import { type Address } from "wagmi";

export interface MappedTokens {
  [key: string]: number;
}

export const getSwap = async (
  tokenIn: Address,
  tokenOut: Address,
  swapType: number,
  amount: number,
) => {
  try {
    const type = swapType === 0 ? "given_in" : "given_out";
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_INDEXER_ENDPOINT
      }/dex/route?quote_asset=${tokenOut}&base_asset=${tokenIn}&amount=${parseUnits(
        `${amount}`,
        18,
      )}&swap_type=${type}`,
    );

    const result = await response.json();
    if (!result.steps)
      return {
        batchSwapSteps: [],
        formattedSwapAmount: amount.toString(),
        formattedReturnAmount: "0",
        tokenIn,
        tokenOut,
      };

    const batchSwapSteps: BatchSwapStep[] = result.steps.map((step: any) => {
      return {
        poolId: step.pool,
        assetIn: step.assetIn,
        amountIn: BigInt(step.amountIn),
        assetOut: step.assetOut,
        amountOut: step.amountOut,
        userData: "",
      };
    });
    const swapInfo = {
      batchSwapSteps: batchSwapSteps,
      formattedSwapAmount: amount.toString(),
      formattedReturnAmount: formatUnits(
        BigInt(result.steps[result.steps.length - 1].amountOut),
        18,
      ),
      tokenIn,
      tokenOut,
    };
    return swapInfo;
  } catch (e) {
    return {
      batchSwapSteps: [],
      formattedSwapAmount: amount.toString(),
      formattedReturnAmount: "0",
      tokenIn,
      tokenOut,
    };
  }
};
const BASE_TOKEN = getAddress(process.env.NEXT_PUBLIC_HONEY_ADDRESS as string);

export const getBaseTokenPrice = async (pools: Pool[]) => {
  let mappedTokens: MappedTokens = {};

  if (pools.length) {
    const allPoolPromises: any[] = [];
    pools.forEach((pool) => {
      const tokenPromises = pool.tokens
        .filter((token: { address: string }) => token.address !== BASE_TOKEN)
        .map((token: { address: any; decimals: number }) =>
          getSwap(token.address, BASE_TOKEN, 0, 1).catch(() => {
            return undefined;
          }),
        );

      allPoolPromises.push(tokenPromises);
    });

    const allPoolData = (await Promise.all(allPoolPromises.flat())).filter(
      (pool) => Object.keys(pool).length !== 0,
    );

    mappedTokens = allPoolData?.length
      ? allPoolData?.reduce(
          (acc, cur) => {
            acc[getAddress(cur.tokenIn)] = cur.formattedReturnAmount;
            return acc;
          },
          { [BASE_TOKEN]: "1" },
        )
      : undefined;
  }

  return mappedTokens;
};

export const getWBeraPriceForToken = (
  prices: MappedTokens,
  token: Address,
  amount: number,
) => {
  if (!prices) return 0;
  if (!token) return 0;
  if (!prices[token]) return 0;
  const priceInBera = Number(prices[token]);
  return priceInBera * amount;
};
