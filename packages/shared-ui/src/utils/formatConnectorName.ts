export const formatConnectorName = (connector: string) => {
  console.log(connector);
  switch (connector) {
    case "metaMask":
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
