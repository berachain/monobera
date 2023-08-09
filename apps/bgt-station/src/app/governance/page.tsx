import React from "react";

import { type OrderByEnum, type StatusEnum } from "~/app/governance/types";
import GovernanceByStatus from "./home/governance-by-status";

export default function Governance({
  searchParams,
}: {
  searchParams: {
    proposalStatus: StatusEnum;
    orderBy: OrderByEnum;
  };
}) {
  return (
    <GovernanceByStatus
      proposalStatus={searchParams.proposalStatus}
      orderBy={searchParams.orderBy}
    />
  );
}
