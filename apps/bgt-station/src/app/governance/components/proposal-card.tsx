"use client";

import React from "react";
import Image from "next/image";
import {
  beraToEth,
  truncateHash,
  usePollProposal,
  type Proposal,
} from "@bera/berajs";
import {
  formatUnixTimestamp,
  timeDifferenceFromNow,
} from "@bera/shared-ui/src/utils/times";
import { Badge } from "@bera/ui/badge";

import { cloudinaryUrl } from "~/config";
import { StatusEnum, VoteColorMap, mappedStatusEnum } from "../types";
import { ProgressBarChart } from "./progress-bar-chart";

type ProposalCard = {
  proposal: Proposal;
  onClick?: () => void;
};
const getBadge = (proposalStatus: number) => {
  switch (proposalStatus) {
    case mappedStatusEnum[StatusEnum.ACTIVE]:
      return (
        <Badge
          variant="info"
          className="border-none px-2 py-1 text-xs capitalize"
        >
          {StatusEnum.ACTIVE}
        </Badge>
      );
    case mappedStatusEnum[StatusEnum.IN_QUEUE]:
      return (
        <Badge variant="info" className="border-none px-2 py-1 text-xs">
          In queue
        </Badge>
      );
    case mappedStatusEnum[StatusEnum.PASSED]:
      return (
        <Badge
          variant="success"
          className="border-none px-2 py-1 text-xs capitalize"
        >
          {StatusEnum.PASSED}
        </Badge>
      );
    case mappedStatusEnum[StatusEnum.REJECTED]:
      return (
        <Badge
          variant="destructive"
          className="border-none px-2 py-1 text-xs capitalize"
        >
          {StatusEnum.REJECTED}
        </Badge>
      );
    default:
      return "";
  }
};

const getTimeText = (proposal: Proposal) => {
  switch (proposal.status) {
    case mappedStatusEnum[StatusEnum.ACTIVE]:
      return `Voting ends in ${timeDifferenceFromNow(
        Number(proposal.votingEndTime),
      )}`;
    case mappedStatusEnum[StatusEnum.IN_QUEUE]:
      return `Depositing ends in ${timeDifferenceFromNow(
        Number(proposal.depositEndTime),
      )}`;
    case mappedStatusEnum[StatusEnum.PASSED]:
      return `Submitted ${formatUnixTimestamp(Number(proposal.submitTime))}`;
    case mappedStatusEnum[StatusEnum.REJECTED]:
      return `Submitted ${formatUnixTimestamp(Number(proposal.submitTime))}`;
    default:
      return "";
  }
};

const getDataList = (
  proposalStatus: number,
  globalAbstainPercentage: number,
  globalNoPercentage: number,
  globalYesPercentage: number,
  globalVetoPercentage: number,
) => {
  if (proposalStatus === mappedStatusEnum[StatusEnum.IN_QUEUE]) {
    return [
      {
        color: VoteColorMap.abstain,
        width: 100,
      },
    ];
  } else if (proposalStatus === mappedStatusEnum[StatusEnum.PASSED]) {
    return [
      {
        color: VoteColorMap.yes,
        width: 100,
      },
    ];
  } else if (proposalStatus === mappedStatusEnum[StatusEnum.REJECTED]) {
    return [
      {
        color: VoteColorMap.no,
        width: 100,
      },
    ];
  } else {
    return [
      { color: VoteColorMap.yes, width: globalYesPercentage },
      {
        color: VoteColorMap.no,
        width: globalYesPercentage + globalNoPercentage,
      },
      {
        color: VoteColorMap.veto,
        width: globalYesPercentage + globalNoPercentage + globalVetoPercentage,
      },
      {
        color: VoteColorMap.abstain,
        width: 100,
      },
    ];
  }
};

export function ProposalCard({ proposal, onClick }: ProposalCard) {
  const { useNormalizedTallyResult } = usePollProposal(Number(proposal.id));
  const normalizedTally = useNormalizedTallyResult();
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
      <div className="flex h-7 items-center gap-1">
        {getBadge(proposal.status)}
        <div className="text-xs font-medium leading-tight text-stone-500">
          {getTimeText(proposal)}
        </div>
      </div>
      <div
        className={`mt-1 font-semibold leading-tight text-foreground min-[600px]:leading-loose ${
          true ? "text-2xl" : "text-sm"
        }`}
      >
        {proposal.title}
      </div>
      <div className="relative mt-4">
        {proposal.status === mappedStatusEnum[StatusEnum.IN_QUEUE] && (
          <div className="absolute right-0 text-xs font-medium leading-tight text-muted-foreground">
            {}% of deposit filled
          </div>
        )}
        <ProgressBarChart
          dataList={getDataList(
            proposal.status,
            normalizedTally?.globalAbstainPercentage ?? 0,
            normalizedTally?.globalNoPercentage ?? 0,
            normalizedTally?.globalYesPercentage ?? 0,
            normalizedTally?.globalVetoPercentage ?? 0,
          )}
          labelList={
            proposal.status === mappedStatusEnum[StatusEnum.IN_QUEUE]
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
              src={`${cloudinaryUrl}/bears/pgnhgjsm1si8gb2bdm1m`}
              width={24}
              height={24}
            />
            Submitted by {truncateHash(beraToEth(proposal.proposer), 6, 4)}
          </div>
          <div>
            {(normalizedTally?.participationRate ?? 0).toFixed(2)}%
            participation rate
          </div>
        </div>
      )}
    </div>
  );
}
