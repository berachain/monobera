import React from "react";

import {
  ProposalTypeEnum,
  type ProposalTypeEnum as ProposalTypeEnumT,
} from "../types";
import NewProposal from "./new-proposal";

export default function Create({
  searchParams,
}: {
  searchParams: {
    type: ProposalTypeEnumT;
  };
}) {
  let type;
  if (searchParams.type || searchParams.type in ProposalTypeEnum) {
    type = searchParams.type;
  } else {
    type = ProposalTypeEnum.TEXT_PROPOSAL;
  }

  return <NewProposal {...{ type }} />;
}
