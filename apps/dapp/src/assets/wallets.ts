export type Wallet = {
  name: string;
  icon: string;
};

export const wallets: Wallet[] = [
  {
    name: "MetaMask",
    icon: "/icons/metamask.svg",
  },
  {
    name: "WalletConnect",
    icon: "/icons/walletconnect.svg",
  },
  {
    name: "Coinbase Wallet",
    icon: "/icons/coinbase.svg",
  },
];
