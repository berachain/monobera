import { type Metadata } from "next";
import { type Pool } from "@bera/bera-router/dist/services/PoolService/types";
import { publicAnalyticsUrl } from "@bera/config";

import { getMetaTitle } from "~/utils/metadata";
import PoolPageHeader from "./PoolPageHeader";

export const metadata: Metadata = {
  title: getMetaTitle("Pools"),
  description: "View pools",
};

const getTvl = async () => {
  console.log(`${publicAnalyticsUrl}/analytics/tvldaily/global`);
  const res = await fetch(`${publicAnalyticsUrl}/analytics/tvldaily/global`);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch pools");
  }

  const result = await res.json();
  return result;
};

const getVolume = async () => {
  console.log(`${publicAnalyticsUrl}/analytics/volumedaily/global`);
  const res = await fetch(`${publicAnalyticsUrl}/analytics/volumedaily/global`);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch pools");
  }

  const result = await res.json();
  return result;
};
export const fetchCache = "force-no-store";

export default async function Pool() {
  const tvl = getTvl();
  const volume = getVolume();
  const data: any = await Promise.all([tvl, volume]).then(([tvl, volume]) => ({
    tvl: tvl,
    volume: volume,
  }));

  console.log(data?.tvl);
  console.log(data?.volume);

  return (
    <div className="container m-auto flex w-full flex-col gap-5">
      <PoolPageHeader tvl={data?.tvl?.result} volume={data?.volume?.result} />
    </div>
  );
}
