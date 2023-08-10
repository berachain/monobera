import React from "react";
import { Tooltip } from "@bera/shared-ui";
import { Card } from "@bera/ui/card";

import { type ProposalVotes } from "../types";

interface IVoteCard {
  proposalVotes: ProposalVotes;
}

export function VoteCard({ proposalVotes }: IVoteCard) {
  return (
    <Card className="flex p-6">
      <div className="flex w-[140px] flex-col items-center gap-2 border-r border-border">
        <div className="text-3xl font-semibold leading-9 text-success-foreground">
          {proposalVotes.yes}%
        </div>
        <div className="flex items-center gap-0.5 text-sm font-medium leading-[14px] text-muted-foreground">
          Yes
          <Tooltip text="yes" />
        </div>
      </div>
      <div className="flex w-[140px] flex-col items-center gap-2 border-r border-border">
        <div className="text-3xl font-semibold leading-9 text-destructive-foreground">
          {proposalVotes.no}%
        </div>
        <div className="flex items-center gap-0.5 text-sm font-medium leading-[14px] text-muted-foreground">
          No
          <Tooltip text="no" />
        </div>
      </div>
      <div className="flex w-[140px] flex-col items-center gap-2 border-r border-border">
        <div className="text-3xl font-semibold leading-9 text-info-foreground">
          {proposalVotes.veto}%
        </div>
        <div className="flex items-center gap-0.5 text-sm font-medium leading-[14px] text-muted-foreground">
          No with veto
          <Tooltip text="No with veto" />
        </div>
      </div>
      <div className="flex w-[140px] flex-col items-center gap-2 ">
        <div className="text-3xl font-semibold leading-9 text-muted-foreground">
          {proposalVotes.abstain}%
        </div>
        <div className="flex items-center gap-0.5 text-sm font-medium leading-[14px] text-muted-foreground">
          Abstain
          <Tooltip text="abstain" />
        </div>
      </div>
    </Card>
  );
}
