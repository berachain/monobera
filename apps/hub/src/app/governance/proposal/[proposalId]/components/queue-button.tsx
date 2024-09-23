import { GOVERNANCE_ABI, useBeraJs } from "@bera/berajs";
import { governanceTimelockAddress } from "@bera/config";
import { ActionButton, useTxn } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";

export const QueueButton = ({ proposalId }: { proposalId: string }) => {
  const { write, ModalPortal } = useTxn({
    message: "Queuing proposal",
  });

  return (
    <>
      {ModalPortal}
      <ActionButton>
        <Button
          onClick={() =>
            write({
              address: governanceTimelockAddress,
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
