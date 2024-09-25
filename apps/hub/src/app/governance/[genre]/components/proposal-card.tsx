"use client";

import React, { useMemo } from "react";
import { type Proposal } from "@bera/berajs";
import { cn } from "@bera/ui";
import { Badge } from "@bera/ui/badge";
import { Skeleton } from "@bera/ui/skeleton";
import { formatEther } from "viem";

import { ProposalHeading } from "../../components/proposal-heading";
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
  console.log(proposal);
  return (  
    <div
      className={cn(
        "relative flex flex-col items-start justify-between gap-4 gap-y-4 overflow-hidden rounded-md border border-border p-4 pt-3 sm:grid sm:grid-cols-[4fr_5fr] sm:items-center lg:pr-8 xl:pr-16",
      )}
      {...props}
    >
      <div className="flex-1 ">
        <ProposalHeading frontmatter={fm} size="sm" />
        <div className="mt-1 text-xs font-medium leading-6 text-muted-foreground md:mt-3">
          <Badge
            variant={getBadgeColor(proposal.status as StatusEnum)}
            className="mr-3 select-none rounded-xs px-2 py-1 text-sm font-semibold capitalize leading-none"
          >
            {proposal.status}
          </Badge>
          <span className="inline-block">{getTimeText(proposal)}</span>
        </div>
      </div>

      {/* {![
        StatusEnum.PENDING,
        StatusEnum.CANCELED_BY_USER,
        StatusEnum.CANCELED_BY_GUARDIAN,
      ].includes(proposal.status as StatusEnum) ? (
        <div
          className={cn(
            "flex min-w-36 flex-col items-start gap-2 gap-y-4 text-xs sm:grid sm:grid-cols-2 xl:flex-row xl:items-center ",
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
      )} */}
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
