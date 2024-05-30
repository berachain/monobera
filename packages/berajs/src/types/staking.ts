import { Address } from "viem";

import { Token } from "./dex";

export interface ValidatorInfo {
  id: Address;
  name: string;
  description: string;
  website: string;
  imageUri: string;
}

export type Validator = ValidatorInfo & {
  commission: string;
  amountStaked: string;
  cuttingboard: CuttingBoardWeight[];
  apy: string;
  rewardRate: string;
  allTimeStats: {
    totalBgtDirected: string;
    totalHoneyValueBgtDirected: string;
    totalHoneyValueTokenRewards: string;
  };
};

export type UserValidator = Validator & {
  userStaked: string;
};

export type CuttingBoardWeight = {
  percentage: number;
  amount: number;
  receiver: Vault;
};

export type Vault = {
  address: Address;
  market: Market;
  stakingToken: Address;
  name: string;
  imageUri: string;
  website: string;
  activeIncentives: ActiveIncentive[];
};

export type ActiveIncentive = {
  token: Token;
  incentiveRate: string;
  amountLeft: string;
};

export type Market = {
  id: string;
  name: string;
  imageUri: string;
  website: string;
};
