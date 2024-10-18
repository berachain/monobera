import { ComponentProps } from "react";
import {
  ProposalSelectionFragment,
  ProposalStatus,
} from "@bera/graphql/governance";
import { Badge } from "@bera/ui/badge";
import BigNumber from "bignumber.js";
import { decodeFunctionData, formatEther } from "viem";

import { NativeDapps, Others } from "./governance-genre-helper";
import { ProposalTypeEnum, VoteColorMap } from "./types";

export { parseProposalBody } from "@bera/berajs";

export const getBadgeColor = (
  proposalStatus: ProposalStatus,
): ComponentProps<typeof Badge>["variant"] => {
  switch (proposalStatus) {
    case ProposalStatus.Pending:
    case ProposalStatus.InQueue:
      return "outline";
    case ProposalStatus.Active:
    case ProposalStatus.Executed:
      return "success";
    case ProposalStatus.Defeated:
    case ProposalStatus.QuorumNotReached:
      return "destructive";
    case ProposalStatus.PendingExecution:
    case ProposalStatus.PendingQueue:
      return "warning";
    case ProposalStatus.CanceledByGuardian:
    case ProposalStatus.CanceledByUser:
      return "destructive";
  }
};

export const getThemeColor = (ProposalType: ProposalTypeEnum) => {
  switch (ProposalType) {
    case ProposalTypeEnum.CUSTOM_PROPOSAL:
      return "foreground";
    case ProposalTypeEnum.UPDATE_REWARDS_GAUGE:
      return "info-foreground";
    default:
      return "foreground";
  }
};

export const getTopicColor = (topic: string) => {
  return [...NativeDapps, ...Others].find((dapp) => dapp.id === topic)?.color;
};

export const getTimeLeft = (date: Date) => {
  const now = Date.now();
  const targetTimestamp = date.getTime();
  const diffInMilliseconds = targetTimestamp - now;
  const diffInSeconds = Math.round(diffInMilliseconds / 1000);
  return diffInSeconds;
};

/**
 * Formats the time left into a string like "8 hours, 23 minutes".
 *
 * @param timeLeftInSeconds - The time left in seconds.
 * @returns A formatted string representing the time left.
 */
export function formatTimeLeft(timeLeftInSeconds: number): string {
  const hours = Math.floor(timeLeftInSeconds / 3600);
  const minutes = Math.floor((timeLeftInSeconds % 3600) / 60);

  const hoursDisplay =
    hours > 0 ? `${hours} hour${hours !== 1 ? "s" : ""}` : "";
  const minutesDisplay = `${minutes} minute${minutes !== 1 ? "s" : ""}`;

  return [hoursDisplay, minutesDisplay].filter(Boolean).join(", ");
}

export const getVotesDataList = (proposal: ProposalSelectionFragment) => {
  const votes = proposal.pollResult;
  const quorum = proposal.pollResult?.total;
  const globalYesPercentage = BigNumber(votes?.for)
    .div(BigNumber(quorum))
    .times(100)
    .toNumber();

  const globalNoPercentage = BigNumber(votes?.against)
    .div(BigNumber(quorum))
    .times(100)
    .toNumber();

  const globalAbstainPercentage = BigNumber(votes?.abstain)
    .div(BigNumber(quorum))
    .times(100)
    .toNumber();

  return [
    {
      color: VoteColorMap.yes,
      width: globalYesPercentage > 100 ? 100 : globalYesPercentage,
      votesCount: votes?.for,
    },
    {
      color: VoteColorMap.no,
      width:
        globalYesPercentage + globalNoPercentage > 100
          ? 100
          : globalYesPercentage + globalNoPercentage,
      votesCount: votes?.against,
    },
    {
      color: VoteColorMap.abstain,
      width:
        globalYesPercentage + globalNoPercentage + globalAbstainPercentage > 100
          ? 100
          : globalYesPercentage + globalNoPercentage + globalAbstainPercentage,
      votesCount: votes?.abstain,
    },
  ];
};

export const decodeProposalCalldata = (
  isLoading: boolean,
  calldata: string,
  abi: any,
) => {
  if (isLoading) {
    return {
      function: null,
      params: null,
    };
  }
  const { functionName, args = [] } = decodeFunctionData({
    abi,
    data: calldata as `0x${string}`,
  });

  return {
    function: functionName,
    params: args,
  };
};
