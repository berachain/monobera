"use client";

import React, { createContext, type PropsWithChildren } from "react";
import {
  RainbowKitProvider,
  connectorsForWallets,
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
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

import { defaultBeraConfig } from "~/config";
import { type NetworkConfig } from "~/config/types";
import { BeraJsProvider } from "~/contexts/berajsProvider";
import { TransactionStoreProvider } from "~/hooks/transactions/TransactionStoreContext";
import { CrocEnvContextProvider } from "../crocSwapEnvProvider";

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

export const projectId = "8b169f8cfd2110ddc5d92a1309534d09";

const BeraConfig: React.FC<IBeraConfig> = ({
  children,
  networkConfig = defaultBeraConfig,
  autoConnect = false,
  darkTheme = false,
}) => {
  const { chains, publicClient } = configureChains(
    [networkConfig.chain],
    [
      jsonRpcProvider({
        rpc: (chain: any) => ({ http: chain.rpcUrls.default.http[0] || "" }),
      }),
    ],
    {
      retryCount: 0,
      retryDelay: 20000,
    },
  );

  const appInfo = {
    appName: "BeraJS",
  };
  const connectors = connectorsForWallets([
    {
      groupName: "Recommended",
      wallets: [
        metaMaskWallet({ chains, projectId }),
        coinbaseWallet({ chains, appName: appInfo.appName }),
        walletConnectWallet({ projectId, chains }),
        ledgerWallet({ chains, projectId }),
        frameWallet({ chains }),
        rabbyWallet({ chains }),
        // phantomWallet({ chains }),
        // rainbowWallet({ projectId, chains }),
        // safeWallet({ chains }),
      ],
    },
  ]);

  // TODO make this configurable
  const config = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });

  return (
    <BeraConfigContext.Provider value={{ networkConfig, autoConnect, chains }}>
      <WagmiConfig config={config}>
        <RainbowKitProvider
          appInfo={appInfo}
          chains={chains}
          theme={darkTheme ? rainbowDarkTheme() : lightTheme()}
        >
          <BeraJsProvider>
            <TransactionStoreProvider>
              <CrocEnvContextProvider networkConfig={networkConfig}>
                {children}
              </CrocEnvContextProvider>
            </TransactionStoreProvider>
          </BeraJsProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </BeraConfigContext.Provider>
  );
};
export default BeraConfig;
