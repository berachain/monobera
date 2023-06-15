import { isProduction } from "../utils/isProduction";

const TESTNET_CONTRACTS = {
  multicall: "0xF44791eCf779318C22d6eA7fbb4741aA3b167654",
  dummy: "0x459C653FaAE6E13b59cf8E005F5f709C7b2c2EB4",
};

const MAINNET_CONTRACTS = {
  multicall: "0xF44791eCf779318C22d6eA7fbb4741aA3b167654",
};

export const getContracts = () => {
  if (isProduction()) return MAINNET_CONTRACTS;
  else return TESTNET_CONTRACTS;
};
