import { isProduction } from "../utils/isProduction";

const TESTNET_CONTRACTS = {
  multicall: "0x5C59C83c099F72FcE832208f96a23a1E43737a14",
  dummy: "0x5C59C83c099F72FcE832208f96a23a1E43737a14",
};

const MAINNET_CONTRACTS = {
  multicall: "0x5C59C83c099F72FcE832208f96a23a1E43737a14",
};

export const getContracts = () => {
  if (isProduction()) return MAINNET_CONTRACTS;
  else return TESTNET_CONTRACTS;
};
