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
export const NotEnoughVotingPower = ({
  isOpen,
  onOpenChange,
  votesThreshold,
  currentVotes,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  votesThreshold: string | undefined;
  currentVotes: string | undefined;
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
          {!!votesThreshold && (
            <div className="mt-6">
              <h3>Required delegation</h3>
              <p className="flex items-center mt-1 gap-1">
                <FormattedNumber
                  className="text-primary font-medium"
                  value={votesThreshold}
                  symbol="BGT"
                  compact={false}
                />
                <TokenIcon size="md" address={governanceTokenAddress} />
              </p>
            </div>
          )}
          {currentVotes && (
            <div className="mt-6 mb-6">
              <h3>Delegated to you</h3>
              <p className="flex items-center mt-1 gap-1">
                <FormattedNumber
                  className="text-primary font-medium"
                  value={Number(currentVotes)}
                  symbol="BGT"
                />
                <TokenIcon size="md" address={governanceTokenAddress} />
              </p>
            </div>
          )}
        </DialogDescription>
        <DialogFooter>
          <Button className="w-full" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
