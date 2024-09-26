import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  BigDecimal: { input: any; output: any };
  BigInt: { input: any; output: any };
  Bytes: { input: any; output: any };
  Int8: { input: any; output: any };
  Timestamp: { input: any; output: any };
};

export enum Aggregation_Interval {
  Day = "day",
  Hour = "hour",
}

export type BlockChangedFilter = {
  number_gte: Scalars["Int"]["input"];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars["Bytes"]["input"]>;
  number?: InputMaybe<Scalars["Int"]["input"]>;
  number_gte?: InputMaybe<Scalars["Int"]["input"]>;
};

export type CallScheduled = {
  __typename?: "CallScheduled";
  data: Scalars["Bytes"]["output"];
  delay: Scalars["BigInt"]["output"];
  id: Scalars["Int8"]["output"];
  index: Scalars["BigInt"]["output"];
  predecessor: Scalars["Bytes"]["output"];
  target: Scalars["Bytes"]["output"];
  timelockId: Scalars["Bytes"]["output"];
  value: Scalars["BigInt"]["output"];
};

export type CallScheduled_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<CallScheduled_Filter>>>;
  data?: InputMaybe<Scalars["Bytes"]["input"]>;
  data_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  data_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  data_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  data_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  data_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  data_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  data_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  data_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  data_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  delay?: InputMaybe<Scalars["BigInt"]["input"]>;
  delay_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  delay_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  delay_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  delay_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  delay_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  delay_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  delay_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["Int8"]["input"]>;
  id_gt?: InputMaybe<Scalars["Int8"]["input"]>;
  id_gte?: InputMaybe<Scalars["Int8"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["Int8"]["input"]>>;
  id_lt?: InputMaybe<Scalars["Int8"]["input"]>;
  id_lte?: InputMaybe<Scalars["Int8"]["input"]>;
  id_not?: InputMaybe<Scalars["Int8"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["Int8"]["input"]>>;
  index?: InputMaybe<Scalars["BigInt"]["input"]>;
  index_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  index_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  index_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  index_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  index_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  index_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  index_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<CallScheduled_Filter>>>;
  predecessor?: InputMaybe<Scalars["Bytes"]["input"]>;
  predecessor_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  predecessor_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  predecessor_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  predecessor_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  predecessor_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  predecessor_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  predecessor_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  predecessor_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  predecessor_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  target?: InputMaybe<Scalars["Bytes"]["input"]>;
  target_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  target_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  target_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  target_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  target_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  target_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  target_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  target_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  target_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  timelockId?: InputMaybe<Scalars["Bytes"]["input"]>;
  timelockId_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  timelockId_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  timelockId_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  timelockId_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  timelockId_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  timelockId_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  timelockId_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  timelockId_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  timelockId_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  value?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  value_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum CallScheduled_OrderBy {
  Data = "data",
  Delay = "delay",
  Id = "id",
  Index = "index",
  Predecessor = "predecessor",
  Target = "target",
  TimelockId = "timelockId",
  Value = "value",
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = "asc",
  Desc = "desc",
}

export type Proposal = {
  __typename?: "Proposal";
  calldatas: Array<Scalars["Bytes"]["output"]>;
  canceledAt?: Maybe<Scalars["BigInt"]["output"]>;
  canceledAtBlock?: Maybe<Scalars["BigInt"]["output"]>;
  createdAt: Scalars["BigInt"]["output"];
  createdAtBlock: Scalars["BigInt"]["output"];
  description: Scalars["String"]["output"];
  executedAt?: Maybe<Scalars["BigInt"]["output"]>;
  executedAtBlock?: Maybe<Scalars["BigInt"]["output"]>;
  id: Scalars["ID"]["output"];
  proposalId: Scalars["BigInt"]["output"];
  proposer: Scalars["Bytes"]["output"];
  queuedAt?: Maybe<Scalars["BigInt"]["output"]>;
  queuedAtBlock?: Maybe<Scalars["BigInt"]["output"]>;
  signatures: Array<Scalars["String"]["output"]>;
  status: Scalars["String"]["output"];
  targets: Array<Scalars["Bytes"]["output"]>;
  values: Array<Scalars["BigInt"]["output"]>;
  voteEnd: Scalars["BigInt"]["output"];
  voteStart: Scalars["BigInt"]["output"];
};

export type ProposalVotesAggregated = {
  __typename?: "ProposalVotesAggregated";
  id: Scalars["Int8"]["output"];
  proposalId: Scalars["BigInt"]["output"];
  support: Scalars["Int"]["output"];
  timestamp: Scalars["Timestamp"]["output"];
  weight: Scalars["BigInt"]["output"];
};

export type ProposalVotesAggregated_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ProposalVotesAggregated_Filter>>>;
  id?: InputMaybe<Scalars["Int8"]["input"]>;
  id_gt?: InputMaybe<Scalars["Int8"]["input"]>;
  id_gte?: InputMaybe<Scalars["Int8"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["Int8"]["input"]>>;
  id_lt?: InputMaybe<Scalars["Int8"]["input"]>;
  id_lte?: InputMaybe<Scalars["Int8"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<ProposalVotesAggregated_Filter>>>;
  proposalId?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  proposalId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  support?: InputMaybe<Scalars["Int"]["input"]>;
  support_gt?: InputMaybe<Scalars["Int"]["input"]>;
  support_gte?: InputMaybe<Scalars["Int"]["input"]>;
  support_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  support_lt?: InputMaybe<Scalars["Int"]["input"]>;
  support_lte?: InputMaybe<Scalars["Int"]["input"]>;
  timestamp?: InputMaybe<Scalars["Timestamp"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["Timestamp"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["Timestamp"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["Timestamp"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["Timestamp"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["Timestamp"]["input"]>;
};

export type Proposal_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Proposal_Filter>>>;
  calldatas?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  calldatas_contains?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  calldatas_contains_nocase?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  calldatas_not?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  calldatas_not_contains?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  calldatas_not_contains_nocase?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  canceledAt?: InputMaybe<Scalars["BigInt"]["input"]>;
  canceledAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  canceledAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  canceledAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  canceledAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  canceledAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  canceledAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  canceledAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  canceledAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  canceledAt_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  canceledAt_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  canceledAt_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  canceledAt_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  canceledAt_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  canceledAt_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  canceledAt_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  createdAt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  createdAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  createdAt_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAt_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAt_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  createdAt_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAt_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAt_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAt_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  description_contains?: InputMaybe<Scalars["String"]["input"]>;
  description_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  description_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  description_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  description_gt?: InputMaybe<Scalars["String"]["input"]>;
  description_gte?: InputMaybe<Scalars["String"]["input"]>;
  description_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  description_lt?: InputMaybe<Scalars["String"]["input"]>;
  description_lte?: InputMaybe<Scalars["String"]["input"]>;
  description_not?: InputMaybe<Scalars["String"]["input"]>;
  description_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  description_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  description_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  description_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  description_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  description_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  description_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  description_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  description_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  executedAt?: InputMaybe<Scalars["BigInt"]["input"]>;
  executedAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  executedAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  executedAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  executedAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  executedAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  executedAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  executedAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  executedAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  executedAt_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  executedAt_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  executedAt_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  executedAt_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  executedAt_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  executedAt_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  executedAt_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<Proposal_Filter>>>;
  proposalId?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  proposalId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  proposer?: InputMaybe<Scalars["Bytes"]["input"]>;
  proposer_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  proposer_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  proposer_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  proposer_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  proposer_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  proposer_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  proposer_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  proposer_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  proposer_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  queuedAt?: InputMaybe<Scalars["BigInt"]["input"]>;
  queuedAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  queuedAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  queuedAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  queuedAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  queuedAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  queuedAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  queuedAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  queuedAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  queuedAt_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  queuedAt_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  queuedAt_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  queuedAt_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  queuedAt_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  queuedAt_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  queuedAt_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  signatures?: InputMaybe<Array<Scalars["String"]["input"]>>;
  signatures_contains?: InputMaybe<Array<Scalars["String"]["input"]>>;
  signatures_contains_nocase?: InputMaybe<Array<Scalars["String"]["input"]>>;
  signatures_not?: InputMaybe<Array<Scalars["String"]["input"]>>;
  signatures_not_contains?: InputMaybe<Array<Scalars["String"]["input"]>>;
  signatures_not_contains_nocase?: InputMaybe<
    Array<Scalars["String"]["input"]>
  >;
  status?: InputMaybe<Scalars["String"]["input"]>;
  status_contains?: InputMaybe<Scalars["String"]["input"]>;
  status_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  status_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  status_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  status_gt?: InputMaybe<Scalars["String"]["input"]>;
  status_gte?: InputMaybe<Scalars["String"]["input"]>;
  status_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  status_lt?: InputMaybe<Scalars["String"]["input"]>;
  status_lte?: InputMaybe<Scalars["String"]["input"]>;
  status_not?: InputMaybe<Scalars["String"]["input"]>;
  status_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  status_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  status_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  status_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  status_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  status_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  status_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  status_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  status_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  targets?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  targets_contains?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  targets_contains_nocase?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  targets_not?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  targets_not_contains?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  targets_not_contains_nocase?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  values?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  values_contains?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  values_contains_nocase?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  values_not?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  values_not_contains?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  values_not_contains_nocase?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  voteEnd?: InputMaybe<Scalars["BigInt"]["input"]>;
  voteEnd_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  voteEnd_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  voteEnd_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  voteEnd_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  voteEnd_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  voteEnd_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  voteEnd_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  voteStart?: InputMaybe<Scalars["BigInt"]["input"]>;
  voteStart_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  voteStart_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  voteStart_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  voteStart_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  voteStart_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  voteStart_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  voteStart_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum Proposal_OrderBy {
  Calldatas = "calldatas",
  CanceledAt = "canceledAt",
  CanceledAtBlock = "canceledAtBlock",
  CreatedAt = "createdAt",
  CreatedAtBlock = "createdAtBlock",
  Description = "description",
  ExecutedAt = "executedAt",
  ExecutedAtBlock = "executedAtBlock",
  Id = "id",
  ProposalId = "proposalId",
  Proposer = "proposer",
  QueuedAt = "queuedAt",
  QueuedAtBlock = "queuedAtBlock",
  Signatures = "signatures",
  Status = "status",
  Targets = "targets",
  Values = "values",
  VoteEnd = "voteEnd",
  VoteStart = "voteStart",
}

export type Query = {
  __typename?: "Query";
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  callScheduled?: Maybe<CallScheduled>;
  callScheduleds: Array<CallScheduled>;
  proposal?: Maybe<Proposal>;
  /** Collection of aggregated `ProposalVotesAggregated` values */
  proposalVotesAggregateds: Array<ProposalVotesAggregated>;
  proposals: Array<Proposal>;
  vote?: Maybe<Vote>;
  votes: Array<Vote>;
};

export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type QueryCallScheduledArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryCallScheduledsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<CallScheduled_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CallScheduled_Filter>;
};

export type QueryProposalArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryProposalVotesAggregatedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  interval: Aggregation_Interval;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProposalVotesAggregated_Filter>;
};

export type QueryProposalsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Proposal_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Proposal_Filter>;
};

export type QueryVoteArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryVotesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Vote_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Vote_Filter>;
};

export type Subscription = {
  __typename?: "Subscription";
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  callScheduled?: Maybe<CallScheduled>;
  callScheduleds: Array<CallScheduled>;
  proposal?: Maybe<Proposal>;
  /** Collection of aggregated `ProposalVotesAggregated` values */
  proposalVotesAggregateds: Array<ProposalVotesAggregated>;
  proposals: Array<Proposal>;
  vote?: Maybe<Vote>;
  votes: Array<Vote>;
};

export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type SubscriptionCallScheduledArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionCallScheduledsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<CallScheduled_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CallScheduled_Filter>;
};

export type SubscriptionProposalArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionProposalVotesAggregatedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  interval: Aggregation_Interval;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProposalVotesAggregated_Filter>;
};

export type SubscriptionProposalsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Proposal_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Proposal_Filter>;
};

export type SubscriptionVoteArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionVotesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Vote_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Vote_Filter>;
};

export type Vote = {
  __typename?: "Vote";
  id: Scalars["Int8"]["output"];
  params?: Maybe<Scalars["Bytes"]["output"]>;
  proposalId: Scalars["BigInt"]["output"];
  reason: Scalars["String"]["output"];
  support: Scalars["Int"]["output"];
  timestamp: Scalars["Timestamp"]["output"];
  voter: Scalars["Bytes"]["output"];
  weight: Scalars["BigInt"]["output"];
};

export type Vote_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Vote_Filter>>>;
  id?: InputMaybe<Scalars["Int8"]["input"]>;
  id_gt?: InputMaybe<Scalars["Int8"]["input"]>;
  id_gte?: InputMaybe<Scalars["Int8"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["Int8"]["input"]>>;
  id_lt?: InputMaybe<Scalars["Int8"]["input"]>;
  id_lte?: InputMaybe<Scalars["Int8"]["input"]>;
  id_not?: InputMaybe<Scalars["Int8"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["Int8"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<Vote_Filter>>>;
  params?: InputMaybe<Scalars["Bytes"]["input"]>;
  params_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  params_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  params_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  params_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  params_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  params_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  params_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  params_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  params_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  proposalId?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  proposalId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  reason?: InputMaybe<Scalars["String"]["input"]>;
  reason_contains?: InputMaybe<Scalars["String"]["input"]>;
  reason_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  reason_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  reason_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  reason_gt?: InputMaybe<Scalars["String"]["input"]>;
  reason_gte?: InputMaybe<Scalars["String"]["input"]>;
  reason_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  reason_lt?: InputMaybe<Scalars["String"]["input"]>;
  reason_lte?: InputMaybe<Scalars["String"]["input"]>;
  reason_not?: InputMaybe<Scalars["String"]["input"]>;
  reason_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  reason_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  reason_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  reason_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  reason_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  reason_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  reason_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  reason_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  reason_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  support?: InputMaybe<Scalars["Int"]["input"]>;
  support_gt?: InputMaybe<Scalars["Int"]["input"]>;
  support_gte?: InputMaybe<Scalars["Int"]["input"]>;
  support_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  support_lt?: InputMaybe<Scalars["Int"]["input"]>;
  support_lte?: InputMaybe<Scalars["Int"]["input"]>;
  support_not?: InputMaybe<Scalars["Int"]["input"]>;
  support_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  timestamp?: InputMaybe<Scalars["Timestamp"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["Timestamp"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["Timestamp"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["Timestamp"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["Timestamp"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["Timestamp"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["Timestamp"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["Timestamp"]["input"]>>;
  voter?: InputMaybe<Scalars["Bytes"]["input"]>;
  voter_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  voter_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  voter_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  voter_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  voter_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  voter_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  voter_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  voter_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  voter_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  weight?: InputMaybe<Scalars["BigInt"]["input"]>;
  weight_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  weight_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  weight_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  weight_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  weight_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  weight_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  weight_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum Vote_OrderBy {
  Id = "id",
  Params = "params",
  ProposalId = "proposalId",
  Reason = "reason",
  Support = "support",
  Timestamp = "timestamp",
  Voter = "voter",
  Weight = "weight",
}

export type _Block_ = {
  __typename?: "_Block_";
  /** The hash of the block */
  hash?: Maybe<Scalars["Bytes"]["output"]>;
  /** The block number */
  number: Scalars["Int"]["output"];
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars["Bytes"]["output"]>;
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars["Int"]["output"]>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: "_Meta_";
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars["String"]["output"];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars["Boolean"]["output"];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = "allow",
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = "deny",
}

export type GetVotesQueryVariables = Exact<{
  proposalId: Scalars["BigInt"]["input"];
}>;

export type GetVotesQuery = {
  __typename?: "Query";
  votes: Array<{
    __typename?: "Vote";
    id: any;
    params?: any | null;
    proposalId: any;
    voter: any;
    weight: any;
    support: number;
    reason: string;
    timestamp: any;
  }>;
};

export type GovernanceProposalsQueryVariables = Exact<{
  first?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type GovernanceProposalsQuery = {
  __typename?: "Query";
  proposals: Array<{
    __typename?: "Proposal";
    proposalId: any;
    createdAt: any;
    createdAtBlock: any;
    id: string;
    status: string;
    targets: Array<any>;
    values: Array<any>;
    voteEnd: any;
    voteStart: any;
    queuedAtBlock?: any | null;
    signatures: Array<string>;
    queuedAt?: any | null;
    proposer: any;
    executedAtBlock?: any | null;
    executedAt?: any | null;
    description: string;
    canceledAtBlock?: any | null;
    canceledAt?: any | null;
    calldatas: Array<any>;
  }>;
};

export type ProposalDetailsQueryVariables = Exact<{
  proposalId: Scalars["ID"]["input"];
}>;

export type ProposalDetailsQuery = {
  __typename?: "Query";
  proposal?: {
    __typename?: "Proposal";
    proposalId: any;
    createdAt: any;
    createdAtBlock: any;
    id: string;
    status: string;
    targets: Array<any>;
    values: Array<any>;
    voteEnd: any;
    voteStart: any;
    queuedAtBlock?: any | null;
    signatures: Array<string>;
    queuedAt?: any | null;
    proposer: any;
    executedAtBlock?: any | null;
    executedAt?: any | null;
    description: string;
    canceledAtBlock?: any | null;
    canceledAt?: any | null;
    calldatas: Array<any>;
  } | null;
};

export const GetVotesDocument = gql`
    query GetVotes($proposalId: BigInt!) {
  votes(where: {proposalId: $proposalId}) {
    id
    params
    proposalId
    voter
    weight
    support
    reason
    timestamp
  }
}
    `;

/**
 * __useGetVotesQuery__
 *
 * To run a query within a React component, call `useGetVotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVotesQuery({
 *   variables: {
 *      proposalId: // value for 'proposalId'
 *   },
 * });
 */
export function useGetVotesQuery(
  baseOptions: Apollo.QueryHookOptions<GetVotesQuery, GetVotesQueryVariables> &
    ({ variables: GetVotesQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetVotesQuery, GetVotesQueryVariables>(
    GetVotesDocument,
    options,
  );
}
export function useGetVotesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetVotesQuery,
    GetVotesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetVotesQuery, GetVotesQueryVariables>(
    GetVotesDocument,
    options,
  );
}
export function useGetVotesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetVotesQuery, GetVotesQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetVotesQuery, GetVotesQueryVariables>(
    GetVotesDocument,
    options,
  );
}
export type GetVotesQueryHookResult = ReturnType<typeof useGetVotesQuery>;
export type GetVotesLazyQueryHookResult = ReturnType<
  typeof useGetVotesLazyQuery
>;
export type GetVotesSuspenseQueryHookResult = ReturnType<
  typeof useGetVotesSuspenseQuery
>;
export type GetVotesQueryResult = Apollo.QueryResult<
  GetVotesQuery,
  GetVotesQueryVariables
>;
export const GovernanceProposalsDocument = gql`
    query GovernanceProposals($first: Int = 10) {
  proposals(orderBy: id, orderDirection: desc, first: $first) {
    proposalId
    createdAt
    createdAtBlock
    id
    status
    targets
    values
    voteEnd
    voteStart
    queuedAtBlock
    signatures
    queuedAt
    proposer
    executedAtBlock
    executedAt
    description
    canceledAtBlock
    canceledAt
    calldatas
  }
}
    `;

/**
 * __useGovernanceProposalsQuery__
 *
 * To run a query within a React component, call `useGovernanceProposalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGovernanceProposalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGovernanceProposalsQuery({
 *   variables: {
 *      first: // value for 'first'
 *   },
 * });
 */
export function useGovernanceProposalsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GovernanceProposalsQuery,
    GovernanceProposalsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GovernanceProposalsQuery,
    GovernanceProposalsQueryVariables
  >(GovernanceProposalsDocument, options);
}
export function useGovernanceProposalsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GovernanceProposalsQuery,
    GovernanceProposalsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GovernanceProposalsQuery,
    GovernanceProposalsQueryVariables
  >(GovernanceProposalsDocument, options);
}
export function useGovernanceProposalsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GovernanceProposalsQuery,
        GovernanceProposalsQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GovernanceProposalsQuery,
    GovernanceProposalsQueryVariables
  >(GovernanceProposalsDocument, options);
}
export type GovernanceProposalsQueryHookResult = ReturnType<
  typeof useGovernanceProposalsQuery
>;
export type GovernanceProposalsLazyQueryHookResult = ReturnType<
  typeof useGovernanceProposalsLazyQuery
>;
export type GovernanceProposalsSuspenseQueryHookResult = ReturnType<
  typeof useGovernanceProposalsSuspenseQuery
>;
export type GovernanceProposalsQueryResult = Apollo.QueryResult<
  GovernanceProposalsQuery,
  GovernanceProposalsQueryVariables
>;
export const ProposalDetailsDocument = gql`
    query ProposalDetails($proposalId: ID!) {
  proposal(id: $proposalId) {
    proposalId
    createdAt
    createdAtBlock
    id
    status
    targets
    values
    voteEnd
    voteStart
    queuedAtBlock
    signatures
    queuedAt
    proposer
    executedAtBlock
    executedAt
    description
    canceledAtBlock
    canceledAt
    calldatas
  }
}
    `;

/**
 * __useProposalDetailsQuery__
 *
 * To run a query within a React component, call `useProposalDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProposalDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProposalDetailsQuery({
 *   variables: {
 *      proposalId: // value for 'proposalId'
 *   },
 * });
 */
export function useProposalDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<
    ProposalDetailsQuery,
    ProposalDetailsQueryVariables
  > &
    (
      | { variables: ProposalDetailsQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProposalDetailsQuery, ProposalDetailsQueryVariables>(
    ProposalDetailsDocument,
    options,
  );
}
export function useProposalDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProposalDetailsQuery,
    ProposalDetailsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ProposalDetailsQuery,
    ProposalDetailsQueryVariables
  >(ProposalDetailsDocument, options);
}
export function useProposalDetailsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        ProposalDetailsQuery,
        ProposalDetailsQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    ProposalDetailsQuery,
    ProposalDetailsQueryVariables
  >(ProposalDetailsDocument, options);
}
export type ProposalDetailsQueryHookResult = ReturnType<
  typeof useProposalDetailsQuery
>;
export type ProposalDetailsLazyQueryHookResult = ReturnType<
  typeof useProposalDetailsLazyQuery
>;
export type ProposalDetailsSuspenseQueryHookResult = ReturnType<
  typeof useProposalDetailsSuspenseQuery
>;
export type ProposalDetailsQueryResult = Apollo.QueryResult<
  ProposalDetailsQuery,
  ProposalDetailsQueryVariables
>;

export const GetVotes = gql`
    query GetVotes($proposalId: BigInt!) {
  votes(where: {proposalId: $proposalId}) {
    id
    params
    proposalId
    voter
    weight
    support
    reason
    timestamp
  }
}
    `;
export const GovernanceProposals = gql`
    query GovernanceProposals($first: Int = 10) {
  proposals(orderBy: id, orderDirection: desc, first: $first) {
    proposalId
    createdAt
    createdAtBlock
    id
    status
    targets
    values
    voteEnd
    voteStart
    queuedAtBlock
    signatures
    queuedAt
    proposer
    executedAtBlock
    executedAt
    description
    canceledAtBlock
    canceledAt
    calldatas
  }
}
    `;
export const ProposalDetails = gql`
    query ProposalDetails($proposalId: ID!) {
  proposal(id: $proposalId) {
    proposalId
    createdAt
    createdAtBlock
    id
    status
    targets
    values
    voteEnd
    voteStart
    queuedAtBlock
    signatures
    queuedAt
    proposer
    executedAtBlock
    executedAt
    description
    canceledAtBlock
    canceledAt
    calldatas
  }
}
    `;
