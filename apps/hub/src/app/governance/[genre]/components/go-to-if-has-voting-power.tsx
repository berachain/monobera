import React, { useState } from "react";
import { Button } from "@bera/ui/button";

import { ActionButton } from "@bera/shared-ui";
import { Address } from "viem";
import Link from "next/link";
import { governanceTokenAddress } from "@bera/config";
import { useGovernance } from "./governance-provider";

export const GoToIfHasVotingPower = ({
  governorAddress,
  href,
}: {
  governorAddress: Address;
  href: string;
}) => {
  const { canPropose, openNotEnoughVotingPowerDialog } = useGovernance();

  const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (!canPropose) {
      e.preventDefault();
      // Open dialog to show required tokens and amount owned
      openNotEnoughVotingPowerDialog();
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
    </>
  );
};
