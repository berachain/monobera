"use client";

import Link from "next/link";
import { Vote, useBeraJs, usePollProposal } from "@bera/berajs";
import { FormattedNumber } from "@bera/shared-ui";
import { Card } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";

import { OverviewChart } from "../../components/overview-chart";
import { ProposalCard } from "../../components/proposal-card";
import { VoteCard } from "../../components/vote-card";
import { VoterTable } from "../../components/voter-table";
import { getTotalVotes, parseString } from "../../helper";
import { Actions } from "./Actions";
import { Status } from "./Status";
import "@bera/graphql";

export default function ProposalDetails({
  proposalId,
}: {
  proposalId: string;
}) {
  const { account, isReady } = useBeraJs();
  const { isLoading, proposal, votes } = usePollProposal(proposalId);
  const userVote =
    isReady && votes.find((vote: Vote) => vote.voter.address === account);

  return (
    <div className="pb-16">
      {isLoading || !proposal ? (
        <>Loading</>
      ) : (
        <div className="mx-auto flex h-fit w-full max-w-[830px] flex-col gap-16">
          <div className="flex h-11 w-full justify-between">
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

          <div>
            <ProposalCard
              proposal={proposal}
              className="rounded-[18px]"
              truncate={false}
            />
            <div className="mt-4 flex gap-4">
              <Card className="hidden w-full flex-col items-center justify-center p-6 sm:flex">
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

          <Actions
            executableCalls={proposal.executableCalls}
            type={parseString(proposal.metadata.description).type}
          />

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
      )}
    </div>
  );
}
