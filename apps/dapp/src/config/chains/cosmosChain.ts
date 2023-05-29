import { Bech32Address } from "@keplr-wallet/cosmos";
import type { BIP44, ChainInfo } from "@keplr-wallet/types";

import { isProduction } from "~/utils/isProduction";

const beraBip44: BIP44 = {
  coinType: 60,
};

const BERA = {
  coinDenom: "bera",
  coinMinimalDenom: "abera",
  coinDecimals: 18,
};

const BGT = {
  coinDenom: "bgt",
  coinMinimalDenom: "abgt",
  coinDecimals: 18,
};

const TESTNET_CHAIN_INFO: ChainInfo = {
  coinType: 60,
  rpc: "http://localhost:26657",
  rest: "http://localhost:26654",
  chainId: "beradevnet_420-1",
  chainName: "berachain-devnet",
  stakeCurrency: BGT,
  bip44: beraBip44,
  bech32Config: Bech32Address.defaultBech32Config("bera"),
  currencies: [BERA, BGT],
  feeCurrencies: [BERA],
  features: ["ibc-transfer", "ibc-go", "eth-address-gen", "eth-key-sign"],
};

const MAINNET_CHAIN_INFO: ChainInfo = {
  coinType: 60,
  rpc: "http://localhost:26657",
  rest: "http://localhost:26654",
  chainId: "beradevnet_420-1",
  chainName: "berachain-devnet",
  stakeCurrency: BGT,
  bip44: beraBip44,
  bech32Config: Bech32Address.defaultBech32Config("bera"),
  currencies: [BERA, BGT],
  feeCurrencies: [BERA],
  features: ["ibc-transfer", "ibc-go", "eth-address-gen", "eth-key-sign"],
};

export const getCosmosChain = () => {
  if (isProduction()) return MAINNET_CHAIN_INFO;
  else return TESTNET_CHAIN_INFO;
};
