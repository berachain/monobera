import { isProduction } from "../utils/isProduction";

const TESTNET_CONTRACTS = {
  multicall: "0x18Df82C7E422A42D47345Ed86B0E935E9718eBda",
  dummy: "0x459C653FaAE6E13b59cf8E005F5f709C7b2c2EB4",
};

const MAINNET_CONTRACTS = {
  multicall: "0x18Df82C7E422A42D47345Ed86B0E935E9718eBda",
};

export const getContracts = () => {
  if (isProduction()) return MAINNET_CONTRACTS;
  else return TESTNET_CONTRACTS;
};
