import { isProduction } from "../utils/isProduction";

const TESTNET_CONTRACTS = {
  multicall: "0xd8691C32dE91E204103cBB6fF6138BBEe453565f",
  dummy: "0x459C653FaAE6E13b59cf8E005F5f709C7b2c2EB4",
};

const MAINNET_CONTRACTS = {
  multicall: "0xd8691C32dE91E204103cBB6fF6138BBEe453565f",
};

export const getContracts = () => {
  if (isProduction()) return MAINNET_CONTRACTS;
  else return TESTNET_CONTRACTS;
};
