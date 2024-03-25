"use client";

import React, { createContext, type PropsWithChildren } from "react";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { ThemeSetting } from "@dynamic-labs/sdk-react-core/src/lib/context/ThemeContext";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import { WagmiProvider, createConfig, http } from "wagmi";

import { defaultBeraConfig } from "~/config";
import { type NetworkConfig } from "~/config/types";
import { BeraJsProvider } from "~/contexts/berajsProvider";
import { TransactionStoreProvider } from "~/hooks/transactions/TransactionStoreContext";
import { CrocEnvContextProvider } from "../crocenv";
import { dynamicWalletKey } from "@bera/config";

interface IBeraConfig extends PropsWithChildren {
  // autoConnect?: boolean; // its always on for dynamic 4 now
  darkTheme?: boolean;
}

export interface IBeraConfigAPI {
  networkConfig: NetworkConfig;
  // autoConnect: boolean; // its always on for dynamic 4 now, may release more feature in the future
  darkTheme?: boolean;
  // walletConnectors?: any;
  chains?: any;
}

export const globalQueryClient = new QueryClient();


export const BeraConfigContext = createContext<IBeraConfigAPI | undefined>(
  undefined,
);

const BeraConfig: React.FC<IBeraConfig> = ({
  children,
  // autoConnect = false,
  darkTheme = undefined,
}) => {
  const { theme: nextTheme } = useTheme();
  const theme: ThemeSetting =
    darkTheme === undefined
      ? nextTheme !== "dark" && nextTheme !== "light"
        ? "auto"
        : nextTheme
      : darkTheme
        ? "dark"
        : "light";

  const config = createConfig({
    chains: [defaultBeraConfig.chain],
    multiInjectedProviderDiscovery: false,
    ssr: false,
    transports: {
      [defaultBeraConfig.chain.id]: http(
        defaultBeraConfig.chain.rpcUrls.default.http[0] || "",
      ),
    },
  });

  return (
    <BeraConfigContext.Provider value={{ networkConfig: defaultBeraConfig }}>
      <DynamicContextProvider
        settings={{
          initialAuthenticationMode: "connect-only",
          environmentId: dynamicWalletKey,
          walletConnectors: [EthereumWalletConnectors],
          overrides: { evmNetworks: [defaultBeraConfig.evmNetwork] },
        }}
        theme={theme ?? "auto"}
      >
        <WagmiProvider config={config} reconnectOnMount={true}>
          <QueryClientProvider client={globalQueryClient}>
            <DynamicWagmiConnector>
              <BeraJsProvider>
                <TransactionStoreProvider>
                  <CrocEnvContextProvider>{children}</CrocEnvContextProvider>
                </TransactionStoreProvider>
              </BeraJsProvider>
            </DynamicWagmiConnector>
          </QueryClientProvider>
        </WagmiProvider>
      </DynamicContextProvider>
    </BeraConfigContext.Provider>
  );
};
export default BeraConfig;
