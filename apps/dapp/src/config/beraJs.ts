/* eslint-disable */

import { NetworkConfig } from "@bera/berajs/src/config";
import { Bech32Address } from "@keplr-wallet/cosmos";
import { BIP44 } from "@keplr-wallet/types";
import { Chain } from "wagmi";

export interface IPills {
  label: string;
  fragment: string[];
}

export enum FRAGMENTS {
  TRANSACTIONS = "",
  INTERNAL_TXNS = "internaltx",
  TOKEN_TRANSFERS = "tokentxns",
  NFT_TRANSFERS = "nfttransfers",
  CODE = "code",
  READ_CONTRACT = "readContract",
  WRITE_CONTRACT = "writeContract",
  EVENTS = "events",
}

export const addressPills: IPills[] = [
  {
    label: "Transactions",
    fragment: [FRAGMENTS.TRANSACTIONS],
  },
  {
    label: "Token Transfers (ERC-20)",
    fragment: [FRAGMENTS.TOKEN_TRANSFERS],
  },
  {
    label: "NFT Transfers",
    fragment: [FRAGMENTS.NFT_TRANSFERS],
  },
];

export const isContractPills: IPills[] = [
  {
    label: "Transactions",
    fragment: [FRAGMENTS.TRANSACTIONS],
  },
  // {
  //   label: "Internal Transactions",
  //   fragment: [FRAGMENTS.INTERNAL_TXNS],
  // },
  {
    label: "Token Transfers (ERC-20)",
    fragment: [FRAGMENTS.TOKEN_TRANSFERS],
  },
  // {
  //   label: "NFT Transfers",
  //   fragment: [FRAGMENTS.NFT_TRANSFERS],
  // },
  {
    label: "Contract",
    fragment: [
      FRAGMENTS.CODE,
      FRAGMENTS.READ_CONTRACT,
      FRAGMENTS.WRITE_CONTRACT,
    ],
  },
  {
    label: "Events",
    fragment: [FRAGMENTS.EVENTS],
  },
];

export const codePills: IPills[] = [
  {
    label: "Code",
    fragment: [FRAGMENTS.CODE],
  },
  {
    label: "Read Contract",
    fragment: [FRAGMENTS.READ_CONTRACT],
  },
  {
    label: "Write Contract",
    fragment: [FRAGMENTS.WRITE_CONTRACT],
  },
];

const coinType60 = 60;

const beraBip44: BIP44 = {
  coinType: coinType60,
};

export const BERA = {
  coinDenom: "bera",
  coinMinimalDenom: "abera",
  coinDecimals: 18,
};

export const BGT = {
  coinDenom: "bgt",
  coinMinimalDenom: "abgt",
  coinDecimals: 18,
};

const PolarisChain: Chain = {
  id: 69420,
  name: "Polaris",
  network: "Polaris",
  nativeCurrency: {
    decimals: 18,
    name: "Polaris",
    symbol: "tbera",
  },
  rpcUrls: {
    default: {
      http: ["http://localhost:8545"],
    },
    public: {
      http: ["http://localhost:8545"],
    },
  },
};

export const beraConfig: NetworkConfig = {
  coinType: 60,
  rpc: "http://localhost:26657",
  rest: "http://localhost:1317",
  chainId: "berachain_69420-1",
  chainName: "berachain-devnet",
  stakeCurrency: BGT,
  bip44: beraBip44,
  bech32Config: Bech32Address.defaultBech32Config("polar"),
  currencies: [BERA, BGT],
  feeCurrencies: [BERA],
  features: ["ibc-transfer", "ibc-go", "eth-address-gen", "eth-key-sign"],
  precompileAddresses: {
    multicall: "0x0000",
  },
  chain: PolarisChain,
};
