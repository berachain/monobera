import { ComponentProps } from "react";
import { type Proposal } from "@bera/graphql";
import { Badge } from "@bera/ui/badge";
import BigNumber from "bignumber.js";
import graymatter from "gray-matter";
import { decodeFunctionData, formatEther } from "viem";
import { bigint } from "zod";

import { NativeDapps, Others } from "./governance-genre-helper";
import { ProposalTypeEnum, StatusEnum, VoteColorMap } from "./types";

export const getBadgeColor = (
  proposalStatus: StatusEnum,
): ComponentProps<typeof Badge>["variant"] => {
  switch (proposalStatus) {
    case StatusEnum.PENDING:
      return "outline";
    case StatusEnum.ACTIVE:
    case StatusEnum.EXECUTED:
      return "success";
    case StatusEnum.DEFEATED:
      return "destructive";
    case StatusEnum.EXPIRED:
      return "warning";
    case StatusEnum.CANCELED_BY_GUARDIAN:
    case StatusEnum.CANCELED_BY_USER:
      return "outline";
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
export const getTimeText = (date: Date) => {
  const now = Date.now();
  const targetTimestamp = date.getTime();
  const diffInMilliseconds = targetTimestamp - now;
  const diffInSeconds = Math.round(diffInMilliseconds / 1000);

  const absDiffInSeconds = Math.abs(diffInSeconds);
  const oneWeekInSeconds = 7 * 24 * 60 * 60; // 7 days

  const isFuture = diffInMilliseconds > 0;

  if (absDiffInSeconds > oneWeekInSeconds) {
    // Format the date as "Month Day, Year"
    const date = new Date(targetTimestamp);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  }

  const rtf = new Intl.RelativeTimeFormat("en-US", {
    numeric: "auto",
    style: "long",
  });

  const thresholds = [
    { limit: -60, divisor: 1, unit: "second" },
    { limit: -3600, divisor: 60, unit: "minute" },
    { limit: -86400, divisor: 3600, unit: "hour" },
    { limit: -2592000, divisor: 86400, unit: "day" },
    { limit: -31536000, divisor: 2592000, unit: "month" },
    { limit: Infinity, divisor: 31536000, unit: "year" },
  ];

  for (const threshold of thresholds) {
    if (
      isFuture
        ? diffInSeconds < threshold.limit
        : diffInSeconds > threshold.limit
    ) {
      const value = Math.round(diffInSeconds / threshold.divisor);
      const formatted = rtf.format(
        value,
        threshold.unit as Intl.RelativeTimeFormatUnit,
      );
      return isFuture ? `${formatted} left` : `${formatted}`;
    }
  }

  return "";
};

export const getVotesDataList = (proposal: Proposal) => {
  const quorum = proposal.quorum;
  const globalYesPercentage = Number(
    (BigInt(proposal.proposalVotes?.for ?? "0") * 100n) / BigInt(quorum),
  );
  const globalNoPercentage = Number(
    (BigInt(proposal.proposalVotes?.against ?? "0") * 100n) / BigInt(quorum),
  );
  const globalAbstainPercentage = Number(
    (BigInt(proposal.proposalVotes?.abstain ?? "0") * 100n) / BigInt(quorum),
  );
  return [
    {
      color: VoteColorMap.yes,
      width: globalYesPercentage > 100 ? 100 : globalYesPercentage,
      votesCount: proposal.proposalVotes?.for ?? "0",
    },
    {
      color: VoteColorMap.no,
      width:
        globalYesPercentage + globalNoPercentage > 100
          ? 100
          : globalYesPercentage + globalNoPercentage,
      votesCount: proposal.proposalVotes?.against ?? "0",
    },
    {
      color: VoteColorMap.abstain,
      width:
        globalYesPercentage + globalNoPercentage + globalAbstainPercentage > 100
          ? 100
          : globalYesPercentage + globalNoPercentage + globalAbstainPercentage,
      votesCount: proposal.proposalVotes?.abstain ?? "0",
    },
  ];
};

export const getTotalVotes = (proposal: Proposal): bigint =>
  BigInt(proposal.proposalVotes?.for ?? "0") +
  BigInt(proposal.proposalVotes?.abstain ?? "0");

export const getTotalVoters = (proposal: Proposal) => "0";
// proposal.voteStats.reduce(
//   (acc: number, curr: any) => acc + curr.votersCount,
//   0,
// );

const parseLegacyBody = (
  s: string,
): { type: string | null; title: string; content: string } => {
  const pattern = /#(?:([\w-]+)# )?(.+)\n([\s\S]*)/;
  const match = s.match(pattern);

  if (match) {
    const type = match[1] || null;
    const title = match[2];
    const content = match[3].replace("\n", "<br />");
    return {
      type,
      title,
      content,
    };
  }

  throw new Error("Invalid proposal body");
};

export const parseProposalBody = (
  proposal?: Proposal,
): graymatter.GrayMatterFile<string> & {
  isFrontMatter: boolean;
} => {
  if (!proposal) {
    return {
      isFrontMatter: false,
      data: { title: "Loading..." },
      content: "",
      matter: "",
      language: "",
      orig: "",
      stringify: () => "",
    };
  }

  const body = proposal?.description ?? "";

  if (graymatter.test(body)) {
    return { ...graymatter(body), isFrontMatter: true };
  }

  try {
    const legacyBody = parseLegacyBody(body);

    return {
      isFrontMatter: false,
      data: { title: legacyBody.title },
      content: legacyBody.content,
      matter: "",
      language: "",
      orig: body,
      stringify: () => body,
    };
  } catch (error) {
    return {
      isFrontMatter: false,
      data: { title: `Suspicious proposal #${proposal.proposalId}` },
      content: body,
      matter: "",
      language: "",
      orig: body,
      stringify: () => body,
    };
  }
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

export const getProposalStatus = (proposal: Proposal, currentBlock: number) => {
  if (proposal.status === "created") {
    if (currentBlock < proposal.voteStart) return StatusEnum.PENDING;
    if (currentBlock >= proposal.voteStart && currentBlock < proposal.voteEnd)
      return StatusEnum.ACTIVE;
    if (currentBlock >= proposal.voteEnd) {
      const succeeded =
        Number(proposal.proposalVotes?.for ?? "0") +
          Number(proposal.proposalVotes?.abstain ?? "0") >=
          Number(proposal.quorum) &&
        Number(proposal.proposalVotes?.for ?? "0") >=
          Number(proposal.proposalVotes?.against ?? "0");
      if (succeeded) return StatusEnum.PENDING_QUEUE;
      return StatusEnum.DEFEATED;
    }
  }
  if (proposal.status === "queued") {
    const timestamp = new Date().getTime() / 1000;
    if (timestamp < proposal.queueEnd) return StatusEnum.IN_QUEUE;
    return StatusEnum.PENDING_EXECUTION;
  }
  if (proposal.status === "executed") return StatusEnum.EXECUTED;
  if (proposal.status === "canceled") return StatusEnum.CANCELED_BY_USER;

  return StatusEnum.EXPIRED;
};
