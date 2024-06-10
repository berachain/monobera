export enum TimeFrame {
  HOURLY = "24H",
  WEEKLY = "7D",
  MONTHLY = "30D",
  QUARTERLY = "90D",
}

export type TimeFrameInSeconds = {
  [K in TimeFrame]: number;
};

export const timeFrameToNumber: TimeFrameInSeconds = {
  [TimeFrame.HOURLY]: 24 * 3600,
  [TimeFrame.WEEKLY]: 7 * 24 * 3600,
  [TimeFrame.MONTHLY]: 30 * 24 * 3600,
  [TimeFrame.QUARTERLY]: 90 * 24 * 3600,
};

export function getTime(timeFrame: TimeFrame) {
  const currentTimeInseconds = Math.floor(Date.now() / 1000);
  let fromTimeInSeconds;
  switch (timeFrame) {
    case TimeFrame.HOURLY:
      fromTimeInSeconds =
        currentTimeInseconds - timeFrameToNumber[TimeFrame.HOURLY];
      break;
    case TimeFrame.WEEKLY:
      fromTimeInSeconds =
        currentTimeInseconds - timeFrameToNumber[TimeFrame.WEEKLY];
      break;
    case TimeFrame.MONTHLY:
      fromTimeInSeconds =
        currentTimeInseconds - timeFrameToNumber[TimeFrame.MONTHLY];
      break;
    case TimeFrame.QUARTERLY:
      fromTimeInSeconds =
        currentTimeInseconds - timeFrameToNumber[TimeFrame.QUARTERLY];
      break;
    default:
      fromTimeInSeconds =
        currentTimeInseconds - timeFrameToNumber[TimeFrame.WEEKLY];
      break;
  }
  return fromTimeInSeconds;
}
