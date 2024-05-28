"use client";

import { type Metadata } from "next";
import { Documentation } from "@bera/shared-ui";

import { Hero } from "./components/hero";
import { INTRO } from "./components/intro";
import { POL } from "./components/pol";

export const metadata: Metadata = {
  title: "Dashboard | BGT Station | Berachain",
  description: "BGT Station",
};

export default function DashBoard() {
  return (
    <div>
      <Hero />
      <hr />
      <POL />
      <div className="container flex w-full flex-col gap-16 bg-background pb-16 pt-16 sm:gap-24 md:pt-0">
        <INTRO />
        <Documentation />
      </div>
    </div>
  );
}
