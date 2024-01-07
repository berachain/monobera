import { subgraphUrl } from "@bera/config";

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
    // case HoneyTimeFrame.HOURLY:
    //   fromTimeInSeconds =
    //     currentTimeInseconds - timeFrameToNumber[HoneyTimeFrame.HOURLY];
    //   query = dataType === "volume" ? GetVolumeHour : GetSupplyHour;
    //   break;
    case HoneyTimeFrame.WEEKLY:
      fromTimeInSeconds =
        currentTimeInseconds - timeFrameToNumber[HoneyTimeFrame.WEEKLY];
      query =
        dataType === "volume"
          ? `{
        honeyVolumeDayDatas(
        where: { timestamp_gt: ${fromTimeInSeconds} }
        orderBy: timestamp
        orderDirection: asc
      ) {
        id
        timestamp
        amount
      }}`
          : `{
        honeySupplyDayDatas(
          where: { timestamp_gt: ${fromTimeInSeconds} }
          orderBy: timestamp
          orderDirection: asc
        ) {
          id
          timestamp
          amount
        }
      }`;
      break;
    case HoneyTimeFrame.MONTHLY:
      fromTimeInSeconds =
        currentTimeInseconds - timeFrameToNumber[HoneyTimeFrame.MONTHLY];
      query =
        dataType === "volume"
          ? `{
          honeyVolumeDayDatas(
          where: { timestamp_gt: ${fromTimeInSeconds} }
          orderBy: timestamp
          orderDirection: asc
        ) {
          id
          timestamp
          amount
        }}`
          : `{
          honeySupplyDayDatas(
            where: { timestamp_gt: ${fromTimeInSeconds} }
            orderBy: timestamp
            orderDirection: asc
          ) {
            id
            timestamp
            amount
          }
        }`;
      break;
    case HoneyTimeFrame.QUARTERLY:
      fromTimeInSeconds =
        currentTimeInseconds - timeFrameToNumber[HoneyTimeFrame.QUARTERLY];
      query =
        dataType === "volume"
          ? `{
          honeyVolumeDayDatas(
          where: { timestamp_gt: ${fromTimeInSeconds} }
          orderBy: timestamp
          orderDirection: asc
        ) {
          id
          timestamp
          amount
        }}`
          : `{
          honeySupplyDayDatas(
            where: { timestamp_gt: ${fromTimeInSeconds} }
            orderBy: timestamp
            orderDirection: asc
          ) {
            id
            timestamp
            amount
          }}`;
      break;
    default:
      fromTimeInSeconds =
        currentTimeInseconds - timeFrameToNumber[HoneyTimeFrame.WEEKLY];
      query =
        dataType === "volume"
          ? `{
          honeyVolumeDayDatas(
          where: { timestamp_gt: ${fromTimeInSeconds} }
          orderBy: timestamp
          orderDirection: asc
        ) {
          id
          timestamp
          amount
        }}`
          : `{
          honeySupplyDayDatas(
            where: { timestamp_gt: ${fromTimeInSeconds} }
            orderBy: timestamp
            orderDirection: asc
          ) {
            id
            timestamp
            amount
          }
        }`;
      break;
  }

  // const data = await client
  //   .query({
  //     query,
  //     variables: { timestamp_gt: fromTimeInSeconds },
  //   })
  //   .then((res: any) => res.data)
  //   .catch((e: any) => console.error(e));

  const data = await fetch(subgraphUrl, {
    method: "POST",
    body: JSON.stringify({
      query: query,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 10 },
  })
    .then((res) => res.json())
    .catch((e: any) => console.log("fetching error", e));

  if (data.error !== undefined) {
    console.error("error fetching cutting board");
    return false;
  }
  const response = dataType === "volume" ? data.data : data.data;
  return response;
}
