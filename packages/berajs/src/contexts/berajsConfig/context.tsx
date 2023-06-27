"use client";

import React, { createContext, type PropsWithChildren } from "react";
import {
  RainbowKitProvider,
  connectorsForWallets,
  lightTheme,
  darkTheme as rainbowDarkTheme,
} from "@rainbow-me/rainbowkit";
import {
  injectedWallet,
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

import { type NetworkConfig } from "~/config/types";
import { BeraJsProvider } from "~/contexts/berajsProvider";
import { TransactionStoreProvider } from "~/hooks/transactions/TransactionStoreContext";

interface IBeraConfig extends PropsWithChildren {
  networkConfig: NetworkConfig;
  autoConnect?: boolean;
  darkTheme?: boolean;
}

export interface IBeraConfigAPI {
  networkConfig: NetworkConfig;
  autoConnect: boolean;
  darkTheme?: boolean;
}

export const BeraConfigContext = createContext<IBeraConfigAPI | undefined>(
  undefined,
);

const BeraConfig: React.FC<IBeraConfig> = ({
  children,
  networkConfig,
  autoConnect = false,
  darkTheme = false,
}) => {
  const { chains, publicClient } = configureChains(
    [networkConfig.chain],
    [
      jsonRpcProvider({
        rpc: (chain) => ({ http: chain.rpcUrls.default.http[0] || "" }),
      }),
    ],
  );

  const appInfo = {
    appName: "BeraJS",
  };
  const projectId = "a65a5eaa1bd1e749813cb6cafeac059a";
  const connectors = connectorsForWallets([
    {
      groupName: "Recommended",
      wallets: [
        injectedWallet({ chains }),
        rainbowWallet({ projectId, chains }),
        walletConnectWallet({ projectId, chains }),
      ],
    },
  ]);

  // TODO make this configurable
  const config = createConfig({
    autoConnect,
    connectors,
    publicClient,
  });

  return (
    <BeraConfigContext.Provider value={{ networkConfig, autoConnect }}>
      <WagmiConfig config={config}>
        <RainbowKitProvider
          appInfo={appInfo}
          chains={chains}
          theme={darkTheme ? rainbowDarkTheme() : lightTheme()}
        >
          <BeraJsProvider>
            <TransactionStoreProvider>{children}</TransactionStoreProvider>
          </BeraJsProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </BeraConfigContext.Provider>
  );
};
export default BeraConfig;
