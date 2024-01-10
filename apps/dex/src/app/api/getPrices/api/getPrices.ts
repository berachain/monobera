import { type BatchSwapStep, type Pool } from "@bera/bera-router";
import { jsonRpcUrl } from "@bera/config";
import { parseUnits } from "ethers";
import { formatUnits, getAddress, toHex } from "viem";
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
    const type = "given_in";
    // const parsedAmount = parseUnits(
    //   amount,
    //   type === "given_in" ? tokenInDecimals ?? 18 : tokenOutDecimals ?? 18,
    // );

    const rpcRequest = {
      jsonrpc: "2.0",
      method: "eth_routeDexSwap",
      params: [
        handleNativeBera(tokenIn),
        handleNativeBera(tokenOut),
        toHex(parseUnits(`${amount}`, tokenInDecimals)),
        type,
        "latest",
      ],
      id: 1, // You can set this to any unique value to correlate with the response.
    };

    // Fetch options for the POST request
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rpcRequest),
    };
    // const response = await fetch(
    //   `${
    //     process.env.NEXT_PUBLIC_INDEXER_ENDPOINT
    //   }/dex/route?quote_asset=${tokenOut}&base_asset=${tokenIn}&amount=${parseUnits(
    //     `${amount}`,
    //     18,
    //   )}&swap_type=${type}`,
    // );

    const response = await fetch(jsonRpcUrl, fetchOptions);

    let result = await response.json();
    result = result.result;
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
        assetIn: step.asset_in,
        amountIn: BigInt(step.amount_in),
        assetOut: step.asset_out,
        amountOut: BigInt(step.amount_out),
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
      }
    }

    if (
      tokenOut === getAddress(process.env.NEXT_PUBLIC_BERA_ADDRESS as string)
    ) {
      const lastStep = batchSwapSteps.length - 1;
      if (
        batchSwapSteps !== undefined &&
        batchSwapSteps[lastStep] !== undefined
      ) {
        // @ts-ignore
        batchSwapSteps[lastStep].assetOut = process.env
          .NEXT_PUBLIC_BERA_ADDRESS as Address;
        // batchSwapSteps[0].value = batchSwapSteps[0].amountIn;
      }
    }
    const swapInfo = {
      batchSwapSteps: batchSwapSteps,
      formattedSwapAmount: amount.toString(),
      formattedAmountIn: formatUnits(
        BigInt(result.steps[0].amount_in),
        tokenInDecimals ?? 18,
      ),
      formattedReturnAmount: formatUnits(
        BigInt(result.steps[result.steps.length - 1].amount_out),
        tokenOutDecimals ?? 18,
      ),
      returnAmount: BigInt(result.steps[result.steps.length - 1].amount_out),
      tokenIn,
      tokenOut,
    };

    return swapInfo;
  } catch (e) {
    console.error(e);
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
const BERA_TOKEN = getAddress(process.env.NEXT_PUBLIC_BERA_ADDRESS as string);
const WBERA_TOKEN = getAddress(process.env.NEXT_PUBLIC_WBERA_ADDRESS as string);

export const getBaseTokenPrice = async (pools: Pool[]) => {
  
  console.log(pools)
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
          { [BASE_TOKEN]: 1 },
        )
      : undefined;

    const beraPrice = mappedTokens[WBERA_TOKEN] ?? 0;
    mappedTokens = {
      ...mappedTokens,
      [BERA_TOKEN]: beraPrice,
    };
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
