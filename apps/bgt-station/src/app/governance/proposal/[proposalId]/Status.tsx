import { type Proposal } from "@bera/berajs";

import { VoteDialog } from "../../components/vote-dialog";
import { StatusEnum } from "../../types";

export const Status = ({ proposal }: { proposal: Proposal }) => {
  const status = proposal.status as StatusEnum;
  return (
    <div className="flex items-center gap-3 font-medium">
      {/* {ModalPortal} */}

      {status === StatusEnum.PENDING && (
        <div>Voting starts at {proposal.start.timestamp}</div>
      )}
      {status === StatusEnum.QUEUED && <div>Voting in queue</div>}
      {status === StatusEnum.ACTIVE && <VoteDialog votingPower={1} />}
      {status === StatusEnum.CANCELED && <div>Canceled</div>}
      {status === StatusEnum.SUCCEEDED && (
        <div className="text-success-foreground">Succeded</div>
      )}
      {status === StatusEnum.DEFEATED && (
        <div className="text-desctructive-foreground">Defeated</div>
      )}
      {status === StatusEnum.EXPIRED && (
        <div className="text-desctructive-foreground">Expired</div>
      )}
      {status === StatusEnum.EXECUTED && (
        <div className="text-success-foreground">Executed</div>
      )}
    </div>
  );
};
