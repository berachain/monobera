import { Address } from "viem";

export type GaugeInfo = {
  id: Address;
  gaugeAddress: Address;
  name: string;
  logoURI: string;
  product: string;
  url: string;
};

export type Gauge = {
  id: Address;
  vaultAddress: Address;
  stakingTokenAddress: Address;
  amountStaked: string;
  activeIncentives: any[];
  vaultWhitelist: any;
  metadata: GaugeInfo;
};
