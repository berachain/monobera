import { type Proposal, type Vote } from "@bera/berajs";
import { StatusEnum } from "../../types";
import { VoteDialog } from "../../[genre]/components/vote-dialog";
import { CancelButton } from "./components/cancel-button";
import { QueueButton } from "./components/queue-button";

export const StatusAction = ({
  proposal,
  userVote,
}: {
  proposal: Proposal;
  userVote: Vote | false | undefined;
}) => {
  const status = proposal.status as StatusEnum;

  if (!proposal || !proposal.onchainId) {
    return null;
  }
  return (
    <div className="flex items-center gap-3 font-medium">
      {status === StatusEnum.QUEUED && (
        <CancelButton
          // TODO: this is wrong, must be provided from subgraph data
          // @ts-ignore
          proposalTimelockId={proposal.onchainId}
        />
      )}
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
    </div>
  );
};
