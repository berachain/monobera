import { GOVERNANCE_ABI, useBeraJs } from "@bera/berajs";
import { governanceTimelockAddress } from "@bera/config";
import { ActionButton, useTxn } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { useGovernance } from "~/app/governance/[genre]/components/governance-provider";

export const QueueButton = ({ proposalId }: { proposalId: string }) => {
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
              functionName: "queue",
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
