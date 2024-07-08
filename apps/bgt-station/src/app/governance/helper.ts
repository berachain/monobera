import { Proposal, truncateHash } from "@bera/berajs";
import Identicon from "@bera/shared-ui/src/identicon";
import {
  formatUnixTimestamp,
  timeDifferenceFromNow,
} from "@bera/shared-ui/src/utils/times";
import { Badge } from "@bera/ui/badge";
import BigNumber from "bignumber.js";
import { getAddress } from "viem";

import { ProgressBarChart } from "./components/progress-bar-chart";
import {
  updateFriendsOfTheChefTypeUrl,
  updateHoneyCollateralTypeUrl,
  updateLendMarkeyTypeUrl,
} from "./create/useCreateProposal";
import { StatusEnum, VoteColorMap } from "./types";

export function getProposalType(proposal: any | undefined) {
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
    case StatusEnum.Pending:
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
  const globalYesPercentage = votes[0].percent;
  const globalNoPercentage = votes[1].percent;
  const globalAbstainPercentage = votes[2].percent;
  return [
    { color: VoteColorMap.yes, width: globalYesPercentage },
    {
      color: VoteColorMap.no,
      width: globalYesPercentage + globalNoPercentage,
    },
    {
      color: VoteColorMap.abstain,
      width: globalYesPercentage + globalNoPercentage + globalAbstainPercentage,
    },
  ];
};

export const getTotalVotes = (proposal: Proposal) =>
  proposal.voteStats.reduce(
    (acc: BigNumber, curr: any) => acc.plus(BigNumber(curr.votesCount)),
    BigNumber(0),
  );

export const getTotalVoters = (proposal: Proposal) =>
  proposal.voteStats.reduce(
    (acc: number, curr: any) => acc + curr.votersCount,
    0,
  );
