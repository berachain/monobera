// TODO fix any
import { NextResponse } from "next/server";
import { type Pool } from "@bera/bera-router/dist/services/PoolService/types";

import { getAbsoluteUrl } from "~/utils/vercel-utils";
import { PoolTag } from "../../getPools/api/getPools";

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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const response = await fetch(`${getAbsoluteUrl()}/api/getPools/api`);

  const pools = await response.json();

  // pages
  const page = searchParams.get("page");
  const perPage = searchParams.get("perPage");

  // tags
  const hasBgtRewards = searchParams.get("hasBgtRewards");
  const hotPools = searchParams.get("hotPools");
  const newPools = searchParams.get("newPools");
  const searchKeyword = searchParams.get("search") ?? "";

  let taggedPools: any[];
  if (Array.isArray(pools)) {
    taggedPools = pools?.filter((pool: Pool) => {
      return searchKeyword === ""
        ? true
        : pool.poolName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            (pool.poolShareDenomHex &&
              pool.poolShareDenomHex
                .toLowerCase()
                .includes(searchKeyword.toLowerCase()));
    });
  } else {
    taggedPools = [];
  }

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

  if (!hasBgtRewards && !hotPools && !newPools) taggedPools = pools;

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
  if (volume == "false" && bgtRewards == "false" && tvl == "false") {
    sortedPools = sortByParameter(sortedPools, "dailyVolume", "desc");
  }
  if (volume == "true") {
    sortedPools = sortByParameter(
      sortedPools,
      "dailyVolume",
      volume as "asc" | "desc",
    );
  }
  if (bgtRewards == "true") {
    sortedPools = sortByParameter(
      sortedPools,
      "dailyVolume",
      bgtRewards as "asc" | "desc",
    );
  }
  if (tvl == "true") {
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
