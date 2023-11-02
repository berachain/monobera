import React from "react";
import type { Metadata } from "next";
import { perpsName } from "@bera/config";

import LeaderBoard from "./components/leaderboard";

export function generateMetadata(): Metadata {
  return {
    title: `Leaderboard | ${perpsName}`,
  };
}
export default function Home() {
  return <LeaderBoard />;
}
