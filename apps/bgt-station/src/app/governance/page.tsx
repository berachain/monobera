import React from "react";
import {
  OrderByEnum,
  StatusEnum,
  type OrderByEnum as OrderByEnumT,
  type StatusEnum as StatusEnumT,
} from "@bera/shared-ui/src/types";

import GovernanceByStatus from "./home/governance-by-status";

export default function Governance({
  searchParams,
}: {
  searchParams: {
    proposalStatus: StatusEnumT;
    orderBy: OrderByEnumT;
  };
}) {
  let proposalStatus;
  if (
    searchParams.proposalStatus ||
    searchParams.proposalStatus in StatusEnum
  ) {
    proposalStatus = searchParams.proposalStatus;
  } else {
    proposalStatus = StatusEnum.ACTIVE;
  }

  let orderBy;
  if (searchParams.orderBy || searchParams.orderBy in OrderByEnum) {
    orderBy = searchParams.orderBy;
  } else {
    orderBy = OrderByEnum.MOST_RECENT;
  }
  return <GovernanceByStatus {...{ proposalStatus, orderBy }} />;
}
