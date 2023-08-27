import { type Metadata } from "next";
import { getUnixTime } from "date-fns";

import HoneyPage from "./honey-page";
import { type HoneySupply, type HoneyVolume } from "./type";

export const metadata: Metadata = {
  title: "Honey | Berachain",
  description: "Mo honey mo problems",
};

async function getOverviewData(): Promise<[HoneyVolume, HoneySupply]> {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  try {
    const volumeRes = await fetch(
      `${
        process.env.NEXT_PUBLIC_ANALYTICS
      }/analytics/honey/volume/hourly?to_time=${getUnixTime(
        new Date(),
      )}&from_time=${getUnixTime(yesterday)}`,
    );

    const supplyRes = await fetch(
      `${
        process.env.NEXT_PUBLIC_ANALYTICS
      }/analytics/honey/supply/hourly?to_time=${getUnixTime(
        new Date(),
      )}&from_time=${getUnixTime(yesterday)}`,
    );

    if (!volumeRes.ok || !supplyRes.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }
    return Promise.all([volumeRes.json(), supplyRes.json()]);
  } catch (e) {
    console.error(e);
    return [[], []] as [any, any];
  }
}

async function getPastDays(days: number): Promise<[HoneyVolume, HoneySupply]> {
  const daysAgo = new Date();
  daysAgo.setDate(daysAgo.getDate() - days);
  try {
    const volumeRes = await fetch(
      `${
        process.env.NEXT_PUBLIC_ANALYTICS
      }/analytics/honey/volume/hourly?to_time=${getUnixTime(
        new Date(),
      )}&from_time=${getUnixTime(daysAgo)}`,
    );

    const supplyRes = await fetch(
      `${
        process.env.NEXT_PUBLIC_ANALYTICS
      }/analytics/honey/supply/hourly?to_time=${getUnixTime(
        new Date(),
      )}&from_time=${getUnixTime(daysAgo)}`,
    );

    if (!volumeRes.ok || !supplyRes.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }
    return Promise.all([volumeRes.json(), supplyRes.json()]);
  } catch (e) {
    console.error(e);
    return [[], []] as [any, any];
  }
}

export default async function Home() {
  const [volume, supply] = await getOverviewData();
  const [weeklyVolume, weeklySupply] = await getPastDays(7);
  const [monthlyVolume, monthlySupply] = await getPastDays(30);
  const [quarterlyVolume, quarterlySupply] = await getPastDays(90);

  // const [proMode, setProMode] = useState(false);
  // console.log("volume", volume.honeyVolume, "supply", supply);

  if (
    !volume.honeyVolume ||
    !supply.honeyTotalSupply ||
    !weeklyVolume.honeyVolume ||
    !weeklySupply.honeyTotalSupply ||
    !monthlyVolume.honeyVolume ||
    !monthlySupply.honeyTotalSupply ||
    !quarterlyVolume.honeyVolume ||
    !quarterlySupply.honeyTotalSupply
  ) {
    return null;
  } else {
    return (
      <HoneyPage
        {...{
          volume,
          supply,
          weeklyVolume,
          weeklySupply,
          monthlyVolume,
          monthlySupply,
          quarterlyVolume,
          quarterlySupply,
        }}
      />
    );
  }
}
