import { type StaticImageData } from "next/image";

import beraIcon from "./icons/beraIcon.jpg";
import bgtIcon from "./icons/bgtIcon.jpg";
import honeyIcon from "./icons/honeyIcon.jpg";

export type Token = {
  address: string;
  chainId: number;
  decimals: number;
  logoURI: StaticImageData;
  name: string;
  symbol: string;
};

export const tokens: Token[] = [
  {
    address: "0x639A647fbe20b6c8ac19E48E2de44ea792c62123",
    chainId: 42220,
    decimals: 18,
    logoURI: honeyIcon,
    name: "Honey",
    symbol: "HONEY",
  },
  {
    address: "0x639A647fbe20b6c8ac19E48E2de44ea792c62456",
    chainId: 42220,
    decimals: 18,
    logoURI: beraIcon,
    name: "Bera",
    symbol: "BERA",
  },
  {
    address: "0x639A647fbe20b6c8ac19E48E2de44ea792c62789",
    chainId: 42220,
    decimals: 18,
    logoURI: bgtIcon,
    name: "BGT",
    symbol: "IBGT",
  },
];
