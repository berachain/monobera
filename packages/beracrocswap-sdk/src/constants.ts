import { BigNumber } from "ethers";

// type ChainAddress = string;
type ChainId = string;

export interface ChainSpec {
  nodeUrl: string;
  wsUrl?: string;
  poolIndex: number;
  addrs: any;
  // {
  //   dex: ChainAddress;
  //   query: ChainAddress;
  //   impact: ChainAddress;
  //   longpath?: ChainAddress;
  //   micropath?: ChainAddress;
  //   hotpath?: ChainAddress;
  //   coldpath?: ChainAddress;
  //   koliqpath?: ChainAddress;
  //   koflippath?: ChainAddress;
  // };
  isTestNet: boolean;
  chainId: ChainId;
  gridSize: number;
  proxyPaths: {
    cold: number;
    liq: number;
    long: number;
  };
  blockExplorer?: string;
  displayName: string;
  logoUrl?: string;
}

const ETHEREUM_LOGO =
  "https://d33wubrfki0l68.cloudfront.net/fcd4ecd90386aeb50a235ddc4f0063cfbb8a7b66/4295e/static/bfc04ac72981166c740b189463e1f74c/40129/eth-diamond-black-white.jpg";
const SCROLL_LOGO =
  "https://develop--ambient-finance.netlify.app/scroll_logo.png";

const DFLT_SDK_INFURA_KEY = "360ea5fda45b4a22883de8522ebd639e";

const GOERLI_CHAIN: ChainSpec = {
  nodeUrl: "https://goerli.infura.io/v3/" + DFLT_SDK_INFURA_KEY,
  wsUrl: "wss://goerli.infura.io/ws/v3/" + DFLT_SDK_INFURA_KEY,
  addrs: {
    dex: "0xfafcd1f5530827e7398b6d3c509f450b1b24a209",
    query: "0xc9900777baa5EE94Cd2C6509fb09278A1A46b7e8",
    impact: "0x142BE02F2A3A27ecD6e2f18a43c2C234F372C831",
  },
  poolIndex: 36000,
  isTestNet: true,
  chainId: "0x5",
  gridSize: 64,
  proxyPaths: {
    cold: 0,
    long: 4,
    liq: 2,
  },
  blockExplorer: "https://goerli.etherscan.io/",
  displayName: "Görli",
  logoUrl: ETHEREUM_LOGO,
};

const ARB_GOERLI_CHAIN: ChainSpec = {
  nodeUrl: "https://goerli-rollup.arbitrum.io/rpc",
  addrs: {
    dex: "0x5D42d6046927DEE12b9b4a235be0ceCd55D0E0fb",
    query: "0x3A6E9cff691a473D4D0742E1dFc8Ea263a99F6d0",
    impact: "0xf19D3dcdF82af0d40Cb3b4AaE4D266c638A3E454",
  },
  poolIndex: 36000,
  isTestNet: true,
  chainId: "0x66eed",
  gridSize: 16,
  proxyPaths: {
    cold: 3,
    long: 4,
    liq: 2,
  },
  blockExplorer: "https://goerli.arbiscan.io/",
  displayName: "Arbitrum Görli",
  logoUrl: ETHEREUM_LOGO,
};

const MAINNET_CHAIN: ChainSpec = {
  nodeUrl: "https://mainnet.infura.io/v3/360ea5fda45b4a22883de8522ebd639e",
  wsUrl: "wss://mainnet.infura.io/ws/v3/360ea5fda45b4a22883de8522ebd639e",
  addrs: {
    dex: "0xAaAaAAAaA24eEeb8d57D431224f73832bC34f688",
    query: "0xc2e1f740E11294C64adE66f69a1271C5B32004c8",
    impact: "0x3e3EDd3eD7621891E574E5d7f47b1f30A994c0D0",
  },
  poolIndex: 420,
  isTestNet: false,
  chainId: "0x1",
  gridSize: 16,
  proxyPaths: {
    cold: 3,
    long: 4,
    liq: 2,
  },
  blockExplorer: "https://etherscan.io/",
  displayName: "Ethereum",
  logoUrl: ETHEREUM_LOGO,
};

const SCROLL_SEPOLIA_CHAIN: ChainSpec = {
  nodeUrl: "https://sepolia-rpc.scroll.io",
  addrs: {
    dex: "0xaaAAAaa6612bd88cD409cb0D70C99556C87A0E8c",
    query: "0x43eC1302FE3587862e15B2D52AD9653575FD79e9",
    impact: "0x9B28970D51A231741416D8D3e5281d9c51a50892",
  },
  poolIndex: 36000,
  isTestNet: true,
  chainId: "0x8274f",
  gridSize: 1,
  proxyPaths: {
    cold: 3,
    long: 130,
    liq: 128,
  },
  blockExplorer: "https://sepolia.scrollscan.dev/",
  displayName: "Scroll Sepolia",
  logoUrl: SCROLL_LOGO,
};

const SCROLL_CHAIN: ChainSpec = {
  nodeUrl: "https://rpc.scroll.io",
  addrs: {
    dex: "0xaaaaAAAACB71BF2C8CaE522EA5fa455571A74106",
    query: "0x62223e90605845Cf5CC6DAE6E0de4CDA130d6DDf",
    impact: "0xc2c301759B5e0C385a38e678014868A33E2F3ae3",
  },
  poolIndex: 420,
  isTestNet: false,
  chainId: "0x82750",
  gridSize: 4,
  proxyPaths: {
    cold: 3,
    long: 130,
    liq: 128,
  },
  blockExplorer: "https://scrollscan.com/",
  displayName: "Scroll",
  logoUrl: SCROLL_LOGO,
};

const BERA_CHAIN: ChainSpec = {
  nodeUrl: "https://rpc.berachain-internal.com",
  addrs: {
    dex: "0xD297bd3685b2ebb5A81C51C9932689d7a827316f",
    query: "0x8d394eeAF686749bF075EB281A69a83bf468Ef0f",
    impact: "0x7Df93205070205aa38d59bF39942278f3CeB899C",
    longpath: "0xb506D551b39eDFc4c78d73D8B6DaC05D0299ccb0",
    micropath: "0x17e95F5Ca82Dbd1965DB89fB1A1d4DA2Ff5ABe7C",
    hotpath: "0x9C14b7d2551951dE1d4d2290BD670501C699C94A",
    coldpath: "0x9A102DC3ecA64dCcAe7b3990a0b536B369B786Ee",
    koliqpath: "0xfc0e796bc7710CC1e1A3C98E2572F62d1dE2982A",
    koflippath: "0x33311F9E6798dD5C568F09192E4a6C19E13b548f",
  },
  poolIndex: 420,
  isTestNet: true,
  chainId: "0x80d",
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

const LOCAL_FORK_CHAIN: ChainSpec = Object.assign({}, GOERLI_CHAIN, {
  nodeUrl: "http://127.0.0.1:8545",
  chainId: "0x7a69",
  displayName: "Local Fork",
});

export const CHAIN_SPECS: { [chainId: string]: ChainSpec } = {
  "0x1": MAINNET_CHAIN,
  "0x5": GOERLI_CHAIN,
  "0x7a69": LOCAL_FORK_CHAIN,
  "0x66eed": ARB_GOERLI_CHAIN,
  "0x8274f": SCROLL_SEPOLIA_CHAIN,
  "0x82750": SCROLL_CHAIN,
  "0x80d": BERA_CHAIN,
  goerli: GOERLI_CHAIN,
  arbtest: ARB_GOERLI_CHAIN,
  arbgoerli: ARB_GOERLI_CHAIN,
  local: LOCAL_FORK_CHAIN,
  ethereum: MAINNET_CHAIN,
  mainnet: MAINNET_CHAIN,
  scrolltest: SCROLL_SEPOLIA_CHAIN,
  scroll: SCROLL_CHAIN,
};

export const MIN_TICK = -665454;
export const MAX_TICK = 831818;
export const MAX_SQRT_PRICE: BigNumber = BigNumber.from(
  "21267430153580247136652501917186561138",
).sub(1);
export const MIN_SQRT_PRICE: BigNumber = BigNumber.from("65538").sub(1);
export const MAX_LIQ = BigNumber.from(2).pow(128).sub(1);
