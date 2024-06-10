import React from "react";
import { type Metadata } from "next";

import { getMetaTitle } from "@bera/shared-ui";
import Redeem from "./redeem";
import { bgtName } from "@bera/config";

export const metadata: Metadata = {
  title: getMetaTitle("Redeem", bgtName),
  description: "Redeem your BGT for BERA",
};

export default function Page() {
  return <Redeem />;
}
