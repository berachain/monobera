import React from "react";
import { type Metadata } from "next";
import { hubName } from "@bera/config";

import Rewards from "./rewards";

export const metadata: Metadata = {
  title: "Rewards",
  description: "Redeem your BGT for BERA",
};

export default function Page() {
  return <Rewards />;
}
