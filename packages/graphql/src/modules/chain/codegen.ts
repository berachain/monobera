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
  Int8: { input: any; output: any; }
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

/** Defines the order direction, either ascending or descending */
enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  block?: Maybe<Block>;
  blocks: Array<Block>;
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

type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  block?: Maybe<Block>;
  blocks: Array<Block>;
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

type GetBlocksTimeStampQueryVariables = Exact<{
  skip: Scalars['Int']['input'];
}>;


type GetBlocksTimeStampQuery = { __typename?: 'Query', newest: Array<{ __typename?: 'Block', timestamp: any, number: any }>, oldest: Array<{ __typename?: 'Block', timestamp: any, number: any }> };


 const GetBlocksTimeStampDocument = gql`
    query GetBlocksTimeStamp($skip: Int!) {
  newest: blocks(first: 1, orderBy: timestamp, orderDirection: desc) {
    timestamp
    number
  }
  oldest: blocks(first: 1, orderBy: timestamp, orderDirection: desc, skip: $skip) {
    timestamp
    number
  }
}
    `;

/**
 * __useGetBlocksTimeStampQuery__
 *
 * To run a query within a React component, call `useGetBlocksTimeStampQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBlocksTimeStampQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBlocksTimeStampQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useGetBlocksTimeStampQuery(baseOptions: Apollo.QueryHookOptions<GetBlocksTimeStampQuery, GetBlocksTimeStampQueryVariables> & ({ variables: GetBlocksTimeStampQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBlocksTimeStampQuery, GetBlocksTimeStampQueryVariables>(GetBlocksTimeStampDocument, options);
      }
export function useGetBlocksTimeStampLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBlocksTimeStampQuery, GetBlocksTimeStampQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBlocksTimeStampQuery, GetBlocksTimeStampQueryVariables>(GetBlocksTimeStampDocument, options);
        }
export function useGetBlocksTimeStampSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBlocksTimeStampQuery, GetBlocksTimeStampQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBlocksTimeStampQuery, GetBlocksTimeStampQueryVariables>(GetBlocksTimeStampDocument, options);
        }
export type GetBlocksTimeStampQueryHookResult = ReturnType<typeof useGetBlocksTimeStampQuery>;
export type GetBlocksTimeStampLazyQueryHookResult = ReturnType<typeof useGetBlocksTimeStampLazyQuery>;
export type GetBlocksTimeStampSuspenseQueryHookResult = ReturnType<typeof useGetBlocksTimeStampSuspenseQuery>;
export type GetBlocksTimeStampQueryResult = Apollo.QueryResult<GetBlocksTimeStampQuery, GetBlocksTimeStampQueryVariables>;

 const GetBlocksTimeStamp = gql`
    query GetBlocksTimeStamp($skip: Int!) {
  newest: blocks(first: 1, orderBy: timestamp, orderDirection: desc) {
    timestamp
    number
  }
  oldest: blocks(first: 1, orderBy: timestamp, orderDirection: desc, skip: $skip) {
    timestamp
    number
  }
}
    `;