import {
  HoneyTimeFrame,
  timeFrameToNumber,
  type HoneyTimeFrame as HoneyTimeFrameType,
} from "~/app/type";

export function getTime(timeFrame: HoneyTimeFrameType) {
  const currentTimeInseconds = Math.floor(Date.now() / 1000);
  let fromTimeInSeconds;
  switch (timeFrame) {
    case HoneyTimeFrame.HOURLY:
      fromTimeInSeconds =
        currentTimeInseconds - timeFrameToNumber[HoneyTimeFrame.HOURLY];
      break;
    case HoneyTimeFrame.WEEKLY:
      fromTimeInSeconds =
        currentTimeInseconds - timeFrameToNumber[HoneyTimeFrame.WEEKLY];
      break;
    case HoneyTimeFrame.MONTHLY:
      fromTimeInSeconds =
        currentTimeInseconds - timeFrameToNumber[HoneyTimeFrame.MONTHLY];
      break;
    case HoneyTimeFrame.QUARTERLY:
      fromTimeInSeconds =
        currentTimeInseconds - timeFrameToNumber[HoneyTimeFrame.QUARTERLY];
      break;
    default:
      fromTimeInSeconds =
        currentTimeInseconds - timeFrameToNumber[HoneyTimeFrame.WEEKLY];
      break;
  }
  return fromTimeInSeconds;
}
