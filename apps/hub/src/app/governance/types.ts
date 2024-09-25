import { Address } from "viem";

import { PROPOSAL_GENRE } from "./governance-genre-helper";

export enum StatusEnum {
  PENDING = "pending",
  ACTIVE = "active",
  CANCELED_BY_GUARDIAN = "canceled-by-guardian",
  CANCELED_BY_USER = "canceled",
  SUCCEEDED = "succeeded",
  DEFEATED = "defeated",
  PENDING_QUEUE = "pending-queue",
  IN_QUEUE = "in-queue",
  PENDING_EXECUTION = "pending-execution",
  EXECUTED = "executed",
  EXPIRED = "expired",
}

export enum OrderByEnum {
  MOST_RECENT = "most-recent",
  OLDEST = "oldest",
  NEWEST = "newest",
  HIGHEST_PARTICIPATION = "highest-participation",
  LOWEST_PARTICIPATION = "lowest-participation",
}

export type ProposalVotes = {
  yes: number;
  no: number;
  abstain: number;
};

export const VoteColorMap = {
  yes: "#059669",
  1: "#059669",
  no: "#DC2629",
  2: "#DC2629",
  veto: "#0284C7",
  4: "#0284C7",
  abstain: "#78716c",
  3: "#78716c",
  yes_secondary: "#ECFDF5",
  no_secondary: "#FEF2F2",
  veto_secondary: "#F0F9FF",
  abstain_secondary: "#E7E5E4",
  default: "#57534e",
};

export enum VoteEnum {
  for = "yes",
  against = "no",
  abstain = "abstain",
}

export const voteTypes: VOTE_TYPE[] = ["yes", "no", "abstain"];

export type VOTE_TYPE = "yes" | "no" | "abstain";

export type ALL = "all";

export type CustomProposalActionErrors = {
  type?: null | ProposalErrorCodes;
  target?: null | ProposalErrorCodes;
  ABI?: null | ProposalErrorCodes;
  functionSignature?: null | ProposalErrorCodes;
  calldata?: (null | ProposalErrorCodes)[];
  vault?: null | ProposalErrorCodes;
  isFriend?: null | ProposalErrorCodes;
  to?: null | ProposalErrorCodes;
  amount?: null | ProposalErrorCodes;
};

export type CustomProposalErrors = {
  title?: null | ProposalErrorCodes;
  description?: null | ProposalErrorCodes;
  forumLink?: null | ProposalErrorCodes;
  actions?: CustomProposalActionErrors[];
};

export enum ProposalTypeEnum {
  CUSTOM_PROPOSAL = "custom-proposal",
  UPDATE_REWARDS_GAUGE = "update-rewards-gauge",
  ERC20_TRANSFER = "erc20-transfer",
}
export enum ProposalErrorCodes {
  REQUIRED = "Required",
  INVALID_AMOUNT = "Invalid amount",
  NEGATIVE_AMOUNT = "Negative amount",
  INVALID_ADDRESS = "Invalid address",
  INVALID_ACTION = "Invalid action",
  INVALID_ABI = "Invalid ABI",
  MUST_BE_HTTPS = "Must be https",
}

export type CustomProposal = {
  title: string;
  description: any;
  actions: ProposalAction[];
  forumLink: string;
  topic: Set<PROPOSAL_GENRE>;
};

export type SafeProposalAction = {
  target: "" | Address;
} & (
  | {
      type: ProposalTypeEnum.CUSTOM_PROPOSAL;
      ABI: string;
      functionSignature: string;
      calldata: string[];
    }
  | {
      type: ProposalTypeEnum.UPDATE_REWARDS_GAUGE;
      vault: Address;
      isFriend: boolean;
    }
  | {
      type: ProposalTypeEnum.ERC20_TRANSFER;
      to: Address;
      amount: string;
    }
);

export type ProposalAction = Partial<SafeProposalAction> & {
  type: SafeProposalAction["type"];
};
