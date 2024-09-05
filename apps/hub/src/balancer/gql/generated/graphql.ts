/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  AmountHumanReadable: { input: string; output: string; }
  BigDecimal: { input: string; output: string; }
  BigInt: { input: string; output: string; }
  Bytes: { input: string; output: string; }
  Date: { input: any; output: any; }
  GqlBigNumber: { input: string; output: string; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type GqlBalancePoolAprItem = {
  __typename: 'GqlBalancePoolAprItem';
  apr: GqlPoolAprValue;
  id: Scalars['ID']['output'];
  subItems?: Maybe<Array<GqlBalancePoolAprSubItem>>;
  title: Scalars['String']['output'];
};

export type GqlBalancePoolAprSubItem = {
  __typename: 'GqlBalancePoolAprSubItem';
  apr: GqlPoolAprValue;
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export enum GqlChain {
  Arbitrum = 'ARBITRUM',
  Avalanche = 'AVALANCHE',
  Base = 'BASE',
  Fantom = 'FANTOM',
  Fraxtal = 'FRAXTAL',
  Gnosis = 'GNOSIS',
  Mainnet = 'MAINNET',
  Mode = 'MODE',
  Optimism = 'OPTIMISM',
  Polygon = 'POLYGON',
  Sepolia = 'SEPOLIA',
  Zkevm = 'ZKEVM'
}

export type GqlContentNewsItem = {
  __typename: 'GqlContentNewsItem';
  discussionUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  source: GqlContentNewsItemSource;
  text: Scalars['String']['output'];
  timestamp: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export enum GqlContentNewsItemSource {
  Discord = 'discord',
  Medium = 'medium',
  Twitter = 'twitter'
}

export type GqlFeaturePoolGroupItemExternalLink = {
  __typename: 'GqlFeaturePoolGroupItemExternalLink';
  buttonText: Scalars['String']['output'];
  buttonUrl: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
};

/** Configuration options for SOR V2 */
export type GqlGraphTraversalConfigInput = {
  /**
   * Max number of paths to return (can be less)
   *
   * Default: 5
   */
  approxPathsToReturn?: InputMaybe<Scalars['Int']['input']>;
  /**
   * The max hops in a path.
   *
   * Default: 6
   */
  maxDepth?: InputMaybe<Scalars['Int']['input']>;
  /**
   * Limit non boosted hop tokens in a boosted path.
   *
   * Default: 2
   */
  maxNonBoostedHopTokensInBoostedPath?: InputMaybe<Scalars['Int']['input']>;
  /**
   * Limit of "non-boosted" pools for efficiency.
   *
   * Default: 6
   */
  maxNonBoostedPathDepth?: InputMaybe<Scalars['Int']['input']>;
  poolIdsToInclude?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type GqlHistoricalTokenPrice = {
  __typename: 'GqlHistoricalTokenPrice';
  address: Scalars['String']['output'];
  chain: GqlChain;
  prices: Array<GqlHistoricalTokenPriceEntry>;
};

export type GqlHistoricalTokenPriceEntry = {
  __typename: 'GqlHistoricalTokenPriceEntry';
  price: Scalars['Float']['output'];
  timestamp: Scalars['String']['output'];
  updatedAt: Scalars['Int']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type GqlLatestSyncedBlocks = {
  __typename: 'GqlLatestSyncedBlocks';
  poolSyncBlock: Scalars['BigInt']['output'];
  userStakeSyncBlock: Scalars['BigInt']['output'];
  userWalletSyncBlock: Scalars['BigInt']['output'];
};

/** All info on the nested pool if the token is a BPT. It will only support 1 level of nesting. */
export type GqlNestedPool = {
  __typename: 'GqlNestedPool';
  /** Address of the pool. */
  address: Scalars['Bytes']['output'];
  /** Price rate of the Balancer Pool Token (BPT). */
  bptPriceRate: Scalars['BigDecimal']['output'];
  /** Timestamp of when the pool was created. */
  createTime: Scalars['Int']['output'];
  /** Address of the factory contract that created the pool, if applicable. */
  factory?: Maybe<Scalars['Bytes']['output']>;
  /** Unique identifier of the pool. */
  id: Scalars['ID']['output'];
  /** Name of the pool. */
  name: Scalars['String']['output'];
  /** Total liquidity of the parent pool in the nested pool in USD. */
  nestedLiquidity: Scalars['BigDecimal']['output'];
  /** Percentage of the parents pool shares inside the nested pool. */
  nestedPercentage: Scalars['BigDecimal']['output'];
  /** Number of shares of the parent pool in the nested pool. */
  nestedShares: Scalars['BigDecimal']['output'];
  /** Address of the pool's owner. */
  owner: Scalars['Bytes']['output'];
  /** Fee charged for swapping tokens in the pool as %. 0.01 -> 0.01% */
  swapFee: Scalars['BigDecimal']['output'];
  /** Symbol of the pool. */
  symbol: Scalars['String']['output'];
  /** List of all tokens in the pool. */
  tokens: Array<GqlPoolTokenDetail>;
  /** Total liquidity in the pool in USD. */
  totalLiquidity: Scalars['BigDecimal']['output'];
  /** Total number of shares in the pool. */
  totalShares: Scalars['BigDecimal']['output'];
  /** Type of the pool. */
  type: GqlPoolType;
  /** Version of the pool. */
  version: Scalars['Int']['output'];
};

/** Represents an event that occurs when liquidity is added or removed from a pool. */
export type GqlPoolAddRemoveEventV3 = GqlPoolEvent & {
  __typename: 'GqlPoolAddRemoveEventV3';
  /** The block number of the event. */
  blockNumber: Scalars['Int']['output'];
  /** The block timestamp of the event. */
  blockTimestamp: Scalars['Int']['output'];
  /** The chain on which the event occurred. */
  chain: GqlChain;
  /** The unique identifier of the event. */
  id: Scalars['ID']['output'];
  /** The log index of the event. */
  logIndex: Scalars['Int']['output'];
  /** The pool ID associated with the event. */
  poolId: Scalars['String']['output'];
  /** The sender of the event. */
  sender: Scalars['String']['output'];
  /** The timestamp of the event. */
  timestamp: Scalars['Int']['output'];
  /** The tokens involved in the event. Ordered by poolToken index. */
  tokens: Array<GqlPoolEventAmount>;
  /** The transaction hash of the event. */
  tx: Scalars['String']['output'];
  /** The type of the event. */
  type: GqlPoolEventType;
  /** The user address associated with the event. */
  userAddress: Scalars['String']['output'];
  /** The value of the event in USD. */
  valueUSD: Scalars['Float']['output'];
};

export type GqlPoolAggregator = {
  __typename: 'GqlPoolAggregator';
  /** The contract address of the pool. */
  address: Scalars['Bytes']['output'];
  /** Data specific to gyro/fx pools */
  alpha?: Maybe<Scalars['String']['output']>;
  /** Data specific to stable pools */
  amp?: Maybe<Scalars['BigInt']['output']>;
  /** Data specific to gyro/fx pools */
  beta?: Maybe<Scalars['String']['output']>;
  /** Data specific to gyro pools */
  c?: Maybe<Scalars['String']['output']>;
  /** The chain on which the pool is deployed */
  chain: GqlChain;
  /** The timestamp the pool was created. */
  createTime: Scalars['Int']['output'];
  /** Data specific to gyro pools */
  dSq?: Maybe<Scalars['String']['output']>;
  /** The decimals of the BPT, usually 18 */
  decimals: Scalars['Int']['output'];
  /** Data specific to fx pools */
  delta?: Maybe<Scalars['String']['output']>;
  /** Dynamic data such as token balances, swap fees or volume */
  dynamicData: GqlPoolDynamicData;
  /** Data specific to fx pools */
  epsilon?: Maybe<Scalars['String']['output']>;
  /** The factory contract address from which the pool was created. */
  factory?: Maybe<Scalars['Bytes']['output']>;
  /** The pool id. This is equal to the address for protocolVersion 3 pools */
  id: Scalars['ID']['output'];
  /** Data specific to gyro/fx pools */
  lambda?: Maybe<Scalars['String']['output']>;
  /** The name of the pool as per contract */
  name: Scalars['String']['output'];
  /** The wallet address of the owner of the pool. Pool owners can set certain properties like swapFees or AMP. */
  owner?: Maybe<Scalars['Bytes']['output']>;
  /** Returns all pool tokens, including BPTs and nested pools if there are any. Only one nested level deep. */
  poolTokens: Array<GqlPoolTokenDetail>;
  /** The protocol version on which the pool is deployed, 1, 2 or 3 */
  protocolVersion: Scalars['Int']['output'];
  /** Data specific to gyro pools */
  root3Alpha?: Maybe<Scalars['String']['output']>;
  /** Data specific to gyro pools */
  s?: Maybe<Scalars['String']['output']>;
  /** Data specific to gyro pools */
  sqrtAlpha?: Maybe<Scalars['String']['output']>;
  /** Data specific to gyro pools */
  sqrtBeta?: Maybe<Scalars['String']['output']>;
  /** The token symbol of the pool as per contract */
  symbol: Scalars['String']['output'];
  /** Data specific to gyro pools */
  tauAlphaX?: Maybe<Scalars['String']['output']>;
  /** Data specific to gyro pools */
  tauAlphaY?: Maybe<Scalars['String']['output']>;
  /** Data specific to gyro pools */
  tauBetaX?: Maybe<Scalars['String']['output']>;
  /** Data specific to gyro pools */
  tauBetaY?: Maybe<Scalars['String']['output']>;
  /** The pool type, such as weighted, stable, etc. */
  type: GqlPoolType;
  /** Data specific to gyro pools */
  u?: Maybe<Scalars['String']['output']>;
  /** Data specific to gyro pools */
  v?: Maybe<Scalars['String']['output']>;
  /** The version of the pool type. */
  version: Scalars['Int']['output'];
  /** Data specific to gyro pools */
  w?: Maybe<Scalars['String']['output']>;
  /** Data specific to gyro pools */
  z?: Maybe<Scalars['String']['output']>;
};

export type GqlPoolApr = {
  __typename: 'GqlPoolApr';
  apr: GqlPoolAprValue;
  hasRewardApr: Scalars['Boolean']['output'];
  items: Array<GqlBalancePoolAprItem>;
  nativeRewardApr: GqlPoolAprValue;
  swapApr: Scalars['BigDecimal']['output'];
  thirdPartyApr: GqlPoolAprValue;
};

/** All APRs for a pool */
export type GqlPoolAprItem = {
  __typename: 'GqlPoolAprItem';
  /** The APR value in % -> 0.2 = 0.2% */
  apr: Scalars['Float']['output'];
  /** The id of the APR item */
  id: Scalars['ID']['output'];
  /** The reward token address, if the APR originates from token emissions */
  rewardTokenAddress?: Maybe<Scalars['String']['output']>;
  /** The reward token symbol, if the APR originates from token emissions */
  rewardTokenSymbol?: Maybe<Scalars['String']['output']>;
  /**
   * The title of the APR item, a human readable form
   * @deprecated No replacement, should be built client side
   */
  title: Scalars['String']['output'];
  /** Specific type of this APR */
  type: GqlPoolAprItemType;
};

/** Enum representing the different types of the APR in a pool. */
export enum GqlPoolAprItemType {
  /** APR that pools earns when BPT is staked on AURA. */
  Aura = 'AURA',
  /** Represents the yield from an IB (Interest-Bearing) asset APR in a pool. */
  IbYield = 'IB_YIELD',
  /** APR in a pool that can be earned through locking, i.e. veBAL */
  Locking = 'LOCKING',
  /** Reward APR in a pool from maBEETS emissions allocated by gauge votes. Emitted in BEETS. */
  MabeetsEmissions = 'MABEETS_EMISSIONS',
  /** Rewards distributed by merkl.xyz */
  Merkl = 'MERKL',
  /** Represents if the APR items comes from a nested pool. */
  Nested = 'NESTED',
  /** Staking reward APR in a pool from a reward token. */
  Staking = 'STAKING',
  /** APR boost that can be earned, i.e. via veBAL or maBEETS. */
  StakingBoost = 'STAKING_BOOST',
  /** Cow AMM specific APR */
  Surplus = 'SURPLUS',
  /** Represents the swap fee APR in a pool. */
  SwapFee = 'SWAP_FEE',
  /** Reward APR in a pool from veBAL emissions allocated by gauge votes. Emitted in BAL. */
  VebalEmissions = 'VEBAL_EMISSIONS',
  /** APR that can be earned thourgh voting, i.e. gauge votes */
  Voting = 'VOTING'
}

export type GqlPoolAprRange = {
  __typename: 'GqlPoolAprRange';
  max: Scalars['BigDecimal']['output'];
  min: Scalars['BigDecimal']['output'];
};

export type GqlPoolAprTotal = {
  __typename: 'GqlPoolAprTotal';
  total: Scalars['BigDecimal']['output'];
};

export type GqlPoolAprValue = GqlPoolAprRange | GqlPoolAprTotal;

/** The base type as returned by poolGetPool (specific pool query) */
export type GqlPoolBase = {
  /** The contract address of the pool. */
  address: Scalars['Bytes']['output'];
  /**
   * Returns all pool tokens, including any nested tokens and phantom BPTs on one level.
   * @deprecated Use poolTokens instead
   */
  allTokens: Array<GqlPoolTokenExpanded>;
  /** List of categories assigned by the team based on external factors */
  categories?: Maybe<Array<Maybe<GqlPoolFilterCategory>>>;
  /** The chain on which the pool is deployed */
  chain: GqlChain;
  /** The timestamp the pool was created. */
  createTime: Scalars['Int']['output'];
  /** The decimals of the BPT, usually 18 */
  decimals: Scalars['Int']['output'];
  /**
   * Only returns main tokens, also known as leave tokens. Wont return any nested BPTs. Used for displaying the tokens that the pool consists of.
   * @deprecated Use poolTokens instead
   */
  displayTokens: Array<GqlPoolTokenDisplay>;
  /** Dynamic data such as token balances, swap fees or volume */
  dynamicData: GqlPoolDynamicData;
  /** The factory contract address from which the pool was created. */
  factory?: Maybe<Scalars['Bytes']['output']>;
  /** The pool id. This is equal to the address for protocolVersion 3 pools */
  id: Scalars['ID']['output'];
  /**
   * Deprecated
   * @deprecated Removed without replacement
   */
  investConfig: GqlPoolInvestConfig;
  /** The name of the pool as per contract */
  name: Scalars['String']['output'];
  /** The wallet address of the owner of the pool. Pool owners can set certain properties like swapFees or AMP. */
  owner?: Maybe<Scalars['Bytes']['output']>;
  /** Returns all pool tokens, including BPTs and nested pools if there are any. Only one nested level deep. */
  poolTokens: Array<GqlPoolTokenDetail>;
  /** The protocol version on which the pool is deployed, 1, 2 or 3 */
  protocolVersion: Scalars['Int']['output'];
  /** Staking options of this pool which emit additional rewards */
  staking?: Maybe<GqlPoolStaking>;
  /** The token symbol of the pool as per contract */
  symbol: Scalars['String']['output'];
  /** List of tags assigned by the team based on external factors */
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** The pool type, such as weighted, stable, etc. */
  type: GqlPoolType;
  /** If a user address was provided in the query, the user balance is populated here */
  userBalance?: Maybe<GqlPoolUserBalance>;
  /**
   * The vault version on which the pool is deployed, 2 or 3
   * @deprecated use protocolVersion instead
   */
  vaultVersion: Scalars['Int']['output'];
  /** The version of the pool type. */
  version: Scalars['Int']['output'];
  /**
   * Deprecated
   * @deprecated Removed without replacement
   */
  withdrawConfig: GqlPoolWithdrawConfig;
};

export type GqlPoolBatchSwap = {
  __typename: 'GqlPoolBatchSwap';
  chain: GqlChain;
  id: Scalars['ID']['output'];
  swaps: Array<GqlPoolBatchSwapSwap>;
  timestamp: Scalars['Int']['output'];
  tokenAmountIn: Scalars['String']['output'];
  tokenAmountOut: Scalars['String']['output'];
  tokenIn: Scalars['String']['output'];
  tokenInPrice: Scalars['Float']['output'];
  tokenOut: Scalars['String']['output'];
  tokenOutPrice: Scalars['Float']['output'];
  tx: Scalars['String']['output'];
  userAddress: Scalars['String']['output'];
  valueUSD: Scalars['Float']['output'];
};

export type GqlPoolBatchSwapPool = {
  __typename: 'GqlPoolBatchSwapPool';
  id: Scalars['ID']['output'];
  tokens: Array<Scalars['String']['output']>;
};

export type GqlPoolBatchSwapSwap = {
  __typename: 'GqlPoolBatchSwapSwap';
  id: Scalars['ID']['output'];
  pool: GqlPoolMinimal;
  timestamp: Scalars['Int']['output'];
  tokenAmountIn: Scalars['String']['output'];
  tokenAmountOut: Scalars['String']['output'];
  tokenIn: Scalars['String']['output'];
  tokenOut: Scalars['String']['output'];
  tx: Scalars['String']['output'];
  userAddress: Scalars['String']['output'];
  valueUSD: Scalars['Float']['output'];
};

export type GqlPoolComposableStable = GqlPoolBase & {
  __typename: 'GqlPoolComposableStable';
  address: Scalars['Bytes']['output'];
  allTokens: Array<GqlPoolTokenExpanded>;
  amp: Scalars['BigInt']['output'];
  bptPriceRate: Scalars['BigDecimal']['output'];
  categories?: Maybe<Array<Maybe<GqlPoolFilterCategory>>>;
  chain: GqlChain;
  createTime: Scalars['Int']['output'];
  decimals: Scalars['Int']['output'];
  displayTokens: Array<GqlPoolTokenDisplay>;
  dynamicData: GqlPoolDynamicData;
  factory?: Maybe<Scalars['Bytes']['output']>;
  id: Scalars['ID']['output'];
  /** @deprecated Removed without replacement */
  investConfig: GqlPoolInvestConfig;
  name: Scalars['String']['output'];
  nestingType: GqlPoolNestingType;
  owner: Scalars['Bytes']['output'];
  poolTokens: Array<GqlPoolTokenDetail>;
  protocolVersion: Scalars['Int']['output'];
  staking?: Maybe<GqlPoolStaking>;
  symbol: Scalars['String']['output'];
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /**
   * All tokens of the pool. If it is a nested pool, the nested pool is expanded with its own tokens again.
   * @deprecated Use poolTokens instead
   */
  tokens: Array<GqlPoolTokenUnion>;
  type: GqlPoolType;
  userBalance?: Maybe<GqlPoolUserBalance>;
  /** @deprecated use protocolVersion instead */
  vaultVersion: Scalars['Int']['output'];
  version: Scalars['Int']['output'];
  /** @deprecated Removed without replacement */
  withdrawConfig: GqlPoolWithdrawConfig;
};

export type GqlPoolComposableStableNested = {
  __typename: 'GqlPoolComposableStableNested';
  address: Scalars['Bytes']['output'];
  amp: Scalars['BigInt']['output'];
  bptPriceRate: Scalars['BigDecimal']['output'];
  categories?: Maybe<Array<Maybe<GqlPoolFilterCategory>>>;
  createTime: Scalars['Int']['output'];
  factory?: Maybe<Scalars['Bytes']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  nestingType: GqlPoolNestingType;
  owner: Scalars['Bytes']['output'];
  swapFee: Scalars['BigDecimal']['output'];
  symbol: Scalars['String']['output'];
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** @deprecated Use poolTokens instead */
  tokens: Array<GqlPoolTokenComposableStableNestedUnion>;
  totalLiquidity: Scalars['BigDecimal']['output'];
  totalShares: Scalars['BigDecimal']['output'];
  type: GqlPoolType;
  version: Scalars['Int']['output'];
};

export type GqlPoolDynamicData = {
  __typename: 'GqlPoolDynamicData';
  /** Protocol and pool creator fees combined */
  aggregateSwapFee: Scalars['BigDecimal']['output'];
  /** Protocol and pool creator fees combined */
  aggregateYieldFee: Scalars['BigDecimal']['output'];
  /** @deprecated Use aprItems instead */
  apr: GqlPoolApr;
  aprItems: Array<GqlPoolAprItem>;
  fees24h: Scalars['BigDecimal']['output'];
  fees24hAth: Scalars['BigDecimal']['output'];
  fees24hAthTimestamp: Scalars['Int']['output'];
  fees24hAtl: Scalars['BigDecimal']['output'];
  fees24hAtlTimestamp: Scalars['Int']['output'];
  fees48h: Scalars['BigDecimal']['output'];
  holdersCount: Scalars['BigInt']['output'];
  /** True for bricked pools */
  isInRecoveryMode: Scalars['Boolean']['output'];
  isPaused: Scalars['Boolean']['output'];
  lifetimeSwapFees: Scalars['BigDecimal']['output'];
  lifetimeVolume: Scalars['BigDecimal']['output'];
  poolId: Scalars['ID']['output'];
  sharePriceAth: Scalars['BigDecimal']['output'];
  sharePriceAthTimestamp: Scalars['Int']['output'];
  sharePriceAtl: Scalars['BigDecimal']['output'];
  sharePriceAtlTimestamp: Scalars['Int']['output'];
  /** CowAmm specific, equivalent of swap fees */
  surplus24h: Scalars['BigDecimal']['output'];
  /** CowAmm specific, equivalent of swap fees */
  surplus48h: Scalars['BigDecimal']['output'];
  /** Disabled for bricked pools */
  swapEnabled: Scalars['Boolean']['output'];
  swapFee: Scalars['BigDecimal']['output'];
  swapsCount: Scalars['BigInt']['output'];
  totalLiquidity: Scalars['BigDecimal']['output'];
  totalLiquidity24hAgo: Scalars['BigDecimal']['output'];
  totalLiquidityAth: Scalars['BigDecimal']['output'];
  totalLiquidityAthTimestamp: Scalars['Int']['output'];
  totalLiquidityAtl: Scalars['BigDecimal']['output'];
  totalLiquidityAtlTimestamp: Scalars['Int']['output'];
  totalShares: Scalars['BigDecimal']['output'];
  totalShares24hAgo: Scalars['BigDecimal']['output'];
  volume24h: Scalars['BigDecimal']['output'];
  volume24hAth: Scalars['BigDecimal']['output'];
  volume24hAthTimestamp: Scalars['Int']['output'];
  volume24hAtl: Scalars['BigDecimal']['output'];
  volume24hAtlTimestamp: Scalars['Int']['output'];
  volume48h: Scalars['BigDecimal']['output'];
  yieldCapture24h: Scalars['BigDecimal']['output'];
  yieldCapture48h: Scalars['BigDecimal']['output'];
};

export type GqlPoolElement = GqlPoolBase & {
  __typename: 'GqlPoolElement';
  address: Scalars['Bytes']['output'];
  allTokens: Array<GqlPoolTokenExpanded>;
  baseToken: Scalars['Bytes']['output'];
  categories?: Maybe<Array<Maybe<GqlPoolFilterCategory>>>;
  chain: GqlChain;
  createTime: Scalars['Int']['output'];
  decimals: Scalars['Int']['output'];
  displayTokens: Array<GqlPoolTokenDisplay>;
  dynamicData: GqlPoolDynamicData;
  factory?: Maybe<Scalars['Bytes']['output']>;
  id: Scalars['ID']['output'];
  /** @deprecated Removed without replacement */
  investConfig: GqlPoolInvestConfig;
  name: Scalars['String']['output'];
  owner: Scalars['Bytes']['output'];
  poolTokens: Array<GqlPoolTokenDetail>;
  principalToken: Scalars['Bytes']['output'];
  protocolVersion: Scalars['Int']['output'];
  staking?: Maybe<GqlPoolStaking>;
  symbol: Scalars['String']['output'];
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** @deprecated Use poolTokens instead */
  tokens: Array<GqlPoolToken>;
  type: GqlPoolType;
  unitSeconds: Scalars['BigInt']['output'];
  userBalance?: Maybe<GqlPoolUserBalance>;
  /** @deprecated use protocolVersion instead */
  vaultVersion: Scalars['Int']['output'];
  version: Scalars['Int']['output'];
  /** @deprecated Removed without replacement */
  withdrawConfig: GqlPoolWithdrawConfig;
};

/** Represents an event that occurs in a pool. */
export type GqlPoolEvent = {
  /** The block number of the event. */
  blockNumber: Scalars['Int']['output'];
  /** The block timestamp of the event. */
  blockTimestamp: Scalars['Int']['output'];
  /** The chain on which the event occurred. */
  chain: GqlChain;
  /** The unique identifier of the event. */
  id: Scalars['ID']['output'];
  /** The log index of the event. */
  logIndex: Scalars['Int']['output'];
  /** The pool ID associated with the event. */
  poolId: Scalars['String']['output'];
  /** The sender of the event. */
  sender: Scalars['String']['output'];
  /** The timestamp of the event. */
  timestamp: Scalars['Int']['output'];
  /** The transaction hash of the event. */
  tx: Scalars['String']['output'];
  /** The type of the event. */
  type: GqlPoolEventType;
  /** The user address associated with the event. */
  userAddress: Scalars['String']['output'];
  /** The USD value of this event. */
  valueUSD: Scalars['Float']['output'];
};

export type GqlPoolEventAmount = {
  __typename: 'GqlPoolEventAmount';
  address: Scalars['String']['output'];
  amount: Scalars['String']['output'];
  valueUSD: Scalars['Float']['output'];
};

export enum GqlPoolEventType {
  Add = 'ADD',
  Remove = 'REMOVE',
  Swap = 'SWAP'
}

export enum GqlPoolEventsDataRange {
  NinetyDays = 'NINETY_DAYS',
  SevenDays = 'SEVEN_DAYS',
  ThirtyDays = 'THIRTY_DAYS'
}

export type GqlPoolEventsFilter = {
  chainIn?: InputMaybe<Array<InputMaybe<GqlChain>>>;
  poolIdIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  range?: InputMaybe<GqlPoolEventsDataRange>;
  typeIn?: InputMaybe<Array<InputMaybe<GqlPoolEventType>>>;
  userAddress?: InputMaybe<Scalars['String']['input']>;
  /** USD value of the event */
  valueUSD_gt?: InputMaybe<Scalars['Float']['input']>;
  /** USD value of the event */
  valueUSD_gte?: InputMaybe<Scalars['Float']['input']>;
};

export type GqlPoolFeaturedPool = {
  __typename: 'GqlPoolFeaturedPool';
  description: Scalars['String']['output'];
  pool: GqlPoolBase;
  poolId: Scalars['ID']['output'];
  primary: Scalars['Boolean']['output'];
};

export type GqlPoolFeaturedPoolGroup = {
  __typename: 'GqlPoolFeaturedPoolGroup';
  icon: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  items: Array<GqlPoolFeaturedPoolGroupItem>;
  title: Scalars['String']['output'];
};

export type GqlPoolFeaturedPoolGroupItem = GqlFeaturePoolGroupItemExternalLink | GqlPoolMinimal;

export type GqlPoolFilter = {
  chainIn?: InputMaybe<Array<GqlChain>>;
  chainNotIn?: InputMaybe<Array<GqlChain>>;
  createTime?: InputMaybe<GqlPoolTimePeriod>;
  filterIn?: InputMaybe<Array<Scalars['String']['input']>>;
  filterNotIn?: InputMaybe<Array<Scalars['String']['input']>>;
  idIn?: InputMaybe<Array<Scalars['String']['input']>>;
  idNotIn?: InputMaybe<Array<Scalars['String']['input']>>;
  minTvl?: InputMaybe<Scalars['Float']['input']>;
  poolTypeIn?: InputMaybe<Array<GqlPoolType>>;
  poolTypeNotIn?: InputMaybe<Array<GqlPoolType>>;
  protocolVersionIn?: InputMaybe<Array<Scalars['Int']['input']>>;
  /**
   * For list of tags see: https://github.com/balancer/metadata/blob/main/pools/index.json
   * Use uppercase
   */
  tagIn?: InputMaybe<Array<Scalars['String']['input']>>;
  /**
   * For list of tags see: https://github.com/balancer/metadata/blob/main/pools/index.json
   * Use uppercase
   */
  tagNotIn?: InputMaybe<Array<Scalars['String']['input']>>;
  tokensIn?: InputMaybe<Array<Scalars['String']['input']>>;
  tokensNotIn?: InputMaybe<Array<Scalars['String']['input']>>;
  userAddress?: InputMaybe<Scalars['String']['input']>;
};

export enum GqlPoolFilterCategory {
  BlackListed = 'BLACK_LISTED',
  Incentivized = 'INCENTIVIZED',
  Lrt = 'LRT',
  Points = 'POINTS',
  PointsEigenlayer = 'POINTS_EIGENLAYER',
  PointsGyro = 'POINTS_GYRO',
  PointsKelp = 'POINTS_KELP',
  PointsRenzo = 'POINTS_RENZO',
  PointsSwell = 'POINTS_SWELL',
  Superfest = 'SUPERFEST'
}

export type GqlPoolFx = GqlPoolBase & {
  __typename: 'GqlPoolFx';
  address: Scalars['Bytes']['output'];
  allTokens: Array<GqlPoolTokenExpanded>;
  alpha: Scalars['String']['output'];
  beta: Scalars['String']['output'];
  categories?: Maybe<Array<Maybe<GqlPoolFilterCategory>>>;
  chain: GqlChain;
  createTime: Scalars['Int']['output'];
  decimals: Scalars['Int']['output'];
  delta: Scalars['String']['output'];
  displayTokens: Array<GqlPoolTokenDisplay>;
  dynamicData: GqlPoolDynamicData;
  epsilon: Scalars['String']['output'];
  factory?: Maybe<Scalars['Bytes']['output']>;
  id: Scalars['ID']['output'];
  /** @deprecated Removed without replacement */
  investConfig: GqlPoolInvestConfig;
  lambda: Scalars['String']['output'];
  name: Scalars['String']['output'];
  owner?: Maybe<Scalars['Bytes']['output']>;
  poolTokens: Array<GqlPoolTokenDetail>;
  protocolVersion: Scalars['Int']['output'];
  staking?: Maybe<GqlPoolStaking>;
  symbol: Scalars['String']['output'];
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /**
   * All tokens of the pool. If it is a nested pool, the nested pool is expanded with its own tokens again.
   * @deprecated Use poolTokens instead
   */
  tokens: Array<GqlPoolTokenUnion>;
  type: GqlPoolType;
  userBalance?: Maybe<GqlPoolUserBalance>;
  /** @deprecated use protocolVersion instead */
  vaultVersion: Scalars['Int']['output'];
  version: Scalars['Int']['output'];
  /** @deprecated Removed without replacement */
  withdrawConfig: GqlPoolWithdrawConfig;
};

export type GqlPoolGyro = GqlPoolBase & {
  __typename: 'GqlPoolGyro';
  address: Scalars['Bytes']['output'];
  allTokens: Array<GqlPoolTokenExpanded>;
  alpha: Scalars['String']['output'];
  beta: Scalars['String']['output'];
  c: Scalars['String']['output'];
  categories?: Maybe<Array<Maybe<GqlPoolFilterCategory>>>;
  chain: GqlChain;
  createTime: Scalars['Int']['output'];
  dSq: Scalars['String']['output'];
  decimals: Scalars['Int']['output'];
  displayTokens: Array<GqlPoolTokenDisplay>;
  dynamicData: GqlPoolDynamicData;
  factory?: Maybe<Scalars['Bytes']['output']>;
  id: Scalars['ID']['output'];
  /** @deprecated Removed without replacement */
  investConfig: GqlPoolInvestConfig;
  lambda: Scalars['String']['output'];
  name: Scalars['String']['output'];
  nestingType: GqlPoolNestingType;
  owner: Scalars['Bytes']['output'];
  poolTokens: Array<GqlPoolTokenDetail>;
  protocolVersion: Scalars['Int']['output'];
  root3Alpha: Scalars['String']['output'];
  s: Scalars['String']['output'];
  sqrtAlpha: Scalars['String']['output'];
  sqrtBeta: Scalars['String']['output'];
  staking?: Maybe<GqlPoolStaking>;
  symbol: Scalars['String']['output'];
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  tauAlphaX: Scalars['String']['output'];
  tauAlphaY: Scalars['String']['output'];
  tauBetaX: Scalars['String']['output'];
  tauBetaY: Scalars['String']['output'];
  /**
   * All tokens of the pool. If it is a nested pool, the nested pool is expanded with its own tokens again.
   * @deprecated Use poolTokens instead
   */
  tokens: Array<GqlPoolTokenUnion>;
  type: GqlPoolType;
  u: Scalars['String']['output'];
  userBalance?: Maybe<GqlPoolUserBalance>;
  v: Scalars['String']['output'];
  /** @deprecated use protocolVersion instead */
  vaultVersion: Scalars['Int']['output'];
  version: Scalars['Int']['output'];
  w: Scalars['String']['output'];
  /** @deprecated Removed without replacement */
  withdrawConfig: GqlPoolWithdrawConfig;
  z: Scalars['String']['output'];
};

export type GqlPoolInvestConfig = {
  __typename: 'GqlPoolInvestConfig';
  options: Array<GqlPoolInvestOption>;
  proportionalEnabled: Scalars['Boolean']['output'];
  singleAssetEnabled: Scalars['Boolean']['output'];
};

export type GqlPoolInvestOption = {
  __typename: 'GqlPoolInvestOption';
  poolTokenAddress: Scalars['String']['output'];
  poolTokenIndex: Scalars['Int']['output'];
  tokenOptions: Array<GqlPoolToken>;
};

export type GqlPoolJoinExit = {
  __typename: 'GqlPoolJoinExit';
  amounts: Array<GqlPoolJoinExitAmount>;
  chain: GqlChain;
  id: Scalars['ID']['output'];
  poolId: Scalars['String']['output'];
  sender: Scalars['String']['output'];
  timestamp: Scalars['Int']['output'];
  tx: Scalars['String']['output'];
  type: GqlPoolJoinExitType;
  valueUSD?: Maybe<Scalars['String']['output']>;
};

export type GqlPoolJoinExitAmount = {
  __typename: 'GqlPoolJoinExitAmount';
  address: Scalars['String']['output'];
  amount: Scalars['String']['output'];
};

export type GqlPoolJoinExitFilter = {
  chainIn?: InputMaybe<Array<GqlChain>>;
  poolIdIn?: InputMaybe<Array<Scalars['String']['input']>>;
};

export enum GqlPoolJoinExitType {
  Exit = 'Exit',
  Join = 'Join'
}

export type GqlPoolLiquidityBootstrapping = GqlPoolBase & {
  __typename: 'GqlPoolLiquidityBootstrapping';
  address: Scalars['Bytes']['output'];
  allTokens: Array<GqlPoolTokenExpanded>;
  categories?: Maybe<Array<Maybe<GqlPoolFilterCategory>>>;
  chain: GqlChain;
  createTime: Scalars['Int']['output'];
  decimals: Scalars['Int']['output'];
  displayTokens: Array<GqlPoolTokenDisplay>;
  dynamicData: GqlPoolDynamicData;
  factory?: Maybe<Scalars['Bytes']['output']>;
  id: Scalars['ID']['output'];
  /** @deprecated Removed without replacement */
  investConfig: GqlPoolInvestConfig;
  name: Scalars['String']['output'];
  nestingType: GqlPoolNestingType;
  owner: Scalars['Bytes']['output'];
  poolTokens: Array<GqlPoolTokenDetail>;
  protocolVersion: Scalars['Int']['output'];
  staking?: Maybe<GqlPoolStaking>;
  symbol: Scalars['String']['output'];
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /**
   * All tokens of the pool. If it is a nested pool, the nested pool is expanded with its own tokens again.
   * @deprecated Use poolTokens instead
   */
  tokens: Array<GqlPoolTokenUnion>;
  type: GqlPoolType;
  userBalance?: Maybe<GqlPoolUserBalance>;
  /** @deprecated use protocolVersion instead */
  vaultVersion: Scalars['Int']['output'];
  version: Scalars['Int']['output'];
  /** @deprecated Removed without replacement */
  withdrawConfig: GqlPoolWithdrawConfig;
};

export type GqlPoolMetaStable = GqlPoolBase & {
  __typename: 'GqlPoolMetaStable';
  address: Scalars['Bytes']['output'];
  allTokens: Array<GqlPoolTokenExpanded>;
  amp: Scalars['BigInt']['output'];
  categories?: Maybe<Array<Maybe<GqlPoolFilterCategory>>>;
  chain: GqlChain;
  createTime: Scalars['Int']['output'];
  decimals: Scalars['Int']['output'];
  displayTokens: Array<GqlPoolTokenDisplay>;
  dynamicData: GqlPoolDynamicData;
  factory?: Maybe<Scalars['Bytes']['output']>;
  id: Scalars['ID']['output'];
  /** @deprecated Removed without replacement */
  investConfig: GqlPoolInvestConfig;
  name: Scalars['String']['output'];
  owner: Scalars['Bytes']['output'];
  poolTokens: Array<GqlPoolTokenDetail>;
  protocolVersion: Scalars['Int']['output'];
  staking?: Maybe<GqlPoolStaking>;
  symbol: Scalars['String']['output'];
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** @deprecated Use poolTokens instead */
  tokens: Array<GqlPoolToken>;
  type: GqlPoolType;
  userBalance?: Maybe<GqlPoolUserBalance>;
  /** @deprecated use protocolVersion instead */
  vaultVersion: Scalars['Int']['output'];
  version: Scalars['Int']['output'];
  /** @deprecated Removed without replacement */
  withdrawConfig: GqlPoolWithdrawConfig;
};

/** The pool schema returned for poolGetPools (pool list query) */
export type GqlPoolMinimal = {
  __typename: 'GqlPoolMinimal';
  /** The contract address of the pool. */
  address: Scalars['Bytes']['output'];
  /** Returns all pool tokens, including any nested tokens and phantom BPTs */
  allTokens: Array<GqlPoolTokenExpanded>;
  /** List of categories assigned by the team based on external factors */
  categories?: Maybe<Array<Maybe<GqlPoolFilterCategory>>>;
  /** The chain on which the pool is deployed */
  chain: GqlChain;
  /** The timestamp the pool was created. */
  createTime: Scalars['Int']['output'];
  /** The decimals of the BPT, usually 18 */
  decimals: Scalars['Int']['output'];
  /** Only returns main or underlying tokens, also known as leave tokens. Wont return any nested BPTs. Used for displaying the tokens that the pool consists of. */
  displayTokens: Array<GqlPoolTokenDisplay>;
  /** Dynamic data such as token balances, swap fees or volume */
  dynamicData: GqlPoolDynamicData;
  /** The factory contract address from which the pool was created. */
  factory?: Maybe<Scalars['Bytes']['output']>;
  /** Whether at least one token in this pool is considered an ERC4626 token. */
  hasErc4626: Scalars['Boolean']['output'];
  /** Hook assigned to a pool */
  hook?: Maybe<Hook>;
  /** The pool id. This is equal to the address for protocolVersion 3 pools */
  id: Scalars['ID']['output'];
  /** Pool is receiving rewards when liquidity tokens are staked */
  incentivized: Scalars['Boolean']['output'];
  /** The name of the pool as per contract */
  name: Scalars['String']['output'];
  /** The wallet address of the owner of the pool. Pool owners can set certain properties like swapFees or AMP. */
  owner?: Maybe<Scalars['Bytes']['output']>;
  /** The protocol version on which the pool is deployed, 1, 2 or 3 */
  protocolVersion: Scalars['Int']['output'];
  /** Staking options of this pool which emit additional rewards */
  staking?: Maybe<GqlPoolStaking>;
  /** The token symbol of the pool as per contract */
  symbol: Scalars['String']['output'];
  /** List of tags assigned by the team based on external factors */
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** The pool type, such as weighted, stable, etc. */
  type: GqlPoolType;
  /** If a user address was provided in the query, the user balance is populated here */
  userBalance?: Maybe<GqlPoolUserBalance>;
  /**
   * The vault version on which the pool is deployed, 2 or 3
   * @deprecated use protocolVersion instead
   */
  vaultVersion: Scalars['Int']['output'];
  /** The version of the pool type. */
  version: Scalars['Int']['output'];
};

/** Result of the poolReloadPools mutation */
export type GqlPoolMutationResult = {
  __typename: 'GqlPoolMutationResult';
  /** The chain that was reloaded. */
  chain: GqlChain;
  /** The error message */
  error?: Maybe<Scalars['String']['output']>;
  /** Whether it was successful or not. */
  success: Scalars['Boolean']['output'];
  /** The type of pools that were reloaded. */
  type: Scalars['String']['output'];
};

export type GqlPoolNestedUnion = GqlPoolComposableStableNested;

export enum GqlPoolNestingType {
  HasOnlyPhantomBpt = 'HAS_ONLY_PHANTOM_BPT',
  HasSomePhantomBpt = 'HAS_SOME_PHANTOM_BPT',
  NoNesting = 'NO_NESTING'
}

export enum GqlPoolOrderBy {
  Apr = 'apr',
  Fees24h = 'fees24h',
  TotalLiquidity = 'totalLiquidity',
  TotalShares = 'totalShares',
  UserbalanceUsd = 'userbalanceUsd',
  Volume24h = 'volume24h'
}

export enum GqlPoolOrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type GqlPoolSnapshot = {
  __typename: 'GqlPoolSnapshot';
  amounts: Array<Scalars['String']['output']>;
  chain: GqlChain;
  fees24h: Scalars['String']['output'];
  holdersCount: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  poolId: Scalars['String']['output'];
  sharePrice: Scalars['String']['output'];
  surplus24h: Scalars['String']['output'];
  swapsCount: Scalars['String']['output'];
  timestamp: Scalars['Int']['output'];
  totalLiquidity: Scalars['String']['output'];
  totalShares: Scalars['String']['output'];
  totalSurplus: Scalars['String']['output'];
  totalSwapFee: Scalars['String']['output'];
  totalSwapVolume: Scalars['String']['output'];
  volume24h: Scalars['String']['output'];
};

export enum GqlPoolSnapshotDataRange {
  AllTime = 'ALL_TIME',
  NinetyDays = 'NINETY_DAYS',
  OneHundredEightyDays = 'ONE_HUNDRED_EIGHTY_DAYS',
  OneYear = 'ONE_YEAR',
  ThirtyDays = 'THIRTY_DAYS'
}

export type GqlPoolStable = GqlPoolBase & {
  __typename: 'GqlPoolStable';
  address: Scalars['Bytes']['output'];
  allTokens: Array<GqlPoolTokenExpanded>;
  amp: Scalars['BigInt']['output'];
  categories?: Maybe<Array<Maybe<GqlPoolFilterCategory>>>;
  chain: GqlChain;
  createTime: Scalars['Int']['output'];
  decimals: Scalars['Int']['output'];
  displayTokens: Array<GqlPoolTokenDisplay>;
  dynamicData: GqlPoolDynamicData;
  factory?: Maybe<Scalars['Bytes']['output']>;
  id: Scalars['ID']['output'];
  /** @deprecated Removed without replacement */
  investConfig: GqlPoolInvestConfig;
  name: Scalars['String']['output'];
  owner: Scalars['Bytes']['output'];
  poolTokens: Array<GqlPoolTokenDetail>;
  protocolVersion: Scalars['Int']['output'];
  staking?: Maybe<GqlPoolStaking>;
  symbol: Scalars['String']['output'];
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** @deprecated Use poolTokens instead */
  tokens: Array<GqlPoolToken>;
  type: GqlPoolType;
  userBalance?: Maybe<GqlPoolUserBalance>;
  /** @deprecated use protocolVersion instead */
  vaultVersion: Scalars['Int']['output'];
  version: Scalars['Int']['output'];
  /** @deprecated Removed without replacement */
  withdrawConfig: GqlPoolWithdrawConfig;
};

export type GqlPoolStableComposablePoolData = {
  __typename: 'GqlPoolStableComposablePoolData';
  address: Scalars['String']['output'];
  balance: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  symbol: Scalars['String']['output'];
  tokens: Array<GqlPoolToken>;
  totalSupply: Scalars['String']['output'];
};

export type GqlPoolStaking = {
  __typename: 'GqlPoolStaking';
  address: Scalars['String']['output'];
  aura?: Maybe<GqlPoolStakingAura>;
  chain: GqlChain;
  farm?: Maybe<GqlPoolStakingMasterChefFarm>;
  gauge?: Maybe<GqlPoolStakingGauge>;
  id: Scalars['ID']['output'];
  reliquary?: Maybe<GqlPoolStakingReliquaryFarm>;
  type: GqlPoolStakingType;
  vebal?: Maybe<GqlPoolStakingVebal>;
};

export type GqlPoolStakingAura = {
  __typename: 'GqlPoolStakingAura';
  apr: Scalars['Float']['output'];
  auraPoolAddress: Scalars['String']['output'];
  auraPoolId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isShutdown: Scalars['Boolean']['output'];
};

export type GqlPoolStakingFarmRewarder = {
  __typename: 'GqlPoolStakingFarmRewarder';
  address: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  rewardPerSecond: Scalars['String']['output'];
  tokenAddress: Scalars['String']['output'];
};

export type GqlPoolStakingGauge = {
  __typename: 'GqlPoolStakingGauge';
  gaugeAddress: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  otherGauges?: Maybe<Array<GqlPoolStakingOtherGauge>>;
  rewards: Array<GqlPoolStakingGaugeReward>;
  status: GqlPoolStakingGaugeStatus;
  version: Scalars['Int']['output'];
  workingSupply: Scalars['String']['output'];
};

export type GqlPoolStakingGaugeReward = {
  __typename: 'GqlPoolStakingGaugeReward';
  id: Scalars['ID']['output'];
  rewardPerSecond: Scalars['String']['output'];
  tokenAddress: Scalars['String']['output'];
};

export enum GqlPoolStakingGaugeStatus {
  Active = 'ACTIVE',
  Killed = 'KILLED',
  Preferred = 'PREFERRED'
}

export type GqlPoolStakingMasterChefFarm = {
  __typename: 'GqlPoolStakingMasterChefFarm';
  beetsPerBlock: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  rewarders?: Maybe<Array<GqlPoolStakingFarmRewarder>>;
};

export type GqlPoolStakingOtherGauge = {
  __typename: 'GqlPoolStakingOtherGauge';
  gaugeAddress: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  rewards: Array<GqlPoolStakingGaugeReward>;
  status: GqlPoolStakingGaugeStatus;
  version: Scalars['Int']['output'];
};

export type GqlPoolStakingReliquaryFarm = {
  __typename: 'GqlPoolStakingReliquaryFarm';
  beetsPerSecond: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  levels?: Maybe<Array<GqlPoolStakingReliquaryFarmLevel>>;
  totalBalance: Scalars['String']['output'];
  totalWeightedBalance: Scalars['String']['output'];
};

export type GqlPoolStakingReliquaryFarmLevel = {
  __typename: 'GqlPoolStakingReliquaryFarmLevel';
  allocationPoints: Scalars['Int']['output'];
  apr: Scalars['BigDecimal']['output'];
  balance: Scalars['BigDecimal']['output'];
  id: Scalars['ID']['output'];
  level: Scalars['Int']['output'];
  requiredMaturity: Scalars['Int']['output'];
};

export enum GqlPoolStakingType {
  Aura = 'AURA',
  FreshBeets = 'FRESH_BEETS',
  Gauge = 'GAUGE',
  MasterChef = 'MASTER_CHEF',
  Reliquary = 'RELIQUARY',
  Vebal = 'VEBAL'
}

export type GqlPoolStakingVebal = {
  __typename: 'GqlPoolStakingVebal';
  id: Scalars['ID']['output'];
  vebalAddress: Scalars['String']['output'];
};

export type GqlPoolSwap = {
  __typename: 'GqlPoolSwap';
  chain: GqlChain;
  id: Scalars['ID']['output'];
  poolId: Scalars['String']['output'];
  timestamp: Scalars['Int']['output'];
  tokenAmountIn: Scalars['String']['output'];
  tokenAmountOut: Scalars['String']['output'];
  tokenIn: Scalars['String']['output'];
  tokenOut: Scalars['String']['output'];
  tx: Scalars['String']['output'];
  userAddress: Scalars['String']['output'];
  valueUSD: Scalars['Float']['output'];
};

/** Represents an event that occurs when a swap is made in a pool using the CowAmm protocol. */
export type GqlPoolSwapEventCowAmm = GqlPoolEvent & {
  __typename: 'GqlPoolSwapEventCowAmm';
  /** The block number of the event. */
  blockNumber: Scalars['Int']['output'];
  /** The block timestamp of the event. */
  blockTimestamp: Scalars['Int']['output'];
  /** The chain on which the event occurred. */
  chain: GqlChain;
  /** The fee that this swap generated. */
  fee: GqlPoolEventAmount;
  /** The unique identifier of the event. */
  id: Scalars['ID']['output'];
  /** The log index of the event. */
  logIndex: Scalars['Int']['output'];
  /** The pool ID associated with the event. */
  poolId: Scalars['String']['output'];
  /** The sender of the event. */
  sender: Scalars['String']['output'];
  /** The surplus generated by the swap. */
  surplus: GqlPoolEventAmount;
  /** The timestamp of the event. */
  timestamp: Scalars['Int']['output'];
  /** The token that was swapped in the event. */
  tokenIn: GqlPoolEventAmount;
  /** The token that was swapped out in the event. */
  tokenOut: GqlPoolEventAmount;
  /** The transaction hash of the event. */
  tx: Scalars['String']['output'];
  /** The type of the event. */
  type: GqlPoolEventType;
  /** The user address associated with the event. */
  userAddress: Scalars['String']['output'];
  /** The value of the event in USD. */
  valueUSD: Scalars['Float']['output'];
};

/** Represents an event that occurs when a swap is made in a pool. */
export type GqlPoolSwapEventV3 = GqlPoolEvent & {
  __typename: 'GqlPoolSwapEventV3';
  /** The block number of the event. */
  blockNumber: Scalars['Int']['output'];
  /** The block timestamp of the event. */
  blockTimestamp: Scalars['Int']['output'];
  /** The chain on which the event occurred. */
  chain: GqlChain;
  /** The fee that this swap generated. */
  fee: GqlPoolEventAmount;
  /** The unique identifier of the event. */
  id: Scalars['ID']['output'];
  /** The log index of the event. */
  logIndex: Scalars['Int']['output'];
  /** The pool ID associated with the event. */
  poolId: Scalars['String']['output'];
  /** The sender of the event. */
  sender: Scalars['String']['output'];
  /** The timestamp of the event. */
  timestamp: Scalars['Int']['output'];
  /** The token that was swapped in the event. */
  tokenIn: GqlPoolEventAmount;
  /** The token that was swapped out in the event. */
  tokenOut: GqlPoolEventAmount;
  /** The transaction hash of the event. */
  tx: Scalars['String']['output'];
  /** The type of the event. */
  type: GqlPoolEventType;
  /** The user address associated with the event. */
  userAddress: Scalars['String']['output'];
  /** The value of the event in USD. */
  valueUSD: Scalars['Float']['output'];
};

export type GqlPoolSwapFilter = {
  chainIn?: InputMaybe<Array<GqlChain>>;
  poolIdIn?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenInIn?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenOutIn?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type GqlPoolTimePeriod = {
  gt?: InputMaybe<Scalars['Int']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
};

export type GqlPoolToken = GqlPoolTokenBase & {
  __typename: 'GqlPoolToken';
  address: Scalars['String']['output'];
  balance: Scalars['BigDecimal']['output'];
  decimals: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  index: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  priceRate: Scalars['BigDecimal']['output'];
  priceRateProvider?: Maybe<Scalars['String']['output']>;
  symbol: Scalars['String']['output'];
  totalBalance: Scalars['BigDecimal']['output'];
  weight?: Maybe<Scalars['BigDecimal']['output']>;
};

export type GqlPoolTokenBase = {
  address: Scalars['String']['output'];
  balance: Scalars['BigDecimal']['output'];
  decimals: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  index: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  priceRate: Scalars['BigDecimal']['output'];
  priceRateProvider?: Maybe<Scalars['String']['output']>;
  symbol: Scalars['String']['output'];
  totalBalance: Scalars['BigDecimal']['output'];
  weight?: Maybe<Scalars['BigDecimal']['output']>;
};

export type GqlPoolTokenComposableStable = GqlPoolTokenBase & {
  __typename: 'GqlPoolTokenComposableStable';
  address: Scalars['String']['output'];
  balance: Scalars['BigDecimal']['output'];
  decimals: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  index: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  pool: GqlPoolComposableStableNested;
  priceRate: Scalars['BigDecimal']['output'];
  priceRateProvider?: Maybe<Scalars['String']['output']>;
  symbol: Scalars['String']['output'];
  totalBalance: Scalars['BigDecimal']['output'];
  weight?: Maybe<Scalars['BigDecimal']['output']>;
};

export type GqlPoolTokenComposableStableNestedUnion = GqlPoolToken;

/**
 * All info on the pool token. It will also include the nested pool if the token is a BPT. It will only support 1 level of nesting.
 * A second (unsupported) level of nesting is shown by having hasNestedPool = true but nestedPool = null.
 */
export type GqlPoolTokenDetail = {
  __typename: 'GqlPoolTokenDetail';
  /** Address of the pool token. */
  address: Scalars['String']['output'];
  /** Balance of the pool token inside the pool. */
  balance: Scalars['BigDecimal']['output'];
  /** USD Balance of the pool token. */
  balanceUSD: Scalars['BigDecimal']['output'];
  /** Decimals of the pool token. */
  decimals: Scalars['Int']['output'];
  /** Indicates whether this token is a BPT and therefor has a nested pool. */
  hasNestedPool: Scalars['Boolean']['output'];
  /** Id of the token. A combination of pool id and token address. */
  id: Scalars['ID']['output'];
  /** Index of the pool token in the pool as returned by the vault. */
  index: Scalars['Int']['output'];
  /** Whether the token is in the allow list. */
  isAllowed: Scalars['Boolean']['output'];
  /** Whether the token is considered an ERC4626 token. */
  isErc4626: Scalars['Boolean']['output'];
  /** Name of the pool token. */
  name: Scalars['String']['output'];
  /** Additional data for the nested pool if the token is a BPT. Null otherwise. */
  nestedPool?: Maybe<GqlNestedPool>;
  /** If it is an appreciating token, it shows the current price rate. 1 otherwise. */
  priceRate: Scalars['BigDecimal']['output'];
  /** The address of the price rate provider. */
  priceRateProvider?: Maybe<Scalars['String']['output']>;
  /** Additional data for the price rate provider, such as reviews or warnings. */
  priceRateProviderData?: Maybe<GqlPriceRateProviderData>;
  /** Symbol of the pool token. */
  symbol: Scalars['String']['output'];
  /** If it is an Erc4262, this will be the underlying token if present in the API. */
  underlyingToken?: Maybe<GqlToken>;
  /** The weight of the token in the pool if it is a weighted pool, null otherwise */
  weight?: Maybe<Scalars['BigDecimal']['output']>;
};

export type GqlPoolTokenDisplay = {
  __typename: 'GqlPoolTokenDisplay';
  address: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  nestedTokens?: Maybe<Array<GqlPoolTokenDisplay>>;
  symbol: Scalars['String']['output'];
  weight?: Maybe<Scalars['BigDecimal']['output']>;
};

export type GqlPoolTokenExpanded = {
  __typename: 'GqlPoolTokenExpanded';
  address: Scalars['String']['output'];
  decimals: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  isErc4626: Scalars['Boolean']['output'];
  isMainToken: Scalars['Boolean']['output'];
  isNested: Scalars['Boolean']['output'];
  isPhantomBpt: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
  weight?: Maybe<Scalars['String']['output']>;
};

export type GqlPoolTokenUnion = GqlPoolToken | GqlPoolTokenComposableStable;

/** Supported pool types */
export enum GqlPoolType {
  ComposableStable = 'COMPOSABLE_STABLE',
  CowAmm = 'COW_AMM',
  Element = 'ELEMENT',
  Fx = 'FX',
  Gyro = 'GYRO',
  Gyro3 = 'GYRO3',
  Gyroe = 'GYROE',
  Investment = 'INVESTMENT',
  LiquidityBootstrapping = 'LIQUIDITY_BOOTSTRAPPING',
  MetaStable = 'META_STABLE',
  PhantomStable = 'PHANTOM_STABLE',
  Stable = 'STABLE',
  Unknown = 'UNKNOWN',
  Weighted = 'WEIGHTED'
}

export type GqlPoolUnion = GqlPoolComposableStable | GqlPoolElement | GqlPoolFx | GqlPoolGyro | GqlPoolLiquidityBootstrapping | GqlPoolMetaStable | GqlPoolStable | GqlPoolWeighted;

/** If a user address was provided in the query, the user balance is populated here */
export type GqlPoolUserBalance = {
  __typename: 'GqlPoolUserBalance';
  /** The staked BPT balances of the user. */
  stakedBalances: Array<GqlUserStakedBalance>;
  /** Total balance (wallet + staked) as float */
  totalBalance: Scalars['AmountHumanReadable']['output'];
  /** Total balance (wallet + staked) in USD as float */
  totalBalanceUsd: Scalars['Float']['output'];
  /** The wallet balance (BPT in wallet) as float. */
  walletBalance: Scalars['AmountHumanReadable']['output'];
  /** The wallet balance (BPT in wallet) in USD as float. */
  walletBalanceUsd: Scalars['Float']['output'];
};

export type GqlPoolUserSwapVolume = {
  __typename: 'GqlPoolUserSwapVolume';
  swapVolumeUSD: Scalars['BigDecimal']['output'];
  userAddress: Scalars['String']['output'];
};

export type GqlPoolWeighted = GqlPoolBase & {
  __typename: 'GqlPoolWeighted';
  address: Scalars['Bytes']['output'];
  allTokens: Array<GqlPoolTokenExpanded>;
  categories?: Maybe<Array<Maybe<GqlPoolFilterCategory>>>;
  chain: GqlChain;
  createTime: Scalars['Int']['output'];
  decimals: Scalars['Int']['output'];
  displayTokens: Array<GqlPoolTokenDisplay>;
  dynamicData: GqlPoolDynamicData;
  factory?: Maybe<Scalars['Bytes']['output']>;
  id: Scalars['ID']['output'];
  /** @deprecated Removed without replacement */
  investConfig: GqlPoolInvestConfig;
  name: Scalars['String']['output'];
  nestingType: GqlPoolNestingType;
  owner: Scalars['Bytes']['output'];
  poolTokens: Array<GqlPoolTokenDetail>;
  protocolVersion: Scalars['Int']['output'];
  staking?: Maybe<GqlPoolStaking>;
  symbol: Scalars['String']['output'];
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /**
   * All tokens of the pool. If it is a nested pool, the nested pool is expanded with its own tokens again.
   * @deprecated Use poolTokens instead
   */
  tokens: Array<GqlPoolTokenUnion>;
  type: GqlPoolType;
  userBalance?: Maybe<GqlPoolUserBalance>;
  /** @deprecated use protocolVersion instead */
  vaultVersion: Scalars['Int']['output'];
  version: Scalars['Int']['output'];
  /** @deprecated Removed without replacement */
  withdrawConfig: GqlPoolWithdrawConfig;
};

export type GqlPoolWithdrawConfig = {
  __typename: 'GqlPoolWithdrawConfig';
  options: Array<GqlPoolWithdrawOption>;
  proportionalEnabled: Scalars['Boolean']['output'];
  singleAssetEnabled: Scalars['Boolean']['output'];
};

export type GqlPoolWithdrawOption = {
  __typename: 'GqlPoolWithdrawOption';
  poolTokenAddress: Scalars['String']['output'];
  poolTokenIndex: Scalars['Int']['output'];
  tokenOptions: Array<GqlPoolToken>;
};

/** Returns the price impact of the path. If there is an error in the price impact calculation, priceImpact will be undefined but the error string is populated. */
export type GqlPriceImpact = {
  __typename: 'GqlPriceImpact';
  /** If priceImpact cant be calculated and is returned as undefined, the error string will be populated. */
  error?: Maybe<Scalars['String']['output']>;
  /** Price impact in percent 0.01 -> 0.01%; undefined if an error happened. */
  priceImpact?: Maybe<Scalars['AmountHumanReadable']['output']>;
};

/** Represents the data of a price rate provider */
export type GqlPriceRateProviderData = {
  __typename: 'GqlPriceRateProviderData';
  /** The address of the price rate provider */
  address: Scalars['String']['output'];
  /** The factory used to create the price rate provider, if applicable */
  factory?: Maybe<Scalars['String']['output']>;
  /** The name of the price rate provider */
  name?: Maybe<Scalars['String']['output']>;
  /** The filename of the review of the price rate provider */
  reviewFile?: Maybe<Scalars['String']['output']>;
  /** Indicates if the price rate provider has been reviewed */
  reviewed: Scalars['Boolean']['output'];
  /** A summary of the price rate provider, usually just says safe or unsafe */
  summary?: Maybe<Scalars['String']['output']>;
  /** Upgradeable components of the price rate provider */
  upgradeableComponents?: Maybe<Array<Maybe<GqlPriceRateProviderUpgradeableComponent>>>;
  /** Warnings associated with the price rate provider */
  warnings?: Maybe<Array<Scalars['String']['output']>>;
};

/** Represents an upgradeable component of a price rate provider */
export type GqlPriceRateProviderUpgradeableComponent = {
  __typename: 'GqlPriceRateProviderUpgradeableComponent';
  /** The entry point / proxy of the upgradeable component */
  entryPoint: Scalars['String']['output'];
  /** Indicates if the implementation of the component has been reviewed */
  implementationReviewed: Scalars['String']['output'];
};

export type GqlProtocolMetricsAggregated = {
  __typename: 'GqlProtocolMetricsAggregated';
  chains: Array<GqlProtocolMetricsChain>;
  numLiquidityProviders: Scalars['BigInt']['output'];
  poolCount: Scalars['BigInt']['output'];
  swapFee24h: Scalars['BigDecimal']['output'];
  swapVolume24h: Scalars['BigDecimal']['output'];
  totalLiquidity: Scalars['BigDecimal']['output'];
  totalSwapFee: Scalars['BigDecimal']['output'];
  totalSwapVolume: Scalars['BigDecimal']['output'];
  yieldCapture24h: Scalars['BigDecimal']['output'];
};

export type GqlProtocolMetricsChain = {
  __typename: 'GqlProtocolMetricsChain';
  chainId: Scalars['String']['output'];
  numLiquidityProviders: Scalars['BigInt']['output'];
  poolCount: Scalars['BigInt']['output'];
  swapFee24h: Scalars['BigDecimal']['output'];
  swapVolume24h: Scalars['BigDecimal']['output'];
  totalLiquidity: Scalars['BigDecimal']['output'];
  totalSwapFee: Scalars['BigDecimal']['output'];
  totalSwapVolume: Scalars['BigDecimal']['output'];
  yieldCapture24h: Scalars['BigDecimal']['output'];
};

export type GqlRelicSnapshot = {
  __typename: 'GqlRelicSnapshot';
  balance: Scalars['String']['output'];
  entryTimestamp: Scalars['Int']['output'];
  farmId: Scalars['String']['output'];
  level: Scalars['Int']['output'];
  relicId: Scalars['Int']['output'];
};

export type GqlReliquaryFarmLevelSnapshot = {
  __typename: 'GqlReliquaryFarmLevelSnapshot';
  balance: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  level: Scalars['String']['output'];
};

export type GqlReliquaryFarmSnapshot = {
  __typename: 'GqlReliquaryFarmSnapshot';
  dailyDeposited: Scalars['String']['output'];
  dailyWithdrawn: Scalars['String']['output'];
  farmId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  levelBalances: Array<GqlReliquaryFarmLevelSnapshot>;
  relicCount: Scalars['String']['output'];
  timestamp: Scalars['Int']['output'];
  tokenBalances: Array<GqlReliquaryTokenBalanceSnapshot>;
  totalBalance: Scalars['String']['output'];
  totalLiquidity: Scalars['String']['output'];
  userCount: Scalars['String']['output'];
};

export type GqlReliquaryTokenBalanceSnapshot = {
  __typename: 'GqlReliquaryTokenBalanceSnapshot';
  address: Scalars['String']['output'];
  balance: Scalars['String']['output'];
  decimals: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
};

export type GqlSftmxStakingData = {
  __typename: 'GqlSftmxStakingData';
  /** Current exchange rate for sFTMx -> FTM */
  exchangeRate: Scalars['String']['output'];
  /** Whether maintenance is paused. This pauses reward claiming or harvesting and withdrawing from matured vaults. */
  maintenancePaused: Scalars['Boolean']['output'];
  /** The maximum FTM amount to depost. */
  maxDepositLimit: Scalars['AmountHumanReadable']['output'];
  /** The minimum FTM amount to deposit. */
  minDepositLimit: Scalars['AmountHumanReadable']['output'];
  /** Number of vaults that delegated to validators. */
  numberOfVaults: Scalars['Int']['output'];
  /** The current rebasing APR for sFTMx. */
  stakingApr: Scalars['String']['output'];
  /** Total amount of FTM in custody of sFTMx. Staked FTM plus free pool FTM. */
  totalFtmAmount: Scalars['AmountHumanReadable']['output'];
  /** Total amount of FTM in the free pool. */
  totalFtmAmountInPool: Scalars['AmountHumanReadable']['output'];
  /** Total amount of FTM staked/delegated to validators. */
  totalFtmAmountStaked: Scalars['AmountHumanReadable']['output'];
  /** Whether undelegation is paused. Undelegate is the first step to redeem sFTMx. */
  undelegatePaused: Scalars['Boolean']['output'];
  /** A list of all the vaults that delegated to validators. */
  vaults: Array<GqlSftmxStakingVault>;
  /** Whether withdrawals are paused. Withdraw is the second and final step to redeem sFTMx. */
  withdrawPaused: Scalars['Boolean']['output'];
  /** Delay to wait between undelegate (1st step) and withdraw (2nd step). */
  withdrawalDelay: Scalars['Int']['output'];
};

export type GqlSftmxStakingSnapshot = {
  __typename: 'GqlSftmxStakingSnapshot';
  /** Current exchange rate for sFTMx -> FTM */
  exchangeRate: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** The timestamp of the snapshot. Timestamp is end of day midnight. */
  timestamp: Scalars['Int']['output'];
  /** Total amount of FTM in custody of sFTMx. Staked FTM plus free pool FTM. */
  totalFtmAmount: Scalars['AmountHumanReadable']['output'];
  /** Total amount of FTM in the free pool. */
  totalFtmAmountInPool: Scalars['AmountHumanReadable']['output'];
  /** Total amount of FTM staked/delegated to validators. */
  totalFtmAmountStaked: Scalars['AmountHumanReadable']['output'];
};

export enum GqlSftmxStakingSnapshotDataRange {
  AllTime = 'ALL_TIME',
  NinetyDays = 'NINETY_DAYS',
  OneHundredEightyDays = 'ONE_HUNDRED_EIGHTY_DAYS',
  OneYear = 'ONE_YEAR',
  ThirtyDays = 'THIRTY_DAYS'
}

export type GqlSftmxStakingVault = {
  __typename: 'GqlSftmxStakingVault';
  /** The amount of FTM that has been delegated via this vault. */
  ftmAmountStaked: Scalars['AmountHumanReadable']['output'];
  /** Whether the vault is matured, meaning whether unlock time has passed. */
  isMatured: Scalars['Boolean']['output'];
  /** Timestamp when the delegated FTM unlocks, matures. */
  unlockTimestamp: Scalars['Int']['output'];
  /** The address of the validator that the vault has delegated to. */
  validatorAddress: Scalars['String']['output'];
  /** The ID of the validator that the vault has delegated to. */
  validatorId: Scalars['String']['output'];
  /** The contract address of the vault. */
  vaultAddress: Scalars['String']['output'];
  /** The internal index of the vault. */
  vaultIndex: Scalars['Int']['output'];
};

export type GqlSftmxWithdrawalRequests = {
  __typename: 'GqlSftmxWithdrawalRequests';
  /** Amount of sFTMx that is being redeemed. */
  amountSftmx: Scalars['AmountHumanReadable']['output'];
  /** The Withdrawal ID, used for interactions. */
  id: Scalars['String']['output'];
  /** Whether the requests is finished and the user has withdrawn. */
  isWithdrawn: Scalars['Boolean']['output'];
  /** The timestamp when the request was placed. There is a delay until the user can withdraw. See withdrawalDelay. */
  requestTimestamp: Scalars['Int']['output'];
  /** The user address that this request belongs to. */
  user: Scalars['String']['output'];
};

export type GqlSorCallData = {
  __typename: 'GqlSorCallData';
  /** The call data that needs to be sent to the RPC */
  callData: Scalars['String']['output'];
  /** Maximum amount to be sent for exact out orders */
  maxAmountInRaw?: Maybe<Scalars['String']['output']>;
  /** Minimum amount received for exact in orders */
  minAmountOutRaw?: Maybe<Scalars['String']['output']>;
  /** The target contract to send the call data to */
  to: Scalars['String']['output'];
  /** Value in ETH that needs to be sent for native swaps */
  value: Scalars['BigDecimal']['output'];
};

/** The swap paths for a swap */
export type GqlSorGetSwapPaths = {
  __typename: 'GqlSorGetSwapPaths';
  /** Transaction data that can be posted to an RPC to execute the swap. */
  callData?: Maybe<GqlSorCallData>;
  /** The price of tokenOut in tokenIn. */
  effectivePrice: Scalars['AmountHumanReadable']['output'];
  /** The price of tokenIn in tokenOut. */
  effectivePriceReversed: Scalars['AmountHumanReadable']['output'];
  /** The found paths as needed as input for the b-sdk to execute the swap */
  paths: Array<GqlSorPath>;
  /** Price impact of the path */
  priceImpact: GqlPriceImpact;
  /** The version of the protocol these paths are from */
  protocolVersion: Scalars['Int']['output'];
  /** The return amount in human form. Return amount is either tokenOutAmount (if swapType is exactIn) or tokenInAmount (if swapType is exactOut) */
  returnAmount: Scalars['AmountHumanReadable']['output'];
  /** The return amount in a raw form */
  returnAmountRaw: Scalars['BigDecimal']['output'];
  /** The swap routes including pool information. Used to display by the UI */
  routes: Array<GqlSorSwapRoute>;
  /** The swap amount in human form. Swap amount is either tokenInAmount (if swapType is exactIn) or tokenOutAmount (if swapType is exactOut) */
  swapAmount: Scalars['AmountHumanReadable']['output'];
  /** The swap amount in a raw form */
  swapAmountRaw: Scalars['BigDecimal']['output'];
  /** The swapType that was provided, exact_in vs exact_out (givenIn vs givenOut) */
  swapType: GqlSorSwapType;
  /** Swaps as needed for the vault swap input to execute the swap */
  swaps: Array<GqlSorSwap>;
  /** All token addresses (or assets) as needed for the vault swap input to execute the swap */
  tokenAddresses: Array<Scalars['String']['output']>;
  /** The token address of the tokenIn provided */
  tokenIn: Scalars['String']['output'];
  /** The amount of tokenIn in human form */
  tokenInAmount: Scalars['AmountHumanReadable']['output'];
  /** The token address of the tokenOut provided */
  tokenOut: Scalars['String']['output'];
  /** The amount of tokenOut in human form */
  tokenOutAmount: Scalars['AmountHumanReadable']['output'];
  /**
   * The version of the vault these paths are from
   * @deprecated Use protocolVersion instead
   */
  vaultVersion: Scalars['Int']['output'];
};

export type GqlSorGetSwapsResponse = {
  __typename: 'GqlSorGetSwapsResponse';
  effectivePrice: Scalars['AmountHumanReadable']['output'];
  effectivePriceReversed: Scalars['AmountHumanReadable']['output'];
  marketSp: Scalars['String']['output'];
  priceImpact: Scalars['AmountHumanReadable']['output'];
  returnAmount: Scalars['AmountHumanReadable']['output'];
  returnAmountConsideringFees: Scalars['BigDecimal']['output'];
  returnAmountFromSwaps?: Maybe<Scalars['BigDecimal']['output']>;
  returnAmountScaled: Scalars['BigDecimal']['output'];
  routes: Array<GqlSorSwapRoute>;
  swapAmount: Scalars['AmountHumanReadable']['output'];
  swapAmountForSwaps?: Maybe<Scalars['BigDecimal']['output']>;
  swapAmountScaled: Scalars['BigDecimal']['output'];
  swapType: GqlSorSwapType;
  swaps: Array<GqlSorSwap>;
  tokenAddresses: Array<Scalars['String']['output']>;
  tokenIn: Scalars['String']['output'];
  tokenInAmount: Scalars['AmountHumanReadable']['output'];
  tokenOut: Scalars['String']['output'];
  tokenOutAmount: Scalars['AmountHumanReadable']['output'];
};

/** A path of a swap. A swap can have multiple paths. Used as input to execute the swap via b-sdk */
export type GqlSorPath = {
  __typename: 'GqlSorPath';
  /** Input amount of this path in scaled form */
  inputAmountRaw: Scalars['String']['output'];
  /** A sorted list of booleans that indicate if the respective pool is a buffer */
  isBuffer: Array<Scalars['Boolean']['output']>;
  /** Output amount of this path in scaled form */
  outputAmountRaw: Scalars['String']['output'];
  /** A sorted list of pool ids that are used in this path */
  pools: Array<Scalars['String']['output']>;
  /** The version of the protocol these paths are from */
  protocolVersion: Scalars['Int']['output'];
  /** A sorted list of tokens that are ussed in this path */
  tokens: Array<Token>;
  /**
   * Vault version of this path.
   * @deprecated Use protocolVersion instead
   */
  vaultVersion: Scalars['Int']['output'];
};

/** A single swap step as used for input to the vault to execute a swap */
export type GqlSorSwap = {
  __typename: 'GqlSorSwap';
  /** Amount to be swapped in this step. 0 for chained swap. */
  amount: Scalars['String']['output'];
  /** Index of the asset used in the tokenAddress array. */
  assetInIndex: Scalars['Int']['output'];
  /** Index of the asset used in the tokenAddress array. */
  assetOutIndex: Scalars['Int']['output'];
  /** Pool id used in this swap step */
  poolId: Scalars['String']['output'];
  /** UserData used in this swap, generally uses defaults. */
  userData: Scalars['String']['output'];
};

export type GqlSorSwapOptionsInput = {
  forceRefresh?: InputMaybe<Scalars['Boolean']['input']>;
  maxPools?: InputMaybe<Scalars['Int']['input']>;
  queryBatchSwap?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};

/** The swap routes including pool information. Used to display by the UI */
export type GqlSorSwapRoute = {
  __typename: 'GqlSorSwapRoute';
  /** The hops this route takes */
  hops: Array<GqlSorSwapRouteHop>;
  /** Share of this route of the total swap */
  share: Scalars['Float']['output'];
  /** Address of the tokenIn */
  tokenIn: Scalars['String']['output'];
  /** Amount of the tokenIn in human form */
  tokenInAmount: Scalars['AmountHumanReadable']['output'];
  /** Address of the tokenOut */
  tokenOut: Scalars['String']['output'];
  /** Amount of the tokenOut in human form */
  tokenOutAmount: Scalars['AmountHumanReadable']['output'];
};

/** A hop of a route. A route can have many hops meaning it traverses more than one pool. */
export type GqlSorSwapRouteHop = {
  __typename: 'GqlSorSwapRouteHop';
  /** The pool entity of this hop. */
  pool: GqlPoolMinimal;
  /** The pool id of this hop. */
  poolId: Scalars['String']['output'];
  /** Address of the tokenIn */
  tokenIn: Scalars['String']['output'];
  /** Amount of the tokenIn in human form */
  tokenInAmount: Scalars['AmountHumanReadable']['output'];
  /** Address of the tokenOut */
  tokenOut: Scalars['String']['output'];
  /** Amount of the tokenOut in human form */
  tokenOutAmount: Scalars['AmountHumanReadable']['output'];
};

export enum GqlSorSwapType {
  ExactIn = 'EXACT_IN',
  ExactOut = 'EXACT_OUT'
}

/** Inputs for the call data to create the swap transaction. If this input is given, call data is added to the response. */
export type GqlSwapCallDataInput = {
  /** How long the swap should be valid, provide a timestamp. "999999999999999999" for infinite. Default: infinite */
  deadline?: InputMaybe<Scalars['Int']['input']>;
  /** Who receives the output amount. */
  receiver: Scalars['String']['input'];
  /** Who sends the input amount. */
  sender: Scalars['String']['input'];
  /** The max slippage in percent 0.01 -> 0.01% */
  slippagePercentage: Scalars['String']['input'];
};

/** Represents a token */
export type GqlToken = {
  __typename: 'GqlToken';
  /** The address of the token */
  address: Scalars['String']['output'];
  /** The chain of the token */
  chain: GqlChain;
  /** The chain ID of the token */
  chainId: Scalars['Int']['output'];
  /** The coingecko ID for this token, if present */
  coingeckoId?: Maybe<Scalars['String']['output']>;
  /** The number of decimal places for the token */
  decimals: Scalars['Int']['output'];
  /** The description of the token */
  description?: Maybe<Scalars['String']['output']>;
  /** The Discord URL of the token */
  discordUrl?: Maybe<Scalars['String']['output']>;
  /** Whether the token is considered an ERC4626 token. */
  isErc4626: Scalars['Boolean']['output'];
  /** The logo URI of the token */
  logoURI?: Maybe<Scalars['String']['output']>;
  /** The name of the token */
  name: Scalars['String']['output'];
  /** The rate provider data for the token */
  priceRateProviderData?: Maybe<GqlPriceRateProviderData>;
  /** The priority of the token, can be used for sorting. */
  priority: Scalars['Int']['output'];
  /** The rate provider data for the token */
  rateProviderData?: Maybe<GqlPriceRateProviderData>;
  /** The symbol of the token */
  symbol: Scalars['String']['output'];
  /** The Telegram URL of the token */
  telegramUrl?: Maybe<Scalars['String']['output']>;
  /** Indicates if the token is tradable */
  tradable: Scalars['Boolean']['output'];
  /** The Twitter username of the token */
  twitterUsername?: Maybe<Scalars['String']['output']>;
  /** The website URL of the token */
  websiteUrl?: Maybe<Scalars['String']['output']>;
};

export type GqlTokenAmountHumanReadable = {
  address: Scalars['String']['input'];
  amount: Scalars['AmountHumanReadable']['input'];
};

export type GqlTokenCandlestickChartDataItem = {
  __typename: 'GqlTokenCandlestickChartDataItem';
  close: Scalars['AmountHumanReadable']['output'];
  high: Scalars['AmountHumanReadable']['output'];
  id: Scalars['ID']['output'];
  low: Scalars['AmountHumanReadable']['output'];
  open: Scalars['AmountHumanReadable']['output'];
  timestamp: Scalars['Int']['output'];
};

export enum GqlTokenChartDataRange {
  NinetyDay = 'NINETY_DAY',
  OneHundredEightyDay = 'ONE_HUNDRED_EIGHTY_DAY',
  OneYear = 'ONE_YEAR',
  SevenDay = 'SEVEN_DAY',
  ThirtyDay = 'THIRTY_DAY'
}

export type GqlTokenData = {
  __typename: 'GqlTokenData';
  description?: Maybe<Scalars['String']['output']>;
  discordUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  telegramUrl?: Maybe<Scalars['String']['output']>;
  tokenAddress: Scalars['String']['output'];
  twitterUsername?: Maybe<Scalars['String']['output']>;
  websiteUrl?: Maybe<Scalars['String']['output']>;
};

/** Represents additional data for a token */
export type GqlTokenDynamicData = {
  __typename: 'GqlTokenDynamicData';
  /** The all-time high price of the token */
  ath: Scalars['Float']['output'];
  /** The all-time low price of the token */
  atl: Scalars['Float']['output'];
  /** The fully diluted valuation of the token */
  fdv?: Maybe<Scalars['String']['output']>;
  /** The highest price in the last 24 hours */
  high24h: Scalars['Float']['output'];
  /** The unique identifier of the dynamic data */
  id: Scalars['String']['output'];
  /** The lowest price in the last 24 hours */
  low24h: Scalars['Float']['output'];
  /** The market capitalization of the token */
  marketCap?: Maybe<Scalars['String']['output']>;
  /** The current price of the token */
  price: Scalars['Float']['output'];
  /** The price change in the last 24 hours */
  priceChange24h: Scalars['Float']['output'];
  /** The percentage price change in the last 7 days */
  priceChangePercent7d?: Maybe<Scalars['Float']['output']>;
  /** The percentage price change in the last 14 days */
  priceChangePercent14d?: Maybe<Scalars['Float']['output']>;
  /** The percentage price change in the last 24 hours */
  priceChangePercent24h: Scalars['Float']['output'];
  /** The percentage price change in the last 30 days */
  priceChangePercent30d?: Maybe<Scalars['Float']['output']>;
  /** The address of the token */
  tokenAddress: Scalars['String']['output'];
  /** The timestamp when the data was last updated */
  updatedAt: Scalars['String']['output'];
};

/** Result of the poolReloadPools mutation */
export type GqlTokenMutationResult = {
  __typename: 'GqlTokenMutationResult';
  /** The chain that was reloaded. */
  chain: GqlChain;
  /** The error message */
  error?: Maybe<Scalars['String']['output']>;
  /** Whether it was successful or not. */
  success: Scalars['Boolean']['output'];
};

export type GqlTokenPrice = {
  __typename: 'GqlTokenPrice';
  address: Scalars['String']['output'];
  chain: GqlChain;
  price: Scalars['Float']['output'];
  updatedAt: Scalars['Int']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type GqlTokenPriceChartDataItem = {
  __typename: 'GqlTokenPriceChartDataItem';
  id: Scalars['ID']['output'];
  price: Scalars['AmountHumanReadable']['output'];
  timestamp: Scalars['Int']['output'];
};

export enum GqlTokenType {
  Bpt = 'BPT',
  PhantomBpt = 'PHANTOM_BPT',
  WhiteListed = 'WHITE_LISTED'
}

export type GqlUserFbeetsBalance = {
  __typename: 'GqlUserFbeetsBalance';
  id: Scalars['String']['output'];
  stakedBalance: Scalars['AmountHumanReadable']['output'];
  totalBalance: Scalars['AmountHumanReadable']['output'];
  walletBalance: Scalars['AmountHumanReadable']['output'];
};

export type GqlUserPoolBalance = {
  __typename: 'GqlUserPoolBalance';
  chain: GqlChain;
  poolId: Scalars['String']['output'];
  stakedBalance: Scalars['AmountHumanReadable']['output'];
  tokenAddress: Scalars['String']['output'];
  tokenPrice: Scalars['Float']['output'];
  totalBalance: Scalars['AmountHumanReadable']['output'];
  walletBalance: Scalars['AmountHumanReadable']['output'];
};

export type GqlUserStakedBalance = {
  __typename: 'GqlUserStakedBalance';
  /** The staked BPT balance as float. */
  balance: Scalars['AmountHumanReadable']['output'];
  /** The steaked BPT balance in USD as float. */
  balanceUsd: Scalars['Float']['output'];
  /** The id of the staking to match with GqlPoolStaking.id. */
  stakingId: Scalars['String']['output'];
  /** The staking type (Gauge, farm, aura, etc.) in which this balance is staked. */
  stakingType: GqlPoolStakingType;
};

export type GqlUserSwapVolumeFilter = {
  poolIdIn?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenInIn?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenOutIn?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type GqlVeBalBalance = {
  __typename: 'GqlVeBalBalance';
  balance: Scalars['AmountHumanReadable']['output'];
  chain: GqlChain;
  locked: Scalars['AmountHumanReadable']['output'];
  lockedUsd: Scalars['AmountHumanReadable']['output'];
};

export type GqlVeBalUserData = {
  __typename: 'GqlVeBalUserData';
  balance: Scalars['AmountHumanReadable']['output'];
  locked: Scalars['AmountHumanReadable']['output'];
  lockedUsd: Scalars['AmountHumanReadable']['output'];
  rank?: Maybe<Scalars['Int']['output']>;
};

/** The Gauge that can be voted on through veBAL and that will ultimately receive the rewards. */
export type GqlVotingGauge = {
  __typename: 'GqlVotingGauge';
  /** The timestamp the gauge was added. */
  addedTimestamp?: Maybe<Scalars['Int']['output']>;
  /** The address of the root gauge on Ethereum mainnet. */
  address: Scalars['Bytes']['output'];
  /** The address of the child gauge on the specific chain. */
  childGaugeAddress?: Maybe<Scalars['Bytes']['output']>;
  /** Whether the gauge is killed or not. */
  isKilled: Scalars['Boolean']['output'];
  /** The relative weight the gauge received this epoch (not more than 1.0). */
  relativeWeight: Scalars['String']['output'];
  /** The relative weight cap. 1.0 for uncapped. */
  relativeWeightCap?: Maybe<Scalars['String']['output']>;
};

/** A token inside of a pool with a voting gauge. */
export type GqlVotingGaugeToken = {
  __typename: 'GqlVotingGaugeToken';
  /** The address of the token. */
  address: Scalars['String']['output'];
  /** The URL to the token logo. */
  logoURI: Scalars['String']['output'];
  /** The symbol of the token. */
  symbol: Scalars['String']['output'];
  /** If it is a weighted pool, the weigh of the token is shown here in %. 0.5 = 50%. */
  weight?: Maybe<Scalars['String']['output']>;
};

/** The pool that can be voted on through veBAL */
export type GqlVotingPool = {
  __typename: 'GqlVotingPool';
  /** The address of the pool. */
  address: Scalars['Bytes']['output'];
  /** The chain this pool is on. */
  chain: GqlChain;
  /** The gauge that is connected to the pool and that will receive the rewards. */
  gauge: GqlVotingGauge;
  /** Pool ID */
  id: Scalars['ID']['output'];
  /** The symbol of the pool. */
  symbol: Scalars['String']['output'];
  /** The tokens inside the pool. */
  tokens: Array<GqlVotingGaugeToken>;
  /** The type of the pool. */
  type: GqlPoolType;
};

/** Hook data */
export type Hook = {
  __typename: 'Hook';
  address: Scalars['String']['output'];
  chain: GqlChain;
  /** Data points changing over time */
  dynamicData?: Maybe<HookData>;
  /** True when hook can change the amounts send to the vault. Necessary to deduct the fees. */
  enableHookAdjustedAmounts: Scalars['Boolean']['output'];
  /** List of pools using the hook */
  poolsIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  shouldCallAfterAddLiquidity: Scalars['Boolean']['output'];
  shouldCallAfterInitialize: Scalars['Boolean']['output'];
  shouldCallAfterRemoveLiquidity: Scalars['Boolean']['output'];
  shouldCallAfterSwap: Scalars['Boolean']['output'];
  shouldCallBeforeAddLiquidity: Scalars['Boolean']['output'];
  shouldCallBeforeInitialize: Scalars['Boolean']['output'];
  shouldCallBeforeRemoveLiquidity: Scalars['Boolean']['output'];
  shouldCallBeforeSwap: Scalars['Boolean']['output'];
  shouldCallComputeDynamicSwapFee: Scalars['Boolean']['output'];
};

/** Collection of hook specific data. Percentage format is 0.01 -> 0.01%. */
export type HookData = {
  __typename: 'HookData';
  addLiquidityFeePercentage?: Maybe<Scalars['String']['output']>;
  removeLiquidityFeePercentage?: Maybe<Scalars['String']['output']>;
  swapFeePercentage?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename: 'Mutation';
  beetsPoolLoadReliquarySnapshotsForAllFarms: Scalars['String']['output'];
  beetsSyncFbeetsRatio: Scalars['String']['output'];
  cacheAverageBlockTime: Scalars['String']['output'];
  poolBlackListAddPool: Scalars['String']['output'];
  poolBlackListRemovePool: Scalars['String']['output'];
  poolDeletePool: Scalars['String']['output'];
  poolInitOnChainDataForAllPools: Scalars['String']['output'];
  poolInitializeSnapshotsForPool: Scalars['String']['output'];
  poolLoadOnChainDataForAllPools: Scalars['String']['output'];
  poolLoadOnChainDataForPoolsWithActiveUpdates: Scalars['String']['output'];
  poolLoadSnapshotsForAllPools: Scalars['String']['output'];
  poolLoadSnapshotsForPools: Scalars['String']['output'];
  poolReloadAllPoolAprs: Scalars['String']['output'];
  poolReloadAllTokenNestedPoolIds: Scalars['String']['output'];
  poolReloadPools: Array<GqlPoolMutationResult>;
  poolReloadStakingForAllPools: Scalars['String']['output'];
  poolSyncAllCowSnapshots: Array<GqlPoolMutationResult>;
  poolSyncAllPoolsFromSubgraph: Array<Scalars['String']['output']>;
  poolSyncLatestSnapshotsForAllPools: Scalars['String']['output'];
  poolSyncNewPoolsFromSubgraph: Array<Scalars['String']['output']>;
  poolSyncPool: Scalars['String']['output'];
  poolSyncPoolAllTokensRelationship: Scalars['String']['output'];
  poolSyncSanityPoolData: Scalars['String']['output'];
  poolSyncStakingForPools: Scalars['String']['output'];
  poolSyncSwapsForLast48Hours: Scalars['String']['output'];
  poolSyncTotalShares: Scalars['String']['output'];
  poolUpdateAprs: Scalars['String']['output'];
  poolUpdateLifetimeValuesForAllPools: Scalars['String']['output'];
  poolUpdateLiquidity24hAgoForAllPools: Scalars['String']['output'];
  poolUpdateLiquidityValuesForAllPools: Scalars['String']['output'];
  poolUpdateVolumeAndFeeValuesForAllPools: Scalars['String']['output'];
  protocolCacheMetrics: Scalars['String']['output'];
  sftmxSyncStakingData: Scalars['String']['output'];
  sftmxSyncWithdrawalRequests: Scalars['String']['output'];
  tokenDeleteTokenType: Scalars['String']['output'];
  tokenReloadAllTokenTypes: Scalars['String']['output'];
  tokenReloadErc4626Tokens: Array<GqlTokenMutationResult>;
  tokenReloadTokenPrices?: Maybe<Scalars['Boolean']['output']>;
  tokenSyncLatestFxPrices: Scalars['String']['output'];
  tokenSyncTokenDefinitions: Scalars['String']['output'];
  userInitStakedBalances: Scalars['String']['output'];
  userInitWalletBalancesForAllPools: Scalars['String']['output'];
  userInitWalletBalancesForPool: Scalars['String']['output'];
  userSyncBalance: Scalars['String']['output'];
  userSyncBalanceAllPools: Scalars['String']['output'];
  userSyncChangedStakedBalances: Scalars['String']['output'];
  userSyncChangedWalletBalancesForAllPools: Scalars['String']['output'];
  veBalSyncAllUserBalances: Scalars['String']['output'];
  veBalSyncTotalSupply: Scalars['String']['output'];
};


export type MutationPoolBlackListAddPoolArgs = {
  poolId: Scalars['String']['input'];
};


export type MutationPoolBlackListRemovePoolArgs = {
  poolId: Scalars['String']['input'];
};


export type MutationPoolDeletePoolArgs = {
  poolId: Scalars['String']['input'];
};


export type MutationPoolInitializeSnapshotsForPoolArgs = {
  poolId: Scalars['String']['input'];
};


export type MutationPoolLoadSnapshotsForPoolsArgs = {
  poolIds: Array<Scalars['String']['input']>;
  reload?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationPoolReloadAllPoolAprsArgs = {
  chain: GqlChain;
};


export type MutationPoolReloadPoolsArgs = {
  chains: Array<GqlChain>;
};


export type MutationPoolReloadStakingForAllPoolsArgs = {
  stakingTypes: Array<GqlPoolStakingType>;
};


export type MutationPoolSyncAllCowSnapshotsArgs = {
  chains: Array<GqlChain>;
};


export type MutationPoolSyncLatestSnapshotsForAllPoolsArgs = {
  chain: GqlChain;
};


export type MutationPoolSyncPoolArgs = {
  poolId: Scalars['String']['input'];
};


export type MutationPoolUpdateAprsArgs = {
  chain: GqlChain;
};


export type MutationTokenDeleteTokenTypeArgs = {
  tokenAddress: Scalars['String']['input'];
  type: GqlTokenType;
};


export type MutationTokenReloadErc4626TokensArgs = {
  chains: Array<GqlChain>;
};


export type MutationTokenReloadTokenPricesArgs = {
  chains: Array<GqlChain>;
};


export type MutationTokenSyncLatestFxPricesArgs = {
  chain: GqlChain;
};


export type MutationUserInitStakedBalancesArgs = {
  stakingTypes: Array<GqlPoolStakingType>;
};


export type MutationUserInitWalletBalancesForPoolArgs = {
  poolId: Scalars['String']['input'];
};


export type MutationUserSyncBalanceArgs = {
  poolId: Scalars['String']['input'];
};

export type Query = {
  __typename: 'Query';
  beetsGetFbeetsRatio: Scalars['String']['output'];
  beetsPoolGetReliquaryFarmSnapshots: Array<GqlReliquaryFarmSnapshot>;
  blocksGetAverageBlockTime: Scalars['Float']['output'];
  blocksGetBlocksPerDay: Scalars['Float']['output'];
  blocksGetBlocksPerSecond: Scalars['Float']['output'];
  blocksGetBlocksPerYear: Scalars['Float']['output'];
  contentGetNewsItems: Array<GqlContentNewsItem>;
  /** Returns list of hooks. */
  hooks?: Maybe<Array<Hook>>;
  latestSyncedBlocks: GqlLatestSyncedBlocks;
  /** Getting swap, add and remove events with paging */
  poolEvents: Array<GqlPoolEvent>;
  /** Returns all pools for a given filter, specific for aggregators */
  poolGetAggregatorPools: Array<GqlPoolAggregator>;
  /**
   * Will de deprecated in favor of poolEvents
   * @deprecated Use poolEvents instead
   */
  poolGetBatchSwaps: Array<GqlPoolBatchSwap>;
  /** Getting swap, add and remove events with range */
  poolGetEvents: Array<GqlPoolEvent>;
  /**
   * Will de deprecated in favor of poolGetFeaturedPools
   * @deprecated Use poolGetFeaturedPools instead
   */
  poolGetFeaturedPoolGroups: Array<GqlPoolFeaturedPoolGroup>;
  /** Returns the list of featured pools for chains */
  poolGetFeaturedPools: Array<GqlPoolFeaturedPool>;
  /**
   * Will de deprecated in favor of poolEvents
   * @deprecated Use poolEvents instead
   */
  poolGetJoinExits: Array<GqlPoolJoinExit>;
  /** Returns one pool. If a user address is provided, the user balances for the given pool will also be returned. */
  poolGetPool: GqlPoolBase;
  /** Returns all pools for a given filter */
  poolGetPools: Array<GqlPoolMinimal>;
  /** Returns the number of pools for a given filter. */
  poolGetPoolsCount: Scalars['Int']['output'];
  /** Gets all the snapshots for a given pool on a chain for a certain range */
  poolGetSnapshots: Array<GqlPoolSnapshot>;
  /**
   * Will de deprecated in favor of poolEvents
   * @deprecated Use poolEvents instead
   */
  poolGetSwaps: Array<GqlPoolSwap>;
  protocolMetricsAggregated: GqlProtocolMetricsAggregated;
  protocolMetricsChain: GqlProtocolMetricsChain;
  /** Get the staking data and status for sFTMx */
  sftmxGetStakingData: GqlSftmxStakingData;
  /** Get snapshots for sftmx staking for a specific range */
  sftmxGetStakingSnapshots: Array<GqlSftmxStakingSnapshot>;
  /** Retrieve the withdrawalrequests from a user */
  sftmxGetWithdrawalRequests: Array<GqlSftmxWithdrawalRequests>;
  /** Get swap quote from the SOR v2 for the V2 vault */
  sorGetSwapPaths: GqlSorGetSwapPaths;
  /** Get swap quote from the SOR, queries both the old and new SOR */
  sorGetSwaps: GqlSorGetSwapsResponse;
  /**
   * Returns the candlestick chart data for a token for a given range.
   * @deprecated Use tokenGetHistoricalPrices instead
   */
  tokenGetCandlestickChartData: Array<GqlTokenCandlestickChartDataItem>;
  /** Returns all current prices for allowed tokens for a given chain or chains */
  tokenGetCurrentPrices: Array<GqlTokenPrice>;
  /** Returns the historical prices for a given set of tokens for a given chain and range */
  tokenGetHistoricalPrices: Array<GqlHistoricalTokenPrice>;
  /**
   * DEPRECATED: Returns pricing data for a given token for a given range
   * @deprecated Use tokenGetHistoricalPrices instead
   */
  tokenGetPriceChartData: Array<GqlTokenPriceChartDataItem>;
  /**
   * Returns the price of either BAL or BEETS depending on chain
   * @deprecated Use tokenGetTokensDynamicData instead
   */
  tokenGetProtocolTokenPrice: Scalars['AmountHumanReadable']['output'];
  /** Returns the price of a token priced in another token for a given range. */
  tokenGetRelativePriceChartData: Array<GqlTokenPriceChartDataItem>;
  /**
   * Returns meta data for a given token such as description, website, etc.
   * @deprecated Use tokenGetTokens instead
   */
  tokenGetTokenData?: Maybe<GqlTokenData>;
  /** Returns dynamic data of a token such as price, market cap, etc. */
  tokenGetTokenDynamicData?: Maybe<GqlTokenDynamicData>;
  /** Returns all allowed tokens for a given chain or chains */
  tokenGetTokens: Array<GqlToken>;
  /**
   * Returns meta data for a given set of tokens such as description, website, etc.
   * @deprecated Use tokenGetTokens instead
   */
  tokenGetTokensData: Array<GqlTokenData>;
  /** Returns dynamic data of a set of tokens such as price, market cap, etc. */
  tokenGetTokensDynamicData: Array<GqlTokenDynamicData>;
  userGetFbeetsBalance: GqlUserFbeetsBalance;
  userGetPoolBalances: Array<GqlUserPoolBalance>;
  /** Will de deprecated in favor of poolGetEvents */
  userGetPoolJoinExits: Array<GqlPoolJoinExit>;
  userGetStaking: Array<GqlPoolStaking>;
  /** Will de deprecated in favor of poolGetEvents */
  userGetSwaps: Array<GqlPoolSwap>;
  veBalGetTotalSupply: Scalars['AmountHumanReadable']['output'];
  veBalGetUser: GqlVeBalUserData;
  veBalGetUserBalance: Scalars['AmountHumanReadable']['output'];
  veBalGetUserBalances: Array<GqlVeBalBalance>;
  /** Returns all pools with veBAL gauges that can be voted on. */
  veBalGetVotingList: Array<GqlVotingPool>;
};


export type QueryBeetsPoolGetReliquaryFarmSnapshotsArgs = {
  id: Scalars['String']['input'];
  range: GqlPoolSnapshotDataRange;
};


export type QueryContentGetNewsItemsArgs = {
  chain?: InputMaybe<GqlChain>;
};


export type QueryHooksArgs = {
  chain?: InputMaybe<GqlChain>;
};


export type QueryPoolEventsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<GqlPoolEventsFilter>;
};


export type QueryPoolGetAggregatorPoolsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<GqlPoolOrderBy>;
  orderDirection?: InputMaybe<GqlPoolOrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<GqlPoolFilter>;
};


export type QueryPoolGetBatchSwapsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<GqlPoolSwapFilter>;
};


export type QueryPoolGetEventsArgs = {
  chain: GqlChain;
  poolId: Scalars['String']['input'];
  range: GqlPoolEventsDataRange;
  typeIn: Array<GqlPoolEventType>;
  userAddress?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPoolGetFeaturedPoolGroupsArgs = {
  chains?: InputMaybe<Array<GqlChain>>;
};


export type QueryPoolGetFeaturedPoolsArgs = {
  chains: Array<GqlChain>;
};


export type QueryPoolGetJoinExitsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<GqlPoolJoinExitFilter>;
};


export type QueryPoolGetPoolArgs = {
  chain?: InputMaybe<GqlChain>;
  id: Scalars['String']['input'];
  userAddress?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPoolGetPoolsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<GqlPoolOrderBy>;
  orderDirection?: InputMaybe<GqlPoolOrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  textSearch?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<GqlPoolFilter>;
};


export type QueryPoolGetPoolsCountArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<GqlPoolOrderBy>;
  orderDirection?: InputMaybe<GqlPoolOrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  textSearch?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<GqlPoolFilter>;
};


export type QueryPoolGetSnapshotsArgs = {
  chain?: InputMaybe<GqlChain>;
  id: Scalars['String']['input'];
  range: GqlPoolSnapshotDataRange;
};


export type QueryPoolGetSwapsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<GqlPoolSwapFilter>;
};


export type QueryProtocolMetricsAggregatedArgs = {
  chains?: InputMaybe<Array<GqlChain>>;
};


export type QueryProtocolMetricsChainArgs = {
  chain?: InputMaybe<GqlChain>;
};


export type QuerySftmxGetStakingSnapshotsArgs = {
  range: GqlSftmxStakingSnapshotDataRange;
};


export type QuerySftmxGetWithdrawalRequestsArgs = {
  user: Scalars['String']['input'];
};


export type QuerySorGetSwapPathsArgs = {
  callDataInput?: InputMaybe<GqlSwapCallDataInput>;
  chain: GqlChain;
  queryBatchSwap?: InputMaybe<Scalars['Boolean']['input']>;
  swapAmount: Scalars['AmountHumanReadable']['input'];
  swapType: GqlSorSwapType;
  tokenIn: Scalars['String']['input'];
  tokenOut: Scalars['String']['input'];
  useProtocolVersion?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySorGetSwapsArgs = {
  chain?: InputMaybe<GqlChain>;
  swapAmount: Scalars['BigDecimal']['input'];
  swapOptions: GqlSorSwapOptionsInput;
  swapType: GqlSorSwapType;
  tokenIn: Scalars['String']['input'];
  tokenOut: Scalars['String']['input'];
};


export type QueryTokenGetCandlestickChartDataArgs = {
  address: Scalars['String']['input'];
  chain?: InputMaybe<GqlChain>;
  range: GqlTokenChartDataRange;
};


export type QueryTokenGetCurrentPricesArgs = {
  chains?: InputMaybe<Array<GqlChain>>;
};


export type QueryTokenGetHistoricalPricesArgs = {
  addresses: Array<Scalars['String']['input']>;
  chain: GqlChain;
  range: GqlTokenChartDataRange;
};


export type QueryTokenGetPriceChartDataArgs = {
  address: Scalars['String']['input'];
  chain?: InputMaybe<GqlChain>;
  range: GqlTokenChartDataRange;
};


export type QueryTokenGetProtocolTokenPriceArgs = {
  chain?: InputMaybe<GqlChain>;
};


export type QueryTokenGetRelativePriceChartDataArgs = {
  chain?: InputMaybe<GqlChain>;
  range: GqlTokenChartDataRange;
  tokenIn: Scalars['String']['input'];
  tokenOut: Scalars['String']['input'];
};


export type QueryTokenGetTokenDataArgs = {
  address: Scalars['String']['input'];
  chain?: InputMaybe<GqlChain>;
};


export type QueryTokenGetTokenDynamicDataArgs = {
  address: Scalars['String']['input'];
  chain?: InputMaybe<GqlChain>;
};


export type QueryTokenGetTokensArgs = {
  chains?: InputMaybe<Array<GqlChain>>;
};


export type QueryTokenGetTokensDataArgs = {
  addresses: Array<Scalars['String']['input']>;
};


export type QueryTokenGetTokensDynamicDataArgs = {
  addresses: Array<Scalars['String']['input']>;
  chain?: InputMaybe<GqlChain>;
};


export type QueryUserGetPoolBalancesArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  chains?: InputMaybe<Array<GqlChain>>;
};


export type QueryUserGetPoolJoinExitsArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  chain?: InputMaybe<GqlChain>;
  first?: InputMaybe<Scalars['Int']['input']>;
  poolId: Scalars['String']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserGetStakingArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  chains?: InputMaybe<Array<GqlChain>>;
};


export type QueryUserGetSwapsArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  chain?: InputMaybe<GqlChain>;
  first?: InputMaybe<Scalars['Int']['input']>;
  poolId: Scalars['String']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryVeBalGetTotalSupplyArgs = {
  chain?: InputMaybe<GqlChain>;
};


export type QueryVeBalGetUserArgs = {
  address: Scalars['String']['input'];
  chain?: InputMaybe<GqlChain>;
};


export type QueryVeBalGetUserBalanceArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  chain?: InputMaybe<GqlChain>;
};


export type QueryVeBalGetUserBalancesArgs = {
  address: Scalars['String']['input'];
  chains?: InputMaybe<Array<GqlChain>>;
};

export type Token = {
  __typename: 'Token';
  address: Scalars['String']['output'];
  decimals: Scalars['Int']['output'];
};

export type GetAppGlobalPollingDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAppGlobalPollingDataQuery = { __typename: 'Query', blocksGetBlocksPerDay: number, blocksGetAverageBlockTime: number, tokenGetCurrentPrices: Array<{ __typename: 'GqlTokenPrice', price: number, address: string }>, protocolMetricsChain: { __typename: 'GqlProtocolMetricsChain', totalLiquidity: string, totalSwapVolume: string, totalSwapFee: string, poolCount: string, swapFee24h: string, swapVolume24h: string } };

export type GetTokensQueryVariables = Exact<{
  chains: Array<GqlChain> | GqlChain;
}>;


export type GetTokensQuery = { __typename: 'Query', tokens: Array<{ __typename: 'GqlToken', address: string, name: string, symbol: string, decimals: number, chain: GqlChain, chainId: number, logoURI?: string | null, priority: number, tradable: boolean, isErc4626: boolean, coingeckoId?: string | null }> };

export type GetTokenPricesQueryVariables = Exact<{
  chains: Array<GqlChain> | GqlChain;
}>;


export type GetTokenPricesQuery = { __typename: 'Query', tokenPrices: Array<{ __typename: 'GqlTokenPrice', price: number, address: string, chain: GqlChain, updatedAt: number }> };

export type GetTokensDynamicDataQueryVariables = Exact<{
  addresses: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type GetTokensDynamicDataQuery = { __typename: 'Query', dynamicData: Array<{ __typename: 'GqlTokenDynamicData', ath: number, atl: number, fdv?: string | null, high24h: number, id: string, low24h: number, marketCap?: string | null, price: number, priceChange24h: number, priceChangePercent7d?: number | null, priceChangePercent14d?: number | null, priceChangePercent24h: number, priceChangePercent30d?: number | null, tokenAddress: string, updatedAt: string }> };

export type GetBlocksPerDayQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBlocksPerDayQuery = { __typename: 'Query', blocksPerDay: number, avgBlockTime: number };

export type GetPoolQueryVariables = Exact<{
  id: Scalars['String']['input'];
  chain: GqlChain;
  userAddress?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetPoolQuery = { __typename: 'Query', pool: { __typename: 'GqlPoolComposableStable', amp: string, nestingType: GqlPoolNestingType, bptPriceRate: string, id: string, address: string, name: string, version: number, owner: string, decimals: number, factory?: string | null, symbol: string, createTime: number, type: GqlPoolType, chain: GqlChain, protocolVersion: number, tags?: Array<string | null> | null, poolTokens: Array<{ __typename: 'GqlPoolTokenDetail', id: string, index: number, name: string, symbol: string, balance: string, balanceUSD: string, address: string, priceRate: string, decimals: number, weight?: string | null, hasNestedPool: boolean, isAllowed: boolean, priceRateProvider?: string | null, priceRateProviderData?: (
        { __typename: 'GqlPriceRateProviderData' }
        & { ' $fragmentRefs'?: { 'PriceRateProviderDataFieldsFragment': PriceRateProviderDataFieldsFragment } }
      ) | null, nestedPool?: { __typename: 'GqlNestedPool', id: string, address: string, type: GqlPoolType, tokens: Array<{ __typename: 'GqlPoolTokenDetail', index: number, address: string, decimals: number }> } | null }>, dynamicData: { __typename: 'GqlPoolDynamicData', poolId: string, swapEnabled: boolean, totalLiquidity: string, totalShares: string, fees24h: string, surplus24h: string, swapFee: string, volume24h: string, holdersCount: string, isInRecoveryMode: boolean, isPaused: boolean, aprItems: Array<{ __typename: 'GqlPoolAprItem', id: string, title: string, apr: number, type: GqlPoolAprItemType, rewardTokenSymbol?: string | null, rewardTokenAddress?: string | null }> }, allTokens: Array<{ __typename: 'GqlPoolTokenExpanded', id: string, address: string, name: string, symbol: string, decimals: number, isNested: boolean, isPhantomBpt: boolean, isMainToken: boolean }>, displayTokens: Array<{ __typename: 'GqlPoolTokenDisplay', id: string, address: string, name: string, weight?: string | null, symbol: string, nestedTokens?: Array<{ __typename: 'GqlPoolTokenDisplay', id: string, address: string, name: string, weight?: string | null, symbol: string }> | null }>, staking?: { __typename: 'GqlPoolStaking', id: string, type: GqlPoolStakingType, chain: GqlChain, address: string, gauge?: { __typename: 'GqlPoolStakingGauge', id: string, gaugeAddress: string, version: number, status: GqlPoolStakingGaugeStatus, workingSupply: string, otherGauges?: Array<{ __typename: 'GqlPoolStakingOtherGauge', gaugeAddress: string, version: number, status: GqlPoolStakingGaugeStatus, id: string, rewards: Array<{ __typename: 'GqlPoolStakingGaugeReward', id: string, tokenAddress: string, rewardPerSecond: string }> }> | null, rewards: Array<{ __typename: 'GqlPoolStakingGaugeReward', id: string, rewardPerSecond: string, tokenAddress: string }> } | null, aura?: { __typename: 'GqlPoolStakingAura', id: string, apr: number, auraPoolAddress: string, auraPoolId: string, isShutdown: boolean } | null } | null, userBalance?: { __typename: 'GqlPoolUserBalance', totalBalance: string, totalBalanceUsd: number, walletBalance: string, walletBalanceUsd: number, stakedBalances: Array<{ __typename: 'GqlUserStakedBalance', balance: string, balanceUsd: number, stakingType: GqlPoolStakingType, stakingId: string }> } | null } | { __typename: 'GqlPoolElement', unitSeconds: string, principalToken: string, baseToken: string, id: string, address: string, name: string, version: number, owner: string, decimals: number, factory?: string | null, symbol: string, createTime: number, type: GqlPoolType, chain: GqlChain, protocolVersion: number, tags?: Array<string | null> | null, poolTokens: Array<{ __typename: 'GqlPoolTokenDetail', id: string, index: number, name: string, symbol: string, balance: string, balanceUSD: string, address: string, priceRate: string, decimals: number, weight?: string | null, hasNestedPool: boolean, isAllowed: boolean, priceRateProvider?: string | null, priceRateProviderData?: (
        { __typename: 'GqlPriceRateProviderData' }
        & { ' $fragmentRefs'?: { 'PriceRateProviderDataFieldsFragment': PriceRateProviderDataFieldsFragment } }
      ) | null, nestedPool?: { __typename: 'GqlNestedPool', id: string, address: string, type: GqlPoolType, tokens: Array<{ __typename: 'GqlPoolTokenDetail', index: number, address: string, decimals: number }> } | null }>, dynamicData: { __typename: 'GqlPoolDynamicData', poolId: string, swapEnabled: boolean, totalLiquidity: string, totalShares: string, fees24h: string, surplus24h: string, swapFee: string, volume24h: string, holdersCount: string, isInRecoveryMode: boolean, isPaused: boolean, aprItems: Array<{ __typename: 'GqlPoolAprItem', id: string, title: string, apr: number, type: GqlPoolAprItemType, rewardTokenSymbol?: string | null, rewardTokenAddress?: string | null }> }, allTokens: Array<{ __typename: 'GqlPoolTokenExpanded', id: string, address: string, name: string, symbol: string, decimals: number, isNested: boolean, isPhantomBpt: boolean, isMainToken: boolean }>, displayTokens: Array<{ __typename: 'GqlPoolTokenDisplay', id: string, address: string, name: string, weight?: string | null, symbol: string, nestedTokens?: Array<{ __typename: 'GqlPoolTokenDisplay', id: string, address: string, name: string, weight?: string | null, symbol: string }> | null }>, staking?: { __typename: 'GqlPoolStaking', id: string, type: GqlPoolStakingType, chain: GqlChain, address: string, gauge?: { __typename: 'GqlPoolStakingGauge', id: string, gaugeAddress: string, version: number, status: GqlPoolStakingGaugeStatus, workingSupply: string, otherGauges?: Array<{ __typename: 'GqlPoolStakingOtherGauge', gaugeAddress: string, version: number, status: GqlPoolStakingGaugeStatus, id: string, rewards: Array<{ __typename: 'GqlPoolStakingGaugeReward', id: string, tokenAddress: string, rewardPerSecond: string }> }> | null, rewards: Array<{ __typename: 'GqlPoolStakingGaugeReward', id: string, rewardPerSecond: string, tokenAddress: string }> } | null, aura?: { __typename: 'GqlPoolStakingAura', id: string, apr: number, auraPoolAddress: string, auraPoolId: string, isShutdown: boolean } | null } | null, userBalance?: { __typename: 'GqlPoolUserBalance', totalBalance: string, totalBalanceUsd: number, walletBalance: string, walletBalanceUsd: number, stakedBalances: Array<{ __typename: 'GqlUserStakedBalance', balance: string, balanceUsd: number, stakingType: GqlPoolStakingType, stakingId: string }> } | null } | { __typename: 'GqlPoolFx', alpha: string, beta: string, delta: string, epsilon: string, lambda: string, id: string, address: string, name: string, version: number, owner?: string | null, decimals: number, factory?: string | null, symbol: string, createTime: number, type: GqlPoolType, chain: GqlChain, protocolVersion: number, tags?: Array<string | null> | null, poolTokens: Array<{ __typename: 'GqlPoolTokenDetail', id: string, index: number, name: string, symbol: string, balance: string, balanceUSD: string, address: string, priceRate: string, decimals: number, weight?: string | null, hasNestedPool: boolean, isAllowed: boolean, priceRateProvider?: string | null, priceRateProviderData?: (
        { __typename: 'GqlPriceRateProviderData' }
        & { ' $fragmentRefs'?: { 'PriceRateProviderDataFieldsFragment': PriceRateProviderDataFieldsFragment } }
      ) | null, nestedPool?: { __typename: 'GqlNestedPool', id: string, address: string, type: GqlPoolType, tokens: Array<{ __typename: 'GqlPoolTokenDetail', index: number, address: string, decimals: number }> } | null }>, dynamicData: { __typename: 'GqlPoolDynamicData', poolId: string, swapEnabled: boolean, totalLiquidity: string, totalShares: string, fees24h: string, surplus24h: string, swapFee: string, volume24h: string, holdersCount: string, isInRecoveryMode: boolean, isPaused: boolean, aprItems: Array<{ __typename: 'GqlPoolAprItem', id: string, title: string, apr: number, type: GqlPoolAprItemType, rewardTokenSymbol?: string | null, rewardTokenAddress?: string | null }> }, allTokens: Array<{ __typename: 'GqlPoolTokenExpanded', id: string, address: string, name: string, symbol: string, decimals: number, isNested: boolean, isPhantomBpt: boolean, isMainToken: boolean }>, displayTokens: Array<{ __typename: 'GqlPoolTokenDisplay', id: string, address: string, name: string, weight?: string | null, symbol: string, nestedTokens?: Array<{ __typename: 'GqlPoolTokenDisplay', id: string, address: string, name: string, weight?: string | null, symbol: string }> | null }>, staking?: { __typename: 'GqlPoolStaking', id: string, type: GqlPoolStakingType, chain: GqlChain, address: string, gauge?: { __typename: 'GqlPoolStakingGauge', id: string, gaugeAddress: string, version: number, status: GqlPoolStakingGaugeStatus, workingSupply: string, otherGauges?: Array<{ __typename: 'GqlPoolStakingOtherGauge', gaugeAddress: string, version: number, status: GqlPoolStakingGaugeStatus, id: string, rewards: Array<{ __typename: 'GqlPoolStakingGaugeReward', id: string, tokenAddress: string, rewardPerSecond: string }> }> | null, rewards: Array<{ __typename: 'GqlPoolStakingGaugeReward', id: string, rewardPerSecond: string, tokenAddress: string }> } | null, aura?: { __typename: 'GqlPoolStakingAura', id: string, apr: number, auraPoolAddress: string, auraPoolId: string, isShutdown: boolean } | null } | null, userBalance?: { __typename: 'GqlPoolUserBalance', totalBalance: string, totalBalanceUsd: number, walletBalance: string, walletBalanceUsd: number, stakedBalances: Array<{ __typename: 'GqlUserStakedBalance', balance: string, balanceUsd: number, stakingType: GqlPoolStakingType, stakingId: string }> } | null } | { __typename: 'GqlPoolGyro', alpha: string, beta: string, type: GqlPoolType, c: string, dSq: string, lambda: string, root3Alpha: string, s: string, sqrtAlpha: string, sqrtBeta: string, tauAlphaX: string, tauAlphaY: string, tauBetaX: string, tauBetaY: string, u: string, v: string, w: string, z: string, nestingType: GqlPoolNestingType, id: string, address: string, name: string, version: number, owner: string, decimals: number, factory?: string | null, symbol: string, createTime: number, chain: GqlChain, protocolVersion: number, tags?: Array<string | null> | null, poolTokens: Array<{ __typename: 'GqlPoolTokenDetail', id: string, index: number, name: string, symbol: string, balance: string, balanceUSD: string, address: string, priceRate: string, decimals: number, weight?: string | null, hasNestedPool: boolean, isAllowed: boolean, priceRateProvider?: string | null, priceRateProviderData?: (
        { __typename: 'GqlPriceRateProviderData' }
        & { ' $fragmentRefs'?: { 'PriceRateProviderDataFieldsFragment': PriceRateProviderDataFieldsFragment } }
      ) | null, nestedPool?: { __typename: 'GqlNestedPool', id: string, address: string, type: GqlPoolType, tokens: Array<{ __typename: 'GqlPoolTokenDetail', index: number, address: string, decimals: number }> } | null }>, dynamicData: { __typename: 'GqlPoolDynamicData', poolId: string, swapEnabled: boolean, totalLiquidity: string, totalShares: string, fees24h: string, surplus24h: string, swapFee: string, volume24h: string, holdersCount: string, isInRecoveryMode: boolean, isPaused: boolean, aprItems: Array<{ __typename: 'GqlPoolAprItem', id: string, title: string, apr: number, type: GqlPoolAprItemType, rewardTokenSymbol?: string | null, rewardTokenAddress?: string | null }> }, allTokens: Array<{ __typename: 'GqlPoolTokenExpanded', id: string, address: string, name: string, symbol: string, decimals: number, isNested: boolean, isPhantomBpt: boolean, isMainToken: boolean }>, displayTokens: Array<{ __typename: 'GqlPoolTokenDisplay', id: string, address: string, name: string, weight?: string | null, symbol: string, nestedTokens?: Array<{ __typename: 'GqlPoolTokenDisplay', id: string, address: string, name: string, weight?: string | null, symbol: string }> | null }>, staking?: { __typename: 'GqlPoolStaking', id: string, type: GqlPoolStakingType, chain: GqlChain, address: string, gauge?: { __typename: 'GqlPoolStakingGauge', id: string, gaugeAddress: string, version: number, status: GqlPoolStakingGaugeStatus, workingSupply: string, otherGauges?: Array<{ __typename: 'GqlPoolStakingOtherGauge', gaugeAddress: string, version: number, status: GqlPoolStakingGaugeStatus, id: string, rewards: Array<{ __typename: 'GqlPoolStakingGaugeReward', id: string, tokenAddress: string, rewardPerSecond: string }> }> | null, rewards: Array<{ __typename: 'GqlPoolStakingGaugeReward', id: string, rewardPerSecond: string, tokenAddress: string }> } | null, aura?: { __typename: 'GqlPoolStakingAura', id: string, apr: number, auraPoolAddress: string, auraPoolId: string, isShutdown: boolean } | null } | null, userBalance?: { __typename: 'GqlPoolUserBalance', totalBalance: string, totalBalanceUsd: number, walletBalance: string, walletBalanceUsd: number, stakedBalances: Array<{ __typename: 'GqlUserStakedBalance', balance: string, balanceUsd: number, stakingType: GqlPoolStakingType, stakingId: string }> } | null } | { __typename: 'GqlPoolLiquidityBootstrapping', name: string, nestingType: GqlPoolNestingType, id: string, address: string, version: number, owner: string, decimals: number, factory?: string | null, symbol: string, createTime: number, type: GqlPoolType, chain: GqlChain, protocolVersion: number, tags?: Array<string | null> | null, poolTokens: Array<{ __typename: 'GqlPoolTokenDetail', id: string, index: number, name: string, symbol: string, balance: string, balanceUSD: string, address: string, priceRate: string, decimals: number, weight?: string | null, hasNestedPool: boolean, isAllowed: boolean, priceRateProvider?: string | null, priceRateProviderData?: (
        { __typename: 'GqlPriceRateProviderData' }
        & { ' $fragmentRefs'?: { 'PriceRateProviderDataFieldsFragment': PriceRateProviderDataFieldsFragment } }
      ) | null, nestedPool?: { __typename: 'GqlNestedPool', id: string, address: string, type: GqlPoolType, tokens: Array<{ __typename: 'GqlPoolTokenDetail', index: number, address: string, decimals: number }> } | null }>, dynamicData: { __typename: 'GqlPoolDynamicData', poolId: string, swapEnabled: boolean, totalLiquidity: string, totalShares: string, fees24h: string, surplus24h: string, swapFee: string, volume24h: string, holdersCount: string, isInRecoveryMode: boolean, isPaused: boolean, aprItems: Array<{ __typename: 'GqlPoolAprItem', id: string, title: string, apr: number, type: GqlPoolAprItemType, rewardTokenSymbol?: string | null, rewardTokenAddress?: string | null }> }, allTokens: Array<{ __typename: 'GqlPoolTokenExpanded', id: string, address: string, name: string, symbol: string, decimals: number, isNested: boolean, isPhantomBpt: boolean, isMainToken: boolean }>, displayTokens: Array<{ __typename: 'GqlPoolTokenDisplay', id: string, address: string, name: string, weight?: string | null, symbol: string, nestedTokens?: Array<{ __typename: 'GqlPoolTokenDisplay', id: string, address: string, name: string, weight?: string | null, symbol: string }> | null }>, staking?: { __typename: 'GqlPoolStaking', id: string, type: GqlPoolStakingType, chain: GqlChain, address: string, gauge?: { __typename: 'GqlPoolStakingGauge', id: string, gaugeAddress: string, version: number, status: GqlPoolStakingGaugeStatus, workingSupply: string, otherGauges?: Array<{ __typename: 'GqlPoolStakingOtherGauge', gaugeAddress: string, version: number, status: GqlPoolStakingGaugeStatus, id: string, rewards: Array<{ __typename: 'GqlPoolStakingGaugeReward', id: string, tokenAddress: string, rewardPerSecond: string }> }> | null, rewards: Array<{ __typename: 'GqlPoolStakingGaugeReward', id: string, rewardPerSecond: string, tokenAddress: string }> } | null, aura?: { __typename: 'GqlPoolStakingAura', id: string, apr: number, auraPoolAddress: string, auraPoolId: string, isShutdown: boolean } | null } | null, userBalance?: { __typename: 'GqlPoolUserBalance', totalBalance: string, totalBalanceUsd: number, walletBalance: string, walletBalanceUsd: number, stakedBalances: Array<{ __typename: 'GqlUserStakedBalance', balance: string, balanceUsd: number, stakingType: GqlPoolStakingType, stakingId: string }> } | null } | { __typename: 'GqlPoolMetaStable', amp: string, id: string, address: string, name: string, version: number, owner: string, decimals: number, factory?: string | null, symbol: string, createTime: number, type: GqlPoolType, chain: GqlChain, protocolVersion: number, tags?: Array<string | null> | null, poolTokens: Array<{ __typename: 'GqlPoolTokenDetail', id: string, index: number, name: string, symbol: string, balance: string, balanceUSD: string, address: string, priceRate: string, decimals: number, weight?: string | null, hasNestedPool: boolean, isAllowed: boolean, priceRateProvider?: string | null, priceRateProviderData?: (
        { __typename: 'GqlPriceRateProviderData' }
        & { ' $fragmentRefs'?: { 'PriceRateProviderDataFieldsFragment': PriceRateProviderDataFieldsFragment } }
      ) | null, nestedPool?: { __typename: 'GqlNestedPool', id: string, address: string, type: GqlPoolType, tokens: Array<{ __typename: 'GqlPoolTokenDetail', index: number, address: string, decimals: number }> } | null }>, dynamicData: { __typename: 'GqlPoolDynamicData', poolId: string, swapEnabled: boolean, totalLiquidity: string, totalShares: string, fees24h: string, surplus24h: string, swapFee: string, volume24h: string, holdersCount: string, isInRecoveryMode: boolean, isPaused: boolean, aprItems: Array<{ __typename: 'GqlPoolAprItem', id: string, title: string, apr: number, type: GqlPoolAprItemType, rewardTokenSymbol?: string | null, rewardTokenAddress?: string | null }> }, allTokens: Array<{ __typename: 'GqlPoolTokenExpanded', id: string, address: string, name: string, symbol: string, decimals: number, isNested: boolean, isPhantomBpt: boolean, isMainToken: boolean }>, displayTokens: Array<{ __typename: 'GqlPoolTokenDisplay', id: string, address: string, name: string, weight?: string | null, symbol: string, nestedTokens?: Array<{ __typename: 'GqlPoolTokenDisplay', id: string, address: string, name: string, weight?: string | null, symbol: string }> | null }>, staking?: { __typename: 'GqlPoolStaking', id: string, type: GqlPoolStakingType, chain: GqlChain, address: string, gauge?: { __typename: 'GqlPoolStakingGauge', id: string, gaugeAddress: string, version: number, status: GqlPoolStakingGaugeStatus, workingSupply: string, otherGauges?: Array<{ __typename: 'GqlPoolStakingOtherGauge', gaugeAddress: string, version: number, status: GqlPoolStakingGaugeStatus, id: string, rewards: Array<{ __typename: 'GqlPoolStakingGaugeReward', id: string, tokenAddress: string, rewardPerSecond: string }> }> | null, rewards: Array<{ __typename: 'GqlPoolStakingGaugeReward', id: string, rewardPerSecond: string, tokenAddress: string }> } | null, aura?: { __typename: 'GqlPoolStakingAura', id: string, apr: number, auraPoolAddress: string, auraPoolId: string, isShutdown: boolean } | null } | null, userBalance?: { __typename: 'GqlPoolUserBalance', totalBalance: string, totalBalanceUsd: number, walletBalance: string, walletBalanceUsd: number, stakedBalances: Array<{ __typename: 'GqlUserStakedBalance', balance: string, balanceUsd: number, stakingType: GqlPoolStakingType, stakingId: string }> } | null } | { __typename: 'GqlPoolStable', amp: string, id: string, address: string, name: string, version: number, owner: string, decimals: number, factory?: string | null, symbol: string, createTime: number, type: GqlPoolType, chain: GqlChain, protocolVersion: number, tags?: Array<string | null> | null, poolTokens: Array<{ __typename: 'GqlPoolTokenDetail', id: string, index: number, name: string, symbol: string, balance: string, balanceUSD: string, address: string, priceRate: string, decimals: number, weight?: string | null, hasNestedPool: boolean, isAllowed: boolean, priceRateProvider?: string | null, priceRateProviderData?: (
        { __typename: 'GqlPriceRateProviderData' }
        & { ' $fragmentRefs'?: { 'PriceRateProviderDataFieldsFragment': PriceRateProviderDataFieldsFragment } }
      ) | null, nestedPool?: { __typename: 'GqlNestedPool', id: string, address: string, type: GqlPoolType, tokens: Array<{ __typename: 'GqlPoolTokenDetail', index: number, address: string, decimals: number }> } | null }>, dynamicData: { __typename: 'GqlPoolDynamicData', poolId: string, swapEnabled: boolean, totalLiquidity: string, totalShares: string, fees24h: string, surplus24h: string, swapFee: string, volume24h: string, holdersCount: string, isInRecoveryMode: boolean, isPaused: boolean, aprItems: Array<{ __typename: 'GqlPoolAprItem', id: string, title: string, apr: number, type: GqlPoolAprItemType, rewardTokenSymbol?: string | null, rewardTokenAddress?: string | null }> }, allTokens: Array<{ __typename: 'GqlPoolTokenExpanded', id: string, address: string, name: string, symbol: string, decimals: number, isNested: boolean, isPhantomBpt: boolean, isMainToken: boolean }>, displayTokens: Array<{ __typename: 'GqlPoolTokenDisplay', id: string, address: string, name: string, weight?: string | null, symbol: string, nestedTokens?: Array<{ __typename: 'GqlPoolTokenDisplay', id: string, address: string, name: string, weight?: string | null, symbol: string }> | null }>, staking?: { __typename: 'GqlPoolStaking', id: string, type: GqlPoolStakingType, chain: GqlChain, address: string, gauge?: { __typename: 'GqlPoolStakingGauge', id: string, gaugeAddress: string, version: number, status: GqlPoolStakingGaugeStatus, workingSupply: string, otherGauges?: Array<{ __typename: 'GqlPoolStakingOtherGauge', gaugeAddress: string, version: number, status: GqlPoolStakingGaugeStatus, id: string, rewards: Array<{ __typename: 'GqlPoolStakingGaugeReward', id: string, tokenAddress: string, rewardPerSecond: string }> }> | null, rewards: Array<{ __typename: 'GqlPoolStakingGaugeReward', id: string, rewardPerSecond: string, tokenAddress: string }> } | null, aura?: { __typename: 'GqlPoolStakingAura', id: string, apr: number, auraPoolAddress: string, auraPoolId: string, isShutdown: boolean } | null } | null, userBalance?: { __typename: 'GqlPoolUserBalance', totalBalance: string, totalBalanceUsd: number, walletBalance: string, walletBalanceUsd: number, stakedBalances: Array<{ __typename: 'GqlUserStakedBalance', balance: string, balanceUsd: number, stakingType: GqlPoolStakingType, stakingId: string }> } | null } | { __typename: 'GqlPoolWeighted', nestingType: GqlPoolNestingType, id: string, address: string, name: string, version: number, owner: string, decimals: number, factory?: string | null, symbol: string, createTime: number, type: GqlPoolType, chain: GqlChain, protocolVersion: number, tags?: Array<string | null> | null, poolTokens: Array<{ __typename: 'GqlPoolTokenDetail', id: string, index: number, name: string, symbol: string, balance: string, balanceUSD: string, address: string, priceRate: string, decimals: number, weight?: string | null, hasNestedPool: boolean, isAllowed: boolean, priceRateProvider?: string | null, priceRateProviderData?: (
        { __typename: 'GqlPriceRateProviderData' }
        & { ' $fragmentRefs'?: { 'PriceRateProviderDataFieldsFragment': PriceRateProviderDataFieldsFragment } }
      ) | null, nestedPool?: { __typename: 'GqlNestedPool', id: string, address: string, type: GqlPoolType, tokens: Array<{ __typename: 'GqlPoolTokenDetail', index: number, address: string, decimals: number }> } | null }>, dynamicData: { __typename: 'GqlPoolDynamicData', poolId: string, swapEnabled: boolean, totalLiquidity: string, totalShares: string, fees24h: string, surplus24h: string, swapFee: string, volume24h: string, holdersCount: string, isInRecoveryMode: boolean, isPaused: boolean, aprItems: Array<{ __typename: 'GqlPoolAprItem', id: string, title: string, apr: number, type: GqlPoolAprItemType, rewardTokenSymbol?: string | null, rewardTokenAddress?: string | null }> }, allTokens: Array<{ __typename: 'GqlPoolTokenExpanded', id: string, address: string, name: string, symbol: string, decimals: number, isNested: boolean, isPhantomBpt: boolean, isMainToken: boolean }>, displayTokens: Array<{ __typename: 'GqlPoolTokenDisplay', id: string, address: string, name: string, weight?: string | null, symbol: string, nestedTokens?: Array<{ __typename: 'GqlPoolTokenDisplay', id: string, address: string, name: string, weight?: string | null, symbol: string }> | null }>, staking?: { __typename: 'GqlPoolStaking', id: string, type: GqlPoolStakingType, chain: GqlChain, address: string, gauge?: { __typename: 'GqlPoolStakingGauge', id: string, gaugeAddress: string, version: number, status: GqlPoolStakingGaugeStatus, workingSupply: string, otherGauges?: Array<{ __typename: 'GqlPoolStakingOtherGauge', gaugeAddress: string, version: number, status: GqlPoolStakingGaugeStatus, id: string, rewards: Array<{ __typename: 'GqlPoolStakingGaugeReward', id: string, tokenAddress: string, rewardPerSecond: string }> }> | null, rewards: Array<{ __typename: 'GqlPoolStakingGaugeReward', id: string, rewardPerSecond: string, tokenAddress: string }> } | null, aura?: { __typename: 'GqlPoolStakingAura', id: string, apr: number, auraPoolAddress: string, auraPoolId: string, isShutdown: boolean } | null } | null, userBalance?: { __typename: 'GqlPoolUserBalance', totalBalance: string, totalBalanceUsd: number, walletBalance: string, walletBalanceUsd: number, stakedBalances: Array<{ __typename: 'GqlUserStakedBalance', balance: string, balanceUsd: number, stakingType: GqlPoolStakingType, stakingId: string }> } | null } };

export type PriceRateProviderDataFieldsFragment = { __typename: 'GqlPriceRateProviderData', address: string, name?: string | null, summary?: string | null, reviewed: boolean, warnings?: Array<string> | null, reviewFile?: string | null, factory?: string | null, upgradeableComponents?: Array<{ __typename: 'GqlPriceRateProviderUpgradeableComponent', entryPoint: string, implementationReviewed: string } | null> | null } & { ' $fragmentName'?: 'PriceRateProviderDataFieldsFragment' };

export type GetPoolSnapshotsQueryVariables = Exact<{
  poolId: Scalars['String']['input'];
  range: GqlPoolSnapshotDataRange;
  chainId: GqlChain;
}>;


export type GetPoolSnapshotsQuery = { __typename: 'Query', snapshots: Array<{ __typename: 'GqlPoolSnapshot', id: string, timestamp: number, totalLiquidity: string, volume24h: string, fees24h: string, surplus24h: string, sharePrice: string }> };

export type GetPoolTokensDynamicDataQueryVariables = Exact<{
  addresses: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type GetPoolTokensDynamicDataQuery = { __typename: 'Query', staticData: Array<{ __typename: 'GqlTokenData', id: string, tokenAddress: string, description?: string | null, discordUrl?: string | null, telegramUrl?: string | null, twitterUsername?: string | null, websiteUrl?: string | null }>, dynamicData: Array<(
    { __typename: 'GqlTokenDynamicData' }
    & { ' $fragmentRefs'?: { 'GqlTokenDynamicDataFragment': GqlTokenDynamicDataFragment } }
  )> };

export type GetPoolEventsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  poolIdIn: Array<Scalars['String']['input']> | Scalars['String']['input'];
  chainIn: Array<GqlChain> | GqlChain;
  range?: InputMaybe<GqlPoolEventsDataRange>;
  typeIn?: InputMaybe<Array<InputMaybe<GqlPoolEventType>> | InputMaybe<GqlPoolEventType>>;
  userAddress?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetPoolEventsQuery = { __typename: 'Query', poolEvents: Array<{ __typename: 'GqlPoolAddRemoveEventV3', id: string, poolId: string, timestamp: number, tx: string, type: GqlPoolEventType, valueUSD: number, chain: GqlChain, userAddress: string, tokens: Array<{ __typename: 'GqlPoolEventAmount', address: string, amount: string, valueUSD: number }> } | { __typename: 'GqlPoolSwapEventCowAmm', id: string, poolId: string, timestamp: number, tx: string, type: GqlPoolEventType, valueUSD: number, chain: GqlChain, userAddress: string, tokenIn: { __typename: 'GqlPoolEventAmount', address: string, amount: string, valueUSD: number }, tokenOut: { __typename: 'GqlPoolEventAmount', address: string, amount: string, valueUSD: number }, surplus: { __typename: 'GqlPoolEventAmount', address: string, amount: string, valueUSD: number } } | { __typename: 'GqlPoolSwapEventV3', id: string, poolId: string, timestamp: number, tx: string, type: GqlPoolEventType, valueUSD: number, chain: GqlChain, userAddress: string, tokenIn: { __typename: 'GqlPoolEventAmount', address: string, amount: string }, tokenOut: { __typename: 'GqlPoolEventAmount', address: string, amount: string } }> };

export type GetPoolsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<GqlPoolOrderBy>;
  orderDirection?: InputMaybe<GqlPoolOrderDirection>;
  where?: InputMaybe<GqlPoolFilter>;
  textSearch?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetPoolsQuery = { __typename: 'Query', count: number, pools: Array<{ __typename: 'GqlPoolMinimal', address: string, chain: GqlChain, createTime: number, decimals: number, protocolVersion: number, tags?: Array<string | null> | null, factory?: string | null, id: string, name: string, owner?: string | null, symbol: string, type: GqlPoolType, displayTokens: Array<{ __typename: 'GqlPoolTokenDisplay', id: string, address: string, name: string, weight?: string | null, symbol: string, nestedTokens?: Array<{ __typename: 'GqlPoolTokenDisplay', id: string, address: string, name: string, weight?: string | null, symbol: string }> | null }>, dynamicData: { __typename: 'GqlPoolDynamicData', totalLiquidity: string, lifetimeVolume: string, lifetimeSwapFees: string, volume24h: string, fees24h: string, holdersCount: string, swapFee: string, swapsCount: string, totalShares: string, aprItems: Array<{ __typename: 'GqlPoolAprItem', id: string, title: string, apr: number, type: GqlPoolAprItemType, rewardTokenSymbol?: string | null, rewardTokenAddress?: string | null }> }, staking?: { __typename: 'GqlPoolStaking', id: string, type: GqlPoolStakingType, chain: GqlChain, address: string, gauge?: { __typename: 'GqlPoolStakingGauge', id: string, gaugeAddress: string, version: number, status: GqlPoolStakingGaugeStatus, workingSupply: string, otherGauges?: Array<{ __typename: 'GqlPoolStakingOtherGauge', gaugeAddress: string, version: number, status: GqlPoolStakingGaugeStatus, id: string, rewards: Array<{ __typename: 'GqlPoolStakingGaugeReward', id: string, tokenAddress: string, rewardPerSecond: string }> }> | null, rewards: Array<{ __typename: 'GqlPoolStakingGaugeReward', id: string, rewardPerSecond: string, tokenAddress: string }> } | null, aura?: { __typename: 'GqlPoolStakingAura', id: string, apr: number, auraPoolAddress: string, auraPoolId: string, isShutdown: boolean } | null } | null, userBalance?: { __typename: 'GqlPoolUserBalance', totalBalance: string, totalBalanceUsd: number, walletBalance: string, walletBalanceUsd: number, stakedBalances: Array<{ __typename: 'GqlUserStakedBalance', balance: string, balanceUsd: number, stakingType: GqlPoolStakingType, stakingId: string }> } | null }> };

export type GetFeaturedPoolsQueryVariables = Exact<{
  chains: Array<GqlChain> | GqlChain;
}>;


export type GetFeaturedPoolsQuery = { __typename: 'Query', featuredPools: Array<{ __typename: 'GqlPoolFeaturedPool', poolId: string, primary: boolean, description: string, pool: { __typename: 'GqlPoolComposableStable', id: string, name: string, factory?: string | null, symbol: string, type: GqlPoolType, chain: GqlChain, protocolVersion: number, dynamicData: { __typename: 'GqlPoolDynamicData', totalLiquidity: string, aprItems: Array<{ __typename: 'GqlPoolAprItem', id: string, title: string, apr: number, type: GqlPoolAprItemType, rewardTokenSymbol?: string | null, rewardTokenAddress?: string | null }> }, displayTokens: Array<{ __typename: 'GqlPoolTokenDisplay', id: string, address: string, name: string, weight?: string | null, symbol: string, nestedTokens?: Array<{ __typename: 'GqlPoolTokenDisplay', id: string, address: string, name: string, weight?: string | null, symbol: string }> | null }> } | { __typename: 'GqlPoolElement', id: string, name: string, factory?: string | null, symbol: string, type: GqlPoolType, chain: GqlChain, protocolVersion: number, dynamicData: { __typename: 'GqlPoolDynamicData', totalLiquidity: string, aprItems: Array<{ __typename: 'GqlPoolAprItem', id: string, title: string, apr: number, type: GqlPoolAprItemType, rewardTokenSymbol?: string | null, rewardTokenAddress?: string | null }> }, displayTokens: Array<{ __typename: 'GqlPoolTokenDisplay', id: string, address: string, name: string, weight?: string | null, symbol: string, nestedTokens?: Array<{ __typename: 'GqlPoolTokenDisplay', id: string, address: string, name: string, weight?: string | null, symbol: string }> | null }> } | { __typename: 'GqlPoolFx', id: string, name: string, factory?: string | null, symbol: string, type: GqlPoolType, chain: GqlChain, protocolVersion: number, dynamicData: { __typename: 'GqlPoolDynamicData', totalLiquidity: string, aprItems: Array<{ __typename: 'GqlPoolAprItem', id: string, title: string, apr: number, type: GqlPoolAprItemType, rewardTokenSymbol?: string | null, rewardTokenAddress?: string | null }> }, displayTokens: Array<{ __typename: 'GqlPoolTokenDisplay', id: string, address: string, name: string, weight?: string | null, symbol: string, nestedTokens?: Array<{ __typename: 'GqlPoolTokenDisplay', id: string, address: string, name: string, weight?: string | null, symbol: string }> | null }> } | { __typename: 'GqlPoolGyro', id: string, name: string, factory?: string | null, symbol: string, type: GqlPoolType, chain: GqlChain, protocolVersion: number, dynamicData: { __typename: 'GqlPoolDynamicData', totalLiquidity: string, aprItems: Array<{ __typename: 'GqlPoolAprItem', id: string, title: string, apr: number, type: GqlPoolAprItemType, rewardTokenSymbol?: string | null, rewardTokenAddress?: string | null }> }, displayTokens: Array<{ __typename: 'GqlPoolTokenDisplay', id: string, address: string, name: string, weight?: string | null, symbol: string, nestedTokens?: Array<{ __typename: 'GqlPoolTokenDisplay', id: string, address: string, name: string, weight?: string | null, symbol: string }> | null }> } | { __typename: 'GqlPoolLiquidityBootstrapping', id: string, name: string, factory?: string | null, symbol: string, type: GqlPoolType, chain: GqlChain, protocolVersion: number, dynamicData: { __typename: 'GqlPoolDynamicData', totalLiquidity: string, aprItems: Array<{ __typename: 'GqlPoolAprItem', id: string, title: string, apr: number, type: GqlPoolAprItemType, rewardTokenSymbol?: string | null, rewardTokenAddress?: string | null }> }, displayTokens: Array<{ __typename: 'GqlPoolTokenDisplay', id: string, address: string, name: string, weight?: string | null, symbol: string, nestedTokens?: Array<{ __typename: 'GqlPoolTokenDisplay', id: string, address: string, name: string, weight?: string | null, symbol: string }> | null }> } | { __typename: 'GqlPoolMetaStable', id: string, name: string, factory?: string | null, symbol: string, type: GqlPoolType, chain: GqlChain, protocolVersion: number, dynamicData: { __typename: 'GqlPoolDynamicData', totalLiquidity: string, aprItems: Array<{ __typename: 'GqlPoolAprItem', id: string, title: string, apr: number, type: GqlPoolAprItemType, rewardTokenSymbol?: string | null, rewardTokenAddress?: string | null }> }, displayTokens: Array<{ __typename: 'GqlPoolTokenDisplay', id: string, address: string, name: string, weight?: string | null, symbol: string, nestedTokens?: Array<{ __typename: 'GqlPoolTokenDisplay', id: string, address: string, name: string, weight?: string | null, symbol: string }> | null }> } | { __typename: 'GqlPoolStable', id: string, name: string, factory?: string | null, symbol: string, type: GqlPoolType, chain: GqlChain, protocolVersion: number, dynamicData: { __typename: 'GqlPoolDynamicData', totalLiquidity: string, aprItems: Array<{ __typename: 'GqlPoolAprItem', id: string, title: string, apr: number, type: GqlPoolAprItemType, rewardTokenSymbol?: string | null, rewardTokenAddress?: string | null }> }, displayTokens: Array<{ __typename: 'GqlPoolTokenDisplay', id: string, address: string, name: string, weight?: string | null, symbol: string, nestedTokens?: Array<{ __typename: 'GqlPoolTokenDisplay', id: string, address: string, name: string, weight?: string | null, symbol: string }> | null }> } | { __typename: 'GqlPoolWeighted', id: string, name: string, factory?: string | null, symbol: string, type: GqlPoolType, chain: GqlChain, protocolVersion: number, dynamicData: { __typename: 'GqlPoolDynamicData', totalLiquidity: string, aprItems: Array<{ __typename: 'GqlPoolAprItem', id: string, title: string, apr: number, type: GqlPoolAprItemType, rewardTokenSymbol?: string | null, rewardTokenAddress?: string | null }> }, displayTokens: Array<{ __typename: 'GqlPoolTokenDisplay', id: string, address: string, name: string, weight?: string | null, symbol: string, nestedTokens?: Array<{ __typename: 'GqlPoolTokenDisplay', id: string, address: string, name: string, weight?: string | null, symbol: string }> | null }> } }> };

export type GetProtocolStatsQueryVariables = Exact<{
  chains?: InputMaybe<Array<GqlChain> | GqlChain>;
}>;


export type GetProtocolStatsQuery = { __typename: 'Query', protocolMetricsAggregated: { __typename: 'GqlProtocolMetricsAggregated', totalLiquidity: string, numLiquidityProviders: string, swapVolume24h: string, swapFee24h: string } };

export type GetSorSwapsQueryVariables = Exact<{
  tokenIn: Scalars['String']['input'];
  tokenOut: Scalars['String']['input'];
  swapType: GqlSorSwapType;
  swapAmount: Scalars['AmountHumanReadable']['input'];
  chain: GqlChain;
  queryBatchSwap: Scalars['Boolean']['input'];
}>;


export type GetSorSwapsQuery = { __typename: 'Query', swaps: { __typename: 'GqlSorGetSwapPaths', effectivePrice: string, effectivePriceReversed: string, swapType: GqlSorSwapType, returnAmount: string, swapAmount: string, tokenIn: string, tokenInAmount: string, tokenOut: string, tokenOutAmount: string, protocolVersion: number, paths: Array<{ __typename: 'GqlSorPath', inputAmountRaw: string, outputAmountRaw: string, pools: Array<string>, protocolVersion: number, tokens: Array<{ __typename: 'Token', address: string, decimals: number }> }>, priceImpact: { __typename: 'GqlPriceImpact', priceImpact?: string | null, error?: string | null }, routes: Array<{ __typename: 'GqlSorSwapRoute', share: number, tokenInAmount: string, tokenOut: string, tokenOutAmount: string, hops: Array<{ __typename: 'GqlSorSwapRouteHop', poolId: string, tokenIn: string, tokenInAmount: string, tokenOut: string, tokenOutAmount: string, pool: { __typename: 'GqlPoolMinimal', symbol: string } }> }>, swaps: Array<{ __typename: 'GqlSorSwap', amount: string, assetInIndex: number, assetOutIndex: number, poolId: string, userData: string }> } };

export type GqlTokenDynamicDataFragment = { __typename: 'GqlTokenDynamicData', id: string, tokenAddress: string, ath: number, atl: number, marketCap?: string | null, fdv?: string | null, priceChange24h: number, priceChangePercent24h: number, priceChangePercent7d?: number | null, priceChangePercent14d?: number | null, priceChangePercent30d?: number | null, high24h: number, low24h: number, updatedAt: string } & { ' $fragmentName'?: 'GqlTokenDynamicDataFragment' };

export type GetVeBalUserQueryVariables = Exact<{
  address: Scalars['String']['input'];
  chain?: InputMaybe<GqlChain>;
}>;


export type GetVeBalUserQuery = { __typename: 'Query', veBalGetUser: { __typename: 'GqlVeBalUserData', balance: string, rank?: number | null } };

export const PriceRateProviderDataFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PriceRateProviderDataFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GqlPriceRateProviderData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"reviewed"}},{"kind":"Field","name":{"kind":"Name","value":"warnings"}},{"kind":"Field","name":{"kind":"Name","value":"upgradeableComponents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"entryPoint"}},{"kind":"Field","name":{"kind":"Name","value":"implementationReviewed"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reviewFile"}},{"kind":"Field","name":{"kind":"Name","value":"factory"}}]}}]} as unknown as DocumentNode<PriceRateProviderDataFieldsFragment, unknown>;
export const GqlTokenDynamicDataFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GqlTokenDynamicData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GqlTokenDynamicData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tokenAddress"}},{"kind":"Field","name":{"kind":"Name","value":"ath"}},{"kind":"Field","name":{"kind":"Name","value":"atl"}},{"kind":"Field","name":{"kind":"Name","value":"marketCap"}},{"kind":"Field","name":{"kind":"Name","value":"fdv"}},{"kind":"Field","name":{"kind":"Name","value":"priceChange24h"}},{"kind":"Field","name":{"kind":"Name","value":"priceChangePercent24h"}},{"kind":"Field","name":{"kind":"Name","value":"priceChangePercent7d"}},{"kind":"Field","name":{"kind":"Name","value":"priceChangePercent14d"}},{"kind":"Field","name":{"kind":"Name","value":"priceChangePercent30d"}},{"kind":"Field","name":{"kind":"Name","value":"high24h"}},{"kind":"Field","name":{"kind":"Name","value":"low24h"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<GqlTokenDynamicDataFragment, unknown>;
export const GetAppGlobalPollingDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAppGlobalPollingData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokenGetCurrentPrices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"address"}}]}},{"kind":"Field","name":{"kind":"Name","value":"protocolMetricsChain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalLiquidity"}},{"kind":"Field","name":{"kind":"Name","value":"totalSwapVolume"}},{"kind":"Field","name":{"kind":"Name","value":"totalSwapFee"}},{"kind":"Field","name":{"kind":"Name","value":"poolCount"}},{"kind":"Field","name":{"kind":"Name","value":"swapFee24h"}},{"kind":"Field","name":{"kind":"Name","value":"swapVolume24h"}}]}},{"kind":"Field","name":{"kind":"Name","value":"blocksGetBlocksPerDay"}},{"kind":"Field","name":{"kind":"Name","value":"blocksGetAverageBlockTime"}}]}}]} as unknown as DocumentNode<GetAppGlobalPollingDataQuery, GetAppGlobalPollingDataQueryVariables>;
export const GetTokensDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTokens"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chains"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GqlChain"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"tokens"},"name":{"kind":"Name","value":"tokenGetTokens"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chains"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chains"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"chain"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"logoURI"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"tradable"}},{"kind":"Field","name":{"kind":"Name","value":"isErc4626"}},{"kind":"Field","name":{"kind":"Name","value":"coingeckoId"}}]}}]}}]} as unknown as DocumentNode<GetTokensQuery, GetTokensQueryVariables>;
export const GetTokenPricesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTokenPrices"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chains"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GqlChain"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"tokenPrices"},"name":{"kind":"Name","value":"tokenGetCurrentPrices"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chains"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chains"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chain"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetTokenPricesQuery, GetTokenPricesQueryVariables>;
export const GetTokensDynamicDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTokensDynamicData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"addresses"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"dynamicData"},"name":{"kind":"Name","value":"tokenGetTokensDynamicData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"addresses"},"value":{"kind":"Variable","name":{"kind":"Name","value":"addresses"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ath"}},{"kind":"Field","name":{"kind":"Name","value":"atl"}},{"kind":"Field","name":{"kind":"Name","value":"fdv"}},{"kind":"Field","name":{"kind":"Name","value":"high24h"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"low24h"}},{"kind":"Field","name":{"kind":"Name","value":"marketCap"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"priceChange24h"}},{"kind":"Field","name":{"kind":"Name","value":"priceChangePercent7d"}},{"kind":"Field","name":{"kind":"Name","value":"priceChangePercent14d"}},{"kind":"Field","name":{"kind":"Name","value":"priceChangePercent24h"}},{"kind":"Field","name":{"kind":"Name","value":"priceChangePercent30d"}},{"kind":"Field","name":{"kind":"Name","value":"tokenAddress"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetTokensDynamicDataQuery, GetTokensDynamicDataQueryVariables>;
export const GetBlocksPerDayDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBlocksPerDay"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"blocksPerDay"},"name":{"kind":"Name","value":"blocksGetBlocksPerDay"}},{"kind":"Field","alias":{"kind":"Name","value":"avgBlockTime"},"name":{"kind":"Name","value":"blocksGetAverageBlockTime"}}]}}]} as unknown as DocumentNode<GetBlocksPerDayQuery, GetBlocksPerDayQueryVariables>;
export const GetPoolDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPool"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chain"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GqlChain"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userAddress"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"pool"},"name":{"kind":"Name","value":"poolGetPool"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"chain"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chain"}}},{"kind":"Argument","name":{"kind":"Name","value":"userAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userAddress"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"factory"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"chain"}},{"kind":"Field","name":{"kind":"Name","value":"protocolVersion"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"dynamicData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"poolId"}},{"kind":"Field","name":{"kind":"Name","value":"swapEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"totalLiquidity"}},{"kind":"Field","name":{"kind":"Name","value":"totalShares"}},{"kind":"Field","name":{"kind":"Name","value":"fees24h"}},{"kind":"Field","name":{"kind":"Name","value":"surplus24h"}},{"kind":"Field","name":{"kind":"Name","value":"swapFee"}},{"kind":"Field","name":{"kind":"Name","value":"volume24h"}},{"kind":"Field","name":{"kind":"Name","value":"holdersCount"}},{"kind":"Field","name":{"kind":"Name","value":"isInRecoveryMode"}},{"kind":"Field","name":{"kind":"Name","value":"isPaused"}},{"kind":"Field","name":{"kind":"Name","value":"aprItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"apr"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"rewardTokenSymbol"}},{"kind":"Field","name":{"kind":"Name","value":"rewardTokenAddress"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"allTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"isNested"}},{"kind":"Field","name":{"kind":"Name","value":"isPhantomBpt"}},{"kind":"Field","name":{"kind":"Name","value":"isMainToken"}}]}},{"kind":"Field","name":{"kind":"Name","value":"displayTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"nestedTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"staking"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"chain"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"gauge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"gaugeAddress"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"workingSupply"}},{"kind":"Field","name":{"kind":"Name","value":"otherGauges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gaugeAddress"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rewards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tokenAddress"}},{"kind":"Field","name":{"kind":"Name","value":"rewardPerSecond"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"rewards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rewardPerSecond"}},{"kind":"Field","name":{"kind":"Name","value":"tokenAddress"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"aura"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"apr"}},{"kind":"Field","name":{"kind":"Name","value":"auraPoolAddress"}},{"kind":"Field","name":{"kind":"Name","value":"auraPoolId"}},{"kind":"Field","name":{"kind":"Name","value":"isShutdown"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"userBalance"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalBalance"}},{"kind":"Field","name":{"kind":"Name","value":"totalBalanceUsd"}},{"kind":"Field","name":{"kind":"Name","value":"walletBalance"}},{"kind":"Field","name":{"kind":"Name","value":"walletBalanceUsd"}},{"kind":"Field","name":{"kind":"Name","value":"stakedBalances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"balanceUsd"}},{"kind":"Field","name":{"kind":"Name","value":"stakingType"}},{"kind":"Field","name":{"kind":"Name","value":"stakingId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GqlPoolWeighted"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nestingType"}},{"kind":"Field","name":{"kind":"Name","value":"poolTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GqlPoolTokenDetail"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"balanceUSD"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"priceRate"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"hasNestedPool"}},{"kind":"Field","name":{"kind":"Name","value":"isAllowed"}},{"kind":"Field","name":{"kind":"Name","value":"priceRateProvider"}},{"kind":"Field","name":{"kind":"Name","value":"priceRateProviderData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PriceRateProviderDataFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nestedPool"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"tokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"isAllowed"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GqlPoolStable"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amp"}},{"kind":"Field","name":{"kind":"Name","value":"poolTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GqlPoolTokenDetail"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"balanceUSD"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"priceRate"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"hasNestedPool"}},{"kind":"Field","name":{"kind":"Name","value":"isAllowed"}},{"kind":"Field","name":{"kind":"Name","value":"priceRateProvider"}},{"kind":"Field","name":{"kind":"Name","value":"priceRateProviderData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PriceRateProviderDataFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nestedPool"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"tokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"isAllowed"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GqlPoolMetaStable"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amp"}},{"kind":"Field","name":{"kind":"Name","value":"poolTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GqlPoolTokenDetail"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"balanceUSD"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"priceRate"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"hasNestedPool"}},{"kind":"Field","name":{"kind":"Name","value":"isAllowed"}},{"kind":"Field","name":{"kind":"Name","value":"priceRateProvider"}},{"kind":"Field","name":{"kind":"Name","value":"priceRateProviderData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PriceRateProviderDataFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nestedPool"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"tokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"isAllowed"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GqlPoolElement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unitSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"principalToken"}},{"kind":"Field","name":{"kind":"Name","value":"baseToken"}},{"kind":"Field","name":{"kind":"Name","value":"poolTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GqlPoolTokenDetail"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"balanceUSD"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"priceRate"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"hasNestedPool"}},{"kind":"Field","name":{"kind":"Name","value":"isAllowed"}},{"kind":"Field","name":{"kind":"Name","value":"priceRateProvider"}},{"kind":"Field","name":{"kind":"Name","value":"priceRateProviderData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PriceRateProviderDataFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nestedPool"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"tokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"isAllowed"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GqlPoolComposableStable"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amp"}},{"kind":"Field","name":{"kind":"Name","value":"nestingType"}},{"kind":"Field","name":{"kind":"Name","value":"bptPriceRate"}},{"kind":"Field","name":{"kind":"Name","value":"poolTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GqlPoolTokenDetail"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"balanceUSD"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"priceRate"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"hasNestedPool"}},{"kind":"Field","name":{"kind":"Name","value":"isAllowed"}},{"kind":"Field","name":{"kind":"Name","value":"priceRateProvider"}},{"kind":"Field","name":{"kind":"Name","value":"priceRateProviderData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PriceRateProviderDataFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nestedPool"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"tokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"isAllowed"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GqlPoolLiquidityBootstrapping"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nestingType"}},{"kind":"Field","name":{"kind":"Name","value":"poolTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GqlPoolTokenDetail"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"balanceUSD"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"priceRate"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"hasNestedPool"}},{"kind":"Field","name":{"kind":"Name","value":"isAllowed"}},{"kind":"Field","name":{"kind":"Name","value":"priceRateProvider"}},{"kind":"Field","name":{"kind":"Name","value":"priceRateProviderData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PriceRateProviderDataFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nestedPool"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"tokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"isAllowed"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GqlPoolGyro"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alpha"}},{"kind":"Field","name":{"kind":"Name","value":"beta"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"c"}},{"kind":"Field","name":{"kind":"Name","value":"dSq"}},{"kind":"Field","name":{"kind":"Name","value":"lambda"}},{"kind":"Field","name":{"kind":"Name","value":"root3Alpha"}},{"kind":"Field","name":{"kind":"Name","value":"s"}},{"kind":"Field","name":{"kind":"Name","value":"sqrtAlpha"}},{"kind":"Field","name":{"kind":"Name","value":"sqrtBeta"}},{"kind":"Field","name":{"kind":"Name","value":"tauAlphaX"}},{"kind":"Field","name":{"kind":"Name","value":"tauAlphaY"}},{"kind":"Field","name":{"kind":"Name","value":"tauBetaX"}},{"kind":"Field","name":{"kind":"Name","value":"tauBetaY"}},{"kind":"Field","name":{"kind":"Name","value":"u"}},{"kind":"Field","name":{"kind":"Name","value":"v"}},{"kind":"Field","name":{"kind":"Name","value":"w"}},{"kind":"Field","name":{"kind":"Name","value":"z"}},{"kind":"Field","name":{"kind":"Name","value":"nestingType"}},{"kind":"Field","name":{"kind":"Name","value":"poolTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GqlPoolTokenDetail"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"balanceUSD"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"priceRate"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"hasNestedPool"}},{"kind":"Field","name":{"kind":"Name","value":"isAllowed"}},{"kind":"Field","name":{"kind":"Name","value":"priceRateProvider"}},{"kind":"Field","name":{"kind":"Name","value":"priceRateProviderData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PriceRateProviderDataFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nestedPool"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"tokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"isAllowed"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GqlPoolFx"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alpha"}},{"kind":"Field","name":{"kind":"Name","value":"beta"}},{"kind":"Field","name":{"kind":"Name","value":"delta"}},{"kind":"Field","name":{"kind":"Name","value":"epsilon"}},{"kind":"Field","name":{"kind":"Name","value":"lambda"}},{"kind":"Field","name":{"kind":"Name","value":"poolTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GqlPoolTokenDetail"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"balanceUSD"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"priceRate"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"hasNestedPool"}},{"kind":"Field","name":{"kind":"Name","value":"isAllowed"}},{"kind":"Field","name":{"kind":"Name","value":"priceRateProvider"}},{"kind":"Field","name":{"kind":"Name","value":"priceRateProviderData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PriceRateProviderDataFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nestedPool"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"tokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"isAllowed"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PriceRateProviderDataFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GqlPriceRateProviderData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"reviewed"}},{"kind":"Field","name":{"kind":"Name","value":"warnings"}},{"kind":"Field","name":{"kind":"Name","value":"upgradeableComponents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"entryPoint"}},{"kind":"Field","name":{"kind":"Name","value":"implementationReviewed"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reviewFile"}},{"kind":"Field","name":{"kind":"Name","value":"factory"}}]}}]} as unknown as DocumentNode<GetPoolQuery, GetPoolQueryVariables>;
export const GetPoolSnapshotsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPoolSnapshots"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"poolId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"range"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GqlPoolSnapshotDataRange"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chainId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GqlChain"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"snapshots"},"name":{"kind":"Name","value":"poolGetSnapshots"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"poolId"}}},{"kind":"Argument","name":{"kind":"Name","value":"range"},"value":{"kind":"Variable","name":{"kind":"Name","value":"range"}}},{"kind":"Argument","name":{"kind":"Name","value":"chain"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chainId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"totalLiquidity"}},{"kind":"Field","name":{"kind":"Name","value":"volume24h"}},{"kind":"Field","name":{"kind":"Name","value":"fees24h"}},{"kind":"Field","name":{"kind":"Name","value":"surplus24h"}},{"kind":"Field","name":{"kind":"Name","value":"sharePrice"}}]}}]}}]} as unknown as DocumentNode<GetPoolSnapshotsQuery, GetPoolSnapshotsQueryVariables>;
export const GetPoolTokensDynamicDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPoolTokensDynamicData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"addresses"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"staticData"},"name":{"kind":"Name","value":"tokenGetTokensData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"addresses"},"value":{"kind":"Variable","name":{"kind":"Name","value":"addresses"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tokenAddress"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"discordUrl"}},{"kind":"Field","name":{"kind":"Name","value":"telegramUrl"}},{"kind":"Field","name":{"kind":"Name","value":"twitterUsername"}},{"kind":"Field","name":{"kind":"Name","value":"websiteUrl"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"dynamicData"},"name":{"kind":"Name","value":"tokenGetTokensDynamicData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"addresses"},"value":{"kind":"Variable","name":{"kind":"Name","value":"addresses"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GqlTokenDynamicData"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GqlTokenDynamicData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GqlTokenDynamicData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tokenAddress"}},{"kind":"Field","name":{"kind":"Name","value":"ath"}},{"kind":"Field","name":{"kind":"Name","value":"atl"}},{"kind":"Field","name":{"kind":"Name","value":"marketCap"}},{"kind":"Field","name":{"kind":"Name","value":"fdv"}},{"kind":"Field","name":{"kind":"Name","value":"priceChange24h"}},{"kind":"Field","name":{"kind":"Name","value":"priceChangePercent24h"}},{"kind":"Field","name":{"kind":"Name","value":"priceChangePercent7d"}},{"kind":"Field","name":{"kind":"Name","value":"priceChangePercent14d"}},{"kind":"Field","name":{"kind":"Name","value":"priceChangePercent30d"}},{"kind":"Field","name":{"kind":"Name","value":"high24h"}},{"kind":"Field","name":{"kind":"Name","value":"low24h"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<GetPoolTokensDynamicDataQuery, GetPoolTokensDynamicDataQueryVariables>;
export const GetPoolEventsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPoolEvents"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"poolIdIn"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chainIn"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GqlChain"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"range"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GqlPoolEventsDataRange"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"typeIn"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GqlPoolEventType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userAddress"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"poolEvents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"poolIdIn"},"value":{"kind":"Variable","name":{"kind":"Name","value":"poolIdIn"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"chainIn"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chainIn"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"range"},"value":{"kind":"Variable","name":{"kind":"Name","value":"range"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"typeIn"},"value":{"kind":"Variable","name":{"kind":"Name","value":"typeIn"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"userAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userAddress"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"poolId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"tx"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"valueUSD"}},{"kind":"Field","name":{"kind":"Name","value":"chain"}},{"kind":"Field","name":{"kind":"Name","value":"userAddress"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GqlPoolSwapEventV3"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokenIn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tokenOut"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GqlPoolSwapEventCowAmm"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokenIn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"valueUSD"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tokenOut"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"valueUSD"}}]}},{"kind":"Field","name":{"kind":"Name","value":"surplus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"valueUSD"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GqlPoolAddRemoveEventV3"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"valueUSD"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetPoolEventsQuery, GetPoolEventsQueryVariables>;
export const GetPoolsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPools"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GqlPoolOrderBy"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GqlPoolOrderDirection"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GqlPoolFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"textSearch"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"pools"},"name":{"kind":"Name","value":"poolGetPools"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"textSearch"},"value":{"kind":"Variable","name":{"kind":"Name","value":"textSearch"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chain"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"protocolVersion"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"displayTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"nestedTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"dynamicData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalLiquidity"}},{"kind":"Field","name":{"kind":"Name","value":"lifetimeVolume"}},{"kind":"Field","name":{"kind":"Name","value":"lifetimeSwapFees"}},{"kind":"Field","name":{"kind":"Name","value":"volume24h"}},{"kind":"Field","name":{"kind":"Name","value":"fees24h"}},{"kind":"Field","name":{"kind":"Name","value":"holdersCount"}},{"kind":"Field","name":{"kind":"Name","value":"swapFee"}},{"kind":"Field","name":{"kind":"Name","value":"swapsCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalShares"}},{"kind":"Field","name":{"kind":"Name","value":"aprItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"apr"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"rewardTokenSymbol"}},{"kind":"Field","name":{"kind":"Name","value":"rewardTokenAddress"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"staking"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"chain"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"gauge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"gaugeAddress"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"workingSupply"}},{"kind":"Field","name":{"kind":"Name","value":"otherGauges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gaugeAddress"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rewards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tokenAddress"}},{"kind":"Field","name":{"kind":"Name","value":"rewardPerSecond"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"rewards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rewardPerSecond"}},{"kind":"Field","name":{"kind":"Name","value":"tokenAddress"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"aura"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"apr"}},{"kind":"Field","name":{"kind":"Name","value":"auraPoolAddress"}},{"kind":"Field","name":{"kind":"Name","value":"auraPoolId"}},{"kind":"Field","name":{"kind":"Name","value":"isShutdown"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"factory"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"userBalance"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalBalance"}},{"kind":"Field","name":{"kind":"Name","value":"totalBalanceUsd"}},{"kind":"Field","name":{"kind":"Name","value":"walletBalance"}},{"kind":"Field","name":{"kind":"Name","value":"walletBalanceUsd"}},{"kind":"Field","name":{"kind":"Name","value":"stakedBalances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"balanceUsd"}},{"kind":"Field","name":{"kind":"Name","value":"stakingType"}},{"kind":"Field","name":{"kind":"Name","value":"stakingId"}}]}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"count"},"name":{"kind":"Name","value":"poolGetPoolsCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"textSearch"},"value":{"kind":"Variable","name":{"kind":"Name","value":"textSearch"}}}]}]}}]} as unknown as DocumentNode<GetPoolsQuery, GetPoolsQueryVariables>;
export const GetFeaturedPoolsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFeaturedPools"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chains"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GqlChain"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"featuredPools"},"name":{"kind":"Name","value":"poolGetFeaturedPools"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chains"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chains"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"poolId"}},{"kind":"Field","name":{"kind":"Name","value":"primary"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"pool"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"factory"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"chain"}},{"kind":"Field","name":{"kind":"Name","value":"protocolVersion"}},{"kind":"Field","name":{"kind":"Name","value":"dynamicData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalLiquidity"}},{"kind":"Field","name":{"kind":"Name","value":"aprItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"apr"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"rewardTokenSymbol"}},{"kind":"Field","name":{"kind":"Name","value":"rewardTokenAddress"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"displayTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"nestedTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetFeaturedPoolsQuery, GetFeaturedPoolsQueryVariables>;
export const GetProtocolStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProtocolStats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chains"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GqlChain"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"protocolMetricsAggregated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chains"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chains"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalLiquidity"}},{"kind":"Field","name":{"kind":"Name","value":"numLiquidityProviders"}},{"kind":"Field","name":{"kind":"Name","value":"swapVolume24h"}},{"kind":"Field","name":{"kind":"Name","value":"swapFee24h"}}]}}]}}]} as unknown as DocumentNode<GetProtocolStatsQuery, GetProtocolStatsQueryVariables>;
export const GetSorSwapsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSorSwaps"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tokenIn"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tokenOut"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"swapType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GqlSorSwapType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"swapAmount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AmountHumanReadable"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chain"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GqlChain"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"queryBatchSwap"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"swaps"},"name":{"kind":"Name","value":"sorGetSwapPaths"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tokenIn"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tokenIn"}}},{"kind":"Argument","name":{"kind":"Name","value":"tokenOut"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tokenOut"}}},{"kind":"Argument","name":{"kind":"Name","value":"swapType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"swapType"}}},{"kind":"Argument","name":{"kind":"Name","value":"swapAmount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"swapAmount"}}},{"kind":"Argument","name":{"kind":"Name","value":"chain"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chain"}}},{"kind":"Argument","name":{"kind":"Name","value":"queryBatchSwap"},"value":{"kind":"Variable","name":{"kind":"Name","value":"queryBatchSwap"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"effectivePrice"}},{"kind":"Field","name":{"kind":"Name","value":"effectivePriceReversed"}},{"kind":"Field","name":{"kind":"Name","value":"swapType"}},{"kind":"Field","name":{"kind":"Name","value":"paths"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inputAmountRaw"}},{"kind":"Field","name":{"kind":"Name","value":"outputAmountRaw"}},{"kind":"Field","name":{"kind":"Name","value":"pools"}},{"kind":"Field","name":{"kind":"Name","value":"protocolVersion"}},{"kind":"Field","name":{"kind":"Name","value":"tokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceImpact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceImpact"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}},{"kind":"Field","name":{"kind":"Name","value":"returnAmount"}},{"kind":"Field","name":{"kind":"Name","value":"routes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hops"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pool"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"Field","name":{"kind":"Name","value":"poolId"}},{"kind":"Field","name":{"kind":"Name","value":"tokenIn"}},{"kind":"Field","name":{"kind":"Name","value":"tokenInAmount"}},{"kind":"Field","name":{"kind":"Name","value":"tokenOut"}},{"kind":"Field","name":{"kind":"Name","value":"tokenOutAmount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"share"}},{"kind":"Field","name":{"kind":"Name","value":"tokenInAmount"}},{"kind":"Field","name":{"kind":"Name","value":"tokenInAmount"}},{"kind":"Field","name":{"kind":"Name","value":"tokenOut"}},{"kind":"Field","name":{"kind":"Name","value":"tokenOutAmount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"swapAmount"}},{"kind":"Field","name":{"kind":"Name","value":"swaps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"assetInIndex"}},{"kind":"Field","name":{"kind":"Name","value":"assetOutIndex"}},{"kind":"Field","name":{"kind":"Name","value":"poolId"}},{"kind":"Field","name":{"kind":"Name","value":"userData"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tokenIn"}},{"kind":"Field","name":{"kind":"Name","value":"tokenInAmount"}},{"kind":"Field","name":{"kind":"Name","value":"tokenOut"}},{"kind":"Field","name":{"kind":"Name","value":"tokenOutAmount"}},{"kind":"Field","name":{"kind":"Name","value":"protocolVersion"}}]}}]}}]} as unknown as DocumentNode<GetSorSwapsQuery, GetSorSwapsQueryVariables>;
export const GetVeBalUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetVeBalUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chain"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GqlChain"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"veBalGetUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"Argument","name":{"kind":"Name","value":"chain"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chain"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"rank"}}]}}]}}]} as unknown as DocumentNode<GetVeBalUserQuery, GetVeBalUserQueryVariables>;