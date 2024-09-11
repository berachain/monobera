import React, { useState } from "react";
import { usePollUserDelegates, usePollProposalThreshold } from "@bera/berajs";
import { Button } from "@bera/ui/button";
import { FormattedNumber, TokenIcon } from "@bera/shared-ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@bera/ui/dialog";
import { ActionButton } from "@bera/shared-ui";
import { Address } from "viem";
import Link from "next/link";
import { governanceTokenAddress } from "@bera/config";

export const GoToIfHasVotingPower = ({
  governorAddress,
  href,
}: {
  governorAddress: Address;
  href: string;
}) => {
  const { data: voteData } = usePollUserDelegates();
  const { data: votesThresholdData } =
    usePollProposalThreshold(governorAddress);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (!voteData) {
      return;
    }
    if (
      Number(voteData.currentVotes) < Number(votesThresholdData?.votesThreshold)
    ) {
      e.preventDefault();
      // Open dialog to show required tokens and amount owned
      setIsDialogOpen(true);
    } else {
      // Proceed with voting or creating proposal
      // Your logic here
    }
  };

  return (
    <>
      <ActionButton className="w-fit">
        <Button onClick={handleButtonClick} as={Link} href={href}>
          Create Proposal
        </Button>
      </ActionButton>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogTitle>Not Enough Voting Power</DialogTitle>
          <DialogDescription className="text-muted-foreground font-medium">
            <p className=" max-w-96">
              It looks like you don’t meet the minimum threshold required to
              create on-chain proposals
            </p>
            {!!votesThresholdData?.votesThreshold && (
              <div className="mt-6">
                <h3>Required delegation</h3>
                <p className="flex items-center mt-1 gap-1">
                  <FormattedNumber
                    className="text-primary font-medium"
                    value={votesThresholdData?.votesThreshold}
                    symbol="BGT"
                    compact={false}
                  />
                  <TokenIcon size="md" address={governanceTokenAddress} />
                </p>
              </div>
            )}
            {voteData?.currentVotes && (
              <div className="mt-6 mb-6">
                <h3>Delegated to you</h3>
                <p className="flex items-center mt-1 gap-1">
                  <FormattedNumber
                    className="text-primary font-medium"
                    value={Number(voteData.currentVotes)}
                    symbol="BGT"
                  />
                  <TokenIcon size="md" address={governanceTokenAddress} />
                </p>
              </div>
            )}
          </DialogDescription>
          <DialogFooter>
            <Button className="w-full" onClick={() => setIsDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
