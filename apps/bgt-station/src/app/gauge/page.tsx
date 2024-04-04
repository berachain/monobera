import React from "react";
import { type Metadata } from "next";

import { getMetaTitle } from "@bera/shared-ui";
import Gauge from "./gauge";
import { bgtName } from "@bera/config";

export const metadata: Metadata = {
  title: getMetaTitle("Gauge", bgtName),
  description: "Rewards",
};

export default function Page() {
  return <Gauge />;
}
