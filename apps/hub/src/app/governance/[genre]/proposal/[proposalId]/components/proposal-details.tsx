"use client";

import Link from "next/link";
import React, { FC, useMemo } from "react";
import { Vote, useBeraJs, usePollProposal } from "@bera/berajs";
import { FormattedNumber } from "@bera/shared-ui";
import { Card } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { type Proposal } from "@bera/graphql";
import {
  getTotalVotes,
  getVotesDataList,
  parseProposalBody,
} from "../../../../helper";
import { Actions } from "../Actions";
import { StatusAction } from "../Status";
import "@bera/graphql";
import MarkdownRenderer from "./markdown-renderer";
import { Badge } from "@bera/ui/badge";
import { OverviewChart } from "../../../components/overview-chart";
import { VoterTable } from "../../../components/voter-table";
import { VoteCard } from "../../../components/vote-card";
import { StatusEnum } from "../../../../types";
import { VoteInfo } from "../../../components/Voter";
import { QuorumStatus } from "../../../components/quorum-status";
import { ProgressBarChart } from "../../../components/progress-bar-chart";
import { SWRFallback } from "@bera/berajs/contexts";
import { cn } from "@bera/ui";
import { unstable_serialize } from "swr";
import { formatEther } from "viem";

import { ProposalHeading } from "~/app/governance/components/proposal-heading";
import { StatusBadge } from "~/app/governance/components/status-badge";
import { useSearchParams } from "next/navigation";

export const ProposalDetailsWrapper = ({
  children,
  id,
  content,
}: {
  children: React.ReactNode;
  id: string;
  content: any;
}) => {
  return (
    <SWRFallback
      fallback={{
        [unstable_serialize(["usePollProposal", id])]: content,
      }}
    >
      {children}
    </SWRFallback>
  );
};

export const SearchParamsProposal: FC = () => {
  const sp = useSearchParams();
  if (!sp.get("id")) {
    throw Error("No proposal id found in search params");
  }
  return <ProposalDetails proposalId={sp.get("id")!} />;
};

export default function ProposalDetails({
  proposalId,
}: {
  proposalId: string;
}) {
  const { account, isReady } = useBeraJs();
  const { isLoading, proposal, votes } = usePollProposal(proposalId);

  console.log({ proposal });

  const userVote =
    isReady && votes.find((vote: Vote) => vote.voter.address === account);

  const fm = useMemo(() => parseProposalBody(proposal), [proposal]);

  return (
    <div className="grid grid-cols-1 gap-4 pb-16 md:gap-6 xl:grid-cols-12">
      <div className="grid grid-cols-1 gap-4 xl:col-span-10 xl:col-start-2">
        {!proposal ? (
          <>Loading</>
        ) : (
          <>
            <div className="col-span-full flex h-11 justify-between">
              <Link
                href="/governance"
                className="flex items-center gap-1 text-sm font-medium leading-[14px] text-muted-foreground"
              >
                <Icons.arrowLeft className="relative h-4 w-4" />
                Governance
              </Link>
              {proposal && (
                <StatusAction proposal={proposal as any} userVote={userVote} />
              )}
            </div>

            <div className="col-span-full">
              <ProposalHeading frontmatter={fm} size="md" />
            </div>
            <div className="col-span-full  grid grid-cols-2 items-center justify-between gap-4 text-sm sm:flex md:gap-6">
              {/* <div className="sm:flex  grid grid-cols-2 col-span-full items-center justify-between text-sm gap-x-4 gap-y-6 md:gap-6"> */}
              <StatusBadge proposal={proposal} />

              <div className="col-span-full  text-muted-foreground ">
                <VoteInfo
                  className="text-xs font-medium "
                  prefix="Submitted by "
                  voter={proposal.creator}
                />
              </div>

              <div
                className={cn(
                  "col-start-2",
                  [StatusEnum.PENDING, StatusEnum.CANCELED_BY_USER].includes(
                    proposal.status as StatusEnum,
                  )
                    ? "invisible"
                    : "",
                )}
              >
                <h3 className="mb-1 text-sm font-medium uppercase leading-5 text-muted-foreground">
                  {/* <h3 className="text-sm font-medium uppercase leading-5 mb-3 md:mb-1 text-muted-foreground"> */}
                  votes
                </h3>
                <ProgressBarChart
                  dataList={getVotesDataList(proposal)}
                  className="sm:w-52"
                />
              </div>
              <div
                className={cn(
                  "col-start-1 row-start-3 self-stretch ",
                  [StatusEnum.PENDING, StatusEnum.CANCELED_BY_USER].includes(
                    proposal.status as StatusEnum,
                  )
                    ? "invisible"
                    : "",
                )}
              >
                <h3 className="mb-1 text-sm font-medium uppercase leading-5 text-muted-foreground">
                  {/* <h3 className="text-sm font-medium leading-5 mb-3 md:mb-1 uppercase text-muted-foreground"> */}
                  quorum
                </h3>
                <QuorumStatus
                  delegatesVotesCount={getTotalVotes(proposal)}
                  quorum={BigInt(proposal.quorum)}
                />
              </div>
            </div>
            <hr className="border-b border-border sm:mb-16 sm:mt-10" />
            <div className="mx-auto gap-16">
              <div>
                <div className="mt-4 flex flex-col gap-4 md:flex-row md:gap-6">
                  <Card className="flex shrink flex-col items-center justify-center px-8 py-2 md:basis-1/3">
                    {/* <FormattedNumber
                      value={getTotalVotes(proposal)}
                      className="text-lg sm:text-xl font-semibold leading-none text-foreground"
                      symbol="BGT"
                    /> */}
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
              <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-[7fr,3fr] auto-rows-min pt-4">
                <div className="grid lg:row-start-1  lg:col-start-1 grid-cols-1 gap-4 md:gap-6">
                  <div className="border border-border p-4 px-8 rounded-md">
                    <h3 className="font-medium mb-4">Description</h3>
                    <div>
                      <MarkdownRenderer content={fm.content} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-y-4 rounded-md border border-border px-8 py-4 pb-8">
                    <h3 className="font-medium">Code Actions</h3>
                    <Actions executableCalls={proposal.executableCalls} />
                  </div>
                </div>
                <div className="lg:col-start-2 ">
                  {/* <ProposalTimeline proposal={proposal} /> */}
                </div>
              </div>

              {![StatusEnum.PENDING, StatusEnum.CANCELED_BY_USER].includes(
                proposal.status as StatusEnum,
              ) && (
                <>
                  <div className="mt-4 sm:mt-10">
                    <div className="mb-2 h-7 text-lg font-semibold leading-7 text-foreground">
                      Overview
                    </div>
                    <OverviewChart votes={votes} isLoading={isLoading} />
                  </div>
                  <div className="mt-4 sm:mt-10">
                    <VoterTable votes={votes} isLoading={isLoading} />
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
