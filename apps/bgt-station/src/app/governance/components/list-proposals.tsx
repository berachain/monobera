import React from "react";
import { Card } from "@bera/ui/card";

import { type StatusEnum } from "~/app/governance/types";

export function ListProposals({ status }: { status: StatusEnum }) {
  return <Card>ListProposals: {status}</Card>;
}
