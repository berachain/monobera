export type BGTselection =
  | "your-delegations"
  | "average-gauge-weight"
  | "unbonding-queue";

export enum BGTSelectionEnum {
  YOUR_DELEGATIONS = "your-delegations",
  AVERAGE_GAUGE_WEIGHT = "average-gauge-weight",
  UNBONDING_QUEUE = "unbonding-queue",
}

export enum ValidatorSortEnum {
  HIGHEST_VOTING_POWER = "highest-voting-power",
  LOWEST_VOTING_POWER = "lowest-voting-power",
  MOST_BGT_DELEGATED = "most-BGT-delegated",
  LEAST_BGT_DELEGATED = "least-BGT-delegated",
  HIGHEST_COMMISION = "highest-commission",
  LOWEST_COMMISION = "lowest-commission",
  HIGHEST_VAPY = "highest-vAPY",
  LOWEST_VAPY = "lowest-vAPY",
}
