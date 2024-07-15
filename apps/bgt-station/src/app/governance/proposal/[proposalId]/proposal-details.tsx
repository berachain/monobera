"use client";

import Link from "next/link";
import { usePollProposal } from "@bera/berajs";
import { FormattedNumber } from "@bera/shared-ui";
import { Card } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";

import { OverviewChart } from "../../components/overview-chart";
import { ProposalCard } from "../../components/proposal-card";
import { VoteCard } from "../../components/vote-card";
import { VoterTable } from "../../components/voter-table";
import { getTotalVotes } from "../../helper";
import { Actions } from "./Actions";
import { Status } from "./Status";

export default function ProposalDetails({
  proposalId,
}: {
  proposalId: string;
}) {
  const { isLoading, proposal, votes } = usePollProposal(proposalId);
  return (
    <div className="pb-16">
      {isLoading || !proposal ? (
        <>Loading</>
      ) : (
        <div className="mx-auto h-fit w-full max-w-[830px]">
          <div className="flex h-11 w-full justify-between">
            <Link
              href="/governance"
              className="flex items-center gap-1 text-sm font-medium leading-[14px] text-muted-foreground"
            >
              <Icons.arrowLeft className="relative h-4 w-4" />
              Governance
            </Link>
            {proposal && <Status proposal={proposal as any} />}
          </div>
          <ProposalCard
            proposal={proposal}
            className="mt-4 rounded-[18px]"
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

          <Actions />
          <div className="mt-16">
            <div className="h-7 text-lg font-semibold leading-7 text-foreground">
              Overview
            </div>
            <OverviewChart votes={votes} isLoading={isLoading} />
          </div>
          <div className="mt-16 ">
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
