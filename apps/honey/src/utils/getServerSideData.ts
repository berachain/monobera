import {
  GetSupplyDay,
  GetSupplyHour,
  GetVolumeDay,
  GetVolumeHour,
  client,
} from "@bera/graphql";

import {
  HoneyTimeFrame,
  timeFrameToNumber,
  type HoneyTimeFrame as HoneyTimeFrameType,
} from "~/app/type";

export async function getHoneyData(
  dataType: "volume" | "supply",
  timeFrame?: HoneyTimeFrameType,
): Promise<any> {
  const currentTimeInseconds = Math.floor(Date.now() / 1000);
  let fromTimeInSeconds;
  let query;

  switch (timeFrame) {
    case HoneyTimeFrame.HOURLY:
      fromTimeInSeconds =
        currentTimeInseconds - timeFrameToNumber[HoneyTimeFrame.HOURLY];
      query = dataType === "volume" ? GetVolumeHour : GetSupplyHour;
      break;
    case HoneyTimeFrame.WEEKLY:
      fromTimeInSeconds =
        currentTimeInseconds - timeFrameToNumber[HoneyTimeFrame.WEEKLY];
      query = dataType === "volume" ? GetVolumeDay : GetSupplyDay;
      break;
    case HoneyTimeFrame.MONTHLY:
      fromTimeInSeconds =
        currentTimeInseconds - timeFrameToNumber[HoneyTimeFrame.MONTHLY];
      query = dataType === "volume" ? GetVolumeDay : GetSupplyDay;
      break;
    case HoneyTimeFrame.QUARTERLY:
      fromTimeInSeconds =
        currentTimeInseconds - timeFrameToNumber[HoneyTimeFrame.QUARTERLY];
      query = dataType === "volume" ? GetVolumeDay : GetSupplyDay;
      break;
    default:
      fromTimeInSeconds =
        currentTimeInseconds - timeFrameToNumber[HoneyTimeFrame.WEEKLY];
      query = dataType === "volume" ? GetVolumeDay : GetSupplyDay;
      break;
  }

  const data = await client
    .query({
      query,
      variables: { timestamp_gt: fromTimeInSeconds },
    })
    .then((res: any) => res.data)
    .catch((e: any) => console.error(e));

  return data;
}
