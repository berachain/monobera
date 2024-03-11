"use client";

import React, { createContext, type PropsWithChildren } from "react";
import {
  RainbowKitProvider,
  connectorsForWallets,
  getDefaultConfig,
  lightTheme,
  darkTheme as rainbowDarkTheme,
} from "@rainbow-me/rainbowkit";
import {
  coinbaseWallet,
  frameWallet,
  ledgerWallet,
  metaMaskWallet,
  rabbyWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { WagmiProvider, createConfig, http } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { defaultBeraConfig } from "~/config";
import { type NetworkConfig } from "~/config/types";
import { BeraJsProvider } from "~/contexts/berajsProvider";
import { TransactionStoreProvider } from "~/hooks/transactions/TransactionStoreContext";
import { CrocEnvContextProvider } from "../crocenv";

interface IBeraConfig extends PropsWithChildren {
  networkConfig?: NetworkConfig;
  autoConnect?: boolean;
  darkTheme?: boolean;
}

export interface IBeraConfigAPI {
  networkConfig: NetworkConfig;
  autoConnect: boolean;
  darkTheme?: boolean;
  walletConnectors?: any;
  chains?: any;
}

export const BeraConfigContext = createContext<IBeraConfigAPI | undefined>(
  undefined,
);

const BeraConfig: React.FC<IBeraConfig> = ({
  children,
  networkConfig = defaultBeraConfig,
  autoConnect = false,
  darkTheme = false,
}) => {
  const config = getDefaultConfig({
    appName: "Bears Chain",
    projectId: "8b169f8cfd2110ddc5d92a1309534d09",
    chains: [networkConfig.chain],
    transports: {
      [networkConfig.chain.id]: http(
        networkConfig.chain.rpcUrls.default.http[0] || "",
      ),
    },
    ssr: true,
    multiInjectedProviderDiscovery: true,
  });
  const queryClient = new QueryClient();

  return (
    <BeraConfigContext.Provider value={{ networkConfig, autoConnect }}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <BeraJsProvider>
              <TransactionStoreProvider>
                <CrocEnvContextProvider>{children}</CrocEnvContextProvider>
              </TransactionStoreProvider>
            </BeraJsProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </BeraConfigContext.Provider>
  );
};
export default BeraConfig;
