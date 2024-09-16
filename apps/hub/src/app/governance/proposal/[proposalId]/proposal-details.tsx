"use client";

import Link from "next/link";
import { Vote, useBeraJs, usePollProposal } from "@bera/berajs";
import { FormattedNumber } from "@bera/shared-ui";
import { Card } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";

import { getTotalVotes, parseProposalBody } from "../../helper";
import { Actions } from "./Actions";
import { Status } from "./Status";
import "@bera/graphql";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";
import { ProposalCard } from "../../[genre]/components/proposal-card";
import { VoteCard } from "../../[genre]/components/vote-card";
import { OverviewChart } from "../../[genre]/components/overview-chart";
import { VoterTable } from "../../[genre]/components/voter-table";
import MarkdownRenderer from "./markdown-renderer";

export default function ProposalDetails({
  proposalId,
}: {
  proposalId: string;
}) {
  const { account, isReady } = useBeraJs();
  const { isLoading, proposal, votes } = usePollProposal(proposalId);
  const userVote =
    isReady && votes.find((vote: Vote) => vote.voter.address === account);
  const fm = parseProposalBody(proposal?.metadata.description ?? "");
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
            <ProposalCard proposal={proposal} truncate={false} details />
            <div className="mt-4 flex md:flex-row flex-col gap-4">
              <Card className="w-full flex-col items-center justify-center p-6 flex">
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

          <Tabs defaultValue="description">
            <TabsList variant="ghost" className="mb-4">
              <TabsTrigger value="description" key="description">
                Description
              </TabsTrigger>
              <TabsTrigger value="code" key="code">
                Executable Code
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description">
              <div className="border border-border p-4 rounded-md">
                <div>
                  <MarkdownRenderer content={fm.content} />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="code">
              <Actions executableCalls={proposal.executableCalls} />
            </TabsContent>
          </Tabs>

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
