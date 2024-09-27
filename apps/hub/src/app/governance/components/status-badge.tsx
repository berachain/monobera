import { useState } from "react";
import { type Proposal } from "@bera/graphql";
import { cn } from "@bera/ui";
import { Badge } from "@bera/ui/badge";
import { createPublicClient } from "viem";
import { usePublicClient } from "wagmi";

import { StatusEnum } from "~/app/governance/types";
import {
  formatTimeLeft,
  getBadgeColor,
  getProposalStatus,
  getTimeLeft,
} from "../helper";

export const StatusBadge = ({
  proposal,
  className,
}: {
  proposal: Proposal;
  className?: string;
}) => {
  const [status, setStatus] = useState<StatusEnum>(StatusEnum.PENDING);
  usePublicClient()
    ?.getBlockNumber()
    .then((block) => {
      const status = getProposalStatus(proposal, Number(block));
      setStatus(status);
    });

  return (
    <div
      className={cn(
        "col-span-full text-xs font-medium leading-6 text-muted-foreground",
        className,
      )}
    >
      <Badge
        variant={getBadgeColor(status)}
        className="mr-3 select-none rounded-xs px-2 py-1 text-sm font-semibold capitalize leading-none"
      >
        {status}
      </Badge>
      {status === StatusEnum.PENDING && (
        // TODO: get end time from proposal
        <span className="whitespace-nowrap">
          {formatTimeLeft(getTimeLeft(new Date(proposal.voteStart)))} left
        </span>
      )}
      {status === StatusEnum.ACTIVE && (
        // TODO: get end time from proposal
        <span className="whitespace-nowrap">
          {formatTimeLeft(getTimeLeft(new Date(proposal.voteStart)))} left
        </span>
      )}
    </div>
  );
};
