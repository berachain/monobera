export enum StatusEnum {
  ACTIVE = "active",
  IN_QUEUE = "in-queue",
  PASSED = "passed",
  REJECTED = "rejected",
}

export enum OrderByEnum {
  MOST_RECENT = "most-recent",
  OLDEST = "oldest",
  NEWEST = "newest",
  HIGHEST_PARTICIPATION = "highest-participation",
  LOWEST_PARTICIPATION = "lowest-participation",
}

export enum ProposalTypeEnum {
  COMMUNITY_POOL_SPEND = "community-pool-spend",
  PARAMETER_CHANGE = "parameter-change",
  EXECUTE_CONTRACT = "execute-contract",
}

export type ParameterChangeLine = {
  subspace: string;
  key: string;
  value: string;
};
