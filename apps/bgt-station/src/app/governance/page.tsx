import React from "react";
import { type Metadata } from "next";

import { getMetaTitle } from "@bera/shared-ui";
import GovernanceByStatus from "./home/governance-by-status";
import {
  OrderByEnum,
  StatusEnum,
  type OrderByEnum as OrderByEnumT,
  type StatusEnum as StatusEnumT,
} from "./types";
import { bgtName } from "@bera/config";

export const metadata: Metadata = {
  title: getMetaTitle("Governance", bgtName),
  description: "View Governance proposals on Berachain",
};

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
