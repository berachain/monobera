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
  const date = new Date(proposal.start.timestamp);
  const time = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  return (
    <div className="flex items-center gap-3 font-medium">
      {status === StatusEnum.PENDING && <div>Voting starts at {time}</div>}
      {status === StatusEnum.QUEUED && (
        <CancelButton
          // TODO: this is wrong, must be provided from subgraph data
          // @ts-ignore
          proposalTimelockId={proposal.onchainId}
        />
      )}
      {status === StatusEnum.ACTIVE && (
        <VoteDialog proposal={proposal} disable={false} />
      )}
      {status === StatusEnum.CANCELED && <div>Canceled</div>}
      {status === StatusEnum.SUCCEEDED && (
        <QueueButton proposalId={proposal.onchainId} />
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
      {userVote && <div>{userVote.type}</div>}
    </div>
  );
};
