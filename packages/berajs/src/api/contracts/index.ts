import { isProduction } from "../utils/isProduction";

const TESTNET_CONTRACTS = {
  multicall: "0x059c3cd3423ff4dB76DA6B6fb4236A3C91843BE8",
  dummy: "0x459C653FaAE6E13b59cf8E005F5f709C7b2c2EB4",
  dex: "0x9D0FbF9349f646F1435072F2b0212084752EF460",
  balancer: "0xf4da2bCfb06F99343882ad40e7Ec6D8223674d71",
};

const MAINNET_CONTRACTS = {
  multicall: "0x0c26395cc532E635Dd452bb7a9b2A5D104AC1783",
};

export const getContracts = () => {
  if (isProduction()) return MAINNET_CONTRACTS;
  else return TESTNET_CONTRACTS;
};
