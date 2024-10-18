"use client";

import React, { useState } from "react";
import {
  GOVERNANCE_ABI,
  TransactionActionType,
  truncateHash,
  useBeraJs,
  useGetPastVotes,
  useHasVoted,
} from "@bera/berajs";
import { governorAddress } from "@bera/config";
import {
  ActionButton,
  FormattedNumber,
  Tooltip,
  useTxn,
} from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@bera/ui/dialog";
import { Skeleton } from "@bera/ui/skeleton";
import { Identicon } from "@bera/shared-ui";
import { Label } from "@bera/ui/label";
import { TextArea } from "@bera/ui/text-area";
import { ProposalHeading } from "../../components/proposal-heading";
import { cn } from "@bera/ui";
import { ProposalWithVotesFragment } from "@bera/graphql/governance";

export function VoteDialog({
  proposal,
  disable: propsDisabled,
}: {
  proposal: ProposalWithVotesFragment;
  disable?: boolean;
}) {
  const { data: hasVoted, mutate } = useHasVoted({ proposalId: proposal.id });

  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  // 0 = Against, 1 = For, 2 = Abstain
  const [selected, setSelected] = useState(-1);

  const proposalId = BigInt(proposal.id);

  const disabled = hasVoted || propsDisabled;

  const {
    data: votingPower,
    isLoading,
    error,
  } = useGetPastVotes({
    proposalId: proposalId,
  });

  const { write, ModalPortal } = useTxn({
    message: "Vote Proposal",
    actionType: TransactionActionType.VOTE,
    onSuccess: () => {
      setOpen(false);
      mutate(true);
    },
  });

  const { account } = useBeraJs();

  const vote = () =>
    write({
      address: governorAddress,
      abi: GOVERNANCE_ABI,
      functionName: "castVoteWithReason",
      params: [proposalId, selected, reason],
    });

  return (
    <>
      {ModalPortal}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <ActionButton>
            <Button
              onClick={() => {
                setOpen(true);
              }}
              disabled={disabled}
            >
              {disabled ? "Voted" : "Vote"}
            </Button>
          </ActionButton>
        </DialogTrigger>
        <DialogContent className=" ">
          <DialogHeader className="!text-left">
            <ProposalHeading size="md" proposal={proposal} />
          </DialogHeader>
          <div className="flex w-full flex-wrap items-center ">
            <div className="basis-1/2">
              {account && (
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Identicon account={account} size={24} />
                  {truncateHash(account)}
                </div>
              )}
            </div>
            <div className="basis-1/2">
              <p className="text-sm font-medium text-muted-foreground">
                Voting Power{" "}
                <Tooltip
                  text={
                    "Represents the influence in network governance based on amount delegated to this validator"
                  }
                />
              </p>
              {isLoading ? (
                <Skeleton className="h-4 w-8" />
              ) : error ? (
                <div>Error {JSON.stringify(error)}</div>
              ) : (
                <FormattedNumber
                  value={votingPower ?? "0"}
                  symbol="BGT"
                  className="font-semibold"
                />
              )}{" "}
            </div>
          </div>
          <div>
            <Label>Your Vote</Label>
            <div className="flex items-center gap-2 max-w-[360px]">
              {[
                { label: "For", value: 1 },
                { label: "Against", value: 0 },
                { label: "Abstain", value: 2 },
              ].map(({ label, value }) => (
                <button
                  key={label}
                  type="button"
                  className={cn(
                    "basis-1/3 rounded-sm text-sm font-semibold p-2 h-9 border-2 flex items-center justify-center",
                    value === 0 && "text-destructive-foreground",
                    value === 1 && "text-success-foreground",
                    value === 2 && "text-muted-foreground",
                    selected === value ? "border-current" : "border-border",
                  )}
                  onClick={() => setSelected(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <TextArea
              placeholder="Explain your voting decision"
              label="Description"
              value={reason}
              variant="black"
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
          <ActionButton>
            <Button
              className="w-full"
              disabled={
                !votingPower || Number(votingPower) === 0 || selected === -1
              }
              variant="success"
              onClick={vote}
            >
              Submit
            </Button>
          </ActionButton>
        </DialogContent>
      </Dialog>
    </>
  );
}
