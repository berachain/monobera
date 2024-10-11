import { Badge } from "@bera/ui/badge";
import { formatTimeLeft, getBadgeColor, getTimeLeft } from "../helper";
import { useBlockToTimestamp } from "@bera/berajs";
import { cn } from "@bera/ui";
import {
  ProposalSelectionFragment,
  ProposalStatus,
} from "@bera/graphql/governance";

const statusMap: Record<ProposalStatus, string> = {
  [ProposalStatus.Active]: "Active",
  [ProposalStatus.CanceledByGuardian]: "Canceled by guardian",
  [ProposalStatus.CanceledByUser]: "Canceled by user",
  [ProposalStatus.Defeated]: "Defeated",
  [ProposalStatus.Executed]: "Executed",
  [ProposalStatus.Expired]: "Expired",
  [ProposalStatus.InQueue]: "In queue",
  [ProposalStatus.Pending]: "Pending",
  [ProposalStatus.PendingExecution]: "Pending execution",
  [ProposalStatus.PendingQueue]: "Pending queue",
  [ProposalStatus.QuorumNotReached]: "Quorum not reached",
  [ProposalStatus.Succeeded]: "Succeeded",
};

export const StatusBadge = ({
  proposal,
  className,
}: { proposal: ProposalSelectionFragment; className?: string }) => {
  const start = useBlockToTimestamp(proposal.voteStartBlock);
  const end = useBlockToTimestamp(proposal.voteEndBlock);

  return (
    <div
      className={cn(
        "text-xs col-span-full font-medium leading-6 text-muted-foreground",
        className,
      )}
    >
      <Badge
        variant={getBadgeColor(proposal.status)}
        className="mr-3 select-none rounded-xs px-2 py-1 text-sm leading-none font-semibold capitalize"
      >
        {statusMap[proposal.status]}
      </Badge>
      {proposal.status === ProposalStatus.Pending && start && (
        // TODO: get end time from proposal
        <span className="whitespace-nowrap">
          {formatTimeLeft(getTimeLeft(new Date(start * 1000)))} left
        </span>
      )}
      {proposal.status === ProposalStatus.Active && end && (
        // TODO: get end time from proposal
        <span className="whitespace-nowrap">
          {formatTimeLeft(getTimeLeft(new Date(end * 1000)))} left
        </span>
      )}
    </div>
  );
};
