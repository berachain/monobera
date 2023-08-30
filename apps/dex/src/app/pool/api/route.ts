// TODO fix any
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

const DEFAULT_SIZE = 10;

export const revalidate = 60;

async function getGlobalCuttingBoard() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_INDEXER_ENDPOINT}/bgt/rewards`,
      {
        cache: "force-cache",
        next: {
          revalidate: 60,
        },
      },
    );
    const jsonRes = await res.json();
    return jsonRes.result;
  } catch (e) {
    console.log(e);
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const router = new RouterService(defaultConfig);
  const globalCuttingBoard = getGlobalCuttingBoard();
  let data = undefined;
  try {
    const fetchPools = router.fetchPools();

    data = await Promise.all([fetchPools, globalCuttingBoard]).then(
      ([fetchPools, globalCuttingBoard]) => ({
        fetchPools: fetchPools,
        globalCuttingBoard: globalCuttingBoard,
      }),
    );
  } catch (e) {
    console.log(`Error fetching pools: ${e}`);
    return;
  }
  const pools = router.getPools() ?? [];

  const totalSupplyStringPools = pools
    ? pools?.map((pool) => {
        return {
          ...pool,
          totalSupply: pool.totalSupply.toString(),
        };
      })
    : [];

  await getWBeraPriceDictForPoolTokens(
    (totalSupplyStringPools ?? []) as Pool[],
    data?.globalCuttingBoard,
    router,
  );

  if (!totalSupplyStringPools) {
    notFound();
  }
  // pages
  const page = searchParams.get("page");
  const perPage = searchParams.get("perPage");

  // tags
  const hasBgtRewards = searchParams.get("hasBgtRewards");
  const hotPools = searchParams.get("hotPools");
  const newPools = searchParams.get("newPools");
  const searchKeyword = searchParams.get("search") ?? "";

  let taggedPools: any[] = totalSupplyStringPools?.filter((pool: Pool) => {
    return searchKeyword === ""
      ? true
      : pool.poolName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          (pool.poolShareDenomHex &&
            pool.poolShareDenomHex
              .toLowerCase()
              .includes(searchKeyword.toLowerCase()));
  });

  let filteredBgtRewards,
    filteredHotPools,
    filteredNewPools = [];
  if (hasBgtRewards == "true") {
    filteredBgtRewards = taggedPools.filter((pool) =>
      pool.tags?.includes(PoolTag.BGT_REWARDS),
    );
  }

  if (hotPools == "true") {
    filteredHotPools = taggedPools.filter((pool) =>
      pool.tags?.includes(PoolTag.HOT),
    );
  }

  if (newPools == "true") {
    filteredNewPools = taggedPools.filter((pool) =>
      pool.tags?.includes(PoolTag.NEW),
    );
  }

  if (!hasBgtRewards && !hotPools && !newPools)
    taggedPools = totalSupplyStringPools;

  // sortables
  const volume = searchParams.get("volume");
  const bgtRewards = searchParams.get("bgtRewards");
  const tvl = searchParams.get("tvl");

  const isFilterApplied =
    hasBgtRewards == "true" || hotPools == "true" || newPools == "true";
  let sortedPools = isFilterApplied
    ? [
        ...new Set([
          ...(filteredBgtRewards ?? []),
          ...(filteredHotPools ?? []),
          ...(filteredNewPools ?? []),
        ]),
      ]
    : taggedPools;
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
    return NextResponse.json(
      JSON.parse(
        JSON.stringify(
          sortedPools,
          (key, value) =>
            typeof value === "bigint" ? value.toString() : value, // return everything else unchanged
        ),
      ),
    );
  }
  const pageInt = parseInt(page);
  const perPageInt = perPage ? parseInt(perPage) : DEFAULT_SIZE;
  const paginatedPools = sortedPools.slice(
    (pageInt - 1) * perPageInt,
    pageInt * perPageInt,
  );

  return NextResponse.json(
    JSON.parse(
      JSON.stringify(
        paginatedPools,
        (key, value) => (typeof value === "bigint" ? value.toString() : value), // return everything else unchanged
      ),
    ),
  );
}
