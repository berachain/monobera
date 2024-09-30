import {
  GOVERNANCE_ABI,
  Proposal,
  useBeraJs,
  useProposalTimelockState,
} from "@bera/berajs";
import { useCancellerRole, useProposalState } from "@bera/berajs";
import { governanceTimelockAbi } from "@bera/berajs";
import { governanceTimelockAddress, governorAddress } from "@bera/config";
import { ActionButton, useTxn } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Address } from "viem";
import { StatusEnum } from "~/app/governance/types";

export const CancelButton = ({
  proposal,
  proposalTimelockId,
}: {
  proposal?: Proposal;
  proposalTimelockId?: Address;
}) => {
  const { data: cancellerRole } = useCancellerRole();

  const {
    data: onChainProposalState,
    isLoading,
    mutate,
  } = useProposalState({
    proposalId: proposal?.onchainId,
    governorAddress,
  });

  const { account } = useBeraJs();

  const { write, ModalPortal } = useTxn({
    message: "Cancelling proposal",
    onSuccess: mutate,
  });

  if (!proposal) {
    return null;
  }

  // This ensures user
  const isCanceledOnChain = !isLoading && onChainProposalState === "canceled";

  const canCancel =
    !isCanceledOnChain &&
    ((proposal.status === StatusEnum.PENDING_EXECUTION &&
      account === cancellerRole) ||
      (proposal.status === StatusEnum.PENDING &&
        account === proposal.creator.address));

  return (
    <>
      {ModalPortal}
      {isCanceledOnChain ? (
        <ActionButton>
          {canCancel ? (
            <Button
              onClick={() =>
                write({
                  address:
                    proposal.status === StatusEnum.PENDING_EXECUTION
                      ? governanceTimelockAddress
                      : governorAddress,
                  abi:
                    proposal.status === StatusEnum.PENDING_EXECUTION
                      ? governanceTimelockAbi
                      : GOVERNANCE_ABI,
                  functionName: "cancel",

                  params: [
                    proposal.status === StatusEnum.PENDING_EXECUTION
                      ? proposalTimelockId!
                      : proposal.status === StatusEnum.PENDING
                        ? BigInt(proposal.onchainId)
                        : // This should never happen
                          0n,
                  ],
                })
              }
            >
              Cancel
            </Button>
          ) : (
            <div>Execution in queue</div>
          )}
        </ActionButton>
      ) : null}
    </>
  );
};
