import { Address } from "viem";
import { Token } from "./dex";

export type Validator = {
  coinbase: Address;
  name: string;
  commission: string;
  description: string;
  website: string;
  imageUri: string;
  amountStaked: string;
  cuttingboard: CuttingBoardWeight[];
  apy: string;
  allTimeStats: {
    totalBgtDirected: string;
    totalHoneyValueBgtDirected: string;
    totalHoneyValueTokenRewards: string;
  };
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
  name: string;
  imageUri: string;
  website: string;
};
