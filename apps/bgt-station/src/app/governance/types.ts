export enum StatusEnum {
  ACTIVE = "active",
  IN_QUEUE = "in-queue",
  PASSED = "passed",
  REJECTED = "rejected",
}

export const mappedStatusEnum = {
  [StatusEnum.ACTIVE]: 2,
  [StatusEnum.IN_QUEUE]: 1,
  [StatusEnum.PASSED]: 3,
  [StatusEnum.REJECTED]: 4,
};

export enum OrderByEnum {
  MOST_RECENT = "most-recent",
  OLDEST = "oldest",
  NEWEST = "newest",
  HIGHEST_PARTICIPATION = "highest-participation",
  LOWEST_PARTICIPATION = "lowest-participation",
}

export enum ProposalTypeEnum {
  TEXT_PROPOSAL = "text-proposal",
  GAUGE_PROPOSAL = "new-gauge-proposal",
  COLLATERAL_PROPOSAL = "new-collateral-proposal",
  MARKET_COLLATERAL_PROPOSAL = "new-market-proposal",
}

export type ParameterChangeLine = {
  subspace: string;
  key: string;
  value: string;
};

export type ProposalVotes = {
  yes: number;
  no: number;
  veto: number;
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

export const voteTypes: VOTE_TYPE[] = ["yes", "no", "veto", "abstain"];

export const voterTypes: VOTER_TYPE[] = ["validators", "users"];

export type VOTE_TYPE = "yes" | "no" | "veto" | "abstain";

export type VOTER_TYPE = "validators" | "users";

export type ALL = "all";
