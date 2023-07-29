import { notFound } from "next/navigation";
import { NextResponse } from "next/server";
import { RouterService, defaultConfig } from "@bera/bera-router";
import { type Pool } from "@bera/bera-router/dist/services/PoolService/types";
import { type Address } from "wagmi";

import { getWBeraPriceDictForPoolTokens } from "./getPrice";

function sortByParameter(
  data: Pool[],
  parameter: keyof Pool,
  order: "asc" | "desc",
): Pool[] {
  const sortOrder = order === "asc" ? 1 : -1;

  return data.sort((a, b) => {
    const valueA = a[parameter] ?? -Infinity;
    const valueB = b[parameter] ?? -Infinity;

    if (valueA < valueB) {
      return -1 * sortOrder;
    } else if (valueA > valueB) {
      return 1 * sortOrder;
    } else {
      return 0;
    }
  });
}

const DEFAULT_SIZE = 1;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const router = new RouterService(defaultConfig);
  try {
    await router.fetchPools();
  } catch (e) {
    console.log(`Error fetching pools: ${e}`);
  }
  const pools = router.getPools();
  await getWBeraPriceDictForPoolTokens(pools ?? [], router);

  if (!pools) {
    notFound();
  }
  // pages
  const page = searchParams.get("page");
  const perPage = searchParams.get("perPage");

  // tags
  const hasBgtRewards = searchParams.get("hasBgtRewards");
  const hotPools = searchParams.get("hotPools");
  const newPools = searchParams.get("newPools");

  let taggedPools: any[] = [];
  const poolIdsTracker: Set<Address> = new Set();

  if (hasBgtRewards) {
    // Assuming pools with bgt rewards are filtered and stored in the "bgtPools" array
    // for (const pool of []) {
    //   if (!poolIdsTracker.has(pool.id)) {
    //     taggedPools.push(pool);
    //     poolIdsTracker.add(pool.id);
    //   }
    // }
  }

  if (hotPools) {
    // A HOT POOL IS THE HIGHEST % INCREASE IN VOLUME OVER THE PAST 4 HOURS
    // Assuming hot pools are filtered and stored in the "hotPools" array
    // for (const pool of []) {
    //   if (!poolIdsTracker.has(pool.id)) {
    //     taggedPools.push(pool);
    //     poolIdsTracker.add(pool.id);
    //   }
    // }
  }

  if (newPools) {
    // NEW POOL IS NEW POOL IN PAST 24 HOURS WITH TVL OVER 50K USD
    // Assuming trending pools are filtered and stored in the "trendingPools" array
    // Step 1: Get the current time in milliseconds since epoch
      const currentTime = Date.now();

      // Step 2: Define the time duration for 24 hours in milliseconds
      const twentyFourHoursInMs = 24 * 60 * 60 * 1000;

      // Step 3: Filter the pools array based on the condition
      const poolsCreatedInLast24Hours = pools.filter((pool) => {
        // Get the timestamp of the pool creation time in milliseconds since epoch
        const poolCreationTime = Date.parse(pool.metadata.blockTime);

        // Check if the pool was created within the last 24 hours
        return ((currentTime - poolCreationTime <= twentyFourHoursInMs) && ((pool?.totalValue ?? 0) >= 50000));
      });

    for (const pool of poolsCreatedInLast24Hours) {
      if (!poolIdsTracker.has(pool.pool)) {
        taggedPools.push(pool);
        poolIdsTracker.add(pool.pool);
      }
    }
  }

  if(!hasBgtRewards && !hotPools && !newPools) taggedPools = pools;
  
  // sortables
  const volume = searchParams.get("volume");
  const bgtRewards = searchParams.get("bgtRewards");
  const tvl = searchParams.get("tvl");

  let sortedPools = taggedPools;
  if (!volume && !bgtRewards && !tvl) {
    sortedPools = sortByParameter(sortedPools, "dailyVolume", "desc");
  }
  if (volume) {
    sortedPools = sortByParameter(
      sortedPools,
      "dailyVolume",
      volume as "asc" | "desc",
    );
  }
  if (bgtRewards) {
    sortedPools = sortByParameter(
      sortedPools,
      "dailyVolume",
      bgtRewards as "asc" | "desc",
    );
  }
  if (tvl) {
    sortedPools = sortByParameter(
      sortedPools,
      "totalValue",
      tvl as "asc" | "desc",
    );
  }

  if (!page) {
    return NextResponse.json(sortedPools);
  }
  const pageInt = parseInt(page);
  const perPageInt = perPage ? parseInt(perPage) : DEFAULT_SIZE;
  const paginatedPools = sortedPools.slice(
    (pageInt - 1) * perPageInt,
    pageInt * perPageInt,
  );

  return NextResponse.json(paginatedPools);
}
