import { type BatchSwapStep, type Pool } from "@bera/bera-router";
import { parseUnits } from "ethers";
import { formatUnits, getAddress } from "viem";
import { type Address } from "wagmi";

export interface MappedTokens {
  [key: string]: number;
}

const handleNativeBera = (token: Address) => {
  if (token === getAddress(process.env.NEXT_PUBLIC_BERA_ADDRESS as string)) {
    return getAddress(process.env.NEXT_PUBLIC_WBERA_ADDRESS as string);
  }
  return token;
};
export const getSwap = async (
  tokenIn: Address,
  tokenOut: Address,
  tokenInDecimals: number,
  tokenOutDecimals: number,
  swapType: number,
  amount: string,
) => {
  try {
    const type = swapType === 0 ? "given_in" : "given_out";
    const parsedAmount = parseUnits(
      amount,
      type === "given_in" ? tokenInDecimals ?? 18 : tokenOutDecimals ?? 18,
    );

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_INDEXER_ENDPOINT
      }/dex/route?quote_asset=${handleNativeBera(
        tokenOut,
      )}&base_asset=${handleNativeBera(
        tokenIn,
      )}&amount=${parsedAmount}&swap_type=${type}`,
    );

    const result = await response.json();

    if (!result.steps)
      return {
        batchSwapSteps: [],
        formattedSwapAmount: amount.toString(),
        formattedAmountIn: "0",
        formattedReturnAmount: "0",
        returnAmount: 0n,
        tokenIn,
        tokenOut,
      };

    const batchSwapSteps: BatchSwapStep[] = result.steps.map((step: any) => {
      return {
        poolId: step.pool,
        assetIn: step.assetIn,
        amountIn: BigInt(step.amountIn),
        assetOut: step.assetOut,
        amountOut: BigInt(step.amountOut),
        userData: "",
      };
    });

    if (
      tokenIn === getAddress(process.env.NEXT_PUBLIC_BERA_ADDRESS as string)
    ) {
      if (batchSwapSteps[0]) {
        batchSwapSteps[0].assetIn = process.env
          .NEXT_PUBLIC_BERA_ADDRESS as Address;
        batchSwapSteps[0].value = batchSwapSteps[0].amountIn;
        // batchSwapSteps[0].amountIn = 0n;
      }
    }

    console.log({
      tokenInDecimals,
      tokenOutDecimals,
      result,
    });
    console.log;
    const swapInfo = {
      batchSwapSteps: batchSwapSteps,
      formattedSwapAmount: amount.toString(),
      formattedAmountIn: formatUnits(
        BigInt(result.steps[0].amountIn),
        tokenInDecimals ?? 18,
      ),
      formattedReturnAmount: formatUnits(
        BigInt(result.steps[result.steps.length - 1].amountOut),
        tokenOutDecimals ?? 18,
      ),
      returnAmount: BigInt(result.steps[result.steps.length - 1].amountOut),
      tokenIn,
      tokenOut,
    };

    console.log(swapInfo);
    return swapInfo;
  } catch (e) {
    console.log(e);
    return {
      batchSwapSteps: [],
      formattedSwapAmount: amount.toString(),
      formattedAmountIn: "0",
      formattedReturnAmount: "0",
      returnAmount: 0n,
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
          getSwap(token.address, BASE_TOKEN, token.decimals, 18, 0, "1").catch(
            () => {
              return undefined;
            },
          ),
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
