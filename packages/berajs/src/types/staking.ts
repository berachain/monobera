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
  cuttingboard: CuttingBoardWeight[] | null;
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
  token: Token;
  incentiveRate: string;
  amountLeft: string;
};

export type Market = {
  name: string;
  logoURI: string;
  url: string;
  description: string;
};
