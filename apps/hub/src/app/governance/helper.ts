import { BERA_CHEF_ABI, Proposal } from "@bera/berajs";
import BigNumber from "bignumber.js";
import { decodeFunctionData, formatEther } from "viem";

import { ProposalTypeEnum, StatusEnum, VoteColorMap } from "./types";

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

export const getTimeText = (proposal: Proposal) => {
  return `Created at ${proposal.createdAt
    .replaceAll("T", " ")
    .replaceAll("Z", "")}`;
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

export const parseString = (
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
  return {
    type: null,
    title: s,
    content: "",
  };
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
