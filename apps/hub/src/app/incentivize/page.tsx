import React from "react";
import { type Metadata } from "next";
import { Address } from "viem";

import { Incentivize } from "./incentivize";

export const metadata: Metadata = {
  title: "Delegate",
  description: "Delegate, Redelegate, or Undelegate your BGT",
};
export default function Page() {
  return <Incentivize />;
}
