import React from "react";
import GovernanceByStatus from "./components/governance-by-status";
import { SWRFallback } from "@bera/berajs";
import { defaultBeraConfig } from "@bera/berajs/config";

import { getAllProposals } from "@bera/berajs/actions";

export const revalidate = 120;

export default async function Page() {
  const allProposals = await getAllProposals({ config: defaultBeraConfig });
  return <GovernanceByStatus allProposals={allProposals} />;
}
