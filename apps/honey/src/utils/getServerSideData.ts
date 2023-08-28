import { formatUnits } from "viem";

import { type HoneySupply, type HoneyVolume } from "~/app/type";

export async function getOverviewData() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  try {
    const volumeRes = await fetch(
      `${process.env.NEXT_PUBLIC_ANALYTICS}/analytics/honey/volume/daily?from_time=0&to_time=4294967295`,
    );

    const volumeJson = await volumeRes.json();

    const supplyRes = await fetch(
      `${process.env.NEXT_PUBLIC_ANALYTICS}/analytics/honey/supply/daily?from_time=0&to_time=4294967295`,
    );

    const supplyJson = await supplyRes.json();

    if (!volumeRes.ok || !supplyRes.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }
    return {
      volume: volumeJson.honeyVolume.reverse()[0].amount,
      supply: supplyJson.honeyTotalSupply.reverse()[0].amount,
    };
  } catch (e) {
    console.error(e);
    return {
      volume: 0,
      supply: 0,
    };
  }
}

export async function getDaily(days: number) {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const unixDays = days * 86400;
  const fromTimestamp = currentTimestamp - unixDays;
  console.log("fromTimestamp", fromTimestamp);
  try {
    const volumeRes = await fetch(
      `${process.env.NEXT_PUBLIC_ANALYTICS}/analytics/honey/volume/daily?from_time=${fromTimestamp}&to_time=${currentTimestamp}`,
    );

    const volumeJson = await volumeRes.json();

    const supplyRes = await fetch(
      `${process.env.NEXT_PUBLIC_ANALYTICS}/analytics/honey/supply/daily?from_time=${fromTimestamp}&to_time=${currentTimestamp}`,
    );

    const supplyJson = await supplyRes.json();

    console.log("volumeJsondailyreeee", volumeJson);
    console.log("supplyJson", supplyJson);
    if (!volumeRes.ok || !supplyRes.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }

    let volumeArray = [
      ...volumeJson.honeyVolume
        ?.map((v: any) => Number(formatUnits(BigInt(v.amount), 18)))
        .reverse(),
    ];
    let supplyArray = [
      ...supplyJson.honeyTotalSupply
        ?.map((v: any) => Number(formatUnits(BigInt(v.amount), 18)))
        .reverse(),
    ];

    if (volumeArray.length < days) {
      const diff = days - volumeArray.length;
      const arr = new Array(diff).fill(0);
      volumeArray = [...volumeArray, ...arr];
    }
    if (supplyArray.length < days) {
      const diff = days - supplyArray.length;
      const arr = new Array(diff).fill(0);
      supplyArray = [...supplyArray, ...arr];
    }
    console.log("volumeArray", volumeArray);
    console.log("supplyArray", supplyArray);
    return {
      volume: volumeArray.reverse(),
      supply: supplyArray.reverse(),
    };
  } catch (e) {
    console.error(e);
    return {
      volume: [],
      supply: [],
    };
  }
}

export async function getPastHours(
  hours: number,
): Promise<[HoneyVolume, HoneySupply]> {
  const fromTimestamp = Date.now() - hours * 3600;
  console.log(
    `${
      process.env.NEXT_PUBLIC_ANALYTICS
    }/analytics/honey/volume/hourly?to_time=${Date.now()}&from_time=${fromTimestamp}`,
  );
  try {
    const volumeRes = await fetch(
      `${
        process.env.NEXT_PUBLIC_ANALYTICS
      }/analytics/honey/volume/hourly?to_time=${Date.now()}&from_time=${fromTimestamp}`,
    );

    const volumeJson = await volumeRes.json();

    const supplyRes = await fetch(
      `${
        process.env.NEXT_PUBLIC_ANALYTICS
      }/analytics/honey/supply/daily?to_time=${Date.now()}&from_time=${fromTimestamp}`,
    );

    const supplyJson = await supplyRes.json();

    console.log("volumeJson", volumeJson);
    console.log("supplyJson", supplyJson);
    if (!volumeRes.ok || !supplyRes.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }

    return [volumeJson, supplyJson];
  } catch (e) {
    console.error(e);
    return [{}, {}] as [any, any];
  }
}
