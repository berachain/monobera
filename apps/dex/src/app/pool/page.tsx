import { type Metadata } from "next";
import { RouterService, defaultConfig } from "@bera/bera-router";
import { type Pool } from "@bera/bera-router/dist/services/PoolService/types";

import PoolsTable from "~/components/pools-table";
import PoolPageHeader from "./PoolPageHeader";
import { getWBeraPriceDictForPoolTokens } from "./api/getPrice";

export const metadata: Metadata = {
  title: "Pools | DEX | Berachain",
  description: "Decentralized exchange on Berachain",
};

// export const revalidate = 300; // five minutes

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

export default async function Pool() {
  const router = new RouterService(defaultConfig);
  try {
    await router.fetchPools();
  } catch (e) {
    console.log(`Error fetching pools: ${e}`);
  }
  let pools = [];
  pools = router.getPools();
  await getWBeraPriceDictForPoolTokens(pools, router);
  const sortedPools = pools.sort(compareByDailyVolumeDescending);

  console.log(sortedPools);
  return (
    <div className="container m-auto flex w-full flex-col gap-5">
      <PoolPageHeader />
      <PoolsTable pools={sortedPools} />
    </div>
  );
}
