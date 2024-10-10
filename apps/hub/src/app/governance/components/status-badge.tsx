import { Badge } from "@bera/ui/badge";
import { formatTimeLeft, getBadgeColor, getTimeLeft } from "../helper";
import { useBlockToTimestamp } from "@bera/berajs";
import { cn } from "@bera/ui";
import {
  ProposalSelectionFragment,
  ProposalStatus,
} from "@bera/graphql/governance";

export const StatusBadge = ({
  proposal,
  className,
}: { proposal: ProposalSelectionFragment; className?: string }) => {
  const start = useBlockToTimestamp(proposal.voteStartBlock);
  const end = useBlockToTimestamp(proposal.voteEndBlock);
  let statusLabel: string = proposal.status;
  if (proposal.status === ProposalStatus.InQueue) {
    statusLabel = "In queue";
  }

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
        {statusLabel}
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
