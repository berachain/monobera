import React, { useState } from "react";
import { usePollUserDelegates, usePollProposalThreshold } from "@bera/berajs";
import { Button } from "@bera/ui/button";
import { FormattedNumber } from "@bera/shared-ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@bera/ui/dialog";
import { ActionButton } from "@bera/shared-ui";
import { Address, formatUnits } from "viem";
import Link from "next/link";

export const CreateIfHasVotingPower = ({
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
      <ActionButton className="w-auto">
        <Button onClick={handleButtonClick} as={Link} href={href}>
          Create Proposal
        </Button>
      </ActionButton>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogTitle>Not Enough Voting Power</DialogTitle>
          <DialogDescription>
            <p className="pb-6">
              It looks like you don’t meet the minimum threshold required to
              create on-chain proposals
            </p>
            {!!votesThresholdData?.votesThreshold && (
              <div>
                <h3>Required delegation</h3>
                <FormattedNumber
                  value={votesThresholdData?.votesThreshold}
                  symbol="BGT"
                  compact={false}
                />
              </div>
            )}
            {voteData?.currentVotes && (
              <div>
                <h3>Delegated to you</h3>
                <FormattedNumber
                  value={Number(voteData.currentVotes)}
                  symbol="BGT"
                />
              </div>
            )}
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};
