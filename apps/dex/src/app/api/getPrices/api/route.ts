import { NextResponse } from "next/server";
import { RouterService, defaultConfig } from "@bera/bera-router";

import { getBaseTokenPrice, type MappedTokens } from "./getPrices";

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

  try {
    const mappedTokens: MappedTokens | undefined = await getBaseTokenPrice(
      pools,
    );
    if (!mappedTokens) {
      return NextResponse.json({ error: "No mapped tokens found" });
    }

    return NextResponse.json(mappedTokens);
  } catch (e) {
    console.log(e);
  }
}
