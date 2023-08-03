import { notFound } from "next/navigation";
import { NextResponse } from "next/server";
import { RouterService, defaultConfig } from "@bera/bera-router";
import { type Pool } from "@bera/bera-router/dist/services/PoolService/types";

import { PoolTag, getWBeraPriceDictForPoolTokens } from "./getPrice";

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

  let taggedPools: any[] = pools;

  if (hasBgtRewards) {
    taggedPools = taggedPools.filter((pool) =>
      pool.tags?.includes(PoolTag.BGT_REWARDS),
    );
  }

  if (hotPools) {
    taggedPools = taggedPools.filter((pool) =>
      pool.tags?.includes(PoolTag.HOT),
    );
  }

  if (newPools) {
    taggedPools = taggedPools.filter((pool) =>
      pool.tags?.includes(PoolTag.NEW),
    );
  }

  if (!hasBgtRewards && !hotPools && !newPools) taggedPools = pools;

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
