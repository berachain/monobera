import React from "react";
import { type Metadata } from "next";

import { getMetaTitle } from "~/utils/metadata";
import {
  ProposalTypeEnum,
  type ProposalTypeEnum as ProposalTypeEnumT,
} from "../types";
import NewProposal from "./new-proposal";

export const metadata: Metadata = {
  title: getMetaTitle("Create Proposal"),
  description: `Create a new proposal on Berachain`,
};
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
