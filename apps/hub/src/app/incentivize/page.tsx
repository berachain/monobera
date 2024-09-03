import React from "react";
import { type Metadata } from "next";
import { bgtName } from "@bera/config";
import { getMetaTitle } from "@bera/shared-ui";
import { Address } from "viem";

import { Incentivize } from "./incentivize";

export const metadata: Metadata = {
  title: getMetaTitle("Delegate", bgtName),
  description: "Delegate, Redelegate, or Undelegate your BGT",
};
export default function Page() {
  return <Incentivize />;
}
