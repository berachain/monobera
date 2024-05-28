import React from "react";
import { type Metadata } from "next";
import { bgtName } from "@bera/config";
import { getMetaTitle } from "@bera/shared-ui";

import Gauge from "./gauge";

export const metadata: Metadata = {
  title: getMetaTitle("Gauge", bgtName),
  description: "Rewards",
};

export default function Page() {
  return <Gauge />;
}
