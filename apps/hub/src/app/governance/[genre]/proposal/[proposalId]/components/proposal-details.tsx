"use client";

import Link from "next/link";
import React, { FC, useMemo } from "react";
import {
  Vote,
  useBeraJs,
  usePollProposal,
  useProposalFromTx,
} from "@bera/berajs";
import { FormattedNumber } from "@bera/shared-ui";
import { Card } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";

import { getVotesDataList } from "../../../../helper";
import { Actions } from "../Actions";
import { StatusAction } from "../Status";
import "@bera/graphql";
import MarkdownRenderer from "./markdown-renderer";
import { OverviewChart } from "../../../components/overview-chart";
import { VoterTable } from "../../../components/voter-table";
import { VoteCard } from "../../../components/vote-card";
import { VoteInfo } from "../../../components/Voter";
import { QuorumStatus } from "../../../components/quorum-status";
import { Address, formatEther } from "viem";
import { ProgressBarChart } from "../../../components/progress-bar-chart";
import { SWRFallback } from "@bera/berajs/contexts";
import { unstable_serialize } from "swr";
import { ProposalTimeline } from "./proposal-timeline";
import { ProposalHeading } from "~/app/governance/components/proposal-heading";
import { cn } from "@bera/ui";
import { StatusBadge } from "~/app/governance/components/status-badge";
import { useSearchParams } from "next/navigation";
import {
  ProposalStatus,
  ProposalWithVotesFragment,
} from "@bera/graphql/governance";

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

  return (
    <ProposalDetails proposalId={sp.get("id")!} txHash={sp.get("txHash")} />
  );
};

export default function ProposalDetails({
  proposalId,
  txHash,
}: {
  proposalId: string;
  txHash?: string | null;
}) {
  const { account, isReady } = useBeraJs();

  const { data: txProposal } = useProposalFromTx(
    (txHash as Address) || undefined,
  );

  const { isLoading, data: subgraphProposal } = usePollProposal(
    proposalId ?? txProposal?.id,
  );

  const proposal = {
    ...txProposal,
    ...subgraphProposal,
  } as ProposalWithVotesFragment;

  const votes = proposal?.votes ?? [];

  const userVote =
    isReady && votes.find((vote: Vote) => vote.voter.address === account);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 pb-16 gap-4 md:gap-6">
      <div className="xl:col-start-2 xl:col-span-10 grid grid-cols-1 gap-4">
        {proposal?.id ? (
          <>
            <div className="flex h-11 col-span-full justify-between">
              <Link
                href={`/governance/${proposal.topics?.at(0) ?? ""}`}
                className="flex items-center gap-1 text-sm font-medium leading-[14px] text-muted-foreground"
              >
                <Icons.arrowLeft className="relative h-4 w-4" />
                Governance
              </Link>
              {proposal && (
                <StatusAction proposal={proposal!} userVote={userVote} />
              )}
            </div>

            <div className="col-span-full">
              <ProposalHeading proposal={proposal} size="md" />
            </div>
            <div className="sm:flex grid grid-cols-2 col-span-full items-center justify-between text-sm gap-x-4 gap-y-6 md:gap-6">
              <StatusBadge proposal={proposal} />

              <div className="col-span-full text-muted-foreground ">
                <VoteInfo
                  className="text-xs font-medium"
                  prefix="Submitted by "
                  voter={proposal.proposer}
                />
              </div>

              <div
                className={cn(
                  "col-start-2",
                  [
                    ProposalStatus.Pending,
                    ProposalStatus.CanceledByUser,
                  ].includes(proposal.status)
                    ? "invisible"
                    : "",
                )}
              >
                <h3 className="text-sm font-medium uppercase leading-5 mb-3 md:mb-1 text-muted-foreground">
                  votes
                </h3>
                <ProgressBarChart
                  dataList={getVotesDataList(proposal)}
                  className="sm:w-52"
                />
              </div>
              <div
                className={cn(
                  "self-stretch col-start-1 row-start-3 ",
                  [
                    ProposalStatus.Pending,
                    ProposalStatus.CanceledByUser,
                  ].includes(proposal.status as ProposalStatus)
                    ? "invisible"
                    : "",
                )}
              >
                <h3 className="text-sm font-medium leading-5 mb-3 md:mb-1 uppercase text-muted-foreground">
                  quorum
                </h3>
                <QuorumStatus
                  delegatesVotesCount={proposal.pollResult.totalTowardsQuorum}
                  quorum={proposal.quorum}
                />
              </div>
            </div>
            <hr className="border-b border-border mt-4 sm:mt-8 sm:mb-12" />
            <div className="mx-auto gap-16">
              {![
                ProposalStatus.CanceledByUser,
                ProposalStatus.Pending,
              ].includes(proposal.status) && (
                <div>
                  <div className="mt-4 flex md:flex-row flex-col gap-4 md:gap-6">
                    <Card className="px-8 py-3 md:py-2 flex-col items-center md:basis-1/3 shrink justify-center flex">
                      <FormattedNumber
                        value={formatEther(
                          BigInt(proposal.pollResult?.total ?? 0),
                        )}
                        className="text-lg sm:text-xl font-semibold leading-none text-foreground"
                        symbol="BGT"
                      />
                      <div className="flex items-center text-sm font-medium leading-none mt-2 md:mt-0 text-muted-foreground">
                        Total votes
                      </div>
                    </Card>
                    <VoteCard
                      yesPercentage={proposal.pollResult?.forPercentage ?? 0}
                      noPercentage={proposal.pollResult?.againstPercentage ?? 0}
                      abstainPercentage={
                        proposal.pollResult?.abstainPercentage ?? 0
                      }
                    />
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-[7fr,3fr] auto-rows-min pt-4">
                <div className="grid lg:row-start-1  lg:col-start-1 grid-cols-1 gap-4 md:gap-6">
                  <div className="border border-border p-4 px-8 rounded-md">
                    <h3 className="font-medium mb-4">Description</h3>
                    <div>
                      <MarkdownRenderer content={proposal.description} />
                    </div>
                  </div>
                  <div className="border border-border grid grid-cols-1 gap-y-4 py-4 pb-8 px-8 rounded-md">
                    <h3 className="font-medium">Code Actions</h3>
                    <Actions executableCalls={proposal.executableCalls} />
                  </div>
                </div>
                <div className="lg:col-start-2 ">
                  <ProposalTimeline proposal={proposal} />
                </div>
              </div>

              {![
                ProposalStatus.Pending,
                ProposalStatus.CanceledByUser,
              ].includes(proposal.status) && (
                <>
                  <div className="mt-4 sm:mt-10">
                    <div className="h-7 mb-2 text-lg font-semibold leading-7 text-foreground">
                      Overview
                    </div>
                    <OverviewChart
                      votes={votes.filter((v) => v.weight !== "0")}
                      isLoading={isLoading}
                    />
                  </div>
                  <div className="mt-4 sm:mt-10">
                    <VoterTable proposal={proposal} isLoading={isLoading} />
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}
