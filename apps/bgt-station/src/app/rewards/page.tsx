import React from "react";
import { type Metadata } from "next";
import { bgtName } from "@bera/config";
import { getMetaTitle } from "@bera/shared-ui";

import Rewards from "./rewards";

export const metadata: Metadata = {
  title: getMetaTitle("Rewards", bgtName),
  description: "Redeem your BGT for BERA",
};

export default function Page() {
  return <Rewards />;
}
