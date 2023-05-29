import axios from "axios";

import { isProduction } from "./isProduction";

export const WALLET_ADDRESS = "0x1234567890123456789012345678901234567890";

export type Wallet = {
  address: string;
  tokens: {
    address: string;
    symbol: string;
    balance: number;
  }[];
};

export const WALLET: Wallet = {
  address: WALLET_ADDRESS,
  tokens: [
    {
      address: "0x639A647fbe20b6c8ac19E48E2de44ea792c62456",
      symbol: "BERA",
      balance: 1000,
    },
    {
      address: "0x639A647fbe20b6c8ac19E48E2de44ea792c62123",
      symbol: "HONEY",
      balance: 500,
    },
    {
      address: "0x639A647fbe20b6c8ac19E48E2de44ea792c62789",
      symbol: "IBGT",
      balance: 750,
    },
  ],
};

export enum LOCAL_STORAGE_KEYS {
  WALLET = "WALLET",
  WALLET_NETWORK = "WALLET_NETWORK",
  CONNECTOR_ID = "CONNECTOR_ID",
  SLIPPAGE_TOLERANCE = "SLIPPAGE_TOLERANCE",
  TRANSACTION_TYPE = "TRANSACTION_TYPE",
  USE_SIGNATURES = "USE_SIGNATURES",
}

export enum TRANSACTION_TYPES {
  LEGACY = "legacy",
  EIP_1559 = "eip1559",
}

export type Reward = {
  id: string;
  pool: string;
  deposited?: number;
  claimable: number;
  brokenDownRewards?: Reward[];
};

export const rewards: Reward[] = [
  {
    id: "728ed52f",
    deposited: 100,
    pool: "Honey / USDC",
    claimable: 100,
    brokenDownRewards: [
      {
        id: "728ed52f-1",
        pool: "Honey",
        deposited: undefined,
        claimable: 50,
      },
      {
        id: "728ed52f-2",
        pool: "USDC",
        deposited: undefined,
        claimable: 50,
      },
      {
        id: "728ed52f-3",
        pool: "BGT",
        deposited: undefined,
        claimable: 50,
      },
    ],
  },
  {
    id: "489e1d42",
    deposited: 125,
    pool: "Staked BERA",
    claimable: 100,
    brokenDownRewards: [
      {
        id: "489e1d42-1",
        pool: "Staked BERA 1",
        deposited: undefined,
        claimable: 50,
      },
      {
        id: "489e1d42-2",
        pool: "Staked BERA 2",
        deposited: undefined,
        claimable: 50,
      },
    ],
  },
  // ...
];

export const pools = [
  {
    id: "POOL001",
    name: "Pool 1",
    value: "$42,699.00",
    volume: "$69,420.00",
    apr: "69%",
  },
  {
    id: "POOL002",
    name: "Pool 2",
    value: "$42,699.00",
    volume: "$69,420.00",
    apr: "69%",
  },
  {
    id: "POOL003",
    name: "Pool 3",
    value: "$42,699.00",
    volume: "$69,420.00",
    apr: "69%",
  },
  {
    id: "POOL004",
    name: "Pool 4",
    value: "$42,699.00",
    volume: "$69,420.00",
    apr: "69%",
  },
  {
    id: "POOL005",
    name: "Pool 5",
    value: "$42,699.00",
    volume: "$69,420.00",
    apr: "69%",
  },
  {
    id: "POOL006",
    name: "Pool 6",
    value: "$42,699.00",
    volume: "$69,420.00",
    apr: "69%",
  },
  {
    id: "POOL007",
    name: "Pool 7",
    value: "$42,699.00",
    volume: "$69,420.00",
    apr: "69%",
  },
];

export const tokens = [
  {
    icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
    name: "Bitcoin",
    symbol: "BTC",
    weight: "69%",
    tokenP: "69%",
    balance: "69.420",
    value: "$69,420.00",
  },
  {
    icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/2.png",
    name: "Litecoin",
    symbol: "LTC",
    weight: "69%",
    tokenP: "69%",
    balance: "69.420",
    value: "$69,420.00",
  },
];

export const liquidityProvisions = [
  {
    icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
    action: "Deposit",
    tokenAmount: "69.420",
    tokenName: "Bitcoin",
    tokenSymbol: "BTC",
    value: "$69,420.00",
    timeStamp: "8 hours ago",
  },
  {
    icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/2.png",
    action: "Withdraw",
    tokenAmount: "69.420",
    tokenName: "Litecoin",
    tokenSymbol: "LTC",
    value: "$69,420.00",
    timeStamp: "8 hours ago",
  },
];

export const swaps = [
  {
    wallet: "0x1234567890123456789012345678901234567890",
    from: "Bitcoin",
    fromSymbol: "BTC",
    fromAmount: "69.420",
    toAmount: "69.420",
    to: "Litecoin",
    toSymbol: "LTC",
    value: "$69,420.00",
    timeStamp: "8 hours ago",
  },
  {
    wallet: "0x1234567890123456789012345678901234567890",
    from: "Bitcoin",
    fromSymbol: "BTC",
    fromAmount: "69.420",
    toAmount: "69.420",
    to: "Litecoin",
    toSymbol: "LTC",
    value: "$69,420.00",
    timeStamp: "8 hours ago",
  },
];

export const poolDetails = {
  name: "Pool 1",
  poolSymbol: "POOL001",
  poolType: "Liquidity Pool",
  swapFee: "0.3%",
  poolManager: "0x1234567890123456789012345678901234567890",
  poolOwner: "0x1234567890123456789012345678901234567890",
  contractAddress: "0x1234567890123456789012345678901234567890",
  creationDate: "04 May, 2021",
};

export enum POLLING {
  FAST = 5000,
  NORMAL = 10000,
  SLOW = 100000,
}

export const MAINNET_RPC_URLS = [
  "https://bsc-dataseed1.ninicoin.io",
  "https://bsc-dataseed1.defibit.io",
  "https://bsc-dataseed.binance.org",
];

export const TESTNET_RPC_URLS = ["https://rpc.flashbots.net"];

export const TESTNET_AXIOS = axios.create({
  baseURL: "http://localhost:26654/",
  timeout: 1000,
});

export const MAINNET_AXIOS = axios.create({
  baseURL: "http://localhost:26654/",
  timeout: 1000,
});

export const TESTNET_TRPC = "http://localhost:26657";

export const MAINNET_TRPC = "http://localhost:26657";

export const getRpc = () => {
  const rpcUrls = isProduction() ? MAINNET_RPC_URLS : TESTNET_RPC_URLS;
  return getHealthyRpc(rpcUrls, 0)
    .then((result: any) => {
      return result;
    })
    .catch(() => {
      return rpcUrls[0];
    });
};

const getHealthyRpc: any = async (rpcUrls: string[], depth: number) => {
  try {
    const response = await fetch(rpcUrls[depth] as RequestInfo | URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "net_version",
        params: [],
        id: 67,
      }),
    });

    const { result } = await response.json();

    if (result) {
      return rpcUrls[depth];
    }
    return "";
  } catch (err) {
    console.log(`${depth} RPC failed, trying different endpoint`);
    if (depth < rpcUrls.length) {
      return getHealthyRpc(rpcUrls, depth + 1);
    }
  }

  return "";
};

export const getAxiosInstance = () => {
  if (isProduction()) return MAINNET_AXIOS;
  return TESTNET_AXIOS;
};

export const getTrpc = () => {
  if (isProduction()) return MAINNET_TRPC;
  return TESTNET_TRPC;
};
