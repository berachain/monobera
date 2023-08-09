import React from "react";
import { Badge } from "@bera/ui/badge";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";

import { StatusEnum, type ProposalVotes } from "./types";
import { formatUnixTimestamp, timeDifferenceFromNow } from "./utils";

interface ISelectToken {
  proposalStatus: StatusEnum;
  proposalVotes: ProposalVotes;
  proposalTitle: string;
  timestamp: number;
  expedited?: boolean;
}

const getBadge = (proposalStatus: StatusEnum) => {
  switch (proposalStatus) {
    case StatusEnum.ACTIVE:
      return (
        <Badge variant="info" className="px-2 py-1 capitalize">
          {StatusEnum.ACTIVE}
        </Badge>
      );
    case StatusEnum.IN_QUEUE:
      return (
        <Badge variant="info" className="px-2 py-1">
          In queue
        </Badge>
      );
    case StatusEnum.PASSED:
      return (
        <Badge variant="success" className="px-2 py-1 capitalize">
          {StatusEnum.PASSED}
        </Badge>
      );
    case StatusEnum.REJECTED:
      return (
        <Badge variant="destructive" className="px-2 py-1 capitalize">
          {StatusEnum.REJECTED}
        </Badge>
      );
    default:
      return "";
  }
};

const getTimeText = (proposalStatus: StatusEnum, timestamp: number) => {
  switch (proposalStatus) {
    case StatusEnum.ACTIVE:
      return `Voting ends in ${timeDifferenceFromNow(timestamp)}`;
    case StatusEnum.IN_QUEUE:
      return `Depositing ends in ${timeDifferenceFromNow(timestamp)}`;
    case StatusEnum.PASSED:
      return `Submitted ${formatUnixTimestamp(timestamp)}`;
    case StatusEnum.REJECTED:
      return `Submitted ${formatUnixTimestamp(timestamp)}`;
    default:
      return "";
  }
};
export function ProposalCard({
  proposalStatus,
  proposalVotes,
  proposalTitle,
  timestamp,
  expedited,
}: ISelectToken) {
  return (
    //design is rounded-18 and p-8
    <div className="rounded-xl border border-border bg-background p-6">
      <div className="relative p-2">
        {expedited && (
          <div className="absolute right-0 top-0 flex items-center gap-1 text-xs font-medium leading-tight text-muted-foreground">
            <Icons.timer className="relative h-4 w-4" />
            Expedited
          </div>
        )}
        <div className="flex h-7 items-center">
          {getBadge(proposalStatus)}
          <div className="text-xs font-medium leading-tight text-stone-500">
            {getTimeText(proposalStatus, timestamp)}
          </div>
        </div>
        <div className="mt-1 text-sm font-semibold leading-tight text-foreground">
          {proposalTitle}
        </div>
        <div className="mt-4">hji</div>
      </div>
    </div>
  );
}
