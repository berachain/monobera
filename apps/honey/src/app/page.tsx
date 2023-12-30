import { type Metadata } from "next";

import { getHoneyData } from "~/utils/getServerSideData";
import { getMetaTitle } from "~/utils/metadata";
import HoneyPage from "./honey-page";
import { HoneyTimeFrame } from "./type";

export const metadata: Metadata = {
  title: getMetaTitle("Honey"),
  description: `Mint & Redeem Honey`,
};
export default async function Home({
  searchParams: { mode },
}: {
  searchParams: {
    mode: "arcade" | "pro";
  };
}) {
  const [
    supply24H,
    volume24H,
    supply7D,
    volume7D,
    supply30D,
    volume30D,
    supply90D,
    volume90D,
  ] = await Promise.all([
    getHoneyData("supply", HoneyTimeFrame.HOURLY),
    getHoneyData("volume", HoneyTimeFrame.HOURLY),
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
        supply24H: supply24H?.honeySupplyHourDatas ?? [],
        volume24H: volume24H?.honeyVolumeHourDatas ?? [],
        supply7D: supply7D?.honeySupplyHourDatas ?? [],
        volume7D: volume7D?.honeyVolumeHourDatas ?? [],
        supply30D: supply30D?.honeySupplyDayDatas ?? [],
        volume30D: volume30D?.honeyVolumeDayDatas ?? [],
        supply90D: supply90D?.honeySupplyDayDatas ?? [],
        volume90D: volume90D?.honeyVolumeDayDatas ?? [],
      }}
      mode={mode === "pro" ? "pro" : "arcade"}
    />
  );
}
