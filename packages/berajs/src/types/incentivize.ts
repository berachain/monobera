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
  amountStaked: string;
  activeIncentives: any[];
  vaultWhitelist: any;
  metadata: GaugeInfo;
};

// sample data
// const a = {
//   id: "0xc1cc17c027f3bddfd708bfd6e77c6e13df80bf10",
//   vaultAddress: "0xc1cc17c027f3bddfd708bfd6e77c6e13df80bf10",
//   amountStaked: "0",
//   activeIncentives: [],
//   vaultWhitelist: {
//     id: "0xc1cc17c027f3bddfd708bfd6e77c6e13df80bf10",
//     vaultId: "",
//     vaultAddress: "0xc1Cc17c027f3BDDFd708BfD6E77c6e13DF80BF10",
//     whitelistedTokens: [],
//   },
//   metadata: {
//     id: "0xc1cc17c027f3bddfd708bfd6e77c6e13df80bf10",
//     gaugeAddress: "0xc1cc17c027f3bddfd708bfd6e77c6e13df80bf10",
//     name: "BERA/HONEY",
//     logoURI:
//       "https://artio-static-asset-public.s3.ap-southeast-1.amazonaws.com/assets/bera.png",
//     product: "BEX",
//     url: "https://bera.exchange",
//   },
// };
