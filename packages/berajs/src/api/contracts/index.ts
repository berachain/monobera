import { isProduction } from "../utils/isProduction";

const TESTNET_CONTRACTS = {
  multicall: "0x18Df82C7E422A42D47345Ed86B0E935E9718eBda",
  dummy: "0x459C653FaAE6E13b59cf8E005F5f709C7b2c2EB4",
  erc20: "0x3945f611Fe77A51C7F3e1f84709C1a2fDcDfAC5B",
};

const MAINNET_CONTRACTS = {
  multicall: "0x0165878A594ca255338adfa4d48449f69242Eb8F",
};

export const getContracts = () => {
  if (isProduction()) return MAINNET_CONTRACTS;
  else return TESTNET_CONTRACTS;
};
