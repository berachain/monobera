"use client";

import React from "react";
import Image from "next/image";
import {
  beraToEth,
  truncateHash,
  type Proposal,
  type TallyResult,
} from "@bera/berajs";
import {
  formatUnixTimestamp,
  timeDifferenceFromNow,
} from "@bera/shared-ui/src/utils/times";
import { Badge } from "@bera/ui/badge";

import { StatusEnum, VoteColorMap, mappedStatusEnum } from "../types";
import { ProgressBarChart } from "./progress-bar-chart";

type ProposalCard = Proposal & {
  onClick?: () => void;
};
const getBadge = (proposalStatus: number) => {
  switch (proposalStatus) {
    case mappedStatusEnum[StatusEnum.ACTIVE]:
      return (
        <Badge variant="info" className="px-2 py-1 capitalize">
          {StatusEnum.ACTIVE}
        </Badge>
      );
    case mappedStatusEnum[StatusEnum.IN_QUEUE]:
      return (
        <Badge variant="info" className="px-2 py-1">
          In queue
        </Badge>
      );
    case mappedStatusEnum[StatusEnum.PASSED]:
      return (
        <Badge variant="success" className="px-2 py-1 capitalize">
          {StatusEnum.PASSED}
        </Badge>
      );
    case mappedStatusEnum[StatusEnum.REJECTED]:
      return (
        <Badge variant="destructive" className="px-2 py-1 capitalize">
          {StatusEnum.REJECTED}
        </Badge>
      );
    default:
      return "";
  }
};

const getTimeText = (proposalStatus: number, timestamp: number) => {
  switch (proposalStatus) {
    case mappedStatusEnum[StatusEnum.ACTIVE]:
      return `Voting ends in ${timeDifferenceFromNow(timestamp)}`;
    case mappedStatusEnum[StatusEnum.IN_QUEUE]:
      return `Depositing ends in ${timeDifferenceFromNow(timestamp)}`;
    case mappedStatusEnum[StatusEnum.PASSED]:
      return `Submitted ${formatUnixTimestamp(timestamp)}`;
    case mappedStatusEnum[StatusEnum.REJECTED]:
      return `Submitted ${formatUnixTimestamp(timestamp)}`;
    default:
      return "";
  }
};

const getDataList = (proposalStatus: number, proposalVotes: TallyResult) => {
  if (proposalStatus === mappedStatusEnum[StatusEnum.IN_QUEUE]) {
    return [
      {
        color: VoteColorMap.abstain,
        width:
          Number(proposalVotes.yesCount) +
          Number(proposalVotes.noCount) +
          Number(proposalVotes.noWithVetoCount) +
          Number(proposalVotes.abstainCount),
      },
    ];
  } else if (proposalStatus === mappedStatusEnum[StatusEnum.PASSED]) {
    return [
      {
        color: VoteColorMap.yes,
        width:
          Number(proposalVotes.yesCount) +
          Number(proposalVotes.noCount) +
          Number(proposalVotes.noWithVetoCount) +
          Number(proposalVotes.abstainCount),
      },
    ];
  } else {
    return [
      { color: VoteColorMap.yes, width: Number(proposalVotes.yesCount) },
      {
        color: VoteColorMap.no,
        width: Number(proposalVotes.yesCount) + Number(proposalVotes.noCount),
      },
      {
        color: VoteColorMap.veto,
        width:
          Number(proposalVotes.yesCount) +
          Number(proposalVotes.noCount) +
          Number(proposalVotes.noWithVetoCount),
      },
      {
        color: VoteColorMap.abstain,
        width:
          Number(proposalVotes.yesCount) +
          Number(proposalVotes.noCount) +
          Number(proposalVotes.noWithVetoCount) +
          Number(proposalVotes.abstainCount),
      },
    ];
  }
};

export function ProposalCard({
  status,
  finalTallyResult,
  title,
  submitTime,
  proposer,
  onClick,
}: ProposalCard) {
  return (
    <div
      className="hove:cursor-pointer relative rounded-[18px] border border-border bg-background p-8"
      onClick={onClick}
    >
      {/* {expedited && (
        <div className="absolute right-8 top-8 flex items-center gap-1 text-xs font-medium leading-tight text-muted-foreground">
          <Icons.timer className="relative h-4 w-4" />
          <span className="hidden sm:inline ">Expedited</span>
        </div>
      )} */}
      <div className="flex h-7 items-center">
        {getBadge(status)}
        <div className="text-xs font-medium leading-tight text-stone-500">
          {getTimeText(status, Number(submitTime))}
        </div>
      </div>
      <div
        className={`mt-1 font-semibold leading-tight text-foreground min-[600px]:leading-loose ${
          true ? "text-2xl" : "text-sm"
        }`}
      >
        {title}
      </div>
      <div className="relative mt-4">
        {status === mappedStatusEnum[StatusEnum.IN_QUEUE] && (
          <div className="absolute right-0 text-xs font-medium leading-tight text-muted-foreground">
            {Number(finalTallyResult.abstainCount) +
              Number(finalTallyResult.noCount) +
              Number(finalTallyResult.noWithVetoCount) +
              Number(finalTallyResult.yesCount)}
            % of deposit filled
          </div>
        )}
        <ProgressBarChart
          dataList={getDataList(status, finalTallyResult)}
          labelList={
            status === mappedStatusEnum[StatusEnum.IN_QUEUE]
              ? []
              : [
                  { label: "Pass threshold", width: 30 },
                  { label: "Quorum", width: 60 },
                ]
          }
        />
      </div>
      {true && (
        <div className="mt-[18px] flex flex-col-reverse gap-2 text-xs font-medium leading-tight text-muted-foreground sm:h-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            {" "}
            <Image
              alt="proposal owner avatar"
              className="rounded-full"
              src="/bears/proposal-bear.png"
              width={24}
              height={24}
            />
            Submitted by {truncateHash(beraToEth(proposer), 6, 4)}
          </div>
          <div>
            {Number(finalTallyResult.abstainCount) +
              Number(finalTallyResult.noCount) +
              Number(finalTallyResult.noWithVetoCount) +
              Number(finalTallyResult.yesCount)}
            % participation rate
          </div>
        </div>
      )}
    </div>
  );
}
