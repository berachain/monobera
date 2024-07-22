"use client";

import React from "react";
import { Proposal } from "@bera/berajs";
import { FormattedNumber } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Badge } from "@bera/ui/badge";
import { Skeleton } from "@bera/ui/skeleton";

import {
  getBadgeColor,
  getTimeText,
  getTotalVoters,
  getTotalVotes,
  getVotesDataList,
  parseString,
} from "../helper";
import { StatusEnum } from "../types";
import { VoteInfo } from "./Voter";
import { ProgressBarChart } from "./progress-bar-chart";

export function ProposalCard({
  truncate = true,
  className,
  proposal,
  onClick,
}: {
  truncate?: boolean;
  className?: string;
  proposal: Proposal;
  onClick?: () => void;
}) {
  const body = parseString(proposal.metadata.description);
  return (
    <div
      className={cn(
        "relative flex flex-col gap-1 rounded-[18px] border border-border bg-background p-8",
        className,
      )}
      onClick={onClick}
    >
      <div className="flex h-fit flex-row flex-wrap items-center gap-1">
        <Badge
          variant={getBadgeColor(proposal.status as StatusEnum)}
          className="border-none px-2 py-1 text-xs font-medium capitalize"
        >
          {proposal.status}
        </Badge>
        {body.type && (
          <Badge
            variant={"warning"}
            className="border-none px-2 py-1 text-xs font-medium capitalize"
          >
            {body.type.replaceAll("_", " ")}
          </Badge>
        )}
        <div className="text-xs font-medium leading-tight text-muted-foreground">
          {getTimeText(proposal)}
        </div>
      </div>
      <div>
        <div
          className={cn(
            "width-full text-2xl font-semibold leading-tight",
            truncate && "line-clamp-1",
          )}
        >
          {body.title}
        </div>
        <div
          className={cn("width-full", truncate && "line-clamp-2")}
          dangerouslySetInnerHTML={{ __html: body.content }}
        />
      </div>
      <ProgressBarChart
        className="mt-4"
        dataList={getVotesDataList(proposal)}
      />
      <div className="mt-3 flex flex-col-reverse gap-2 text-xs font-medium leading-tight text-muted-foreground sm:h-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          Submitted by
          <VoteInfo voter={proposal.creator} />
        </div>
        <div className=" text-sm font-bold">
          <FormattedNumber
            value={getTotalVoters(proposal)}
            visibleDecimals={0}
            className="text-info-foreground"
          />{" "}
          voters,{" "}
          <FormattedNumber
            value={getTotalVotes(proposal)}
            className="text-warning-foreground"
            symbol="BGT"
          />{" "}
          voted
        </div>
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
