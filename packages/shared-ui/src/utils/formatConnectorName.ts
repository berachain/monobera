export const formatConnectorName = (connector: string) => {
  switch (connector) {
    case "metaMask":
      return "MetaMask";
    case "walletConnect":
      return "WalletConnect";
    case "walletLink":
      return "Coinbase Wallet";
    case "frame":
      return "Frame";
    default:
      return "Unknown";
  }
};
