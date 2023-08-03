// This will be the home page - just don't want to cause a merge conflict while homepage is used as `/swap`

import React from "react";
import { RouterService, defaultConfig } from "@bera/bera-router";
import { type Pool } from "@bera/bera-router/dist/services/PoolService/types";

import { getWBeraPriceDictForPoolTokens } from "../pool/api/getPrice";
import CreateAPool from "./components/CreateAPool";
import Data from "./components/Data";
import Help from "./components/Help";
import Hero from "./components/Hero";
import HotPools from "./components/HotPools";

const compareByDailyVolumeDescending = (a: Pool, b: Pool) => {
  const dailyVolumeA = a.dailyVolume;
  const dailyVolumeB = b.dailyVolume;

  // Check for undefined or null values
  if (dailyVolumeA === undefined && dailyVolumeB === undefined) {
    return 0; // Both have undefined dailyVolume, no change in order
  }

  if (dailyVolumeA === undefined || dailyVolumeA === null) {
    return 1; // Place undefined or null value (dailyVolumeA) after defined value (dailyVolumeB)
  }

  if (dailyVolumeB === undefined || dailyVolumeB === null) {
    return -1; // Place defined value (dailyVolumeB) before undefined or null value (dailyVolumeA)
  }

  // Both dailyVolume values are defined and not null, compare them in descending order
  return b.dailyVolume! - a.dailyVolume!;
};

export default async function Homepage() {
  const router = new RouterService(defaultConfig);
  let pools: Pool[] | undefined = undefined;
  try {
    pools = await router.fetchPaginatedPools(0, 3);
    await getWBeraPriceDictForPoolTokens(pools ?? [], router);
  } catch (e) {
    console.log(`Error fetching pools: ${e}`);
  }
  // await getWBeraPriceDictForPoolTokens(pools, router);
  const sortedPools = pools?.sort(compareByDailyVolumeDescending);

  console.log(sortedPools);
  return (
    <div className="container">
      <Hero />
      <Data />

      <HotPools pools={sortedPools || []} />

      <div className="-mx-2 overflow-hidden">
        <CreateAPool />
      </div>
      <Help />
    </div>
  );
}
