"use client";

import React from "react";
import { VoteOption } from "@bera/proto/ts-proto-gen/cosmos-ts/cosmos/gov/v1/gov";
import { ActionButton, Tooltip } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@bera/ui/dialog";
import { Skeleton } from "@bera/ui/skeleton";
import { TextArea } from "@bera/ui/text-area";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  votingPower: number | undefined;
  comment: string;
  setComment: (comment: string) => void;
  selected: VoteOption | undefined;
  setSelected: (selected: VoteOption) => void;
  onSubmit: () => void;
  isVotingPowerLoading: boolean;
  isLoading: boolean;
}

export function VoteDialog({
  open,
  setOpen,
  votingPower,
  comment,
  setComment,
  selected,
  setSelected,
  onSubmit,
  isVotingPowerLoading,
  isLoading,
}: Props) {
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
          {isVotingPowerLoading ? (
            <Skeleton className="h-20 w-20" />
          ) : (
            <p className="text-3xl font-semibold">
              {votingPower ? (votingPower*100).toFixed(2) + "%" : "0%"}
            </p>
          )}
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
            variant="outline"
            onClick={() => setSelected(VoteOption.VOTE_OPTION_YES)}
            className={cn(
              "w-full",
              selected === VoteOption.VOTE_OPTION_YES
                ? "opacity-100"
                : "opacity-50",
            )}
          >
            Yes
          </Button>
          <Button
            variant="outline"
            onClick={() => setSelected(VoteOption.VOTE_OPTION_NO)}
            className={cn(
              "w-full",
              selected === VoteOption.VOTE_OPTION_NO
                ? "opacity-100"
                : "opacity-50",
            )}
          >
            No
          </Button>
          <Button
            variant="outline"
            onClick={() => setSelected(VoteOption.VOTE_OPTION_NO_WITH_VETO)}
            className={cn(
              "w-full",
              selected === VoteOption.VOTE_OPTION_NO_WITH_VETO
                ? "opacity-100"
                : "opacity-50",
            )}
          >
            No with veto
          </Button>
          <Button
            variant="outline"
            onClick={() => setSelected(VoteOption.VOTE_OPTION_ABSTAIN)}
            className={cn(
              "w-full",
              selected === VoteOption.VOTE_OPTION_ABSTAIN
                ? "opacity-100"
                : "opacity-50",
            )}
          >
            Abstain
          </Button>
          <TextArea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <ActionButton>
          <Button
            onClick={onSubmit}
            className="w-full"
            disabled={isLoading || isVotingPowerLoading || votingPower === 0}
          >
            Submit
          </Button>
        </ActionButton>
      </DialogContent>
    </Dialog>
  );
}
