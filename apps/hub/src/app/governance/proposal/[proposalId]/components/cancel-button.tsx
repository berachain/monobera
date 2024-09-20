import { useBeraJs } from "@bera/berajs";
import { useCancellerRole } from "@bera/berajs";
import { governanceTimelockAbi } from "@bera/berajs";
import { governanceTimelockAddress } from "@bera/config";
import { ActionButton, useTxn } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Address } from "viem";

export const CancelButton = ({
  proposalTimelockId,
}: { proposalTimelockId: Address }) => {
  const { data: cancellerRole = "0xDa9487a32DD76e22B31cd5993F0699C0dc94435e" } =
    useCancellerRole();
  const { account } = useBeraJs();
  const { write, ModalPortal } = useTxn({
    message: "Cancelling proposal",
  });

  return (
    <>
      {ModalPortal}
      <ActionButton>
        {account === cancellerRole ? (
          <Button
            onClick={() =>
              write({
                address: governanceTimelockAddress,
                abi: governanceTimelockAbi,
                functionName: "cancel",
                params: [proposalTimelockId],
              })
            }
          >
            Cancel
          </Button>
        ) : (
          <div>Execution in queue</div>
        )}
      </ActionButton>
    </>
  );
};
