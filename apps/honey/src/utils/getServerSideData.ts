import { getUnixTime } from "date-fns";

import { type HoneySupply, type HoneyVolume } from "~/app/type";

export async function getOverviewData(): Promise<[HoneyVolume, HoneySupply]> {
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
    return [{}, {}] as [any, any];
  }
}

export async function getPastDays(
  days: number,
): Promise<[HoneyVolume, HoneySupply]> {
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
    return [{}, {}] as [any, any];
  }
}
