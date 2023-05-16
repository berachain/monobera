import coinbase from "./icons/coinbase.svg";
import metamask from "./icons/metamask.svg";
import walletconnect from "./icons/walletconnect.svg";
import { type StaticImageData } from "next/image";

export type Wallet = {
  name: string;
  icon: StaticImageData;
};

export const wallets: Wallet[] = [
  {
    name: "MetaMask",
    icon: metamask as StaticImageData,
  },
  {
    name: "WalletConnect",
    icon: walletconnect as StaticImageData,
  },
  {
    name: "Coinbase Wallet",
    icon: coinbase as StaticImageData,
  },
];
