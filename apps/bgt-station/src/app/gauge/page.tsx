import React from "react";
import { type Metadata } from "next";
import { bgtName } from "@bera/config";
import { Footer, getMetaTitle } from "@bera/shared-ui";

// import Gauge from "./gauge";
import DashBoard from "../dashboard/dashboard";

export const metadata: Metadata = {
  title: getMetaTitle("Vaults", bgtName),
  description: "Rewards",
};

export default function Page() {
  // return <Gauge />;
  return <DashBoard />;
}
