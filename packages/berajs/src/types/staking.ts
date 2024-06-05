import { Address } from "viem";

import { Token } from "./dex";

export interface ValidatorInfo {
  id: Address;
  name: string;
  description: string;
  website: string;
  logoURI: string;
  twitter?: string;
}

export type Validator = {
  id: Address;
  coinbase: Address;
  commission: string;
  amountStaked: string;
  amountQueued: string;
  cuttingBoard: { startBlock: string; weights: CuttingBoardWeight[] };
  rewardRate: string;
  allTimeStats: {
    totalBgtDirected: string;
    totalHoneyValueBgtDirected: string;
    totalHoneyValueTokenRewards: string;
  };
  active: boolean;
  metadata: ValidatorInfo;
};

export type UserValidator = Validator & {
  userStaked: string;
  userQueued: string;
  latestBlock: string;
  latestBlockTime: string;
  canActivate?: boolean;
};

export type CuttingBoardWeight = {
  percentage: number;
  amount: number;
  receiver: Vault;
};

export type Vault = {
  address: Address;
  market: string | undefined;
  stakingToken: Address;
  name: string;
  imageUri: string;
  website: string;
  activeIncentives: ActiveIncentive[];
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
  metadata: GaugeInfo;
  stakingTokenAddress: Address;
  vaultAddress: Address;
  vaultWhitelist: {
    whitelistedTokens: { isWhiteListed: boolean; token: Token }[];
  };
};
