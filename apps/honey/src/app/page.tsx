import { type Metadata } from "next";

import { getOverviewData, getPastDays } from "~/utils/getServerSideData";
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
  const [data, weeklyData, monthlyData, quarterlyData] = await Promise.all([
    getOverviewData(),
    getPastDays(7),
    getPastDays(30),
    getPastDays(90),
  ]);
  return (
    <HoneyPage
      {...{ data, weeklyData, monthlyData, quarterlyData }}
      mode={mode === "pro" ? "pro" : "arcade"}
    />
  );
}
