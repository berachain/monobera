import {
  BALANCER_NETWORK_CONFIG,
  BalancerNetworkConfig,
  BalancerSDK,
  type Network,
} from "@balancer-labs/sdk";
import {
  balancerHelperAddress,
  balancerQueriesAddress,
  balancerSubgraphUrl,
  balancerVaultAddress,
  beraTokenAddress,
  chainId,
  multicallAddress,
} from "@bera/config";

import { balancerSdkConfig } from "~/config";

BALANCER_NETWORK_CONFIG[chainId as Network] = {
  chainId: chainId, //1
  addresses: {
    //Mainnet deployment addresses: https://docs.balancer.fi/reference/contracts/deployment-addresses/mainnet.html
    contracts: {
      multicall: multicallAddress,
      poolDataQueries: balancerQueriesAddress,
      lidoRelayer: undefined, // "0xdcdbf71A870cc60C6F9B621E28a7D3Ffd6Dd4965",
      veBal: undefined, // "0xC128a9954e6c874eA3d62ce62B468bA073093F25",
      gaugeControllerCheckpointer: undefined, // "0x8e5698dc4897dc12243c8642e77b4f21349db97c",
      veBalProxy: undefined, //"0x6f5a2eE11E7a772AeB5114A20d0D7c0ff61EB8A0",
      gyroConfigProxy: undefined, // "0xac89cc9d78bbad7eb3a02601b4d65daa1f908aa6",
      vault: balancerVaultAddress,
      balancerHelpers: balancerHelperAddress,
      balancerMinter: undefined, // "0x239e55f427d44c3cc793f49bfb507ebe76638a2b",
      balancerRelayer: "0x000000000000000", // "0xfea793aa415061c483d2390414275ad314b3f621",
      gaugeController: undefined, // "0xc128468b7ce63ea702c1f104d55a2566b13d3abd",
      feeDistributor: undefined, // "0xd3cf852898b21fc233251427c2dc93d3d604f3bb",
      protocolFeePercentagesProvider:
        "0x97207b095e4d5c9a6e4cfbfcd2c3358e03b90c4a",
      weightedPoolFactory: undefined, // "0x897888115ada5773e02aa29f775430bfb5f34c51",
      composableStablePoolFactory: undefined, // "0xfada0f4547ab2de89d1304a668c39b3e09aa7c76",
      aaveLinearPoolFactory: undefined, // "0x0b576c1245f479506e7c8bbc4db4db07c1cd31f9",
      erc4626LinearPoolFactory: undefined, // "0x813ee7a840ce909e7fea2117a44a90b8063bd4fd",
      eulerLinearPoolFactory: undefined, // "0x5f43fba61f63fa6bff101a0a0458cea917f6b347",
      gearboxLinearPoolFactory: undefined, // "0x39a79eb449fc05c92c39aa6f0e9bfac03be8de5b",
      yearnLinearPoolFactory: undefined, // "0x5f5222ffa40f2aed6380d022184d6ea67c776ee0",
    },
    tokens: {
      bal: "0xba100000625a3754423978a60c9317c58a424e3d",
      wrappedNativeAsset: beraTokenAddress,
      bbaUsd: undefined, // "0xa13a9247ea42d743238089903570127dda72fe44",
      lbpRaisingTokens: [
        // "0x6b175474e89094c44da98b954eedeac495271d0f", // DAI
        // "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", // USDC
        // "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", // WETH
      ],
      stETH: undefined, // "0xae7ab96520de3a18e5e111b5eaab095312d7fe84",
      wstETH: undefined, // "0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0",
      veBal: undefined, // "0xC128a9954e6c874eA3d62ce62B468bA073093F25",
    },
  },
  urls: {
    subgraph: balancerSubgraphUrl,
    // gaugesSubgraph:
    //   "https://api.studio.thegraph.com/query/75376/balancer-gauges/version/latest",
    // blockNumberSubgraph:
    //   "https://api.studio.thegraph.com/query/48427/ethereum-blocks/version/latest⁠",
  },
  thirdParty: {
    coingecko: {
      nativeAssetId: "eth",
      platformId: "ethereum",
    },
  },
  pools: {
    // wETHwstETH: {
    //   id: "0x32296969ef14eb0c6d29669c550d4a0449130230000200000000000000000080",
    //   address: "0x32296969ef14eb0c6d29669c550d4a0449130230",
    // },
  },
  poolsToIgnore: [
    // "0xbd482ffb3e6e50dc1c437557c3bea2b68f3683ee0000000000000000000003c6", // a pool made by an external dev who was playing with a novel rate provider mechanism in production.
    // "0x0afbd58beca09545e4fb67772faf3858e610bcd00000000000000000000004b9",
    // "0xf22ff21e17157340575158ad7394e068048dd98b0000000000000000000004b8",
    // "0xf71d0774b214c4cf51e33eb3d30ef98132e4dbaa00000000000000000000046e",
  ],
  sorConnectingTokens: [
    // {
    //   symbol: "wEth",
    //   address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    // },
    // {
    //   symbol: "wstEth",
    //   address: "0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0",
    // },
    // {
    //   symbol: "DOLA",
    //   address: "0x865377367054516e17014CcdED1e7d814EDC9ce4",
    // },
    // {
    //   symbol: "rEth",
    //   address: "0xae78736cd615f374d3085123a210448e74fc6393",
    // },
    // {
    //   symbol: "ETHx",
    //   address: "0xa35b1b31ce002fbf2058d22f30f95d405200a15b",
    // },
  ],
  sorTriPathMidPoolIds: [
    // "0x1e19cf2d73a72ef1332c882f20534b6519be0276000200000000000000000112", // rETH/WETH
  ],
} satisfies BalancerNetworkConfig;

export const balancerClient = new BalancerSDK(balancerSdkConfig);
