import {
  ProposalSelectionFragment,
  ProposalStatus,
} from "@bera/graphql/governance";

export function computeActualStatus(
  proposal: ProposalSelectionFragment,
  currentBlock: bigint,
): ProposalStatus {
  if (proposal.status === ProposalStatus.InQueue) {
    if (proposal.queueEnd < currentBlock) {
      return ProposalStatus.PendingExecution;
    }
  }
  if (proposal.status === ProposalStatus.Pending) {
    if (
      BigInt(proposal.voteStartBlock) < currentBlock &&
      BigInt(proposal.voteEndBlock) > currentBlock
    ) {
      return ProposalStatus.Active;
    }

    if (proposal.voteEndBlock < currentBlock) {
      if (!proposal.pollResult) {
        // Poll result is created after first vote.
        return ProposalStatus.QuorumNotReached;
      }

      if (
        BigInt(proposal.quorum) > BigInt(proposal.pollResult.totalTowardsQuorum)
      ) {
        return ProposalStatus.QuorumNotReached;
      }

      if (proposal.pollResult?.against > proposal.pollResult?.for) {
        return ProposalStatus.Defeated;
      }

      return ProposalStatus.PendingQueue;
    }
    return ProposalStatus.Pending;
  }

  if (proposal.status === ProposalStatus.InQueue) {
    if (proposal.queueEnd < Date.now() / 1000) {
      return ProposalStatus.PendingExecution;
    }
  }

  return proposal.status;
}
