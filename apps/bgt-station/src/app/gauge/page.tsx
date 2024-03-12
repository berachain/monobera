import React from "react";
import { type Metadata } from "next";

import { getMetaTitle } from "~/utils/metadata";
import Gauge from "./gauge";

export const metadata: Metadata = {
  title: getMetaTitle("Gauge"),
  description: "Rewards",
};

export default function Page() {
  return <Gauge />;
}
