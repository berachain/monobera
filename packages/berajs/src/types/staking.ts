import { Address } from "viem";

import { Token } from "./dex";

export interface ValidatorInfo {
  id: Address;
  name: string;
  Description: string;
  website: string;
  logoURI: string;
  twitter?: string;
}

export type Validator = {
  id: Address;
  coinbase: Address;
  commission: number;
  amountStaked: string;
  amountQueued: string;
  apy: number;
  cuttingBoard: { startBlock: string; weights: CuttingBoardWeight[] };
  rewardRate: string;
  allTimeData: {
    allTimeBgtDirected: number;
    allTimeHoneyValueTokenRewards: number;
    allTimeUniqueTokenCount: number;
  };
  active: boolean;
  activeIncentives: ActiveIncentive[];
  metadata?: ValidatorInfo;
  votingPower: number;
};

export type UserValidator = Validator & {
  userStaked: string;
  userQueued: string;
  latestBlock: string;
  latestBlockTime: string;
  canActivate?: boolean;
};

export type SubgraphUserValidator = {
  amountQueued: string;
  amountDeposited: string;
  latestBlock: string;
  latestBlockTime: string;
  user: string;
  coinbase: string;
  canActivate?: boolean;
};

export type CuttingBoardWeight = {
  amount: number;
  owner: Address;
  percentageNumerator: string;
  receiver: Address;
  receiverMetadata?: Vault;
};

export type Vault = {
  logoURI: string;
  name: string;
  product: string;
  receiptTokenAddress: Address;
  url: string;
  vaultAddress: Address;
};

export type ActiveIncentive = {
  amountLeft: number;
  id: Address;
  incentiveRate: number;
  token: Token;
  vaultId: Address;
};

export type Market = {
  name: string;
  logoURI: string;
  url: string;
  description: string;
};

export type GaugeInfo = {
  id: Address;
  gaugeAddress: Address;
  name: string;
  logoURI: string;
  product: string;
  url: string;
};

export type Gauge = {
  activeIncentives: ActiveIncentive[];
  activeIncentivesInHoney: number;
  activeValidators: ValidatorInfo[];
  activeValidatorsCount: number;
  amountStaked: string;
  id: Address;
  metadata?: GaugeInfo;
  stakingTokenAddress: Address;
  bgtInflationCapture: number;
  vaultAddress: Address;
  vaultWhitelist: {
    whitelistedTokens: { isWhiteListed: boolean; token: Token }[];
  };
};

export type ValidatorList = {
  id: string;
  logoURI: string;
  name: string;
  website: string;
  description: string;
  twitter: string;
};
