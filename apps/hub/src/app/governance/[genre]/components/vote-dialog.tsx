"use client";

import React, { useState } from "react";
import {
  GOVERNANCE_ABI,
  TransactionActionType,
  truncateHash,
  useBeraJs,
  useGetPastVotes,
  Proposal,
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
  DialogTitle,
  DialogTrigger,
} from "@bera/ui/dialog";
import { Skeleton } from "@bera/ui/skeleton";
import Identicon from "@bera/shared-ui/src/identicon";
import { Label } from "@bera/ui/label";
import { TextArea } from "@bera/ui/text-area";

export function VoteDialog({
  proposal,
  disable,
}: {
  proposal: Proposal;
  disable?: boolean;
}) {
  const [open, setOpen] = useState(false);
  // 0 = Against, 1 = For, 2 = Abstain
  const [selected, setSelected] = useState(-1);

  // @ts-ignore
  const proposalId = proposal.onchainId;
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
    onSuccess: () => setOpen(false),
  });

  const { account } = useBeraJs();

  const vote = () =>
    write({
      address: governorAddress,
      abi: GOVERNANCE_ABI,
      functionName: "castVote",
      params: [proposalId, selected],
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
              disabled={disable}
            >
              {disable ? "Voted" : "Vote"}
            </Button>
          </ActionButton>
        </DialogTrigger>
        <DialogContent className=" ">
          <DialogHeader>
            <DialogTitle className="mb-3">Vote</DialogTitle>
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
            <Label>Your vote</Label>
            <div className="flex items-center gap-4 max-w-[360px]">
              <Button
                variant={selected === 1 ? "primary" : "outline"}
                onClick={() => setSelected(1)}
                className="basis-1/3"
                size="md"
              >
                Yes
              </Button>
              <Button
                variant={selected === 0 ? "primary" : "outline"}
                onClick={() => setSelected(0)}
                className="basis-1/3"
                size="md"
              >
                No
              </Button>
              <Button
                variant={selected === 2 ? "primary" : "outline"}
                onClick={() => setSelected(2)}
                className="basis-1/3"
                size="md"
              >
                Abstain
              </Button>
            </div>
          </div>
          <div>
            <TextArea
              placeholder="Explain your voting decision"
              label="Description"
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
