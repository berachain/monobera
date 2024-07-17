import { Proposal } from "@bera/berajs";
import BigNumber from "bignumber.js";
import { formatEther } from "viem";

import { StatusEnum, VoteColorMap } from "./types";

export function getProposalType(proposal: Proposal) {
  // if (proposal) {
  //   if (proposal.messages.length === 0) {
  //     return "text-proposal";
  //   }
  //   if (proposal.messages[0]?.typeURL === updateFriendsOfTheChefTypeUrl) {
  //     return "new-gauge-proposal";
  //   }
  //   if (proposal.messages[0]?.typeURL === updateHoneyCollateralTypeUrl) {
  //     return "enable-collateral-for-honey";
  //   }
  //   if (proposal.messages[0]?.typeURL === updateLendMarkeyTypeUrl) {
  //     return "new-lend-market";
  //   }
  //   return "text-proposal";
  // }
  return "text-proposal";
}

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
    },
    {
      color: VoteColorMap.no,
      width:
        globalYesPercentage + globalNoPercentage > 100
          ? 100
          : globalYesPercentage + globalNoPercentage,
    },
    {
      color: VoteColorMap.abstain,
      width:
        globalYesPercentage + globalNoPercentage + globalAbstainPercentage > 100
          ? 100
          : globalYesPercentage + globalNoPercentage + globalAbstainPercentage,
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
