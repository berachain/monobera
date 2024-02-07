import { type Token } from "@bera/berajs";
import { client, getPoolList } from "@bera/graphql";
import { type Address } from "wagmi";
import { crocSubgraphEndpoint } from "@bera/config";
export interface PoolV2 {
  id: string; // concat base-quote-poolidx
  base: Address;
  quote: Address;
  baseInfo: Token;
  quoteInfo: Token;
  timeCreate: number;
  poolIdx: number;
  poolName: string; // concat {BASE}-{QUOTE}
  tokens: Token[];
  feeRate: number;
  tvlUsd: number;
  volumeUsd: number;
  fees: number;
}

export const getPoolId = (base: Address, quote: Address) => {
  return base.concat("-").concat(quote);
};

export const getPoolUrl = (pool: PoolV2) => {
  return `/pool?base=${pool.base}&quote=${pool.quote}`;
};

export const getPoolAddLiquidityUrl = (pool: PoolV2) => {
  return `/add-liquidity?base=${pool.base}&quote=${pool.quote}`;
};

export const getPoolWithdrawUrl = (pool: PoolV2) => {
  return `/withdraw?base=${pool.base}&quote=${pool.quote}`;
};

export const getBaseCost = (initialPrice: number) => {
  return 1 / initialPrice;
};

export const getQuoteCost = (initialPrice: number) => {
  return 1 * initialPrice;
};

export const formatPoolData = (result: any): PoolV2 => {
  return {
    id: result.id,
    base: result.base,
    quote: result.quote,
    baseInfo: result.baseInfo,
    quoteInfo: result.quoteInfo,
    timeCreate: result.timeCreate,
    poolIdx: result.poolIdx,
    poolName: result.baseInfo.symbol
      .concat("-")
      .concat(result.quoteInfo.symbol),
    tokens: [result.baseInfo, result.quoteInfo],
    feeRate: 0,
    tvlUsd: 0,
    volumeUsd: 0,
    fees: 0,
  };
};

export const fetchPools = async (
  page: number,
  limit: number,
): Promise<PoolV2[]> => {
  try {
    const result = await client
      .query({
        query: getPoolList,
        variables: {
          page: page,
          limit: limit,
        },
      })
      .then((res) => {
        if (res.error) {
          console.log(res.error);
          return undefined;
        }
        return res.data;
      })
      .catch((e) => {
        console.log(e);
        return undefined;
      });
    console.log("NEW RESULT WEEE", result);

    if (!result) {
      return [];
    }

    const formattedPools: PoolV2[] = result.pools.map((result: any) => {
      return formatPoolData(result);
    });

    return formattedPools;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const fetchSelectedPool = async (base: string, quote: string) => {
  const data = await fetch(crocSubgraphEndpoint, {
    method: "POST",
    body: JSON.stringify({
      query: `{
            pools(
              where:{
              base: "${base.toLowerCase()}"
              quote: "${quote.toLowerCase()}"
              }
            ) {
              id
              poolIdx
              base
              quote
              timeCreate
              baseInfo {
                id
                address
                symbol
                name
                decimals
              }
              quoteInfo{
                id
                address
                symbol
                name
                decimals
              }
            }
          }`,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 10 },
  })
    .then((res) => res.json())
    .catch((e: any) => console.log("fetching error", e));

  if (data?.error !== undefined) {
    console.error("error fetching selected pool");
    return undefined;
  }

  const formattedPools: PoolV2[] = data.data.pools.map((result: any) => {
    return formatPoolData(result);
  });

  return formattedPools[0];
};
