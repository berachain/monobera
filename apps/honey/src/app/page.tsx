import { type Metadata } from "next";

import { getHoneyData } from "~/utils/getServerSideData";
import {
  fillSupplyDataByDay,
  fillVolumeDataByDay,
} from "~/utils/graph-utils";
import { getMetaTitle } from "~/utils/metadata";
import HoneyPage from "./honey-page";
import { HoneyTimeFrame, timeFrameToNumber } from "./type";

export const metadata: Metadata = {
  title: getMetaTitle("Honey"),
  description: `Mint & Redeem Honey`,
};

export const revalidate = 10

export default async function Home({
  searchParams: { mode },
}: {
  searchParams: {
    mode: "arcade" | "pro";
  };
}) {
  const [
    supply7D,
    volume7D,
    supply30D,
    volume30D,
    supply90D,
    volume90D,
  ] = await Promise.all([
    getHoneyData("supply", HoneyTimeFrame.WEEKLY),
    getHoneyData("volume", HoneyTimeFrame.WEEKLY),
    getHoneyData("supply", HoneyTimeFrame.MONTHLY),
    getHoneyData("volume", HoneyTimeFrame.MONTHLY),
    getHoneyData("supply", HoneyTimeFrame.QUARTERLY),
    getHoneyData("volume", HoneyTimeFrame.QUARTERLY),
  ]);

  return (
    <HoneyPage
      {...{
        supply7D: fillSupplyDataByDay(
          supply7D?.honeySupplyDayDatas ?? [],
          Math.floor(Date.now() / 1000) -
            timeFrameToNumber[HoneyTimeFrame.WEEKLY],
        ),
        volume7D: fillVolumeDataByDay(
          volume7D?.honeyVolumeDayDatas ?? [],
          Math.floor(Date.now() / 1000) -
            timeFrameToNumber[HoneyTimeFrame.WEEKLY],
        ),
        supply30D: fillSupplyDataByDay(
          supply30D?.honeySupplyDayDatas ?? [],
          Math.floor(Date.now() / 1000) -
            timeFrameToNumber[HoneyTimeFrame.MONTHLY],
        ),
        volume30D: fillVolumeDataByDay(
          volume30D?.honeyVolumeDayDatas ?? [],
          Math.floor(Date.now() / 1000) -
            timeFrameToNumber[HoneyTimeFrame.MONTHLY],
        ),
        supply90D: fillSupplyDataByDay(
          supply90D?.honeySupplyDayDatas ?? [],
          Math.floor(Date.now() / 1000) -
            timeFrameToNumber[HoneyTimeFrame.QUARTERLY],
        ),
        volume90D: fillVolumeDataByDay(
          volume90D?.honeyVolumeDayDatas ?? [],
          Math.floor(Date.now() / 1000) -
            timeFrameToNumber[HoneyTimeFrame.QUARTERLY],
        ),
      }}
      mode={mode === "pro" ? "pro" : "arcade"}
    />
  );
}
