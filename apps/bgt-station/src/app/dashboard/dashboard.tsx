"use client";

import { type Metadata } from "next";

import Gauge from "../gauge/gauge";
import { Explore } from "./v2/explore";
import { Hero } from "./v2/hero-new";
import { HowToEarn } from "./v2/how-to-earn-bgt";
import { Resources } from "./v2/resources";

export const metadata: Metadata = {
  title: "Dashboard | BGT Station | Berachain",
  description: "BGT Station",
};

export default function DashBoard() {
  return (
    <div className="flex flex-col">
      <Hero />
      <span className="mb-20" />
      <HowToEarn />
      <span className="mb-28" />
      <Resources />
      <span className="mb-32" />
      <Explore />
    </div>
  );
}
