import React from "react";
import {
  formatUnixTimestamp,
  timeDifferenceFromNow,
} from "@bera/shared-ui/src/utils/times";
import { Badge } from "@bera/ui/badge";
import { Icons } from "@bera/ui/icons";

import { StatusEnum, type ProposalVotes } from "../types";
import { ProgressBarChart } from "./progress-bar-chart";

interface ISelectToken {
  proposalStatus: StatusEnum;
  proposalVotes: ProposalVotes;
  proposalTitle: string;
  timestamp: number;
  expedited?: boolean;
  onClick?: () => void;
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

const getDataList = (proposalVotes: ProposalVotes) => {
  return [
    { color: "#059669", width: proposalVotes.yes },
    { color: "#DC2629", width: proposalVotes.yes + proposalVotes.no },
    {
      color: "#0284C7",
      width: proposalVotes.yes + proposalVotes.no + proposalVotes.veto,
    },
    {
      color: "#78716c",
      width:
        proposalVotes.yes +
        proposalVotes.no +
        proposalVotes.veto +
        proposalVotes.abstain,
    },
  ];
};

export function ProposalCard({
  proposalStatus,
  proposalVotes,
  proposalTitle,
  timestamp,
  expedited,
  onClick,
}: ISelectToken) {
  return (
    <div
      className="hove: relative cursor-pointer rounded-[18px] border border-border bg-background p-8"
      onClick={onClick}
    >
      {expedited && (
        <div className="absolute right-8 top-8 flex items-center gap-1 text-xs font-medium leading-tight text-muted-foreground">
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
      <div className="mt-4">
        <ProgressBarChart
          dataList={getDataList(proposalVotes)}
          labelList={[
            { label: "Pass threshold", width: 30 },
            { label: "Quorum", width: 60 },
          ]}
        />
      </div>
    </div>
  );
}
