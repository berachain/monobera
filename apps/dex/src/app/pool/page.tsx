import { type Metadata } from "next";
import { type Pool } from "@bera/bera-router/dist/services/PoolService/types";

import { getMetaTitle } from "~/utils/metadata";
import PoolPageHeader from "./PoolPageHeader";
import { publicAnalyticsUrl } from "@bera/config";

export const metadata: Metadata = {
  title: getMetaTitle("Pools"),
  description: "View pools",
};

const getTvl = async () => {
  const res = await fetch(
    `${publicAnalyticsUrl}/analytics/tvldaily/global`,
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch pools");
  }

  const result = await res.json();
  return result;
};

const getVolume = async () => {
  const res = await fetch(
    `${publicAnalyticsUrl}/analytics/volumedaily/global`,
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch pools");
  }

  const result = await res.json();
  return result;
};

export default async function Pool() {
  const tvl = getTvl();
  const volume = getVolume();
  const data: any = await Promise.all([tvl, volume]).then(([tvl, volume]) => ({
    tvl: tvl,
    volume: volume,
  }));

  return (
    <div className="container m-auto flex w-full flex-col gap-5">
      <PoolPageHeader tvl={data?.tvl?.result} volume={data?.volume?.result} />
    </div>
  );
}
