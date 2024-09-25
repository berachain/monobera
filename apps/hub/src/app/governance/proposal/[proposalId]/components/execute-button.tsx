import React from "react";
import { GOVERNANCE_ABI } from "@bera/berajs";
import { ActionButton, useTxn } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { useGovernance } from "~/app/governance/[genre]/components/governance-provider";

export const ExecuteButton = ({ proposalId }: { proposalId: string }) => {
  const { write, ModalPortal } = useTxn({
    message: "Queuing proposal",
  });
  const { governorAddress } = useGovernance();

  return (
    <>
      {ModalPortal}
      <ActionButton>
        <Button
          onClick={() =>
            write({
              address: governorAddress,
              abi: GOVERNANCE_ABI,
              functionName: "execute",
              params: [BigInt(proposalId)],
            })
          }
        >
          Queue
        </Button>
      </ActionButton>
    </>
  );
};
