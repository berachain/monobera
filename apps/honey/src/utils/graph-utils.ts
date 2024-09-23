import { type HoneyEntry } from "~/app/type";

function generateTimestamps(endUnix: number, step: number): number[] {
  const timestamps: number[] = [];
  const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  let current = currentTimeInSeconds - (currentTimeInSeconds % step);
  while (current >= endUnix) {
    timestamps.push(current);
    current -= step;
  }
  return timestamps;
}

function fillData(
  list: HoneyEntry[],
  endUnix: number,
  step: number,
  typename: "HoneyVolumeHourData" | "HoneyVolumeDayData" | "HoneySupplyHourData" | "HoneySupplyDayData"
) {
  const data = [...list];
  const timeList = generateTimestamps(endUnix + step, step);
  let lastAmount = list.length > 0 ? data[0]!.amount : "0";

  timeList.forEach((time: number) => {
    const entry = data.find((entry: HoneyEntry) => entry.timestamp === time);
    if (!entry) {
      data.push({
        //@ts-ignore
        __typename: typename,
        id: (time / step).toString(),
        timestamp: time,
        amount: lastAmount,
      });
    } else {
      lastAmount = entry.amount;
    }
  });

  return data.sort((a: HoneyEntry, b: HoneyEntry) => a.timestamp - b.timestamp);
}

export function fillVolumeDataByHour(list: HoneyEntry[], endUnix: number) {
  return fillData(list, endUnix, 3600, "HoneyVolumeHourData");
}

export function fillVolumeDataByDay(list: HoneyEntry[], endUnix: number) {
  return fillData(list, endUnix, 86400, "HoneyVolumeDayData");
}

export function fillSupplyDataByHour(list: HoneyEntry[], endUnix: number) {
  return fillData(list, endUnix, 3600, "HoneySupplyHourData");
}

export function fillSupplyDataByDay(list: HoneyEntry[], endUnix: number) {
  return fillData(list, endUnix, 86400, "HoneySupplyDayData");
}
