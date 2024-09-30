import {
  governanceTimelockAbi,
  useProposalState,
  useProposalTimelockState,
  type Proposal,
  type Vote,
} from "@bera/berajs";
import { StatusEnum } from "../../../types";
import { VoteDialog } from "../../components/vote-dialog";
import { CancelButton } from "./components/cancel-button";
import { QueueButton } from "./components/queue-button";
import { useGovernance } from "../../components/governance-provider";
import { wagmiConfig, useTransactionReceipt } from "@bera/wagmi";
import { Address, parseEventLogs } from "viem";
import { governanceTimelockAddress } from "@bera/config";
import { ExecuteButton } from "./components/execute-button";

export const StatusAction = ({
  proposal,
  userVote,
}: {
  proposal: Proposal;
  userVote: Vote | false | undefined;
}) => {
  const status = proposal.status as StatusEnum;

  const { governorAddress } = useGovernance();

  const { data: onChainState } = useProposalState({
    proposalId: proposal.onchainId,
    governorAddress,
  });

  // THIS WILL BE REMOVED WHEN WE HAVE A TIMELOCK ID ON SUBGRAPH

  const queueTxHash = proposal.events?.find((e) => e.type === "queued")
    ?.txHash as Address | undefined;

  const { data: receipt } = useTransactionReceipt({
    hash: queueTxHash,
    // @ts-ignore
    config: wagmiConfig,
  });

  const logs = parseEventLogs({
    abi: governanceTimelockAbi,
    logs: receipt?.logs || [],
  });

  // This will be replaced with the actual timelockId when we have it on subgraph
  // @ts-ignore - I'd might be missing on a type. we dont care, it;ll just be undefined.
  const timelockId = logs.find((l) => l.eventName === "CallScheduled")?.args.id;

  const { data: proposalTimelockState } = useProposalTimelockState({
    proposalTimelockId: timelockId,
    timelockAddress: governanceTimelockAddress,
  });

  if (!proposal || !proposal.onchainId) {
    return null;
  }
  return (
    <div className="flex items-center gap-3 font-medium">
      {status === StatusEnum.IN_QUEUE &&
        (proposalTimelockState === "ready" ? (
          <ExecuteButton proposalId={proposal.onchainId} />
        ) : (
          <CancelButton proposal={proposal} proposalTimelockId={timelockId} />
        ))}
      {(status === StatusEnum.PENDING_EXECUTION ||
        status === StatusEnum.PENDING) && <CancelButton proposal={proposal} />}
      {status === StatusEnum.PENDING_QUEUE && (
        <div className="text-destructive-foreground">Pending Queue</div>
      )}
      {status === StatusEnum.ACTIVE && (
        <VoteDialog proposal={proposal} disable={userVote && !!userVote.type} />
      )}
      {(status === StatusEnum.CANCELED_BY_USER ||
        status === StatusEnum.CANCELED_BY_GUARDIAN) && (
        <div className="text-destructive-foreground">Canceled</div>
      )}
      {status === StatusEnum.DEFEATED && (
        <div className="text-destructive-foreground">Defeated</div>
      )}
      {status === StatusEnum.EXPIRED && (
        <div className="text-destructive-foreground">Expired</div>
      )}
      {status === StatusEnum.EXECUTED && (
        <div className="text-success-foreground">Executed</div>
      )}
      {status === StatusEnum.SUCCEEDED && (
        <QueueButton proposalId={proposal.onchainId} />
      )}
    </div>
  );
};
