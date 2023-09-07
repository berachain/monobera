"use client";

import React from "react";
import { Button } from "@bera/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@bera/ui/dialog";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  disabled: boolean;
  totalValue: number;
  bribes: any[];
}

export function ClaimBribesDialog({
  open,
  setOpen,
  disabled,
  totalValue,
}: Props) {
  console.log("totalValue", totalValue);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={disabled}
          onClick={() => {
            setOpen(true);
          }}
        >
          Claim
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle className="mb-3">Reward Breakdown</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
