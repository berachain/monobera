"use client";

import Link from "next/link";
import React, { useMemo } from "react";
import { Vote, useBeraJs, usePollProposal } from "@bera/berajs";
import { FormattedNumber } from "@bera/shared-ui";
import { Card } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";

import {
  getBadgeColor,
  getTimeText,
  getTopicColor,
  getTotalVotes,
  getVotesDataList,
  parseProposalBody,
} from "../../helper";
import { Actions } from "./Actions";
import { Status } from "./Status";
import "@bera/graphql";
import MarkdownRenderer from "./markdown-renderer";
import { Badge } from "@bera/ui/badge";
import { OverviewChart } from "../../[genre]/components/overview-chart";
import { VoterTable } from "../../[genre]/components/voter-table";
import { VoteCard } from "../../[genre]/components/vote-card";
import { StatusEnum } from "../../types";
import { VoteInfo } from "../../[genre]/components/Voter";
import { QuorumStatus } from "../../[genre]/components/quorum-status";
import { formatEther } from "viem";
import { ProgressBarChart } from "../../[genre]/components/progress-bar-chart";

export default function ProposalDetails({
  proposalId,
}: {
  proposalId: string;
}) {
  const { account, isReady } = useBeraJs();
  const { isLoading, proposal, votes } = usePollProposal(proposalId);
  const userVote =
    isReady && votes.find((vote: Vote) => vote.voter.address === account);
  const fm = useMemo(() => parseProposalBody(proposal), [proposal]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 pb-16 gap-4">
      <div className="xl:col-start-2 xl:col-span-10 grid grid-cols-1 gap-4">
        {isLoading || !proposal ? (
          <>Loading</>
        ) : (
          <>
            <div className="flex h-11 col-span-full justify-between">
              <Link
                href="/governance"
                className="flex items-center gap-1 text-sm font-medium leading-[14px] text-muted-foreground"
              >
                <Icons.arrowLeft className="relative h-4 w-4" />
                Governance
              </Link>
              {proposal && (
                <Status proposal={proposal as any} userVote={userVote} />
              )}
            </div>

            <div className="col-span-full">
              <p className="text-xs flex gap-2 font-semibold capitalize leading-4">
                {fm.data.topics?.map((topic: string) => (
                  <span
                    className="inline-block after:content-['•'] after:mx-1 last:after:hidden"
                    style={{ color: getTopicColor(fm.data.topic) }}
                  >
                    {topic}
                  </span>
                ))}
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
              <div className={"mt-2 mb-3 font-semibold  text-xl leading-6"}>
                {fm.data.title}
              </div>
            </div>
            <div className="flex col-span-full items-center justify-between gap-4">
              <div className="text-xs font-medium leading-6 text-muted-foreground">
                <Badge
                  variant={getBadgeColor(proposal.status as StatusEnum)}
                  className="mr-3 rounded-xs px-2 py-1 text-sm leading-none font-semibold capitalize"
                >
                  {proposal.status}
                </Badge>
                {getTimeText(proposal)}
              </div>

              <div className="  text-muted-foreground ">
                <VoteInfo
                  className="text-xs font-medium "
                  prefix="Submitted by "
                  voter={proposal.creator}
                />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase text-muted-foreground">
                  votes
                </h3>
                <ProgressBarChart
                  dataList={getVotesDataList(proposal)}
                  className="w-52"
                />
              </div>
              <div className="self-stretch">
                <h3 className="text-sm font-bold uppercase text-muted-foreground">
                  quorum
                </h3>
                <QuorumStatus
                  delegatesVotesCount={getTotalVotes(proposal)}
                  quorum={formatEther(BigInt(proposal.governor.quorum))}
                />
              </div>
            </div>
            <div className="mx-auto gap-16">
              <div>
                <div className="mt-4 flex md:flex-row flex-col gap-4">
                  <Card className="w-full flex-col items-center justify-center flex">
                    <FormattedNumber
                      value={getTotalVotes(proposal)}
                      className="text-2xl font-semibold leading-loose text-foreground"
                      symbol="BGT"
                    />
                    <div className="flex items-center text-sm font-medium text-muted-foreground">
                      Total votes
                    </div>
                  </Card>
                  <VoteCard
                    yesPercentage={proposal.voteStats[0].percent}
                    noPercentage={proposal.voteStats[1].percent}
                    abstainPercentage={proposal.voteStats[2].percent}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-[7fr,3fr] auto-rows-min">
                <div className="lg:col-start-2 ">
                  <div className="gap-4 p-5 rounded-sm border border-border ">
                    Initiated Initiated Jul,04, 09:14am Voting Period Begins
                    Jul,04, 12:14pm Voting Period Ends Jul,04, 3:08pm Proposal
                    Passed Jul,04, 9:41pm
                  </div>
                </div>
                <div className="grid lg:row-start-1  lg:col-start-1 grid-cols-1 gap-4">
                  <div className="border border-border py-4 px-8 rounded-md">
                    <h3 className="font-medium mb-4">Description</h3>
                    <div>
                      <MarkdownRenderer content={fm.content} />
                    </div>
                  </div>
                  <div className="border border-border  grid grid-cols-1 gap-y-4  pt-4 pb-8 px-8 rounded-md">
                    <h3 className="font-medium">Code Actions</h3>
                    <Actions executableCalls={proposal.executableCalls} />
                  </div>
                </div>
              </div>

              <div>
                <div className="h-7 text-lg font-semibold leading-7 text-foreground">
                  Overview
                </div>
                <OverviewChart votes={votes} isLoading={isLoading} />
              </div>

              <div>
                <div className="mt-4 h-7 text-lg font-semibold leading-7 text-foreground">
                  Voters
                </div>
                <VoterTable votes={votes} isLoading={isLoading} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
