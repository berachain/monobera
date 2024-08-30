import React from "react";
import { type Metadata } from "next";
import { bgtName } from "@bera/config";
import { getMetaTitle } from "@bera/shared-ui";
import GovernanceByStatus from "./home/governance-by-status";

export const metadata: Metadata = {
  title: getMetaTitle("Governance", bgtName),
  description: "View Governance proposals on Berachain",
};
//ha
export default function Governance() {
  return <GovernanceByStatus />;
}
