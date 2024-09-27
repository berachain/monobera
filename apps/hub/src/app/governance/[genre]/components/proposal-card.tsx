"use client";

import React, { useMemo } from "react";
import { type Proposal } from "@bera/graphql";
import { cn } from "@bera/ui";
import { Badge } from "@bera/ui/badge";
import { Skeleton } from "@bera/ui/skeleton";
import { formatEther } from "viem";

import { ProposalHeading } from "../../components/proposal-heading";
import { StatusBadge } from "../../components/status-badge";
import { GovernanceTopic } from "../../governance-genre-helper";
import {
  getBadgeColor,
  getTimeText,
  getTotalVotes,
  getVotesDataList,
  parseProposalBody,
} from "../../helper";
import { StatusEnum } from "../../types";
import { ProgressBarChart } from "./progress-bar-chart";
import { QuorumStatus } from "./quorum-status";

export function ProposalCard({
  proposal,
  dappConfig,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  proposal: Proposal;
  dappConfig: GovernanceTopic;
}) {
  const fm = useMemo(() => parseProposalBody(proposal), [proposal]);
  return (
    <div
      className={cn(
        "md:flex-row flex-col relative flex items-start justify-between gap-4 gap-y-4 overflow-hidden rounded-md border border-border p-4 hover:cursor-pointer sm:items-center",
      )}
      {...props}
    >
      <div className="w-fit max-w-[400px]">
        <ProposalHeading frontmatter={fm} size="sm" />
        <StatusBadge proposal={proposal} className="mt-1 md:mt-3" />
      </div>

      {![
        StatusEnum.PENDING,
        StatusEnum.CANCELED_BY_USER,
        StatusEnum.CANCELED_BY_GUARDIAN,
      ].includes(proposal.status as StatusEnum) ? (
        <>
          <QuorumStatus
            delegatesVotesCount={getTotalVotes(proposal)}
            quorum={BigInt(proposal.quorum)}
          />
          <ProgressBarChart
            dataList={getVotesDataList(proposal)}
            className="w-[200px]"
          />
        </>
      ) : (
        <div>--</div>
      )}
    </div>
  );
}

export function ProposalCardSkeleton() {
  return (
    <div className="hove:cursor-pointer relative rounded-[18px] border border-border bg-background p-8">
      <div className="mb-2 flex h-7 items-center gap-1">
        <Skeleton className="h-full w-12" />
        <Skeleton className="h-full w-full" />
      </div>
      <Skeleton className="mb-4 h-5 w-full" />
      <Skeleton className="h-9 w-full" />
    </div>
  );
}
