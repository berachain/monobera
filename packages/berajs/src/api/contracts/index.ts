import { isProduction } from "../utils/isProduction";

const TESTNET_CONTRACTS = {
  multicall: "0x687CE42A66963479d05ed4A4Dd32275b669fa08B",
  dummy: "0x459C653FaAE6E13b59cf8E005F5f709C7b2c2EB4",
};

const MAINNET_CONTRACTS = {
  multicall: "0x687CE42A66963479d05ed4A4Dd32275b669fa08B",
};

export const getContracts = () => {
  if (isProduction()) return MAINNET_CONTRACTS;
  else return TESTNET_CONTRACTS;
};
