import { isProduction } from "../utils/isProduction";

const TESTNET_CONTRACTS = {
  multicall: "0x0EFa8dc7BbAf439095fc690b723c242c3CA36BB1",
  dummy: "0x459C653FaAE6E13b59cf8E005F5f709C7b2c2EB4",
};

const MAINNET_CONTRACTS = {
  multicall: "0x0EFa8dc7BbAf439095fc690b723c242c3CA36BB1",
};

export const getContracts = () => {
  if (isProduction()) return MAINNET_CONTRACTS;
  else return TESTNET_CONTRACTS;
};
