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

export function fillAPYDataByHour(
  list: any[],
  endUnix: number,
  attributes: string,
) {
  if (list && list.length > 0) {
    const data = [...list];
    const timeList = fullHourTimestamps(endUnix + 3600).reverse();
    let amount = data[0][attributes];
    timeList.forEach((time: number) => {
      const entry = data.find((entry: any) => entry.timestamp === time);
      if (!entry) {
        data.push({
          id: (time / 3600).toString(),
          timestamp: time,
          [attributes]: amount,
        });
      } else {
        amount = entry[attributes];
      }
    });
    return data.sort((a: any, b: any) => a.timestamp - b.timestamp);
  }
  return [];
}

export function fillAPYDataByDay(
  list: any[],
  endUnix: number,
  attributes: string,
) {
  if (list && list.length > 0) {
    const data = [...list];
    const timeList = fullDayTimestamps(endUnix + 24 * 3600).reverse();
    let amount = data[0][attributes];
    timeList.forEach((time: number) => {
      const entry = data.find((entry: any) => entry.timestamp === time);
      if (!entry) {
        data.push({
          id: (time / 86400).toString(),
          timestamp: time,
          [attributes]: amount,
        });
      } else {
        amount = entry[attributes];
      }
    });
    return data.sort((a: any, b: any) => a.timestamp - b.timestamp);
  }
  return [];
}
