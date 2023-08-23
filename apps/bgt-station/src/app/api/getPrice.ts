import { type RouterService } from "@bera/bera-router";
import { type Pool } from "@bera/bera-router/dist/services/PoolService/types";
import { parseUnits } from "viem";
import { type Address } from "wagmi";

export interface MappedTokens {
    [key: string]: number;
  }
async function parseResponse(response: any) {
  const json = await response.json();
  return json;
}

interface Coin {
  denom: string;
  amount: string;
}

interface CoinsData {
  coins: Coin[];
}

const BASE_TOKEN = process.env.NEXT_PUBLIC_HONEY_ADDRESS as Address;

export const getWBeraPriceDictForPoolTokens = async (
  pools: Pool[],
  router: RouterService,
) => {
  let mappedTokens: MappedTokens = {};

  if (pools.length) {
    const allPoolPromises: any[] = [];
    pools.forEach((pool) => {
      const tokenPromises = pool.tokens
        .filter((token: { address: string; }) => token.address !== BASE_TOKEN)
        .map((token: { address: any; decimals: number; }) =>
          router
            .getSwaps(
              token.address,
              BASE_TOKEN,
              0,
              parseUnits(`${1}`, token.decimals),
            )
            .catch(() => {
              return undefined;
            }),
        );

      allPoolPromises.push(tokenPromises);
    });

    const allPoolData = (await Promise.all(allPoolPromises.flat())).filter(
      (pool) => pool !== undefined,
    );

    mappedTokens =
      allPoolData?.length &&
      allPoolData?.reduce(
        (acc, cur) => {
          acc[cur.tokenIn] = cur.formattedReturnAmount;
          return acc;
        },
        { [BASE_TOKEN]: "1" },
      );
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
