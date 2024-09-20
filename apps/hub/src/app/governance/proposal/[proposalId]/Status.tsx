import { usePollWalletBalances, type Proposal, type Vote } from "@bera/berajs";
import { bgtTokenAddress } from "@bera/config";
import { StatusEnum } from "../../types";
import { VoteDialog } from "../../[genre]/components/vote-dialog";

export const Status = ({
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
      {status === StatusEnum.QUEUED && <div>Voting in queue</div>}
      {status === StatusEnum.ACTIVE && (
        <VoteDialog proposal={proposal} disable={false} />
      )}
      {status === StatusEnum.CANCELED && <div>Canceled</div>}
      {status === StatusEnum.SUCCEEDED && (
        <div className="text-success-foreground">Succeded</div>
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
