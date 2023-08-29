import { type Metadata } from "next";

import {
  getDaily,
  getOverviewData,
  getPastHours,
} from "~/utils/getServerSideData";
import HoneyPage from "./honey-page";

export const metadata: Metadata = {
  title: "Honey | Berachain",
  description: "Mo honey mo problems",
};

export default async function Home({
  searchParams: { mode },
}: {
  searchParams: {
    mode: "arcade" | "pro";
  };
}) {
  const [data, weeklyData, monthlyData, quarterlyData, hourlyData] =
    await Promise.all([
      getOverviewData(),
      getDaily(7),
      getDaily(30),
      getDaily(90),
      getPastHours(24),
    ]);

  console.log("data", weeklyData);
  return (
    <HoneyPage
      {...{ data, weeklyData, monthlyData, quarterlyData, hourlyData }}
      mode={mode === "pro" ? "pro" : "arcade"}
    />
  );
}
