import { BigNumber } from "ethers";
import { crocDexAddress, crocImpactAddress, crocQueryAddress, jsonRpcUrl } from '@bera/config';

type ChainAddress = string;
type ChainId = string;

export interface ChainSpec {
  nodeUrl: string;
  wsUrl?: string,
  poolIndex: number;
  addrs: {
    dex: ChainAddress;
    query: ChainAddress;
    impact: ChainAddress
  }
  isTestNet: boolean;
  chainId: ChainId;
  gridSize: number;
  proxyPaths: {
    cold: number,
    liq: number,
    long: number
  }
  blockExplorer?: string;
  displayName: string;
  logoUrl?: string;
}

export const BERA_CHAIN: ChainSpec = {
  nodeUrl: jsonRpcUrl,
  addrs: {
    dex: crocDexAddress,
    query: crocQueryAddress,
    impact: crocImpactAddress,
  },
  poolIndex: 36000,
  isTestNet: true,
  chainId: "0x138D5",
  gridSize: 4,
  proxyPaths: {
    cold: 3,
    long: 130,
    liq: 128,
  },
  blockExplorer: "https://scan.berachain-internal.com/",
  displayName: "Berachain",
  logoUrl: "",
};

export const CHAIN_SPECS: { [chainId: string]: ChainSpec } = {
  "0x138D5": BERA_CHAIN,
  "berachain": BERA_CHAIN,
};

export const MIN_TICK = -665454;
export const MAX_TICK = 831818;
export const MAX_SQRT_PRICE: BigNumber = BigNumber.from(
  "21267430153580247136652501917186561138").sub(1);
export const MIN_SQRT_PRICE: BigNumber = BigNumber.from("65538").sub(1);
export const MAX_LIQ = BigNumber.from(2).pow(128).sub(1);
