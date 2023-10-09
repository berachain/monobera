import { type Pool, type RouterService } from "@bera/bera-router";
import { getAddress, parseUnits } from "viem";
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
    return result;
    console.log(response);
  } catch (e) {
    return 0;
  }
};
const BASE_TOKEN = getAddress(process.env.NEXT_PUBLIC_HONEY_ADDRESS as string);

export const getBaseTokenPrice = async (
  pools: Pool[],
  router: RouterService,
) => {
  let mappedTokens: MappedTokens = {};

  if (pools.length) {
    const allPoolPromises: any[] = [];
    pools.forEach((pool) => {
      const tokenPromises = pool.tokens
        .filter((token: { address: string }) => token.address !== BASE_TOKEN)
        .map((token: { address: any; decimals: number }) =>
          router
            .getSwaps(token.address, BASE_TOKEN, 0, parseUnits(`${1}`, 18))
            .catch(() => {
              return undefined;
            }),
        );

      allPoolPromises.push(tokenPromises);
    });

    const allPoolData = (await Promise.all(allPoolPromises.flat())).filter(
      (pool) => pool !== undefined,
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
