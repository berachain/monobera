"use client";

import { usePollProposal, type Proposal } from "@bera/berajs";
import { ProposalStatus } from "@bera/proto/ts-proto-gen/cosmos-ts/cosmos/gov/v1beta1/gov";
import { Tooltip } from "@bera/shared-ui";
import { Card } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";

import { OverviewChart } from "../../components/overview-chart";
import { ProposalCard } from "../../components/proposal-card";
import { VoteCard } from "../../components/vote-card";
import { VoteDialog } from "../../components/vote-dialog";
import { VoterTable } from "../../components/voter-table";
import { description } from "../../home/mockData";
import { useProposalDetails } from "./useProposalDetails";

export default function ProposalDetails({
  proposalId,
}: {
  proposalId: number;
}) {
  const { useProposal } = usePollProposal(proposalId);
  const proposal: Proposal | undefined = useProposal();

  const {
    open,
    setOpen,
    votingPower,
    comment,
    setComment,
    selected,
    setSelected,
  } = useProposalDetails();

  console.log(proposal);
  return (
    <div className="container pb-16">
      <div className="mx-auto h-fit w-full max-w-[830px]">
        <div
          className="flex h-11 w-full justify-between hover:cursor-pointer"
          // onClick={() => router.push("/governance")}
        >
          <div className="[]: flex items-center gap-1 text-sm font-medium leading-[14px] text-primary-foreground">
            <Icons.arrowLeft className="relative h-4 w-4" />
            Governance
          </div>
          <div className="flex items-center gap-3">
            {proposal?.status ===
              ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD && (
              <VoteDialog
                open={open}
                setOpen={setOpen}
                votingPower={votingPower}
                comment={comment}
                setComment={setComment}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {proposal?.status ===
              ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD && <></>}
          </div>
        </div>

        <div className="mt-4 rounded-[18px] shadow">
          {proposal && <ProposalCard {...proposal} />}
        </div>

        <div className="mt-4 flex gap-4">
          <Card className="hidden w-full flex-col items-center justify-center p-6 sm:flex">
            <div className="text-2xl font-semibold leading-loose text-foreground">
              96.23M
            </div>
            <div className="mt-[-4px] flex items-center gap-0.5 text-sm font-medium leading-[14px] text-muted-foreground">
              Total votes
              <Tooltip text="no" />
            </div>
          </Card>
          <VoteCard proposalVotes={{ yes: 20, no: 10, veto: 9, abstain: 15 }} />
        </div>

        <div className="mt-16 flex h-fit w-full flex-col gap-8 sm:flex-row">
          <div className="flex-1">
            <div className="h-7 text-lg font-semibold leading-7 text-foreground">
              Description
            </div>
            <Card className="mt-1 h-full max-h-[376px] overflow-y-scroll bg-background p-8 text-sm font-normal leading-normal text-muted-foreground">
              {description}
            </Card>
          </div>
          <div className="flex-1 sm:w-0.5">
            <div className="h-7 text-lg font-semibold leading-7 text-foreground">
              Msg
            </div>
            <Card className="mt-1 h-full max-h-[376px] overflow-scroll break-words bg-muted px-3 py-2 text-sm font-normal leading-normal text-muted-foreground">
              reeee
            </Card>
          </div>
        </div>

        <div className="mt-16">
          <div className="h-7 text-lg font-semibold leading-7 text-foreground">
            Overview
          </div>
          <OverviewChart />
        </div>

        <div className="mt-16 ">
          <div className="mt-4 h-7 text-lg font-semibold leading-7 text-foreground">
            Voters
          </div>
          <VoterTable />
        </div>
      </div>
    </div>
  );
}
