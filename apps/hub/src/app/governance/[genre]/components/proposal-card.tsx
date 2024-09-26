"use client";

import React, { useMemo } from "react";
import { type Proposal } from "@bera/berajs";
import { cn } from "@bera/ui";
import { Badge } from "@bera/ui/badge";
import { Skeleton } from "@bera/ui/skeleton";
import { formatEther } from "viem";

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
import { ProposalHeading } from "../../components/proposal-heading";
import { StatusBadge } from "../../components/status-badge";

export function ProposalCard({
  details = false,
  truncate = true,
  className,
  proposal,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  details?: boolean;
  truncate?: boolean;
  proposal: Proposal;
}) {
  const fm = useMemo(() => parseProposalBody(proposal), [proposal]);

  return (
    <div
      className={cn(
        "relative flex flex-col sm:grid sm:grid-cols-[4fr_5fr] items-start sm:items-center justify-between p-4 pt-3 lg:pr-8 xl:pr-16 gap-4 gap-y-4 overflow-hidden rounded-md border border-border lg:h-[116px]",
        details && "h-fit lg:h-60",
        className,
      )}
      {...props}
    >
      <div className="flex-1">
        <ProposalHeading frontmatter={fm} size="sm" />
        <StatusBadge proposal={proposal} className="mt-1 md:mt-3" />
      </div>

      {![
        StatusEnum.PENDING,
        StatusEnum.CANCELED_BY_USER,
        StatusEnum.CANCELED_BY_GUARDIAN,
      ].includes(proposal.status as StatusEnum) ? (
        <div
          className={cn(
            "flex flex-col items-start min-w-36 sm:grid sm:grid-cols-2 xl:items-center gap-2 gap-y-4 text-xs xl:flex-row ",
          )}
        >
          <QuorumStatus
            delegatesVotesCount={getTotalVotes(proposal)}
            quorum={formatEther(BigInt(proposal.governor.quorum))}
          />
          <ProgressBarChart
            dataList={getVotesDataList(proposal)}
            className="w-full"
          />
        </div>
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
