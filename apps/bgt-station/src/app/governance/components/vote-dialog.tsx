"use client";

import React, { useState } from "react";
import { GOVERNANCE_ABI, TransactionActionType } from "@bera/berajs";
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

export function VoteDialog({
  votingPower,
  proposalId,
}: {
  votingPower: string | undefined;
  proposalId: string;
}) {
  const [open, setOpen] = useState(false);
  // 0 = Against, 1 = For, 2 = Abstain
  const [selected, setSelected] = useState(-1);

  const { write, ModalPortal } = useTxn({
    message: "Vote Proposal",
    actionType: TransactionActionType.VOTE,
    onSuccess: () => setOpen(false),
  });

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
            >
              Vote
            </Button>
          </ActionButton>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle className="mb-3">Vote</DialogTitle>
          </DialogHeader>
          <div className="flex w-full flex-col items-center justify-center">
            <FormattedNumber
              value={votingPower ?? "0"}
              symbol="BGT"
              className="text-3xl font-semibold"
            />

            <p className="text-sm font-medium">
              Voting Power{" "}
              <Tooltip
                text={
                  "Represents the influence in network governance based on amount delegated to this validator"
                }
              />
            </p>
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-4">
            <Button
              variant={selected === 1 ? "primary" : "outline"}
              onClick={() => setSelected(1)}
              className={"w-full"}
            >
              Yes
            </Button>
            <Button
              variant={selected === 0 ? "primary" : "outline"}
              onClick={() => setSelected(0)}
              className={"w-full"}
            >
              No
            </Button>
            <Button
              variant={selected === 2 ? "primary" : "outline"}
              onClick={() => setSelected(2)}
              className={"w-full"}
            >
              Abstain
            </Button>
          </div>
          <hr />
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
