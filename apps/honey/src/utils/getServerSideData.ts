import {
  HoneyTimeFrame,
  timeFrameToNumber,
  type HoneyEntry,
  type HoneyTimeFrame as HoneyTimeFrameType,
} from "~/app/type";
import { publicAnalyticsUrl } from "~/config";

//if timeframe is undefined, return overall data
export async function getHoneyData(
  dataType: "volume" | "supply",
  timeFrame?: HoneyTimeFrameType,
): Promise<HoneyEntry[]> {
  const currentTimeInseconds = Math.floor(Date.now() / 1000);
  const timeGap =
    timeFrame && timeFrame === HoneyTimeFrame.HOURLY ? "hourly" : "daily";
  let fromTimeInSeconds = 0;
  const toTimeInSeconds = timeFrame ? currentTimeInseconds : 4294967295;

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
      break;
  }

  const api = `${publicAnalyticsUrl}/analytics/honey/${dataType}/${timeGap}?from_time=${fromTimeInSeconds}&to_time=${toTimeInSeconds}`;
  // console.log("api reee", api);
  const responce = await fetch(api);
  const responceJson = await responce.json();
  try {
    if (!responce.ok) throw new Error("Failed to fetch data");
    const data =
      dataType === "supply"
        ? responceJson.honeyTotalSupply
        : responceJson.honeyVolume;
    if (
      data.length >= 2 &&
      Number(data[0].UTCTime) > Number(data[data.length - 1].UTCTime)
    )
      return data.reverse();
    else return data;
  } catch (e) {
    console.error(e);
    return [];
  }
}
