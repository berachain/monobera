import { isProduction } from "../utils/isProduction";

export enum ChainId {
  MAINNET = 56,
  TESTNET = 1,
}

export enum CosmosChainId {
  MAINNET = "696969696969",
  TESTNET = "beradevnet_420-1",
}

export interface Address {
  [ChainId.TESTNET]?: string;
  [ChainId.MAINNET]: string;
}

export const getChainId = () => {
  return isProduction() ? ChainId.MAINNET : ChainId.TESTNET;
};

export const getCosmosChainId = () => {
  return isProduction() ? CosmosChainId.MAINNET : CosmosChainId.TESTNET;
};

export * from "./cosmosChain";
