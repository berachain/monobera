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
