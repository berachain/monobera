"use client";

import { type Metadata } from "next";

import Gauge from "../gauge/gauge";
import { Hero } from "./components/hero-new";

export const metadata: Metadata = {
  title: "Dashboard | BGT Station | Berachain",
  description: "BGT Station",
};

export default function DashBoard() {
  return (
    <>
      <Hero />
      <Gauge />
    </>
  );
}
