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
  /**
   * 8 bytes signed integer
   *
   */
  Int8: { input: any; output: any };
  /**
   * A string representation of microseconds UNIX timestamp (16 digits)
   *
   */
  Timestamp: { input: any; output: any };
};

export enum Aggregation_Interval {
  Day = "day",
  Hour = "hour",
}

export type Block = {
  __typename?: "Block";
  author: Scalars["Bytes"]["output"];
  baseFeePerGas?: Maybe<Scalars["BigInt"]["output"]>;
  difficulty: Scalars["BigInt"]["output"];
  gasLimit: Scalars["BigInt"]["output"];
  gasUsed: Scalars["BigInt"]["output"];
  hash: Scalars["Bytes"]["output"];
  id: Scalars["ID"]["output"];
  number: Scalars["BigInt"]["output"];
  parentHash: Scalars["Bytes"]["output"];
  receiptsRoot: Scalars["Bytes"]["output"];
  size?: Maybe<Scalars["BigInt"]["output"]>;
  stateRoot: Scalars["Bytes"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  totalDifficulty: Scalars["BigInt"]["output"];
  transactionsRoot: Scalars["Bytes"]["output"];
  unclesHash: Scalars["Bytes"]["output"];
};

export type BlockChangedFilter = {
  number_gte: Scalars["Int"]["input"];
};

export type Block_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Block_Filter>>>;
  author?: InputMaybe<Scalars["Bytes"]["input"]>;
  author_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  author_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  author_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  author_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  author_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  author_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  author_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  author_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  author_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  baseFeePerGas?: InputMaybe<Scalars["BigInt"]["input"]>;
  baseFeePerGas_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  baseFeePerGas_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  baseFeePerGas_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  baseFeePerGas_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  baseFeePerGas_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  baseFeePerGas_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  baseFeePerGas_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  difficulty?: InputMaybe<Scalars["BigInt"]["input"]>;
  difficulty_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  difficulty_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  difficulty_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  difficulty_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  difficulty_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  difficulty_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  difficulty_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  gasLimit?: InputMaybe<Scalars["BigInt"]["input"]>;
  gasLimit_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  gasLimit_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  gasLimit_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  gasLimit_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  gasLimit_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  gasLimit_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  gasLimit_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  gasUsed?: InputMaybe<Scalars["BigInt"]["input"]>;
  gasUsed_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  gasUsed_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  gasUsed_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  gasUsed_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  gasUsed_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  gasUsed_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  gasUsed_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  hash?: InputMaybe<Scalars["Bytes"]["input"]>;
  hash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  hash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  hash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  hash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  hash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  hash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  hash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  hash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  hash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  number?: InputMaybe<Scalars["BigInt"]["input"]>;
  number_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  number_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  number_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  number_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  number_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  number_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  number_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<Block_Filter>>>;
  parentHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  parentHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  parentHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  parentHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  parentHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  parentHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  parentHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  parentHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  parentHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  parentHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  receiptsRoot?: InputMaybe<Scalars["Bytes"]["input"]>;
  receiptsRoot_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  receiptsRoot_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  receiptsRoot_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  receiptsRoot_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  receiptsRoot_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  receiptsRoot_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  receiptsRoot_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  receiptsRoot_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  receiptsRoot_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  size?: InputMaybe<Scalars["BigInt"]["input"]>;
  size_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  size_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  size_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  size_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  size_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  size_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  size_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  stateRoot?: InputMaybe<Scalars["Bytes"]["input"]>;
  stateRoot_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  stateRoot_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  stateRoot_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  stateRoot_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  stateRoot_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  stateRoot_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  stateRoot_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  stateRoot_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  stateRoot_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalDifficulty?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalDifficulty_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalDifficulty_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalDifficulty_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalDifficulty_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalDifficulty_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalDifficulty_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalDifficulty_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  transactionsRoot?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionsRoot_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionsRoot_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionsRoot_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionsRoot_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  transactionsRoot_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionsRoot_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionsRoot_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionsRoot_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionsRoot_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  unclesHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  unclesHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  unclesHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  unclesHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  unclesHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  unclesHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  unclesHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  unclesHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  unclesHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  unclesHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export type Block_Height = {
  hash?: InputMaybe<Scalars["Bytes"]["input"]>;
  number?: InputMaybe<Scalars["Int"]["input"]>;
  number_gte?: InputMaybe<Scalars["Int"]["input"]>;
};

export enum Block_OrderBy {
  Author = "author",
  BaseFeePerGas = "baseFeePerGas",
  Difficulty = "difficulty",
  GasLimit = "gasLimit",
  GasUsed = "gasUsed",
  Hash = "hash",
  Id = "id",
  Number = "number",
  ParentHash = "parentHash",
  ReceiptsRoot = "receiptsRoot",
  Size = "size",
  StateRoot = "stateRoot",
  Timestamp = "timestamp",
  TotalDifficulty = "totalDifficulty",
  TransactionsRoot = "transactionsRoot",
  UnclesHash = "unclesHash",
}

export type ExecutableCall = {
  __typename?: "ExecutableCall";
  calldata: Scalars["Bytes"]["output"];
  id: Scalars["ID"]["output"];
  proposal: Proposal;
  signature: Scalars["String"]["output"];
  target: Scalars["Bytes"]["output"];
  value: Scalars["BigInt"]["output"];
};

export type ExecutableCall_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ExecutableCall_Filter>>>;
  calldata?: InputMaybe<Scalars["Bytes"]["input"]>;
  calldata_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  calldata_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  calldata_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  calldata_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  calldata_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  calldata_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  calldata_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  calldata_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  calldata_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<ExecutableCall_Filter>>>;
  proposal?: InputMaybe<Scalars["String"]["input"]>;
  proposal_?: InputMaybe<Proposal_Filter>;
  proposal_contains?: InputMaybe<Scalars["String"]["input"]>;
  proposal_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  proposal_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  proposal_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  proposal_gt?: InputMaybe<Scalars["String"]["input"]>;
  proposal_gte?: InputMaybe<Scalars["String"]["input"]>;
  proposal_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  proposal_lt?: InputMaybe<Scalars["String"]["input"]>;
  proposal_lte?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  proposal_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  proposal_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  proposal_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  signature?: InputMaybe<Scalars["String"]["input"]>;
  signature_contains?: InputMaybe<Scalars["String"]["input"]>;
  signature_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  signature_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  signature_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  signature_gt?: InputMaybe<Scalars["String"]["input"]>;
  signature_gte?: InputMaybe<Scalars["String"]["input"]>;
  signature_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  signature_lt?: InputMaybe<Scalars["String"]["input"]>;
  signature_lte?: InputMaybe<Scalars["String"]["input"]>;
  signature_not?: InputMaybe<Scalars["String"]["input"]>;
  signature_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  signature_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  signature_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  signature_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  signature_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  signature_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  signature_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  signature_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  signature_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
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
  value?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  value_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum ExecutableCall_OrderBy {
  Calldata = "calldata",
  Id = "id",
  Proposal = "proposal",
  ProposalCanceledAt = "proposal__canceledAt",
  ProposalCanceledAtBlock = "proposal__canceledAtBlock",
  ProposalContentEncoding = "proposal__contentEncoding",
  ProposalContentType = "proposal__contentType",
  ProposalCreatedAt = "proposal__createdAt",
  ProposalCreatedAtBlock = "proposal__createdAtBlock",
  ProposalDescription = "proposal__description",
  ProposalExecutableAtBlock = "proposal__executableAtBlock",
  ProposalExecutedAt = "proposal__executedAt",
  ProposalExecutedAtBlock = "proposal__executedAtBlock",
  ProposalId = "proposal__id",
  ProposalProposalId = "proposal__proposalId",
  ProposalProposer = "proposal__proposer",
  ProposalQueueEnd = "proposal__queueEnd",
  ProposalQueueStart = "proposal__queueStart",
  ProposalQueueStartBlock = "proposal__queueStartBlock",
  ProposalQuorum = "proposal__quorum",
  ProposalStatus = "proposal__status",
  ProposalTimelockId = "proposal__timelockId",
  ProposalTitle = "proposal__title",
  ProposalUnparsedDescription = "proposal__unparsedDescription",
  ProposalUnverifiedForumLink = "proposal__unverifiedForumLink",
  ProposalVoteEndBlock = "proposal__voteEndBlock",
  ProposalVoteStartBlock = "proposal__voteStartBlock",
  Signature = "signature",
  Target = "target",
  Value = "value",
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = "asc",
  Desc = "desc",
}

export type PollResult = {
  __typename?: "PollResult";
  abstain: Scalars["BigInt"]["output"];
  abstainPercentage: Scalars["String"]["output"];
  abstainVotersCount: Scalars["Int"]["output"];
  against: Scalars["BigInt"]["output"];
  againstPercentage: Scalars["String"]["output"];
  againstVotersCount: Scalars["Int"]["output"];
  for: Scalars["BigInt"]["output"];
  forPercentage: Scalars["String"]["output"];
  forVotersCount: Scalars["Int"]["output"];
  id: Scalars["ID"]["output"];
  total: Scalars["BigInt"]["output"];
  totalTowardsQuorum: Scalars["BigInt"]["output"];
  totalVotersCount: Scalars["Int"]["output"];
};

export type PollResult_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  abstain?: InputMaybe<Scalars["BigInt"]["input"]>;
  abstainPercentage?: InputMaybe<Scalars["String"]["input"]>;
  abstainPercentage_contains?: InputMaybe<Scalars["String"]["input"]>;
  abstainPercentage_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  abstainPercentage_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  abstainPercentage_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  abstainPercentage_gt?: InputMaybe<Scalars["String"]["input"]>;
  abstainPercentage_gte?: InputMaybe<Scalars["String"]["input"]>;
  abstainPercentage_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  abstainPercentage_lt?: InputMaybe<Scalars["String"]["input"]>;
  abstainPercentage_lte?: InputMaybe<Scalars["String"]["input"]>;
  abstainPercentage_not?: InputMaybe<Scalars["String"]["input"]>;
  abstainPercentage_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  abstainPercentage_not_contains_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  abstainPercentage_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  abstainPercentage_not_ends_with_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  abstainPercentage_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  abstainPercentage_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  abstainPercentage_not_starts_with_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  abstainPercentage_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  abstainPercentage_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  abstainVotersCount?: InputMaybe<Scalars["Int"]["input"]>;
  abstainVotersCount_gt?: InputMaybe<Scalars["Int"]["input"]>;
  abstainVotersCount_gte?: InputMaybe<Scalars["Int"]["input"]>;
  abstainVotersCount_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  abstainVotersCount_lt?: InputMaybe<Scalars["Int"]["input"]>;
  abstainVotersCount_lte?: InputMaybe<Scalars["Int"]["input"]>;
  abstainVotersCount_not?: InputMaybe<Scalars["Int"]["input"]>;
  abstainVotersCount_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  abstain_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  abstain_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  abstain_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  abstain_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  abstain_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  abstain_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  abstain_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  against?: InputMaybe<Scalars["BigInt"]["input"]>;
  againstPercentage?: InputMaybe<Scalars["String"]["input"]>;
  againstPercentage_contains?: InputMaybe<Scalars["String"]["input"]>;
  againstPercentage_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  againstPercentage_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  againstPercentage_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  againstPercentage_gt?: InputMaybe<Scalars["String"]["input"]>;
  againstPercentage_gte?: InputMaybe<Scalars["String"]["input"]>;
  againstPercentage_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  againstPercentage_lt?: InputMaybe<Scalars["String"]["input"]>;
  againstPercentage_lte?: InputMaybe<Scalars["String"]["input"]>;
  againstPercentage_not?: InputMaybe<Scalars["String"]["input"]>;
  againstPercentage_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  againstPercentage_not_contains_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  againstPercentage_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  againstPercentage_not_ends_with_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  againstPercentage_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  againstPercentage_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  againstPercentage_not_starts_with_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  againstPercentage_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  againstPercentage_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  againstVotersCount?: InputMaybe<Scalars["Int"]["input"]>;
  againstVotersCount_gt?: InputMaybe<Scalars["Int"]["input"]>;
  againstVotersCount_gte?: InputMaybe<Scalars["Int"]["input"]>;
  againstVotersCount_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  againstVotersCount_lt?: InputMaybe<Scalars["Int"]["input"]>;
  againstVotersCount_lte?: InputMaybe<Scalars["Int"]["input"]>;
  againstVotersCount_not?: InputMaybe<Scalars["Int"]["input"]>;
  againstVotersCount_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  against_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  against_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  against_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  against_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  against_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  against_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  against_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<PollResult_Filter>>>;
  for?: InputMaybe<Scalars["BigInt"]["input"]>;
  forPercentage?: InputMaybe<Scalars["String"]["input"]>;
  forPercentage_contains?: InputMaybe<Scalars["String"]["input"]>;
  forPercentage_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  forPercentage_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  forPercentage_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  forPercentage_gt?: InputMaybe<Scalars["String"]["input"]>;
  forPercentage_gte?: InputMaybe<Scalars["String"]["input"]>;
  forPercentage_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  forPercentage_lt?: InputMaybe<Scalars["String"]["input"]>;
  forPercentage_lte?: InputMaybe<Scalars["String"]["input"]>;
  forPercentage_not?: InputMaybe<Scalars["String"]["input"]>;
  forPercentage_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  forPercentage_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  forPercentage_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  forPercentage_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  forPercentage_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  forPercentage_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  forPercentage_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  forPercentage_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  forPercentage_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  forVotersCount?: InputMaybe<Scalars["Int"]["input"]>;
  forVotersCount_gt?: InputMaybe<Scalars["Int"]["input"]>;
  forVotersCount_gte?: InputMaybe<Scalars["Int"]["input"]>;
  forVotersCount_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  forVotersCount_lt?: InputMaybe<Scalars["Int"]["input"]>;
  forVotersCount_lte?: InputMaybe<Scalars["Int"]["input"]>;
  forVotersCount_not?: InputMaybe<Scalars["Int"]["input"]>;
  forVotersCount_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  for_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  for_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  for_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  for_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  for_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  for_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  for_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<PollResult_Filter>>>;
  total?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalTowardsQuorum?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalTowardsQuorum_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalTowardsQuorum_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalTowardsQuorum_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalTowardsQuorum_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalTowardsQuorum_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalTowardsQuorum_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalTowardsQuorum_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalVotersCount?: InputMaybe<Scalars["Int"]["input"]>;
  totalVotersCount_gt?: InputMaybe<Scalars["Int"]["input"]>;
  totalVotersCount_gte?: InputMaybe<Scalars["Int"]["input"]>;
  totalVotersCount_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  totalVotersCount_lt?: InputMaybe<Scalars["Int"]["input"]>;
  totalVotersCount_lte?: InputMaybe<Scalars["Int"]["input"]>;
  totalVotersCount_not?: InputMaybe<Scalars["Int"]["input"]>;
  totalVotersCount_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  total_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  total_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  total_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  total_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  total_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  total_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  total_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum PollResult_OrderBy {
  Abstain = "abstain",
  AbstainPercentage = "abstainPercentage",
  AbstainVotersCount = "abstainVotersCount",
  Against = "against",
  AgainstPercentage = "againstPercentage",
  AgainstVotersCount = "againstVotersCount",
  For = "for",
  ForPercentage = "forPercentage",
  ForVotersCount = "forVotersCount",
  Id = "id",
  Total = "total",
  TotalTowardsQuorum = "totalTowardsQuorum",
  TotalVotersCount = "totalVotersCount",
}

export type Proposal = {
  __typename?: "Proposal";
  canceledAt?: Maybe<Scalars["BigInt"]["output"]>;
  canceledAtBlock?: Maybe<Scalars["BigInt"]["output"]>;
  contentEncoding?: Maybe<Scalars["String"]["output"]>;
  contentType?: Maybe<Scalars["String"]["output"]>;
  createdAt: Scalars["BigInt"]["output"];
  createdAtBlock: Scalars["BigInt"]["output"];
  description: Scalars["String"]["output"];
  executableAtBlock?: Maybe<Scalars["BigInt"]["output"]>;
  executableCalls: Array<ExecutableCall>;
  executedAt?: Maybe<Scalars["BigInt"]["output"]>;
  executedAtBlock?: Maybe<Scalars["BigInt"]["output"]>;
  id: Scalars["ID"]["output"];
  pollResult: PollResult;
  proposalId: Scalars["BigInt"]["output"];
  proposer: Scalars["Bytes"]["output"];
  queueEnd?: Maybe<Scalars["BigInt"]["output"]>;
  queueStart?: Maybe<Scalars["BigInt"]["output"]>;
  queueStartBlock?: Maybe<Scalars["BigInt"]["output"]>;
  quorum: Scalars["BigInt"]["output"];
  status: ProposalStatus;
  timelockId?: Maybe<Scalars["Bytes"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
  topics: Array<Scalars["String"]["output"]>;
  unparsedDescription: Scalars["String"]["output"];
  unverifiedForumLink?: Maybe<Scalars["String"]["output"]>;
  voteEndBlock: Scalars["BigInt"]["output"];
  voteStartBlock: Scalars["BigInt"]["output"];
  votes: Array<Vote>;
};

export type ProposalExecutableCallsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ExecutableCall_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<ExecutableCall_Filter>;
};

export type ProposalVotesArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Vote_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Vote_Filter>;
};

export enum ProposalStatus {
  Active = "ACTIVE",
  CanceledByGuardian = "CANCELED_BY_GUARDIAN",
  CanceledByUser = "CANCELED_BY_USER",
  Defeated = "DEFEATED",
  Executed = "EXECUTED",
  InQueue = "IN_QUEUE",
  Pending = "PENDING",
  PendingExecution = "PENDING_EXECUTION",
  PendingQueue = "PENDING_QUEUE",
  QuorumNotReached = "QUORUM_NOT_REACHED",
}

export type Proposal_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Proposal_Filter>>>;
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
  contentEncoding?: InputMaybe<Scalars["String"]["input"]>;
  contentEncoding_contains?: InputMaybe<Scalars["String"]["input"]>;
  contentEncoding_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  contentEncoding_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  contentEncoding_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  contentEncoding_gt?: InputMaybe<Scalars["String"]["input"]>;
  contentEncoding_gte?: InputMaybe<Scalars["String"]["input"]>;
  contentEncoding_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  contentEncoding_lt?: InputMaybe<Scalars["String"]["input"]>;
  contentEncoding_lte?: InputMaybe<Scalars["String"]["input"]>;
  contentEncoding_not?: InputMaybe<Scalars["String"]["input"]>;
  contentEncoding_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  contentEncoding_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  contentEncoding_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  contentEncoding_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  contentEncoding_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  contentEncoding_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  contentEncoding_not_starts_with_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  contentEncoding_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  contentEncoding_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  contentType?: InputMaybe<Scalars["String"]["input"]>;
  contentType_contains?: InputMaybe<Scalars["String"]["input"]>;
  contentType_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  contentType_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  contentType_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  contentType_gt?: InputMaybe<Scalars["String"]["input"]>;
  contentType_gte?: InputMaybe<Scalars["String"]["input"]>;
  contentType_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  contentType_lt?: InputMaybe<Scalars["String"]["input"]>;
  contentType_lte?: InputMaybe<Scalars["String"]["input"]>;
  contentType_not?: InputMaybe<Scalars["String"]["input"]>;
  contentType_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  contentType_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  contentType_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  contentType_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  contentType_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  contentType_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  contentType_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  contentType_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  contentType_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
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
  executableAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  executableAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  executableAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  executableAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  executableAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  executableAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  executableAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  executableAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  executableCalls_?: InputMaybe<ExecutableCall_Filter>;
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
  pollResult?: InputMaybe<Scalars["String"]["input"]>;
  pollResult_?: InputMaybe<PollResult_Filter>;
  pollResult_contains?: InputMaybe<Scalars["String"]["input"]>;
  pollResult_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pollResult_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pollResult_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pollResult_gt?: InputMaybe<Scalars["String"]["input"]>;
  pollResult_gte?: InputMaybe<Scalars["String"]["input"]>;
  pollResult_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pollResult_lt?: InputMaybe<Scalars["String"]["input"]>;
  pollResult_lte?: InputMaybe<Scalars["String"]["input"]>;
  pollResult_not?: InputMaybe<Scalars["String"]["input"]>;
  pollResult_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  pollResult_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pollResult_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pollResult_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pollResult_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pollResult_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pollResult_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pollResult_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pollResult_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
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
  queueEnd?: InputMaybe<Scalars["BigInt"]["input"]>;
  queueEnd_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  queueEnd_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  queueEnd_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  queueEnd_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  queueEnd_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  queueEnd_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  queueEnd_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  queueStart?: InputMaybe<Scalars["BigInt"]["input"]>;
  queueStartBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  queueStartBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  queueStartBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  queueStartBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  queueStartBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  queueStartBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  queueStartBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  queueStartBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  queueStart_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  queueStart_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  queueStart_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  queueStart_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  queueStart_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  queueStart_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  queueStart_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  quorum?: InputMaybe<Scalars["BigInt"]["input"]>;
  quorum_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  quorum_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  quorum_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  quorum_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  quorum_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  quorum_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  quorum_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  status?: InputMaybe<ProposalStatus>;
  status_in?: InputMaybe<Array<ProposalStatus>>;
  status_not?: InputMaybe<ProposalStatus>;
  status_not_in?: InputMaybe<Array<ProposalStatus>>;
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
  title?: InputMaybe<Scalars["String"]["input"]>;
  title_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  title_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  title_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  title_gt?: InputMaybe<Scalars["String"]["input"]>;
  title_gte?: InputMaybe<Scalars["String"]["input"]>;
  title_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  title_lt?: InputMaybe<Scalars["String"]["input"]>;
  title_lte?: InputMaybe<Scalars["String"]["input"]>;
  title_not?: InputMaybe<Scalars["String"]["input"]>;
  title_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  title_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  title_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  title_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  title_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  title_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  title_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  title_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  topics?: InputMaybe<Array<Scalars["String"]["input"]>>;
  topics_contains?: InputMaybe<Array<Scalars["String"]["input"]>>;
  topics_contains_nocase?: InputMaybe<Array<Scalars["String"]["input"]>>;
  topics_not?: InputMaybe<Array<Scalars["String"]["input"]>>;
  topics_not_contains?: InputMaybe<Array<Scalars["String"]["input"]>>;
  topics_not_contains_nocase?: InputMaybe<Array<Scalars["String"]["input"]>>;
  unparsedDescription?: InputMaybe<Scalars["String"]["input"]>;
  unparsedDescription_contains?: InputMaybe<Scalars["String"]["input"]>;
  unparsedDescription_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  unparsedDescription_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  unparsedDescription_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  unparsedDescription_gt?: InputMaybe<Scalars["String"]["input"]>;
  unparsedDescription_gte?: InputMaybe<Scalars["String"]["input"]>;
  unparsedDescription_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  unparsedDescription_lt?: InputMaybe<Scalars["String"]["input"]>;
  unparsedDescription_lte?: InputMaybe<Scalars["String"]["input"]>;
  unparsedDescription_not?: InputMaybe<Scalars["String"]["input"]>;
  unparsedDescription_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  unparsedDescription_not_contains_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  unparsedDescription_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  unparsedDescription_not_ends_with_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  unparsedDescription_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  unparsedDescription_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  unparsedDescription_not_starts_with_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  unparsedDescription_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  unparsedDescription_starts_with_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  unverifiedForumLink?: InputMaybe<Scalars["String"]["input"]>;
  unverifiedForumLink_contains?: InputMaybe<Scalars["String"]["input"]>;
  unverifiedForumLink_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  unverifiedForumLink_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  unverifiedForumLink_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  unverifiedForumLink_gt?: InputMaybe<Scalars["String"]["input"]>;
  unverifiedForumLink_gte?: InputMaybe<Scalars["String"]["input"]>;
  unverifiedForumLink_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  unverifiedForumLink_lt?: InputMaybe<Scalars["String"]["input"]>;
  unverifiedForumLink_lte?: InputMaybe<Scalars["String"]["input"]>;
  unverifiedForumLink_not?: InputMaybe<Scalars["String"]["input"]>;
  unverifiedForumLink_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  unverifiedForumLink_not_contains_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  unverifiedForumLink_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  unverifiedForumLink_not_ends_with_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  unverifiedForumLink_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  unverifiedForumLink_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  unverifiedForumLink_not_starts_with_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  unverifiedForumLink_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  unverifiedForumLink_starts_with_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  voteEndBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  voteEndBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  voteEndBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  voteEndBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  voteEndBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  voteEndBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  voteEndBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  voteEndBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  voteStartBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  voteStartBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  voteStartBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  voteStartBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  voteStartBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  voteStartBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  voteStartBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  voteStartBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  votes_?: InputMaybe<Vote_Filter>;
};

export enum Proposal_OrderBy {
  CanceledAt = "canceledAt",
  CanceledAtBlock = "canceledAtBlock",
  ContentEncoding = "contentEncoding",
  ContentType = "contentType",
  CreatedAt = "createdAt",
  CreatedAtBlock = "createdAtBlock",
  Description = "description",
  ExecutableAtBlock = "executableAtBlock",
  ExecutableCalls = "executableCalls",
  ExecutedAt = "executedAt",
  ExecutedAtBlock = "executedAtBlock",
  Id = "id",
  PollResult = "pollResult",
  PollResultAbstain = "pollResult__abstain",
  PollResultAbstainPercentage = "pollResult__abstainPercentage",
  PollResultAbstainVotersCount = "pollResult__abstainVotersCount",
  PollResultAgainst = "pollResult__against",
  PollResultAgainstPercentage = "pollResult__againstPercentage",
  PollResultAgainstVotersCount = "pollResult__againstVotersCount",
  PollResultFor = "pollResult__for",
  PollResultForPercentage = "pollResult__forPercentage",
  PollResultForVotersCount = "pollResult__forVotersCount",
  PollResultId = "pollResult__id",
  PollResultTotal = "pollResult__total",
  PollResultTotalTowardsQuorum = "pollResult__totalTowardsQuorum",
  PollResultTotalVotersCount = "pollResult__totalVotersCount",
  ProposalId = "proposalId",
  Proposer = "proposer",
  QueueEnd = "queueEnd",
  QueueStart = "queueStart",
  QueueStartBlock = "queueStartBlock",
  Quorum = "quorum",
  Status = "status",
  TimelockId = "timelockId",
  Title = "title",
  Topics = "topics",
  UnparsedDescription = "unparsedDescription",
  UnverifiedForumLink = "unverifiedForumLink",
  VoteEndBlock = "voteEndBlock",
  VoteStartBlock = "voteStartBlock",
  Votes = "votes",
}

export type Query = {
  __typename?: "Query";
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  block?: Maybe<Block>;
  blocks: Array<Block>;
  executableCall?: Maybe<ExecutableCall>;
  executableCalls: Array<ExecutableCall>;
  pollResult?: Maybe<PollResult>;
  pollResults: Array<PollResult>;
  proposal?: Maybe<Proposal>;
  proposalSearch: Array<Proposal>;
  proposals: Array<Proposal>;
  vote?: Maybe<Vote>;
  votes: Array<Vote>;
};

export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type QueryBlockArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryBlocksArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Block_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Block_Filter>;
};

export type QueryExecutableCallArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryExecutableCallsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ExecutableCall_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ExecutableCall_Filter>;
};

export type QueryPollResultArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryPollResultsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<PollResult_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PollResult_Filter>;
};

export type QueryProposalArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryProposalSearchArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  text: Scalars["String"]["input"];
  where?: InputMaybe<Proposal_Filter>;
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
  block?: Maybe<Block>;
  blocks: Array<Block>;
  executableCall?: Maybe<ExecutableCall>;
  executableCalls: Array<ExecutableCall>;
  pollResult?: Maybe<PollResult>;
  pollResults: Array<PollResult>;
  proposal?: Maybe<Proposal>;
  proposals: Array<Proposal>;
  vote?: Maybe<Vote>;
  votes: Array<Vote>;
};

export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type SubscriptionBlockArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionBlocksArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Block_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Block_Filter>;
};

export type SubscriptionExecutableCallArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionExecutableCallsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ExecutableCall_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ExecutableCall_Filter>;
};

export type SubscriptionPollResultArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionPollResultsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<PollResult_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PollResult_Filter>;
};

export type SubscriptionProposalArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
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
  proposalId: Proposal;
  reason: Scalars["String"]["output"];
  support: VoteSupportType;
  timestamp: Scalars["BigInt"]["output"];
  voter: Scalars["Bytes"]["output"];
  weight: Scalars["BigInt"]["output"];
};

export enum VoteSupportType {
  Abstain = "ABSTAIN",
  Against = "AGAINST",
  For = "FOR",
}

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
  proposalId?: InputMaybe<Scalars["String"]["input"]>;
  proposalId_?: InputMaybe<Proposal_Filter>;
  proposalId_contains?: InputMaybe<Scalars["String"]["input"]>;
  proposalId_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  proposalId_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  proposalId_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  proposalId_gt?: InputMaybe<Scalars["String"]["input"]>;
  proposalId_gte?: InputMaybe<Scalars["String"]["input"]>;
  proposalId_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  proposalId_lt?: InputMaybe<Scalars["String"]["input"]>;
  proposalId_lte?: InputMaybe<Scalars["String"]["input"]>;
  proposalId_not?: InputMaybe<Scalars["String"]["input"]>;
  proposalId_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  proposalId_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  proposalId_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  proposalId_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  proposalId_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  proposalId_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  proposalId_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  proposalId_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  proposalId_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
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
  support?: InputMaybe<VoteSupportType>;
  support_in?: InputMaybe<Array<VoteSupportType>>;
  support_not?: InputMaybe<VoteSupportType>;
  support_not_in?: InputMaybe<Array<VoteSupportType>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
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
  ProposalIdCanceledAt = "proposalId__canceledAt",
  ProposalIdCanceledAtBlock = "proposalId__canceledAtBlock",
  ProposalIdContentEncoding = "proposalId__contentEncoding",
  ProposalIdContentType = "proposalId__contentType",
  ProposalIdCreatedAt = "proposalId__createdAt",
  ProposalIdCreatedAtBlock = "proposalId__createdAtBlock",
  ProposalIdDescription = "proposalId__description",
  ProposalIdExecutableAtBlock = "proposalId__executableAtBlock",
  ProposalIdExecutedAt = "proposalId__executedAt",
  ProposalIdExecutedAtBlock = "proposalId__executedAtBlock",
  ProposalIdId = "proposalId__id",
  ProposalIdProposalId = "proposalId__proposalId",
  ProposalIdProposer = "proposalId__proposer",
  ProposalIdQueueEnd = "proposalId__queueEnd",
  ProposalIdQueueStart = "proposalId__queueStart",
  ProposalIdQueueStartBlock = "proposalId__queueStartBlock",
  ProposalIdQuorum = "proposalId__quorum",
  ProposalIdStatus = "proposalId__status",
  ProposalIdTimelockId = "proposalId__timelockId",
  ProposalIdTitle = "proposalId__title",
  ProposalIdUnparsedDescription = "proposalId__unparsedDescription",
  ProposalIdUnverifiedForumLink = "proposalId__unverifiedForumLink",
  ProposalIdVoteEndBlock = "proposalId__voteEndBlock",
  ProposalIdVoteStartBlock = "proposalId__voteStartBlock",
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

export type ProposalSelectionFragment = {
  __typename?: "Proposal";
  id: string;
  proposer: any;
  proposalId: any;
  description: string;
  status: ProposalStatus;
  createdAt: any;
  createdAtBlock: any;
  unverifiedForumLink?: string | null;
  quorum: any;
  voteEndBlock: any;
  voteStartBlock: any;
  queueEnd?: any | null;
  canceledAt?: any | null;
  executedAt?: any | null;
  title?: string | null;
  topics: Array<string>;
  pollResult: {
    __typename?: "PollResult";
    for: any;
    forVotersCount: number;
    forPercentage: string;
    against: any;
    againstVotersCount: number;
    againstPercentage: string;
    abstain: any;
    abstainVotersCount: number;
    abstainPercentage: string;
    total: any;
    totalVotersCount: number;
    totalTowardsQuorum: any;
  };
};

export type ExecutableCallSubsetFragment = {
  __typename?: "ExecutableCall";
  id: string;
  target: any;
  value: any;
  calldata: any;
};

export type ProposalVoteFragment = {
  __typename?: "Vote";
  id: any;
  voter: any;
  weight: any;
  support: VoteSupportType;
  timestamp: any;
  reason: string;
};

export type ProposalWithVotesFragment = {
  __typename?: "Proposal";
  timelockId?: any | null;
  id: string;
  proposer: any;
  proposalId: any;
  description: string;
  status: ProposalStatus;
  createdAt: any;
  createdAtBlock: any;
  unverifiedForumLink?: string | null;
  quorum: any;
  voteEndBlock: any;
  voteStartBlock: any;
  queueEnd?: any | null;
  canceledAt?: any | null;
  executedAt?: any | null;
  title?: string | null;
  topics: Array<string>;
  executableCalls: Array<{
    __typename?: "ExecutableCall";
    id: string;
    target: any;
    value: any;
    calldata: any;
  }>;
  votes: Array<{
    __typename?: "Vote";
    id: any;
    voter: any;
    weight: any;
    support: VoteSupportType;
    timestamp: any;
    reason: string;
  }>;
  pollResult: {
    __typename?: "PollResult";
    for: any;
    forVotersCount: number;
    forPercentage: string;
    against: any;
    againstVotersCount: number;
    againstPercentage: string;
    abstain: any;
    abstainVotersCount: number;
    abstainPercentage: string;
    total: any;
    totalVotersCount: number;
    totalTowardsQuorum: any;
  };
};

export type GetProposalVotesQueryVariables = Exact<{
  proposalId: Scalars["String"]["input"];
  orderBy?: InputMaybe<Vote_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  limit: Scalars["Int"]["input"];
  offset?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type GetProposalVotesQuery = {
  __typename?: "Query";
  votes: Array<{
    __typename?: "Vote";
    id: any;
    voter: any;
    weight: any;
    support: VoteSupportType;
    timestamp: any;
    reason: string;
  }>;
};

export type GetProposalsQueryVariables = Exact<{
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Proposal_Filter>;
  orderBy?: InputMaybe<Proposal_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
}>;

export type GetProposalsQuery = {
  __typename?: "Query";
  proposals: Array<{
    __typename?: "Proposal";
    id: string;
    proposer: any;
    proposalId: any;
    description: string;
    status: ProposalStatus;
    createdAt: any;
    createdAtBlock: any;
    unverifiedForumLink?: string | null;
    quorum: any;
    voteEndBlock: any;
    voteStartBlock: any;
    queueEnd?: any | null;
    canceledAt?: any | null;
    executedAt?: any | null;
    title?: string | null;
    topics: Array<string>;
    pollResult: {
      __typename?: "PollResult";
      for: any;
      forVotersCount: number;
      forPercentage: string;
      against: any;
      againstVotersCount: number;
      againstPercentage: string;
      abstain: any;
      abstainVotersCount: number;
      abstainPercentage: string;
      total: any;
      totalVotersCount: number;
      totalTowardsQuorum: any;
    };
  }>;
};

export type SearchProposalsQueryVariables = Exact<{
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Proposal_Filter>;
  text: Scalars["String"]["input"];
}>;

export type SearchProposalsQuery = {
  __typename?: "Query";
  proposals: Array<{
    __typename?: "Proposal";
    id: string;
    proposer: any;
    proposalId: any;
    description: string;
    status: ProposalStatus;
    createdAt: any;
    createdAtBlock: any;
    unverifiedForumLink?: string | null;
    quorum: any;
    voteEndBlock: any;
    voteStartBlock: any;
    queueEnd?: any | null;
    canceledAt?: any | null;
    executedAt?: any | null;
    title?: string | null;
    topics: Array<string>;
    pollResult: {
      __typename?: "PollResult";
      for: any;
      forVotersCount: number;
      forPercentage: string;
      against: any;
      againstVotersCount: number;
      againstPercentage: string;
      abstain: any;
      abstainVotersCount: number;
      abstainPercentage: string;
      total: any;
      totalVotersCount: number;
      totalTowardsQuorum: any;
    };
  }>;
};

export type GetProposalQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type GetProposalQuery = {
  __typename?: "Query";
  proposal?: {
    __typename?: "Proposal";
    timelockId?: any | null;
    id: string;
    proposer: any;
    proposalId: any;
    description: string;
    status: ProposalStatus;
    createdAt: any;
    createdAtBlock: any;
    unverifiedForumLink?: string | null;
    quorum: any;
    voteEndBlock: any;
    voteStartBlock: any;
    queueEnd?: any | null;
    canceledAt?: any | null;
    executedAt?: any | null;
    title?: string | null;
    topics: Array<string>;
    executableCalls: Array<{
      __typename?: "ExecutableCall";
      id: string;
      target: any;
      value: any;
      calldata: any;
    }>;
    votes: Array<{
      __typename?: "Vote";
      id: any;
      voter: any;
      weight: any;
      support: VoteSupportType;
      timestamp: any;
      reason: string;
    }>;
    pollResult: {
      __typename?: "PollResult";
      for: any;
      forVotersCount: number;
      forPercentage: string;
      against: any;
      againstVotersCount: number;
      againstPercentage: string;
      abstain: any;
      abstainVotersCount: number;
      abstainPercentage: string;
      total: any;
      totalVotersCount: number;
      totalTowardsQuorum: any;
    };
  } | null;
};

export const ProposalSelectionFragmentDoc = gql`
    fragment ProposalSelection on Proposal {
  id
  proposer
  proposalId
  description
  status
  createdAt
  createdAtBlock
  unverifiedForumLink
  quorum
  pollResult {
    for
    forVotersCount
    forPercentage
    against
    againstVotersCount
    againstPercentage
    abstain
    abstainVotersCount
    abstainPercentage
    total
    totalVotersCount
    totalTowardsQuorum
  }
  voteEndBlock
  voteStartBlock
  queueEnd
  canceledAt
  canceledAt
  executedAt
  title
  topics
}
    `;
export const ExecutableCallSubsetFragmentDoc = gql`
    fragment ExecutableCallSubset on ExecutableCall {
  id
  target
  value
  calldata
}
    `;
export const ProposalVoteFragmentDoc = gql`
    fragment ProposalVote on Vote {
  id
  voter
  weight
  support
  timestamp
  reason
}
    `;
export const ProposalWithVotesFragmentDoc = gql`
    fragment ProposalWithVotes on Proposal {
  ...ProposalSelection
  executableCalls {
    ...ExecutableCallSubset
  }
  timelockId
  votes(orderBy: weight, orderDirection: desc) {
    ...ProposalVote
  }
}
    ${ProposalSelectionFragmentDoc}
${ExecutableCallSubsetFragmentDoc}
${ProposalVoteFragmentDoc}`;
export const GetProposalVotesDocument = gql`
    query GetProposalVotes($proposalId: String!, $orderBy: Vote_orderBy = weight, $orderDirection: OrderDirection = desc, $limit: Int!, $offset: Int) {
  votes(
    where: {proposalId: $proposalId}
    orderBy: $orderBy
    orderDirection: $orderDirection
    skip: $offset
    first: $limit
  ) {
    ...ProposalVote
  }
}
    ${ProposalVoteFragmentDoc}`;

/**
 * __useGetProposalVotesQuery__
 *
 * To run a query within a React component, call `useGetProposalVotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProposalVotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProposalVotesQuery({
 *   variables: {
 *      proposalId: // value for 'proposalId'
 *      orderBy: // value for 'orderBy'
 *      orderDirection: // value for 'orderDirection'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetProposalVotesQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetProposalVotesQuery,
    GetProposalVotesQueryVariables
  > &
    (
      | { variables: GetProposalVotesQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetProposalVotesQuery, GetProposalVotesQueryVariables>(
    GetProposalVotesDocument,
    options,
  );
}
export function useGetProposalVotesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetProposalVotesQuery,
    GetProposalVotesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetProposalVotesQuery,
    GetProposalVotesQueryVariables
  >(GetProposalVotesDocument, options);
}
export function useGetProposalVotesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetProposalVotesQuery,
        GetProposalVotesQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetProposalVotesQuery,
    GetProposalVotesQueryVariables
  >(GetProposalVotesDocument, options);
}
export type GetProposalVotesQueryHookResult = ReturnType<
  typeof useGetProposalVotesQuery
>;
export type GetProposalVotesLazyQueryHookResult = ReturnType<
  typeof useGetProposalVotesLazyQuery
>;
export type GetProposalVotesSuspenseQueryHookResult = ReturnType<
  typeof useGetProposalVotesSuspenseQuery
>;
export type GetProposalVotesQueryResult = Apollo.QueryResult<
  GetProposalVotesQuery,
  GetProposalVotesQueryVariables
>;
export const GetProposalsDocument = gql`
    query GetProposals($offset: Int, $limit: Int, $where: Proposal_filter, $orderBy: Proposal_orderBy = createdAt, $orderDirection: OrderDirection = desc) {
  proposals(
    skip: $offset
    first: $limit
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
  ) {
    ...ProposalSelection
  }
}
    ${ProposalSelectionFragmentDoc}`;

/**
 * __useGetProposalsQuery__
 *
 * To run a query within a React component, call `useGetProposalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProposalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProposalsQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      orderDirection: // value for 'orderDirection'
 *   },
 * });
 */
export function useGetProposalsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetProposalsQuery,
    GetProposalsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetProposalsQuery, GetProposalsQueryVariables>(
    GetProposalsDocument,
    options,
  );
}
export function useGetProposalsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetProposalsQuery,
    GetProposalsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetProposalsQuery, GetProposalsQueryVariables>(
    GetProposalsDocument,
    options,
  );
}
export function useGetProposalsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetProposalsQuery,
        GetProposalsQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetProposalsQuery, GetProposalsQueryVariables>(
    GetProposalsDocument,
    options,
  );
}
export type GetProposalsQueryHookResult = ReturnType<
  typeof useGetProposalsQuery
>;
export type GetProposalsLazyQueryHookResult = ReturnType<
  typeof useGetProposalsLazyQuery
>;
export type GetProposalsSuspenseQueryHookResult = ReturnType<
  typeof useGetProposalsSuspenseQuery
>;
export type GetProposalsQueryResult = Apollo.QueryResult<
  GetProposalsQuery,
  GetProposalsQueryVariables
>;
export const SearchProposalsDocument = gql`
    query SearchProposals($offset: Int, $limit: Int, $where: Proposal_filter, $text: String!) {
  proposals: proposalSearch(
    skip: $offset
    first: $limit
    where: $where
    text: $text
  ) {
    ...ProposalSelection
  }
}
    ${ProposalSelectionFragmentDoc}`;

/**
 * __useSearchProposalsQuery__
 *
 * To run a query within a React component, call `useSearchProposalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchProposalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchProposalsQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      where: // value for 'where'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useSearchProposalsQuery(
  baseOptions: Apollo.QueryHookOptions<
    SearchProposalsQuery,
    SearchProposalsQueryVariables
  > &
    (
      | { variables: SearchProposalsQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SearchProposalsQuery, SearchProposalsQueryVariables>(
    SearchProposalsDocument,
    options,
  );
}
export function useSearchProposalsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SearchProposalsQuery,
    SearchProposalsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SearchProposalsQuery,
    SearchProposalsQueryVariables
  >(SearchProposalsDocument, options);
}
export function useSearchProposalsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        SearchProposalsQuery,
        SearchProposalsQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    SearchProposalsQuery,
    SearchProposalsQueryVariables
  >(SearchProposalsDocument, options);
}
export type SearchProposalsQueryHookResult = ReturnType<
  typeof useSearchProposalsQuery
>;
export type SearchProposalsLazyQueryHookResult = ReturnType<
  typeof useSearchProposalsLazyQuery
>;
export type SearchProposalsSuspenseQueryHookResult = ReturnType<
  typeof useSearchProposalsSuspenseQuery
>;
export type SearchProposalsQueryResult = Apollo.QueryResult<
  SearchProposalsQuery,
  SearchProposalsQueryVariables
>;
export const GetProposalDocument = gql`
    query GetProposal($id: ID!) {
  proposal(id: $id) {
    ...ProposalWithVotes
  }
}
    ${ProposalWithVotesFragmentDoc}`;

/**
 * __useGetProposalQuery__
 *
 * To run a query within a React component, call `useGetProposalQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProposalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProposalQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProposalQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetProposalQuery,
    GetProposalQueryVariables
  > &
    (
      | { variables: GetProposalQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetProposalQuery, GetProposalQueryVariables>(
    GetProposalDocument,
    options,
  );
}
export function useGetProposalLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetProposalQuery,
    GetProposalQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetProposalQuery, GetProposalQueryVariables>(
    GetProposalDocument,
    options,
  );
}
export function useGetProposalSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetProposalQuery,
        GetProposalQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetProposalQuery, GetProposalQueryVariables>(
    GetProposalDocument,
    options,
  );
}
export type GetProposalQueryHookResult = ReturnType<typeof useGetProposalQuery>;
export type GetProposalLazyQueryHookResult = ReturnType<
  typeof useGetProposalLazyQuery
>;
export type GetProposalSuspenseQueryHookResult = ReturnType<
  typeof useGetProposalSuspenseQuery
>;
export type GetProposalQueryResult = Apollo.QueryResult<
  GetProposalQuery,
  GetProposalQueryVariables
>;
export const ProposalSelection = gql`
    fragment ProposalSelection on Proposal {
  id
  proposer
  proposalId
  description
  status
  createdAt
  createdAtBlock
  unverifiedForumLink
  quorum
  pollResult {
    for
    forVotersCount
    forPercentage
    against
    againstVotersCount
    againstPercentage
    abstain
    abstainVotersCount
    abstainPercentage
    total
    totalVotersCount
    totalTowardsQuorum
  }
  voteEndBlock
  voteStartBlock
  queueEnd
  canceledAt
  canceledAt
  executedAt
  title
  topics
}
    `;
export const ExecutableCallSubset = gql`
    fragment ExecutableCallSubset on ExecutableCall {
  id
  target
  value
  calldata
}
    `;
export const ProposalVote = gql`
    fragment ProposalVote on Vote {
  id
  voter
  weight
  support
  timestamp
  reason
}
    `;
export const ProposalWithVotes = gql`
    fragment ProposalWithVotes on Proposal {
  ...ProposalSelection
  executableCalls {
    ...ExecutableCallSubset
  }
  timelockId
  votes(orderBy: weight, orderDirection: desc) {
    ...ProposalVote
  }
}
    ${ProposalSelection}
${ExecutableCallSubset}
${ProposalVote}`;
export const GetProposalVotes = gql`
    query GetProposalVotes($proposalId: String!, $orderBy: Vote_orderBy = weight, $orderDirection: OrderDirection = desc, $limit: Int!, $offset: Int) {
  votes(
    where: {proposalId: $proposalId}
    orderBy: $orderBy
    orderDirection: $orderDirection
    skip: $offset
    first: $limit
  ) {
    ...ProposalVote
  }
}
    ${ProposalVote}`;
export const GetProposals = gql`
    query GetProposals($offset: Int, $limit: Int, $where: Proposal_filter, $orderBy: Proposal_orderBy = createdAt, $orderDirection: OrderDirection = desc) {
  proposals(
    skip: $offset
    first: $limit
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
  ) {
    ...ProposalSelection
  }
}
    ${ProposalSelection}`;
export const SearchProposals = gql`
    query SearchProposals($offset: Int, $limit: Int, $where: Proposal_filter, $text: String!) {
  proposals: proposalSearch(
    skip: $offset
    first: $limit
    where: $where
    text: $text
  ) {
    ...ProposalSelection
  }
}
    ${ProposalSelection}`;
export const GetProposal = gql`
    query GetProposal($id: ID!) {
  proposal(id: $id) {
    ...ProposalWithVotes
  }
}
    ${ProposalWithVotes}`;
