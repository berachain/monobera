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
  getTopicColor,
  getTotalVotes,
  getVotesDataList,
  parseProposalBody,
} from "../../helper";
import { StatusEnum } from "../../types";
import { VoteInfo } from "./Voter";
import { ProgressBarChart } from "./progress-bar-chart";
import { QuorumStatus } from "./quorum-status";
import { Icons } from "@bera/ui/icons";

// If the proposal is active there is a time left to vote
const tAgo = new Intl.RelativeTimeFormat("en-US", {
  style: "long",
  numeric: "auto",
});
// If the proposal is closed there is a time ago
const tIn = new Intl.RelativeTimeFormat("en-US", {
  style: "long",
  numeric: "auto",
});

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
        "relative flex flex-col sm:flex-row  items-start sm:items-center justify-between p-4 pt-3 gap-3 gap-y-4 overflow-hidden rounded-md border border-border lg:h-[116px]",
        details && "h-fit lg:h-60",
        className,
      )}
      {...props}
    >
      <div className="flex-1 ">
        <p
          className={cn(
            "text-xs flex gap-2 font-semibold capitalize leading-4",
          )}
        >
          <p>
            {(fm.data.topics || fm.data.topic)?.map((topic: string) => (
              <span
                className="inline-block after:content-['•'] after:mx-1 last:after:hidden"
                style={{ color: getTopicColor(topic) }}
              >
                {topic}
              </span>
            ))}
          </p>
          {fm.data.forumLink && (
            <>
              <span className="text-muted-foreground">•</span>
              <a
                href={fm.data.forumLink}
                target="_blank"
                className="text-muted-foreground"
                rel="noreferrer "
              >
                View Forum Post
                <Icons.externalLink className="w-3 h-3 ml-1 align-middle inline-block" />
              </a>
            </>
          )}
        </p>
        <div
          className={cn(
            "mt-2 mb-3 font-semibold  leading-6",
            truncate && "line-clamp-1",
          )}
        >
          {fm.data.title}
        </div>

        <div className="  text-xs font-medium leading-6 text-muted-foreground">
          <Badge
            variant={getBadgeColor(proposal.status as StatusEnum)}
            className="mr-3 rounded-xs px-2 py-1 text-sm leading-none font-semibold capitalize"
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
          "flex flex-col items-start xl:items-center gap-2 gap-y-4  text-xs xl:flex-row xl:gap-16 xl:px-16",
          details && "flex xl:items-start gap-0 xl:flex-col xl:gap-0",
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
