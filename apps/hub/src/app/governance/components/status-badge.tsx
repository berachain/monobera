import { Badge } from "@bera/ui/badge";
import { StatusEnum } from "~/app/governance/types";
import { formatTimeLeft, getBadgeColor, getTimeLeft } from "../helper";
import { Proposal } from "@bera/berajs";
import { cn } from "@bera/ui";

export const StatusBadge = ({
  proposal,
  className,
}: { proposal: Proposal; className?: string }) => {
  return (
    <div
      className={cn(
        "text-xs col-span-full font-medium leading-6 text-muted-foreground",
        className,
      )}
    >
      <Badge
        variant={getBadgeColor(proposal.status as StatusEnum)}
        className="mr-3 rounded-xs px-2 py-1 text-sm leading-none font-semibold capitalize"
      >
        {proposal.status}
      </Badge>
      {proposal.status === StatusEnum.PENDING && (
        // TODO: get end time from proposal
        <span className="whitespace-nowrap">
          {formatTimeLeft(getTimeLeft(new Date(proposal.start.timestamp)))} left
        </span>
      )}
      {proposal.status === StatusEnum.ACTIVE && (
        // TODO: get end time from proposal
        <span className="whitespace-nowrap">
          {formatTimeLeft(getTimeLeft(new Date(proposal.end.timestamp)))} until
          voting ends
        </span>
      )}
    </div>
  );
};
