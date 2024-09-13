import React, { useState } from "react";
import { FormattedNumber, TokenIcon } from "@bera/shared-ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@bera/ui/dialog";
import { governanceTokenAddress } from "@bera/config";
import { Button } from "@bera/ui/button";
import { Skeleton } from "@bera/ui/skeleton";
export const NotEnoughVotingPower = ({
  isOpen,
  onOpenChange,
  onOpenDelegate,

  votesThreshold,
  currentVotes,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  votesThreshold: string | undefined;
  currentVotes: string | undefined;
  onOpenDelegate: () => void;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Not Enough Voting Power</DialogTitle>
        <DialogDescription className="text-muted-foreground font-medium">
          <p className=" max-w-96">
            It looks like you don’t meet the minimum threshold required to
            create on-chain proposals
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 mt-6 mb-6 gap-4 leading-tight text-muted-foreground">
            <div className=" p-3 border border-border rounded-sm">
              <h3>Required delegation</h3>
              <p className="flex items-center mt-1 gap-1">
                {votesThreshold ? (
                  <FormattedNumber
                    className="text-primary font-medium"
                    value={votesThreshold}
                    symbol="BGT"
                    compact={false}
                  />
                ) : (
                  <Skeleton className="h-6 w-full" />
                )}
                <TokenIcon size="md" address={governanceTokenAddress} />
              </p>
            </div>

            <div className=" p-3 border border-border rounded-sm">
              <h3>Delegated to you</h3>
              <p className="flex items-center mt-1 gap-1">
                {currentVotes ? (
                  <FormattedNumber
                    className="text-primary font-medium"
                    value={Number(currentVotes)}
                    symbol="BGT"
                  />
                ) : (
                  <Skeleton className="h-6 w-full" />
                )}
                <TokenIcon size="md" address={governanceTokenAddress} />
              </p>
            </div>
          </div>
        </DialogDescription>
        <DialogFooter>
          <div className="grid grid-cols-1 w-full gap-3">
            <Button className="w-full " onClick={() => onOpenDelegate()}>
              Delegate
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
