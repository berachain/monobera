import React from "react";

import { type ProposalTypeEnum } from "../types";
import NewProposal from "./new-proposal";

export default function Create({
  searchParams,
}: {
  searchParams: {
    type: ProposalTypeEnum;
  };
}) {
  return <NewProposal type={searchParams.type} />;
}
