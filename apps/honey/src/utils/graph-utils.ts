import { type HoneyEntry } from "~/app/type";

export function fullHourTimestamps(endUnix: number): number[] {
  const timestamps: number[] = [];
  const currentTimeInseconds = Math.floor(Date.now() / 1000);
  let current = currentTimeInseconds - (currentTimeInseconds % 3600);
  while (current >= endUnix) {
    timestamps.push(current);
    current -= 3600;
  }
  return timestamps;
}

export function fullDayTimestamps(endUnix: number): number[] {
  const timestamps: number[] = [];
  const currentTimeInseconds = Math.floor(Date.now() / 1000);
  let current = currentTimeInseconds - (currentTimeInseconds % 86400);
  while (current >= endUnix) {
    timestamps.push(current);
    current -= 86400;
  }
  return timestamps;
}

export function fillVolumeDataByHour(list: HoneyEntry[], endUnix: number) {
  const data = [...list];
  const timeList = fullHourTimestamps(endUnix + 3600);
  timeList.forEach((time: number) => {
    const entry = data.find((entry: HoneyEntry) => entry.timestamp === time);
    if (!entry) {
      data.push({
        //@ts-ignore
        __typename: "HoneyVolumeHourData",
        id: (time / 3600).toString(),
        timestamp: time,
        amount: "0",
      });
    }
  });
  return data.sort((a: HoneyEntry, b: HoneyEntry) => a.timestamp - b.timestamp);
}

export function fillVolumeDataByDay(list: HoneyEntry[], endUnix: number) {
  const data = [...list];
  const timeList = fullDayTimestamps(endUnix + 24 * 3600);
  timeList.forEach((time: number) => {
    const entry = data.find((entry: HoneyEntry) => entry.timestamp === time);
    if (!entry) {
      data.push({
        //@ts-ignore
        __typename: "HoneyVolumeDayData",
        id: (time / 86400).toString(),
        timestamp: time,
        amount: "0",
      });
    }
  });
  return data.sort((a: HoneyEntry, b: HoneyEntry) => a.timestamp - b.timestamp);
}

export function fillSupplyDataByHour(list: HoneyEntry[], endUnix: number) {
  if (list && list.length > 0) {
    const data = [...list];
    const timeList = fullHourTimestamps(endUnix + 3600);
    let supply = data[0]!.amount;
    timeList.forEach((time: number) => {
      const entry = data.find((entry: HoneyEntry) => entry.timestamp === time);
      if (!entry) {
        data.push({
          //@ts-ignore
          __typename: "HoneySupplyHourData",
          id: (time / 3600).toString(),
          timestamp: time,
          amount: supply,
        });
      } else {
        supply = entry.amount;
      }
    });
    return data.sort(
      (a: HoneyEntry, b: HoneyEntry) => a.timestamp - b.timestamp,
    );
  } else {
    return [];
  }
}

export function fillSupplyDataByDay(list: HoneyEntry[], endUnix: number) {
  if (list && list.length > 0) {
    const data = [...list];
    const timeList = fullDayTimestamps(endUnix + 24 * 3600);
    let supply = data[0]!.amount;
    timeList.forEach((time: number) => {
      const entry = data.find((entry: HoneyEntry) => entry.timestamp === time);
      if (!entry) {
        data.push({
          //@ts-ignore
          __typename: "HoneySupplyDayData",
          id: (time / 86400).toString(),
          timestamp: time,
          amount: supply,
        });
      } else {
        supply = entry.amount;
      }
    });
    return data.sort(
      (a: HoneyEntry, b: HoneyEntry) => a.timestamp - b.timestamp,
    );
  } else {
    return [];
  }
}
