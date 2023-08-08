import React from "react";

import { ListProposals } from "~/app/governance/components/list-proposals";
import { StatusEnum } from "~/app/governance/types";
import { Test } from "./components/test";

export default function GovernanceByStatus({
  searchParams,
}: {
  searchParams: {
    inputCurrency: string;
    outputCurrency: string;
  };
}) {
  const params = searchParams;

  return (
    <div className="container">
      {params.inputCurrency} {params.outputCurrency}
      <ListProposals status={StatusEnum.Voting} />
      <ListProposals status={StatusEnum.Pending} />
      <Test />
    </div>
  );
}
