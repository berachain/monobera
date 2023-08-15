import { type Metadata } from "next";
import { getUnixTime } from "date-fns";

import Data from "~/components/data";
import Graph from "~/components/graph";
import { HoneyMachine } from "~/components/honey-machine";
import HoneyTransactionsTable from "~/components/honey-transactions-table";
import { SwapCard } from "~/components/swap-card";

export const metadata: Metadata = {
  title: "Honey | Berachain",
  description: "Mo honey mo problems",
};

export type HoneyEntry = {
  UTCTime: string;
  amount: string;
};

type HoneyVolume = {
  honeyVolume: HoneyEntry[];
};

type HoneySupply = {
  honeyTotalSupply: HoneyEntry[];
};

async function getOverviewData(): Promise<[HoneyVolume, HoneySupply]> {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const volumeRes = await fetch(
    `${
      process.env.NEXT_PUBLIC_ANALYTICS
    }/analytics/honey/volume/hourly?to_time=${getUnixTime(
      new Date(),
    )}&from_time=${getUnixTime(yesterday)}`,
  );

  const supplyRes = await fetch(
    `${
      process.env.NEXT_PUBLIC_ANALYTICS
    }/analytics/honey/supply/hourly?to_time=${getUnixTime(
      new Date(),
    )}&from_time=${getUnixTime(yesterday)}`,
  );

  if (!volumeRes.ok || !supplyRes.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return Promise.all([volumeRes.json(), supplyRes.json()]);
}

export default async function Home() {
  const [volume, supply] = await getOverviewData();

  return (
    <>
      <div className="honey:bg-[#468DCB]">
        <div className="m-auto hidden max-w-[1000px] honey:block">
          <HoneyMachine />
        </div>
        <div className="flex justify-center px-6 py-36 honey:hidden">
          <SwapCard />
        </div>
      </div>
      <div className="honey:bg-gradient-to-b honey:from-[#468DCB] honey:to-background">
        <div className="container">
          <div className="py-12">
            <Data
              tvl={supply.honeyTotalSupply[0]?.amount || "0"}
              dailyVolume={volume.honeyVolume[0]?.amount || "0"}
            />
          </div>
          <div className="py-12">
            <Graph
              hourlySupply={supply.honeyTotalSupply}
              hourlyVolume={volume.honeyVolume}
            />
          </div>
          <div className="py-12">
            <HoneyTransactionsTable />
          </div>
        </div>
      </div>
    </>
  );
}
