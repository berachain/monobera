import {
  ExecutableCallSubsetFragment,
  ProposalSelectionFragment,
  ProposalStatus,
  ProposalWithVotesFragment,
} from "@bera/graphql/governance";
import { Address, parseEventLogs } from "viem";
import { useTransactionReceipt } from "wagmi";

import { GOVERNANCE_ABI } from "~/abi";
import { parseProposalBody } from "./parser";

export const useProposalFromTx = (
  txHash?: Address,
): {
  data: ProposalSelectionFragment | undefined;
  isLoading: boolean;
} => {
  const { data: tx, ...transactionRes } = useTransactionReceipt({
    hash: txHash,
  });

  const creationEvent = tx?.logs
    ? parseEventLogs({
        abi: GOVERNANCE_ABI,
        logs: tx.logs,
        eventName: "ProposalCreated",
      })?.at(0)
    : undefined;

  if (!tx || !creationEvent) {
    return {
      ...transactionRes,
      data: undefined,
    };
  }

  const fm = parseProposalBody({
    description: creationEvent?.args.description as string,
  });

  const proposal = {
    id: String(creationEvent.args.proposalId),
    proposalId: String(creationEvent?.args.proposalId),
    createdAt: undefined,
    title: fm.data.title,
    createdAtBlock: tx.blockNumber.toString(),
    voteStartBlock: String(creationEvent?.args.voteStart),
    voteEndBlock: String(creationEvent?.args.voteEnd),
    proposer: creationEvent?.args.proposer,
    description: fm.content,
    pollResult: {
      for: "0",
      forVotersCount: 0,
      forPercentage: "0",
      against: "0",
      againstVotersCount: 0,
      againstPercentage: "0",
      abstain: "0",
      abstainVotersCount: 0,
      abstainPercentage: "0",
      total: "0",
      totalVotersCount: 0,
      totalTowardsQuorum: "0",
    },
    status: ProposalStatus.Pending,
    quorum: "0",
    topics: fm.data.topics,
    votes: [],
    executableCalls: creationEvent?.args.targets.map(
      (target, index) =>
        ({
          __typename: "ExecutableCall",
          id: `${txHash}-${index}`,
          target: target as Address,
          value: String(creationEvent?.args.values[index]),
          calldata: String(creationEvent?.args.calldatas[index]),
        }) satisfies ExecutableCallSubsetFragment,
    ),
    timelockId: undefined,
  } satisfies ProposalWithVotesFragment;

  return { ...transactionRes, data: proposal };
};
