import React from "react";
import { type Metadata } from "next";
import { hubName } from "@bera/config";
import { getMetaTitle } from "@bera/shared-ui";
import { Address } from "viem";

import { Incentivize } from "./incentivize";

export const metadata: Metadata = {
  title: getMetaTitle("Delegate", hubName),
  description: "Delegate, Redelegate, or Undelegate your BGT",
};
export default function Page() {
  return <Incentivize />;
}
