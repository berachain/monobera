import { GOVERNANCE_ABI, Proposal, useBeraJs } from "@bera/berajs";
import { useCancellerRole, useProposalState } from "@bera/berajs";
import { governanceTimelockAbi } from "@bera/berajs";
import { governanceTimelockAddress, governorAddress } from "@bera/config";
import { ActionButton, useTxn } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { useGovernance } from "~/app/governance/[genre]/components/governance-provider";
import { StatusEnum } from "~/app/governance/types";

export const CancelButton = ({ proposal }: { proposal: Proposal }) => {
  // const { governorAddress } = useGovernance();
  const { data: cancellerRole = "0xDa9487a32DD76e22B31cd5993F0699C0dc94435e" } =
    useCancellerRole();
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
                      ? // TODO: this is wrong, must be provided from subgraph data
                        "0x"
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
      ) : (
        <div>Canceled</div>
      )}
    </>
  );
};
