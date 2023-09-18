import { NextResponse } from "next/server";
import { RouterService, defaultConfig } from "@bera/bera-router";

import { getBaseTokenPrice, type MappedTokens } from "./getPrice";

// export const fetchCache = "force-cache";

export const revalidate = 60;

export async function GET() {
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
  if (!mappedTokens) {
    return NextResponse.json({ error: "No mapped tokens found" });
  }

  return NextResponse.json(mappedTokens);
}
