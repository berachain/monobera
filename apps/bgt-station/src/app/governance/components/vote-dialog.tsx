"use client";

import React, { useState } from "react";
import { VoteOption } from "@bera/proto/ts-proto-gen/cosmos-ts/cosmos/gov/v1/gov";
import { ActionButton, Tooltip } from "@bera/shared-ui";
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
}: {
  votingPower: number | undefined;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          Vote
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle className="mb-3">Vote</DialogTitle>
        </DialogHeader>
        <div className="flex w-full flex-col items-center justify-center">
          <p className="text-3xl font-semibold">
            {votingPower ? `${(votingPower * 100).toFixed(8)}%` : "0%"}
          </p>
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
            variant={
              selected === VoteOption.VOTE_OPTION_YES ? "primary" : "outline"
            }
            onClick={() => setSelected(VoteOption.VOTE_OPTION_YES)}
            className={"w-full"}
          >
            Yes
          </Button>
          <Button
            variant={
              selected === VoteOption.VOTE_OPTION_NO ? "primary" : "outline"
            }
            onClick={() => setSelected(VoteOption.VOTE_OPTION_NO)}
            className={"w-full"}
          >
            No
          </Button>
          <Button
            variant={
              selected === VoteOption.VOTE_OPTION_ABSTAIN
                ? "primary"
                : "outline"
            }
            onClick={() => setSelected(VoteOption.VOTE_OPTION_ABSTAIN)}
            className={"w-full"}
          >
            Abstain
          </Button>
        </div>
        <hr />
        <ActionButton>
          <Button
            className="w-full"
            disabled={votingPower === 0}
            variant="success"
          >
            Submit
          </Button>
        </ActionButton>
      </DialogContent>
    </Dialog>
  );
}
