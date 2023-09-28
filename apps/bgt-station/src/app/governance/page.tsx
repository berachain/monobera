import React from "react";
import { type Metadata } from "next";

import { getMetaTitle } from "~/utils/metadata";
import GovernanceByStatus from "./home/governance-by-status";
import {
  OrderByEnum,
  StatusEnum,
  type OrderByEnum as OrderByEnumT,
  type StatusEnum as StatusEnumT,
} from "./types";
import { getAbsoluteUrl } from "~/utils/vercel-utils";

export const metadata: Metadata = {
  title: getMetaTitle("Governance"),
  description: `View Governance proposals on Berachain`,
  openGraph: {
    images: '/opengraph-image.png'
  },
  metadataBase: new URL(getAbsoluteUrl())
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
