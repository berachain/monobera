import { NextResponse } from "next/server";
import { RouterService, defaultConfig } from "@bera/bera-router";

import { MappedTokens, getBaseTokenPrice } from "./getPrice";

export const revalidate = 300; // revalidate at most every hour

export async function GET(request: Request) {
  const router = new RouterService(defaultConfig);
  try {
    await router.fetchPools();
  } catch (e) {
    console.log(`Error fetching pools: ${e}`);
    return;
  }
  const pools = router.getPools() ?? [];

  const mappedTokens: MappedTokens | undefined = await getBaseTokenPrice(
    pools,
    router,
  );
  return NextResponse.json(mappedTokens);
}
