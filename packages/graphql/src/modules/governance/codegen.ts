import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
type Maybe<T> = T | null;
type InputMaybe<T> = Maybe<T>;
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Bytes: { input: any; output: any; }
  /**
   * 8 bytes signed integer
   *
   */
  Int8: { input: any; output: any; }
  /**
   * A string representation of microseconds UNIX timestamp (16 digits)
   *
   */
  Timestamp: { input: any; output: any; }
};

enum Aggregation_Interval {
  Day = 'day',
  Hour = 'hour'
}

type Block = {
  __typename?: 'Block';
  author: Scalars['Bytes']['output'];
  baseFeePerGas?: Maybe<Scalars['BigInt']['output']>;
  difficulty: Scalars['BigInt']['output'];
  gasLimit: Scalars['BigInt']['output'];
  gasUsed: Scalars['BigInt']['output'];
  hash: Scalars['Bytes']['output'];
  id: Scalars['ID']['output'];
  number: Scalars['BigInt']['output'];
  parentHash: Scalars['Bytes']['output'];
  receiptsRoot: Scalars['Bytes']['output'];
  size?: Maybe<Scalars['BigInt']['output']>;
  stateRoot: Scalars['Bytes']['output'];
  timestamp: Scalars['BigInt']['output'];
  totalDifficulty: Scalars['BigInt']['output'];
  transactionsRoot: Scalars['Bytes']['output'];
  unclesHash: Scalars['Bytes']['output'];
};

type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

type Block_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Block_Filter>>>;
  author?: InputMaybe<Scalars['Bytes']['input']>;
  author_contains?: InputMaybe<Scalars['Bytes']['input']>;
  author_gt?: InputMaybe<Scalars['Bytes']['input']>;
  author_gte?: InputMaybe<Scalars['Bytes']['input']>;
  author_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  author_lt?: InputMaybe<Scalars['Bytes']['input']>;
  author_lte?: InputMaybe<Scalars['Bytes']['input']>;
  author_not?: InputMaybe<Scalars['Bytes']['input']>;
  author_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  author_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  baseFeePerGas?: InputMaybe<Scalars['BigInt']['input']>;
  baseFeePerGas_gt?: InputMaybe<Scalars['BigInt']['input']>;
  baseFeePerGas_gte?: InputMaybe<Scalars['BigInt']['input']>;
  baseFeePerGas_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  baseFeePerGas_lt?: InputMaybe<Scalars['BigInt']['input']>;
  baseFeePerGas_lte?: InputMaybe<Scalars['BigInt']['input']>;
  baseFeePerGas_not?: InputMaybe<Scalars['BigInt']['input']>;
  baseFeePerGas_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  difficulty?: InputMaybe<Scalars['BigInt']['input']>;
  difficulty_gt?: InputMaybe<Scalars['BigInt']['input']>;
  difficulty_gte?: InputMaybe<Scalars['BigInt']['input']>;
  difficulty_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  difficulty_lt?: InputMaybe<Scalars['BigInt']['input']>;
  difficulty_lte?: InputMaybe<Scalars['BigInt']['input']>;
  difficulty_not?: InputMaybe<Scalars['BigInt']['input']>;
  difficulty_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasLimit?: InputMaybe<Scalars['BigInt']['input']>;
  gasLimit_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gasLimit_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gasLimit_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasLimit_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gasLimit_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gasLimit_not?: InputMaybe<Scalars['BigInt']['input']>;
  gasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasUsed?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasUsed_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_not?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  hash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  hash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  hash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  hash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  hash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  hash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  hash_not?: InputMaybe<Scalars['Bytes']['input']>;
  hash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  hash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  number?: InputMaybe<Scalars['BigInt']['input']>;
  number_gt?: InputMaybe<Scalars['BigInt']['input']>;
  number_gte?: InputMaybe<Scalars['BigInt']['input']>;
  number_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  number_lt?: InputMaybe<Scalars['BigInt']['input']>;
  number_lte?: InputMaybe<Scalars['BigInt']['input']>;
  number_not?: InputMaybe<Scalars['BigInt']['input']>;
  number_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Block_Filter>>>;
  parentHash?: InputMaybe<Scalars['Bytes']['input']>;
  parentHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  parentHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  parentHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  parentHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  parentHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  parentHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  parentHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  parentHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  parentHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  receiptsRoot?: InputMaybe<Scalars['Bytes']['input']>;
  receiptsRoot_contains?: InputMaybe<Scalars['Bytes']['input']>;
  receiptsRoot_gt?: InputMaybe<Scalars['Bytes']['input']>;
  receiptsRoot_gte?: InputMaybe<Scalars['Bytes']['input']>;
  receiptsRoot_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  receiptsRoot_lt?: InputMaybe<Scalars['Bytes']['input']>;
  receiptsRoot_lte?: InputMaybe<Scalars['Bytes']['input']>;
  receiptsRoot_not?: InputMaybe<Scalars['Bytes']['input']>;
  receiptsRoot_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  receiptsRoot_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  size?: InputMaybe<Scalars['BigInt']['input']>;
  size_gt?: InputMaybe<Scalars['BigInt']['input']>;
  size_gte?: InputMaybe<Scalars['BigInt']['input']>;
  size_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  size_lt?: InputMaybe<Scalars['BigInt']['input']>;
  size_lte?: InputMaybe<Scalars['BigInt']['input']>;
  size_not?: InputMaybe<Scalars['BigInt']['input']>;
  size_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  stateRoot?: InputMaybe<Scalars['Bytes']['input']>;
  stateRoot_contains?: InputMaybe<Scalars['Bytes']['input']>;
  stateRoot_gt?: InputMaybe<Scalars['Bytes']['input']>;
  stateRoot_gte?: InputMaybe<Scalars['Bytes']['input']>;
  stateRoot_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  stateRoot_lt?: InputMaybe<Scalars['Bytes']['input']>;
  stateRoot_lte?: InputMaybe<Scalars['Bytes']['input']>;
  stateRoot_not?: InputMaybe<Scalars['Bytes']['input']>;
  stateRoot_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  stateRoot_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalDifficulty?: InputMaybe<Scalars['BigInt']['input']>;
  totalDifficulty_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalDifficulty_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalDifficulty_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalDifficulty_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalDifficulty_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalDifficulty_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalDifficulty_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionsRoot?: InputMaybe<Scalars['Bytes']['input']>;
  transactionsRoot_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionsRoot_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionsRoot_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionsRoot_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionsRoot_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionsRoot_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionsRoot_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionsRoot_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionsRoot_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  unclesHash?: InputMaybe<Scalars['Bytes']['input']>;
  unclesHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  unclesHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  unclesHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  unclesHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  unclesHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  unclesHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  unclesHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  unclesHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  unclesHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

enum Block_OrderBy {
  Author = 'author',
  BaseFeePerGas = 'baseFeePerGas',
  Difficulty = 'difficulty',
  GasLimit = 'gasLimit',
  GasUsed = 'gasUsed',
  Hash = 'hash',
  Id = 'id',
  Number = 'number',
  ParentHash = 'parentHash',
  ReceiptsRoot = 'receiptsRoot',
  Size = 'size',
  StateRoot = 'stateRoot',
  Timestamp = 'timestamp',
  TotalDifficulty = 'totalDifficulty',
  TransactionsRoot = 'transactionsRoot',
  UnclesHash = 'unclesHash'
}

type CallScheduled = {
  __typename?: 'CallScheduled';
  data: Scalars['Bytes']['output'];
  delay: Scalars['BigInt']['output'];
  id: Scalars['Int8']['output'];
  index: Scalars['BigInt']['output'];
  predecessor: Scalars['Bytes']['output'];
  target: Scalars['Bytes']['output'];
  timelockId: Scalars['Bytes']['output'];
  value: Scalars['BigInt']['output'];
};

type CallScheduled_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<CallScheduled_Filter>>>;
  data?: InputMaybe<Scalars['Bytes']['input']>;
  data_contains?: InputMaybe<Scalars['Bytes']['input']>;
  data_gt?: InputMaybe<Scalars['Bytes']['input']>;
  data_gte?: InputMaybe<Scalars['Bytes']['input']>;
  data_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  data_lt?: InputMaybe<Scalars['Bytes']['input']>;
  data_lte?: InputMaybe<Scalars['Bytes']['input']>;
  data_not?: InputMaybe<Scalars['Bytes']['input']>;
  data_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  data_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  delay?: InputMaybe<Scalars['BigInt']['input']>;
  delay_gt?: InputMaybe<Scalars['BigInt']['input']>;
  delay_gte?: InputMaybe<Scalars['BigInt']['input']>;
  delay_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  delay_lt?: InputMaybe<Scalars['BigInt']['input']>;
  delay_lte?: InputMaybe<Scalars['BigInt']['input']>;
  delay_not?: InputMaybe<Scalars['BigInt']['input']>;
  delay_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['Int8']['input']>;
  id_gt?: InputMaybe<Scalars['Int8']['input']>;
  id_gte?: InputMaybe<Scalars['Int8']['input']>;
  id_in?: InputMaybe<Array<Scalars['Int8']['input']>>;
  id_lt?: InputMaybe<Scalars['Int8']['input']>;
  id_lte?: InputMaybe<Scalars['Int8']['input']>;
  id_not?: InputMaybe<Scalars['Int8']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Int8']['input']>>;
  index?: InputMaybe<Scalars['BigInt']['input']>;
  index_gt?: InputMaybe<Scalars['BigInt']['input']>;
  index_gte?: InputMaybe<Scalars['BigInt']['input']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  index_lt?: InputMaybe<Scalars['BigInt']['input']>;
  index_lte?: InputMaybe<Scalars['BigInt']['input']>;
  index_not?: InputMaybe<Scalars['BigInt']['input']>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<CallScheduled_Filter>>>;
  predecessor?: InputMaybe<Scalars['Bytes']['input']>;
  predecessor_contains?: InputMaybe<Scalars['Bytes']['input']>;
  predecessor_gt?: InputMaybe<Scalars['Bytes']['input']>;
  predecessor_gte?: InputMaybe<Scalars['Bytes']['input']>;
  predecessor_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  predecessor_lt?: InputMaybe<Scalars['Bytes']['input']>;
  predecessor_lte?: InputMaybe<Scalars['Bytes']['input']>;
  predecessor_not?: InputMaybe<Scalars['Bytes']['input']>;
  predecessor_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  predecessor_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  target?: InputMaybe<Scalars['Bytes']['input']>;
  target_contains?: InputMaybe<Scalars['Bytes']['input']>;
  target_gt?: InputMaybe<Scalars['Bytes']['input']>;
  target_gte?: InputMaybe<Scalars['Bytes']['input']>;
  target_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  target_lt?: InputMaybe<Scalars['Bytes']['input']>;
  target_lte?: InputMaybe<Scalars['Bytes']['input']>;
  target_not?: InputMaybe<Scalars['Bytes']['input']>;
  target_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  target_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  timelockId?: InputMaybe<Scalars['Bytes']['input']>;
  timelockId_contains?: InputMaybe<Scalars['Bytes']['input']>;
  timelockId_gt?: InputMaybe<Scalars['Bytes']['input']>;
  timelockId_gte?: InputMaybe<Scalars['Bytes']['input']>;
  timelockId_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  timelockId_lt?: InputMaybe<Scalars['Bytes']['input']>;
  timelockId_lte?: InputMaybe<Scalars['Bytes']['input']>;
  timelockId_not?: InputMaybe<Scalars['Bytes']['input']>;
  timelockId_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  timelockId_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  value?: InputMaybe<Scalars['BigInt']['input']>;
  value_gt?: InputMaybe<Scalars['BigInt']['input']>;
  value_gte?: InputMaybe<Scalars['BigInt']['input']>;
  value_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  value_lt?: InputMaybe<Scalars['BigInt']['input']>;
  value_lte?: InputMaybe<Scalars['BigInt']['input']>;
  value_not?: InputMaybe<Scalars['BigInt']['input']>;
  value_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

enum CallScheduled_OrderBy {
  Data = 'data',
  Delay = 'delay',
  Id = 'id',
  Index = 'index',
  Predecessor = 'predecessor',
  Target = 'target',
  TimelockId = 'timelockId',
  Value = 'value'
}

/** Defines the order direction, either ascending or descending */
enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

type Proposal = {
  __typename?: 'Proposal';
  calldatas: Array<Scalars['Bytes']['output']>;
  canceledAt?: Maybe<Scalars['BigInt']['output']>;
  canceledAtBlock?: Maybe<Scalars['BigInt']['output']>;
  contentEncoding?: Maybe<Scalars['String']['output']>;
  contentType?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['BigInt']['output'];
  createdAtBlock: Scalars['BigInt']['output'];
  description: Scalars['String']['output'];
  executedAt?: Maybe<Scalars['BigInt']['output']>;
  executedAtBlock?: Maybe<Scalars['BigInt']['output']>;
  forumLink?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  proposalId: Scalars['BigInt']['output'];
  proposalVotes?: Maybe<ProposalVote>;
  proposer: Scalars['Bytes']['output'];
  queueEnd?: Maybe<Scalars['BigInt']['output']>;
  queueStart?: Maybe<Scalars['BigInt']['output']>;
  queueStartBlock?: Maybe<Scalars['BigInt']['output']>;
  quorum: Scalars['BigInt']['output'];
  signatures: Array<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  targets: Array<Scalars['Bytes']['output']>;
  timelock?: Maybe<CallScheduled>;
  title?: Maybe<Scalars['String']['output']>;
  topics: Array<Scalars['String']['output']>;
  values: Array<Scalars['BigInt']['output']>;
  voteEnd: Scalars['BigInt']['output'];
  voteStart: Scalars['BigInt']['output'];
  votes: Array<Vote>;
};


type ProposalVotesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Vote_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Vote_Filter>;
};

type ProposalVote = {
  __typename?: 'ProposalVote';
  abstain: Scalars['BigInt']['output'];
  against: Scalars['BigInt']['output'];
  for: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  proposalId: Proposal;
  total: Scalars['BigInt']['output'];
};

type ProposalVote_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  abstain?: InputMaybe<Scalars['BigInt']['input']>;
  abstain_gt?: InputMaybe<Scalars['BigInt']['input']>;
  abstain_gte?: InputMaybe<Scalars['BigInt']['input']>;
  abstain_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  abstain_lt?: InputMaybe<Scalars['BigInt']['input']>;
  abstain_lte?: InputMaybe<Scalars['BigInt']['input']>;
  abstain_not?: InputMaybe<Scalars['BigInt']['input']>;
  abstain_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  against?: InputMaybe<Scalars['BigInt']['input']>;
  against_gt?: InputMaybe<Scalars['BigInt']['input']>;
  against_gte?: InputMaybe<Scalars['BigInt']['input']>;
  against_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  against_lt?: InputMaybe<Scalars['BigInt']['input']>;
  against_lte?: InputMaybe<Scalars['BigInt']['input']>;
  against_not?: InputMaybe<Scalars['BigInt']['input']>;
  against_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<ProposalVote_Filter>>>;
  for?: InputMaybe<Scalars['BigInt']['input']>;
  for_gt?: InputMaybe<Scalars['BigInt']['input']>;
  for_gte?: InputMaybe<Scalars['BigInt']['input']>;
  for_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  for_lt?: InputMaybe<Scalars['BigInt']['input']>;
  for_lte?: InputMaybe<Scalars['BigInt']['input']>;
  for_not?: InputMaybe<Scalars['BigInt']['input']>;
  for_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<ProposalVote_Filter>>>;
  proposalId?: InputMaybe<Scalars['String']['input']>;
  proposalId_?: InputMaybe<Proposal_Filter>;
  proposalId_contains?: InputMaybe<Scalars['String']['input']>;
  proposalId_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  proposalId_ends_with?: InputMaybe<Scalars['String']['input']>;
  proposalId_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  proposalId_gt?: InputMaybe<Scalars['String']['input']>;
  proposalId_gte?: InputMaybe<Scalars['String']['input']>;
  proposalId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  proposalId_lt?: InputMaybe<Scalars['String']['input']>;
  proposalId_lte?: InputMaybe<Scalars['String']['input']>;
  proposalId_not?: InputMaybe<Scalars['String']['input']>;
  proposalId_not_contains?: InputMaybe<Scalars['String']['input']>;
  proposalId_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  proposalId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  proposalId_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  proposalId_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  proposalId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  proposalId_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  proposalId_starts_with?: InputMaybe<Scalars['String']['input']>;
  proposalId_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  total?: InputMaybe<Scalars['BigInt']['input']>;
  total_gt?: InputMaybe<Scalars['BigInt']['input']>;
  total_gte?: InputMaybe<Scalars['BigInt']['input']>;
  total_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  total_lt?: InputMaybe<Scalars['BigInt']['input']>;
  total_lte?: InputMaybe<Scalars['BigInt']['input']>;
  total_not?: InputMaybe<Scalars['BigInt']['input']>;
  total_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

enum ProposalVote_OrderBy {
  Abstain = 'abstain',
  Against = 'against',
  For = 'for',
  Id = 'id',
  ProposalId = 'proposalId',
  ProposalIdCanceledAt = 'proposalId__canceledAt',
  ProposalIdCanceledAtBlock = 'proposalId__canceledAtBlock',
  ProposalIdContentEncoding = 'proposalId__contentEncoding',
  ProposalIdContentType = 'proposalId__contentType',
  ProposalIdCreatedAt = 'proposalId__createdAt',
  ProposalIdCreatedAtBlock = 'proposalId__createdAtBlock',
  ProposalIdDescription = 'proposalId__description',
  ProposalIdExecutedAt = 'proposalId__executedAt',
  ProposalIdExecutedAtBlock = 'proposalId__executedAtBlock',
  ProposalIdForumLink = 'proposalId__forumLink',
  ProposalIdId = 'proposalId__id',
  ProposalIdProposalId = 'proposalId__proposalId',
  ProposalIdProposer = 'proposalId__proposer',
  ProposalIdQueueEnd = 'proposalId__queueEnd',
  ProposalIdQueueStart = 'proposalId__queueStart',
  ProposalIdQueueStartBlock = 'proposalId__queueStartBlock',
  ProposalIdQuorum = 'proposalId__quorum',
  ProposalIdStatus = 'proposalId__status',
  ProposalIdTitle = 'proposalId__title',
  ProposalIdVoteEnd = 'proposalId__voteEnd',
  ProposalIdVoteStart = 'proposalId__voteStart',
  Total = 'total'
}

type Proposal_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Proposal_Filter>>>;
  calldatas?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  calldatas_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  calldatas_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  calldatas_not?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  calldatas_not_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  calldatas_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  canceledAt?: InputMaybe<Scalars['BigInt']['input']>;
  canceledAtBlock?: InputMaybe<Scalars['BigInt']['input']>;
  canceledAtBlock_gt?: InputMaybe<Scalars['BigInt']['input']>;
  canceledAtBlock_gte?: InputMaybe<Scalars['BigInt']['input']>;
  canceledAtBlock_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  canceledAtBlock_lt?: InputMaybe<Scalars['BigInt']['input']>;
  canceledAtBlock_lte?: InputMaybe<Scalars['BigInt']['input']>;
  canceledAtBlock_not?: InputMaybe<Scalars['BigInt']['input']>;
  canceledAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  canceledAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  canceledAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  canceledAt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  canceledAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  canceledAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  canceledAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  canceledAt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  contentEncoding?: InputMaybe<Scalars['String']['input']>;
  contentEncoding_contains?: InputMaybe<Scalars['String']['input']>;
  contentEncoding_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  contentEncoding_ends_with?: InputMaybe<Scalars['String']['input']>;
  contentEncoding_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contentEncoding_gt?: InputMaybe<Scalars['String']['input']>;
  contentEncoding_gte?: InputMaybe<Scalars['String']['input']>;
  contentEncoding_in?: InputMaybe<Array<Scalars['String']['input']>>;
  contentEncoding_lt?: InputMaybe<Scalars['String']['input']>;
  contentEncoding_lte?: InputMaybe<Scalars['String']['input']>;
  contentEncoding_not?: InputMaybe<Scalars['String']['input']>;
  contentEncoding_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentEncoding_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  contentEncoding_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  contentEncoding_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contentEncoding_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  contentEncoding_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  contentEncoding_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contentEncoding_starts_with?: InputMaybe<Scalars['String']['input']>;
  contentEncoding_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contentType?: InputMaybe<Scalars['String']['input']>;
  contentType_contains?: InputMaybe<Scalars['String']['input']>;
  contentType_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  contentType_ends_with?: InputMaybe<Scalars['String']['input']>;
  contentType_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contentType_gt?: InputMaybe<Scalars['String']['input']>;
  contentType_gte?: InputMaybe<Scalars['String']['input']>;
  contentType_in?: InputMaybe<Array<Scalars['String']['input']>>;
  contentType_lt?: InputMaybe<Scalars['String']['input']>;
  contentType_lte?: InputMaybe<Scalars['String']['input']>;
  contentType_not?: InputMaybe<Scalars['String']['input']>;
  contentType_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentType_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  contentType_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  contentType_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contentType_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  contentType_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  contentType_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contentType_starts_with?: InputMaybe<Scalars['String']['input']>;
  contentType_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlock?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlock_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlock_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlock_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAtBlock_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlock_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlock_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  description_ends_with?: InputMaybe<Scalars['String']['input']>;
  description_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description_gt?: InputMaybe<Scalars['String']['input']>;
  description_gte?: InputMaybe<Scalars['String']['input']>;
  description_in?: InputMaybe<Array<Scalars['String']['input']>>;
  description_lt?: InputMaybe<Scalars['String']['input']>;
  description_lte?: InputMaybe<Scalars['String']['input']>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  description_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  description_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  description_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  description_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description_starts_with?: InputMaybe<Scalars['String']['input']>;
  description_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  executedAt?: InputMaybe<Scalars['BigInt']['input']>;
  executedAtBlock?: InputMaybe<Scalars['BigInt']['input']>;
  executedAtBlock_gt?: InputMaybe<Scalars['BigInt']['input']>;
  executedAtBlock_gte?: InputMaybe<Scalars['BigInt']['input']>;
  executedAtBlock_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  executedAtBlock_lt?: InputMaybe<Scalars['BigInt']['input']>;
  executedAtBlock_lte?: InputMaybe<Scalars['BigInt']['input']>;
  executedAtBlock_not?: InputMaybe<Scalars['BigInt']['input']>;
  executedAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  executedAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  executedAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  executedAt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  executedAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  executedAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  executedAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  executedAt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  forumLink?: InputMaybe<Scalars['String']['input']>;
  forumLink_contains?: InputMaybe<Scalars['String']['input']>;
  forumLink_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  forumLink_ends_with?: InputMaybe<Scalars['String']['input']>;
  forumLink_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  forumLink_gt?: InputMaybe<Scalars['String']['input']>;
  forumLink_gte?: InputMaybe<Scalars['String']['input']>;
  forumLink_in?: InputMaybe<Array<Scalars['String']['input']>>;
  forumLink_lt?: InputMaybe<Scalars['String']['input']>;
  forumLink_lte?: InputMaybe<Scalars['String']['input']>;
  forumLink_not?: InputMaybe<Scalars['String']['input']>;
  forumLink_not_contains?: InputMaybe<Scalars['String']['input']>;
  forumLink_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  forumLink_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  forumLink_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  forumLink_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  forumLink_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  forumLink_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  forumLink_starts_with?: InputMaybe<Scalars['String']['input']>;
  forumLink_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Proposal_Filter>>>;
  proposalId?: InputMaybe<Scalars['BigInt']['input']>;
  proposalId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  proposalId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  proposalId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  proposalId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  proposalId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  proposalId_not?: InputMaybe<Scalars['BigInt']['input']>;
  proposalId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  proposalVotes_?: InputMaybe<ProposalVote_Filter>;
  proposer?: InputMaybe<Scalars['Bytes']['input']>;
  proposer_contains?: InputMaybe<Scalars['Bytes']['input']>;
  proposer_gt?: InputMaybe<Scalars['Bytes']['input']>;
  proposer_gte?: InputMaybe<Scalars['Bytes']['input']>;
  proposer_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  proposer_lt?: InputMaybe<Scalars['Bytes']['input']>;
  proposer_lte?: InputMaybe<Scalars['Bytes']['input']>;
  proposer_not?: InputMaybe<Scalars['Bytes']['input']>;
  proposer_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  proposer_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  queueEnd?: InputMaybe<Scalars['BigInt']['input']>;
  queueEnd_gt?: InputMaybe<Scalars['BigInt']['input']>;
  queueEnd_gte?: InputMaybe<Scalars['BigInt']['input']>;
  queueEnd_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  queueEnd_lt?: InputMaybe<Scalars['BigInt']['input']>;
  queueEnd_lte?: InputMaybe<Scalars['BigInt']['input']>;
  queueEnd_not?: InputMaybe<Scalars['BigInt']['input']>;
  queueEnd_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  queueStart?: InputMaybe<Scalars['BigInt']['input']>;
  queueStartBlock?: InputMaybe<Scalars['BigInt']['input']>;
  queueStartBlock_gt?: InputMaybe<Scalars['BigInt']['input']>;
  queueStartBlock_gte?: InputMaybe<Scalars['BigInt']['input']>;
  queueStartBlock_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  queueStartBlock_lt?: InputMaybe<Scalars['BigInt']['input']>;
  queueStartBlock_lte?: InputMaybe<Scalars['BigInt']['input']>;
  queueStartBlock_not?: InputMaybe<Scalars['BigInt']['input']>;
  queueStartBlock_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  queueStart_gt?: InputMaybe<Scalars['BigInt']['input']>;
  queueStart_gte?: InputMaybe<Scalars['BigInt']['input']>;
  queueStart_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  queueStart_lt?: InputMaybe<Scalars['BigInt']['input']>;
  queueStart_lte?: InputMaybe<Scalars['BigInt']['input']>;
  queueStart_not?: InputMaybe<Scalars['BigInt']['input']>;
  queueStart_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  quorum?: InputMaybe<Scalars['BigInt']['input']>;
  quorum_gt?: InputMaybe<Scalars['BigInt']['input']>;
  quorum_gte?: InputMaybe<Scalars['BigInt']['input']>;
  quorum_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  quorum_lt?: InputMaybe<Scalars['BigInt']['input']>;
  quorum_lte?: InputMaybe<Scalars['BigInt']['input']>;
  quorum_not?: InputMaybe<Scalars['BigInt']['input']>;
  quorum_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  signatures?: InputMaybe<Array<Scalars['String']['input']>>;
  signatures_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  signatures_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  signatures_not?: InputMaybe<Array<Scalars['String']['input']>>;
  signatures_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  signatures_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  status?: InputMaybe<Scalars['String']['input']>;
  status_contains?: InputMaybe<Scalars['String']['input']>;
  status_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  status_ends_with?: InputMaybe<Scalars['String']['input']>;
  status_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  status_gt?: InputMaybe<Scalars['String']['input']>;
  status_gte?: InputMaybe<Scalars['String']['input']>;
  status_in?: InputMaybe<Array<Scalars['String']['input']>>;
  status_lt?: InputMaybe<Scalars['String']['input']>;
  status_lte?: InputMaybe<Scalars['String']['input']>;
  status_not?: InputMaybe<Scalars['String']['input']>;
  status_not_contains?: InputMaybe<Scalars['String']['input']>;
  status_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  status_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  status_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  status_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  status_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  status_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  status_starts_with?: InputMaybe<Scalars['String']['input']>;
  status_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  targets?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  targets_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  targets_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  targets_not?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  targets_not_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  targets_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  timelock?: InputMaybe<Scalars['Int']['input']>;
  timelock_?: InputMaybe<CallScheduled_Filter>;
  timelock_gt?: InputMaybe<Scalars['Int']['input']>;
  timelock_gte?: InputMaybe<Scalars['Int']['input']>;
  timelock_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  timelock_lt?: InputMaybe<Scalars['Int']['input']>;
  timelock_lte?: InputMaybe<Scalars['Int']['input']>;
  timelock_not?: InputMaybe<Scalars['Int']['input']>;
  timelock_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  title_ends_with?: InputMaybe<Scalars['String']['input']>;
  title_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  title_gt?: InputMaybe<Scalars['String']['input']>;
  title_gte?: InputMaybe<Scalars['String']['input']>;
  title_in?: InputMaybe<Array<Scalars['String']['input']>>;
  title_lt?: InputMaybe<Scalars['String']['input']>;
  title_lte?: InputMaybe<Scalars['String']['input']>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  title_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  title_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  title_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  title_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  title_starts_with?: InputMaybe<Scalars['String']['input']>;
  title_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  topics?: InputMaybe<Array<Scalars['String']['input']>>;
  topics_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  topics_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  topics_not?: InputMaybe<Array<Scalars['String']['input']>>;
  topics_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  topics_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  values?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  values_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  values_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  values_not?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  values_not_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  values_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  voteEnd?: InputMaybe<Scalars['BigInt']['input']>;
  voteEnd_gt?: InputMaybe<Scalars['BigInt']['input']>;
  voteEnd_gte?: InputMaybe<Scalars['BigInt']['input']>;
  voteEnd_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  voteEnd_lt?: InputMaybe<Scalars['BigInt']['input']>;
  voteEnd_lte?: InputMaybe<Scalars['BigInt']['input']>;
  voteEnd_not?: InputMaybe<Scalars['BigInt']['input']>;
  voteEnd_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  voteStart?: InputMaybe<Scalars['BigInt']['input']>;
  voteStart_gt?: InputMaybe<Scalars['BigInt']['input']>;
  voteStart_gte?: InputMaybe<Scalars['BigInt']['input']>;
  voteStart_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  voteStart_lt?: InputMaybe<Scalars['BigInt']['input']>;
  voteStart_lte?: InputMaybe<Scalars['BigInt']['input']>;
  voteStart_not?: InputMaybe<Scalars['BigInt']['input']>;
  voteStart_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  votes_?: InputMaybe<Vote_Filter>;
};

enum Proposal_OrderBy {
  Calldatas = 'calldatas',
  CanceledAt = 'canceledAt',
  CanceledAtBlock = 'canceledAtBlock',
  ContentEncoding = 'contentEncoding',
  ContentType = 'contentType',
  CreatedAt = 'createdAt',
  CreatedAtBlock = 'createdAtBlock',
  Description = 'description',
  ExecutedAt = 'executedAt',
  ExecutedAtBlock = 'executedAtBlock',
  ForumLink = 'forumLink',
  Id = 'id',
  ProposalId = 'proposalId',
  ProposalVotes = 'proposalVotes',
  ProposalVotesAbstain = 'proposalVotes__abstain',
  ProposalVotesAgainst = 'proposalVotes__against',
  ProposalVotesFor = 'proposalVotes__for',
  ProposalVotesId = 'proposalVotes__id',
  ProposalVotesTotal = 'proposalVotes__total',
  Proposer = 'proposer',
  QueueEnd = 'queueEnd',
  QueueStart = 'queueStart',
  QueueStartBlock = 'queueStartBlock',
  Quorum = 'quorum',
  Signatures = 'signatures',
  Status = 'status',
  Targets = 'targets',
  Timelock = 'timelock',
  TimelockData = 'timelock__data',
  TimelockDelay = 'timelock__delay',
  TimelockId = 'timelock__id',
  TimelockIndex = 'timelock__index',
  TimelockPredecessor = 'timelock__predecessor',
  TimelockTarget = 'timelock__target',
  TimelockTimelockId = 'timelock__timelockId',
  TimelockValue = 'timelock__value',
  Title = 'title',
  Topics = 'topics',
  Values = 'values',
  VoteEnd = 'voteEnd',
  VoteStart = 'voteStart',
  Votes = 'votes'
}

type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  block?: Maybe<Block>;
  blocks: Array<Block>;
  callScheduled?: Maybe<CallScheduled>;
  callScheduleds: Array<CallScheduled>;
  proposal?: Maybe<Proposal>;
  proposalVote?: Maybe<ProposalVote>;
  proposalVotes: Array<ProposalVote>;
  proposals: Array<Proposal>;
  vote?: Maybe<Vote>;
  votes: Array<Vote>;
};


type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


type QueryBlockArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


type QueryBlocksArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Block_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Block_Filter>;
};


type QueryCallScheduledArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


type QueryCallScheduledsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CallScheduled_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CallScheduled_Filter>;
};


type QueryProposalArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


type QueryProposalVoteArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


type QueryProposalVotesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProposalVote_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProposalVote_Filter>;
};


type QueryProposalsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Proposal_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Proposal_Filter>;
};


type QueryVoteArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


type QueryVotesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Vote_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Vote_Filter>;
};

type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  block?: Maybe<Block>;
  blocks: Array<Block>;
  callScheduled?: Maybe<CallScheduled>;
  callScheduleds: Array<CallScheduled>;
  proposal?: Maybe<Proposal>;
  proposalVote?: Maybe<ProposalVote>;
  proposalVotes: Array<ProposalVote>;
  proposals: Array<Proposal>;
  vote?: Maybe<Vote>;
  votes: Array<Vote>;
};


type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


type SubscriptionBlockArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


type SubscriptionBlocksArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Block_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Block_Filter>;
};


type SubscriptionCallScheduledArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


type SubscriptionCallScheduledsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CallScheduled_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CallScheduled_Filter>;
};


type SubscriptionProposalArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


type SubscriptionProposalVoteArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


type SubscriptionProposalVotesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProposalVote_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProposalVote_Filter>;
};


type SubscriptionProposalsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Proposal_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Proposal_Filter>;
};


type SubscriptionVoteArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


type SubscriptionVotesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Vote_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Vote_Filter>;
};

type Vote = {
  __typename?: 'Vote';
  id: Scalars['Int8']['output'];
  params?: Maybe<Scalars['Bytes']['output']>;
  proposalId: Proposal;
  reason: Scalars['String']['output'];
  support: Scalars['Int']['output'];
  timestamp: Scalars['BigInt']['output'];
  voter: Scalars['Bytes']['output'];
  weight: Scalars['BigInt']['output'];
};

type Vote_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Vote_Filter>>>;
  id?: InputMaybe<Scalars['Int8']['input']>;
  id_gt?: InputMaybe<Scalars['Int8']['input']>;
  id_gte?: InputMaybe<Scalars['Int8']['input']>;
  id_in?: InputMaybe<Array<Scalars['Int8']['input']>>;
  id_lt?: InputMaybe<Scalars['Int8']['input']>;
  id_lte?: InputMaybe<Scalars['Int8']['input']>;
  id_not?: InputMaybe<Scalars['Int8']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Int8']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Vote_Filter>>>;
  params?: InputMaybe<Scalars['Bytes']['input']>;
  params_contains?: InputMaybe<Scalars['Bytes']['input']>;
  params_gt?: InputMaybe<Scalars['Bytes']['input']>;
  params_gte?: InputMaybe<Scalars['Bytes']['input']>;
  params_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  params_lt?: InputMaybe<Scalars['Bytes']['input']>;
  params_lte?: InputMaybe<Scalars['Bytes']['input']>;
  params_not?: InputMaybe<Scalars['Bytes']['input']>;
  params_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  params_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  proposalId?: InputMaybe<Scalars['String']['input']>;
  proposalId_?: InputMaybe<Proposal_Filter>;
  proposalId_contains?: InputMaybe<Scalars['String']['input']>;
  proposalId_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  proposalId_ends_with?: InputMaybe<Scalars['String']['input']>;
  proposalId_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  proposalId_gt?: InputMaybe<Scalars['String']['input']>;
  proposalId_gte?: InputMaybe<Scalars['String']['input']>;
  proposalId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  proposalId_lt?: InputMaybe<Scalars['String']['input']>;
  proposalId_lte?: InputMaybe<Scalars['String']['input']>;
  proposalId_not?: InputMaybe<Scalars['String']['input']>;
  proposalId_not_contains?: InputMaybe<Scalars['String']['input']>;
  proposalId_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  proposalId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  proposalId_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  proposalId_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  proposalId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  proposalId_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  proposalId_starts_with?: InputMaybe<Scalars['String']['input']>;
  proposalId_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  reason_contains?: InputMaybe<Scalars['String']['input']>;
  reason_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  reason_ends_with?: InputMaybe<Scalars['String']['input']>;
  reason_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  reason_gt?: InputMaybe<Scalars['String']['input']>;
  reason_gte?: InputMaybe<Scalars['String']['input']>;
  reason_in?: InputMaybe<Array<Scalars['String']['input']>>;
  reason_lt?: InputMaybe<Scalars['String']['input']>;
  reason_lte?: InputMaybe<Scalars['String']['input']>;
  reason_not?: InputMaybe<Scalars['String']['input']>;
  reason_not_contains?: InputMaybe<Scalars['String']['input']>;
  reason_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  reason_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  reason_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  reason_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  reason_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  reason_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  reason_starts_with?: InputMaybe<Scalars['String']['input']>;
  reason_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  support?: InputMaybe<Scalars['Int']['input']>;
  support_gt?: InputMaybe<Scalars['Int']['input']>;
  support_gte?: InputMaybe<Scalars['Int']['input']>;
  support_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  support_lt?: InputMaybe<Scalars['Int']['input']>;
  support_lte?: InputMaybe<Scalars['Int']['input']>;
  support_not?: InputMaybe<Scalars['Int']['input']>;
  support_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  voter?: InputMaybe<Scalars['Bytes']['input']>;
  voter_contains?: InputMaybe<Scalars['Bytes']['input']>;
  voter_gt?: InputMaybe<Scalars['Bytes']['input']>;
  voter_gte?: InputMaybe<Scalars['Bytes']['input']>;
  voter_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  voter_lt?: InputMaybe<Scalars['Bytes']['input']>;
  voter_lte?: InputMaybe<Scalars['Bytes']['input']>;
  voter_not?: InputMaybe<Scalars['Bytes']['input']>;
  voter_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  voter_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  weight?: InputMaybe<Scalars['BigInt']['input']>;
  weight_gt?: InputMaybe<Scalars['BigInt']['input']>;
  weight_gte?: InputMaybe<Scalars['BigInt']['input']>;
  weight_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  weight_lt?: InputMaybe<Scalars['BigInt']['input']>;
  weight_lte?: InputMaybe<Scalars['BigInt']['input']>;
  weight_not?: InputMaybe<Scalars['BigInt']['input']>;
  weight_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

enum Vote_OrderBy {
  Id = 'id',
  Params = 'params',
  ProposalId = 'proposalId',
  ProposalIdCanceledAt = 'proposalId__canceledAt',
  ProposalIdCanceledAtBlock = 'proposalId__canceledAtBlock',
  ProposalIdContentEncoding = 'proposalId__contentEncoding',
  ProposalIdContentType = 'proposalId__contentType',
  ProposalIdCreatedAt = 'proposalId__createdAt',
  ProposalIdCreatedAtBlock = 'proposalId__createdAtBlock',
  ProposalIdDescription = 'proposalId__description',
  ProposalIdExecutedAt = 'proposalId__executedAt',
  ProposalIdExecutedAtBlock = 'proposalId__executedAtBlock',
  ProposalIdForumLink = 'proposalId__forumLink',
  ProposalIdId = 'proposalId__id',
  ProposalIdProposalId = 'proposalId__proposalId',
  ProposalIdProposer = 'proposalId__proposer',
  ProposalIdQueueEnd = 'proposalId__queueEnd',
  ProposalIdQueueStart = 'proposalId__queueStart',
  ProposalIdQueueStartBlock = 'proposalId__queueStartBlock',
  ProposalIdQuorum = 'proposalId__quorum',
  ProposalIdStatus = 'proposalId__status',
  ProposalIdTitle = 'proposalId__title',
  ProposalIdVoteEnd = 'proposalId__voteEnd',
  ProposalIdVoteStart = 'proposalId__voteStart',
  Reason = 'reason',
  Support = 'support',
  Timestamp = 'timestamp',
  Voter = 'voter',
  Weight = 'weight'
}

type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['Bytes']['output']>;
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
};

/** The type for the top-level _meta field */
type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

type GetProposalsQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


type GetProposalsQuery = { __typename?: 'Query', proposals: Array<{ __typename?: 'Proposal', status: string, createdAt: any, createdAtBlock: any, voteStart: any, voteEnd: any, canceledAt?: any | null, canceledAtBlock?: any | null, executedAt?: any | null, executedAtBlock?: any | null, description: string, id: string, proposalId: any, queueEnd?: any | null, queueStartBlock?: any | null, quorum: any, queueStart?: any | null, proposalVotes?: { __typename?: 'ProposalVote', abstain: any, against: any, for: any, id: string, total: any } | null }> };


 const GetProposalsDocument = gql`
    query getProposals($offset: Int, $limit: Int) {
  proposals(
    skip: $offset
    first: $limit
    orderBy: createdAt
    orderDirection: desc
  ) {
    status
    createdAt
    createdAtBlock
    voteStart
    voteEnd
    canceledAt
    canceledAtBlock
    executedAt
    executedAtBlock
    description
    id
    proposalId
    proposalVotes {
      abstain
      against
      for
      id
      total
    }
    queueEnd
    queueStartBlock
    quorum
    queueStart
  }
}
    `;

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
 *   },
 * });
 */
export function useGetProposalsQuery(baseOptions?: Apollo.QueryHookOptions<GetProposalsQuery, GetProposalsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProposalsQuery, GetProposalsQueryVariables>(GetProposalsDocument, options);
      }
export function useGetProposalsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProposalsQuery, GetProposalsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProposalsQuery, GetProposalsQueryVariables>(GetProposalsDocument, options);
        }
export function useGetProposalsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProposalsQuery, GetProposalsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProposalsQuery, GetProposalsQueryVariables>(GetProposalsDocument, options);
        }
export type GetProposalsQueryHookResult = ReturnType<typeof useGetProposalsQuery>;
export type GetProposalsLazyQueryHookResult = ReturnType<typeof useGetProposalsLazyQuery>;
export type GetProposalsSuspenseQueryHookResult = ReturnType<typeof useGetProposalsSuspenseQuery>;
export type GetProposalsQueryResult = Apollo.QueryResult<GetProposalsQuery, GetProposalsQueryVariables>;

 const GetProposals = gql`
    query getProposals($offset: Int, $limit: Int) {
  proposals(
    skip: $offset
    first: $limit
    orderBy: createdAt
    orderDirection: desc
  ) {
    status
    createdAt
    createdAtBlock
    voteStart
    voteEnd
    canceledAt
    canceledAtBlock
    executedAt
    executedAtBlock
    description
    id
    proposalId
    proposalVotes {
      abstain
      against
      for
      id
      total
    }
    queueEnd
    queueStartBlock
    quorum
    queueStart
  }
}
    `;