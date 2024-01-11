import { NextResponse } from "next/server";

import { getBaseTokenPrice, type MappedTokens } from "./getPrices";
import { subgraphUrl } from "@bera/config";

// export const fetchCache = "force-cache";

export const revalidate = 10;

export async function GET() {
  // const router = new RouterService(defaultConfig);
  // try {
  //   await router.fetchPools();
  // } catch (e) {
  //   console.log(`Error fetching pools: ${e}`);
  //   return;
  // }
  // const pools = router.getPools() ?? [];


  const data = await fetch(subgraphUrl, {
    method: "POST",
    body: JSON.stringify({
      query: `{
          pools {
            id
            pool: address
            poolName: name
            tokens: poolTokens {
              denomWeight
              amount
              denom
              address
              symbol
              decimals
              latestPriceUsd {
                id
                price
              }
            }
            swapFee
            sharesDenom
            sharesAddress
            totalShares
            tvlUsd
          }}`,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 10 },
  })
    .then(async(res) => await res.json())
    .catch((e: any) => {
      console.log("fetching error", e);
      return undefined;
    });

  try {
    const mappedTokens: MappedTokens | undefined = await getBaseTokenPrice(
      data?.data?.pools,
    );
    if (!mappedTokens) {
      return NextResponse.json({ error: "No mapped tokens found" });
    }

    return NextResponse.json(mappedTokens);
  } catch (e) {
    console.log(e);
  }
}
