"use client";

import React from "react";
import { Proposal, truncateHash } from "@bera/berajs";
import { FormattedNumber } from "@bera/shared-ui";
import Identicon from "@bera/shared-ui/src/identicon";
import { cn } from "@bera/ui";
import { Badge } from "@bera/ui/badge";
import { Skeleton } from "@bera/ui/skeleton";
import { getAddress } from "viem";

import {
  getBadgeColor,
  getTimeText,
  getTotalVoters,
  getTotalVotes,
  getVotesDataList,
} from "../helper";
import { ProgressBarChart } from "./progress-bar-chart";
import { StatusEnum } from "../types";

type ProposalCard = {
  proposal: Proposal;
  type?: string;
  onClick?: () => void;
  className?: string;
};

export function ProposalCard({
  proposal,
  type,
  onClick,
  className,
}: ProposalCard) {
  const title = (proposal.metadata.description.split("\n")[0] ?? "# ").slice(2);
  const subTitle = proposal.metadata.description.split("\n")[1] ?? "";
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
          className="border-none px-2 py-1 text-xs capitalize font-medium"
        >
          {proposal.status}
        </Badge>
        <div className="text-xs font-medium leading-tight text-muted-foreground">
          {getTimeText(proposal)}
        </div>
      </div>
      <div>
        <div
          className={"width-full truncate text-2xl font-semibold leading-tight"}
        >
          {title}
        </div>
        <div className={"width-full line-clamp-2"}>{subTitle}</div>
      </div>
      <ProgressBarChart
        className="mt-4"
        dataList={getVotesDataList(proposal)}
        labelList={[
          { label: "Pass threshold", width: 30 },
          { label: "Quorum", width: 60 },
        ]}
      />
      <div className="mt-3 flex flex-col-reverse gap-2 text-xs font-medium leading-tight text-muted-foreground sm:h-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          {" "}
          <Identicon account={getAddress(proposal.creator.address)} />
          Submitted by {truncateHash(proposal.creator.address, 6, 4)}
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
          />{" "}
          votes
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
