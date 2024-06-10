import React from "react";
import type { Metadata } from "next";
import { perpsName } from "@bera/config";

import LeaderBoardTabs from "./components/leaderboard-tabs";

export function generateMetadata(): Metadata {
  return {
    title: `Leaderboard | ${perpsName}`,
  };
}

export const revalidate = 30;

export default function Home() {
  return <LeaderBoardTabs />;
}
