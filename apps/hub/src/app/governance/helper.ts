import { Proposal } from "@bera/berajs";
import BigNumber from "bignumber.js";
import { decodeFunctionData, formatEther } from "viem";
import { ProposalTypeEnum, StatusEnum, VoteColorMap } from "./types";
import graymatter from "gray-matter";
import { NativeDapps, Others } from "./governance-genre-helper";

export const getBadgeColor = (proposalStatus: StatusEnum) => {
  switch (proposalStatus) {
    case StatusEnum.PENDING:
      return "default";
    case StatusEnum.ACTIVE:
    case StatusEnum.QUEUED:
      return "info";
    case StatusEnum.EXECUTED:
    case StatusEnum.SUCCEEDED:
      return "success";
    case StatusEnum.DEFEATED:
      return "destructive";
    case StatusEnum.EXPIRED:
      return "warning";
    case StatusEnum.CANCELED:
      return "secondary";
    default:
      return "secondary";
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
export const getTimeText = (proposal: Proposal) => {
  const now = Date.now();
  const targetTimestamp = new Date(proposal.createdAt).getTime();
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
  const votes = proposal.voteStats;
  const quorum = proposal.governor.quorum;
  const globalYesPercentage = BigNumber(votes[0].votesCount)
    .div(BigNumber(quorum))
    .times(100)
    .toNumber();

  const globalNoPercentage = BigNumber(votes[1].votesCount)
    .div(BigNumber(quorum))
    .times(100)
    .toNumber();

  const globalAbstainPercentage = BigNumber(votes[2].votesCount)
    .div(BigNumber(quorum))
    .times(100)
    .toNumber();
  return [
    {
      color: VoteColorMap.yes,
      width: globalYesPercentage > 100 ? 100 : globalYesPercentage,
      votesCount: votes[0].votesCount,
    },
    {
      color: VoteColorMap.no,
      width:
        globalYesPercentage + globalNoPercentage > 100
          ? 100
          : globalYesPercentage + globalNoPercentage,
      votesCount: votes[1].votesCount,
    },
    {
      color: VoteColorMap.abstain,
      width:
        globalYesPercentage + globalNoPercentage + globalAbstainPercentage > 100
          ? 100
          : globalYesPercentage + globalNoPercentage + globalAbstainPercentage,
      votesCount: votes[2].votesCount,
    },
  ];
};

export const getTotalVotes = (proposal: Proposal) =>
  formatEther(
    proposal.voteStats.reduce(
      (acc: bigint, curr: any) => acc + BigInt(curr.votesCount),
      0n,
    ),
  );

export const getTotalVoters = (proposal: Proposal) =>
  proposal.voteStats.reduce(
    (acc: number, curr: any) => acc + curr.votersCount,
    0,
  );

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

  const body = proposal?.metadata?.description ?? "";

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
      data: { title: `Suspicious proposal #${proposal.id}` },
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
