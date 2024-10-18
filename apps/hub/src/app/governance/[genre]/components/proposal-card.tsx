"use client";

import React, { useMemo } from "react";
import { cn } from "@bera/ui";
import {
  ProposalSelectionFragment,
  ProposalStatus,
} from "@bera/graphql/governance";
import { Skeleton } from "@bera/ui/skeleton";

import { getVotesDataList, parseProposalBody } from "../../helper";
import { QuorumStatus } from "./quorum-status";
import { ProposalHeading } from "../../components/proposal-heading";
import { StatusBadge } from "../../components/status-badge";
import { ProgressBarChart } from "./progress-bar-chart";

export function ProposalCard({
  details = false,
  truncate = true,
  className,
  proposal,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  details?: boolean;
  truncate?: boolean;
  proposal: ProposalSelectionFragment;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col sm:grid sm:grid-cols-[4fr_5fr] items-start sm:items-center justify-between p-4 pt-3 lg:pr-8 xl:pr-16 gap-4 gap-y-4 overflow-hidden rounded-md border border-border lg:h-[116px]",
        details && "h-fit lg:h-60",
        className,
      )}
      {...props}
    >
      <div
        // overflow-hidden needed when there are addresses or long strings in the title.
        className="flex-1  overflow-hidden"
      >
        <ProposalHeading proposal={proposal} size="sm" />
        <StatusBadge proposal={proposal} className="mt-1 md:mt-3" />
      </div>

      {![
        ProposalStatus.Pending,
        ProposalStatus.CanceledByUser,
        ProposalStatus.CanceledByGuardian,
      ].includes(proposal.status) ? (
        <div
          className={cn(
            "flex flex-col items-start min-w-36 sm:grid sm:grid-cols-2 xl:items-center gap-2 gap-y-4 text-xs xl:flex-row ",
          )}
        >
          <QuorumStatus
            delegatesVotesCount={proposal.pollResult?.totalTowardsQuorum}
            quorum={proposal.quorum}
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
