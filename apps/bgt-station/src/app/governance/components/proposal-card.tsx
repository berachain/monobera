import React from "react";
import Image from "next/image";
import { truncateHash } from "@bera/berajs";
import {
  formatUnixTimestamp,
  timeDifferenceFromNow,
} from "@bera/shared-ui/src/utils/times";
import { Badge } from "@bera/ui/badge";
import { Icons } from "@bera/ui/icons";

import { StatusEnum, VoteColorMap, type ProposalVotes } from "../types";
import { ProgressBarChart } from "./progress-bar-chart";

interface ISelectToken {
  proposalStatus: StatusEnum;
  proposalVotes: ProposalVotes;
  proposalTitle: string;
  timestamp: number;
  expedited?: boolean;
  owner?: `0x${string}`;
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
    { color: VoteColorMap.yes, width: proposalVotes.yes },
    { color: VoteColorMap.no, width: proposalVotes.yes + proposalVotes.no },
    {
      color: VoteColorMap.veto,
      width: proposalVotes.yes + proposalVotes.no + proposalVotes.veto,
    },
    {
      color: VoteColorMap.abstain,
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
  owner,
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
          <span className="hidden sm:inline ">Expedited</span>
        </div>
      )}
      <div className="flex h-7 items-center">
        {getBadge(proposalStatus)}
        <div className="text-xs font-medium leading-tight text-stone-500">
          {getTimeText(proposalStatus, timestamp)}
        </div>
      </div>
      <div
        className={`mt-1 font-semibold leading-tight text-foreground min-[600px]:leading-loose ${
          owner ? "text-2xl" : "text-sm"
        }`}
      >
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
      {owner && (
        <div className="mt-[18px] flex h-6 items-center justify-between text-xs font-medium leading-tight text-muted-foreground">
          <div className="flex items-center gap-2">
            {" "}
            <Image
              alt="proposal owner avatar"
              className="rounded-full"
              src="/bears/proposal-bear.png"
              width={24}
              height={24}
            />
            Submitted by {truncateHash(owner)}
          </div>
          <div>
            {proposalVotes.abstain +
              proposalVotes.no +
              proposalVotes.veto +
              proposalVotes.yes}
            % participation rate
          </div>
        </div>
      )}
    </div>
  );
}
