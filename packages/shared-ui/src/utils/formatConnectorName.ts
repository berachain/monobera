export const formatConnectorName = (connector: string) => {
  switch (connector) {
    case "injected":
      return "MetaMask";
    case "walletconnect":
      return "WalletConnect";
    case "walletlink":
      return "Coinbase Wallet";
    case "keplr":
      return "Keplr";
    default:
      return "Unknown";
  }
};
