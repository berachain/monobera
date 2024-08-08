"use client";

import React from "react";
import { type Proposal } from "@bera/berajs";
import { cn } from "@bera/ui";
import { Badge } from "@bera/ui/badge";
import { Skeleton } from "@bera/ui/skeleton";
import { formatEther } from "viem";

import {
  getBadgeColor,
  getThemeColor,
  getTimeText,
  getTotalVotes,
  getVotesDataList,
  parseString,
} from "../helper";
import { ProposalTypeEnum, StatusEnum } from "../types";
import { VoteInfo } from "./Voter";
import { ProgressBarChart } from "./progress-bar-chart";
import { QuorumStatus } from "./quorum-status";

export function ProposalCard({
  details = false,
  truncate = true,
  className,
  proposal,
  ...props
}: {
  details?: boolean;
  truncate?: boolean;
  className?: string;
  proposal: Proposal;
}) {
  const body = parseString(proposal.metadata.description);
  const themeColor = getThemeColor(body.type as ProposalTypeEnum);

  return (
    <div
      className={cn(
        "relative flex h-40 items-center justify-between gap-3 overflow-hidden rounded-md border border-border lg:h-[116px]",
        details && "h-fit lg:h-60",
        className,
      )}
      {...props}
    >
      <div className={cn("absolute left-0 h-full w-1", `bg-${themeColor}`)} />

      <div className="flex-1 p-4">
        <div
          className={cn(
            "text-xs font-semibold capitalize leading-4",
            `text-${themeColor}`,
          )}
        >
          {body.type ? body.type.replaceAll("-", " ") : "Text"}
        </div>
        <div
          className={cn(
            "mt-1 font-semibold leading-6",
            truncate && "line-clamp-1",
          )}
        >
          {body.title}
        </div>

        <div className="mt-4 text-xs font-medium leading-6 text-muted-foreground">
          <Badge
            variant={getBadgeColor(proposal.status as StatusEnum)}
            className="mr-3 rounded-xs px-2 py-0.5 text-xs font-semibold capitalize"
          >
            {proposal.status}
          </Badge>
          {getTimeText(proposal)}
        </div>

        {details && (
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mt-2">
            Submitted by
            <VoteInfo voter={proposal.creator} />
          </div>
        )}
      </div>

      <div
        className={cn(
          "hidden sm:flex flex-col items-start xl:items-center gap-2 px-8 xl:flex-row xl:gap-16 xl:px-16",
          details && "items-start gap-0 lg:flex-col xl:gap-0",
        )}
      >
        {details && (
          <div className="text-sm font-bold uppercase text-muted-foreground">
            quorum
          </div>
        )}
        <QuorumStatus
          delegatesVotesCount={getTotalVotes(proposal)}
          quorum={formatEther(BigInt(proposal.governor.quorum))}
        />
        {details && (
          <div className="mt-4 text-sm font-bold uppercase text-muted-foreground">
            votes
          </div>
        )}
        <ProgressBarChart
          dataList={getVotesDataList(proposal)}
          className="w-52"
        />
      </div>
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
