"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  GOVERNANCE_PRECOMPILE_ABI,
  TransactionActionType,
  truncateHash,
  usePollDenom,
  usePollProposal,
} from "@bera/berajs";
import {
  beraTokenAddress,
  blockExplorerUrl,
  governanceAddress,
} from "@bera/config";
import { ProposalStatus } from "@bera/proto/ts-proto-gen/cosmos-ts/cosmos/gov/v1beta1/gov";
import { FormattedNumber, TokenIcon, Tooltip, useTxn } from "@bera/shared-ui";
import { Badge } from "@bera/ui/badge";
import { Card } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";
import { Address, decodeFunctionData } from "viem";

import { OverviewChart } from "../../components/overview-chart";
import { ProposalCard } from "../../components/proposal-card";
import { VoteCard } from "../../components/vote-card";
import { VoteDialog } from "../../components/vote-dialog";
import { VoterTable } from "../../components/voter-table";
import { getProposalType, getTotalVotes } from "../../helper";
import { Actions } from "./Actions";

export default function ProposalDetails({
  proposalId,
}: {
  proposalId: string;
}) {
  const { isLoading, proposal, votes } = usePollProposal(proposalId);
  console.log(proposal);
  return (
    <div className="pb-16">
      {/* {ModalPortal} */}

      {isLoading || !proposal || votes.length === 0 ? (
        <>Loading</>
      ) : (
        <div className="mx-auto h-fit w-full max-w-[830px]">
          <div className="flex h-11 w-full justify-between hover:cursor-pointer">
            <Link
              href="/governance"
              className="flex items-center gap-1 text-sm font-medium leading-[14px] text-muted-foreground"
            >
              <Icons.arrowLeft className="relative h-4 w-4" />
              Governance
            </Link>
            {/* <div className="flex items-center gap-3">
              <VoteDialog
                open={open}
                setOpen={setOpen}
                votingPower={votingPower}
                comment={comment}
                setComment={setComment}
                selected={selected}
                setSelected={setSelected}
                onSubmit={() => {
                  write({
                    address: governanceAddress,
                    abi: GOVERNANCE_PRECOMPILE_ABI,
                    functionName: "vote",
                    params: payload,
                  });
                }}
                isLoading={isTxnLoading}
                isVotingPowerLoading={true}
              />
          </div> */}
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
