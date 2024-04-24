export enum POLLING {
  FAST = 10000,
  NORMAL = 20000,
  SLOW = 200000,
}

export const HOURLY = "1d";
export const WEEKLY = "7d";
export const MONTHLY = "30d";
export const QUARTERLY = "90d";

export const MAX_GAIN = "900";
export const MAX_STOP_LOSS = "-75";

export const USDC_USD_KEY = "USDC/USD";

// TODO: These IDs are hardcoded for now but will be fetched from chain based on governance voting to add new pairs
export const PYTH_IDS = [
  {
    id: "0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a",
    name: "USDC/USD",
  },
  {
    id: "0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43",
    name: "BTC-USDC",
  },
  {
    id: "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
    name: "ETH-USDC",
  },
  {
    id: "0xb00b60f88b03a6a625a8d1c048c3f66653edf217439983d037e7222c4e612819",
    name: "ATOM-USDC",
  },
  {
    id: "0x09f7c1d7dfbb7df2b8fe3d3d87ee94a2259d212da4f30c1f0540d066dfa44723",
    name: "TIA-USDC",
  },
];
