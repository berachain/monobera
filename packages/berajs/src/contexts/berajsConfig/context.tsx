"use client";

import React, { createContext, type PropsWithChildren } from "react";
import { dynamicWalletKey } from "@bera/config";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { ThemeSetting } from "@dynamic-labs/sdk-react-core/src/lib/context/ThemeContext";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import { WagmiProvider } from "wagmi";

import { defaultBeraConfig, wagmiConfig } from "~/config";
import { type NetworkConfig } from "~/config/types";
import { BeraJsProvider } from "~/contexts/berajsProvider";
import { TransactionStoreProvider } from "~/hooks/transactions/TransactionStoreContext";
import { CrocEnvContextProvider } from "../crocenv";

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

export const BeraConfigContext = createContext<IBeraConfigAPI | undefined>(
  undefined,
);

const queryClient = new QueryClient();

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
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
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
