"use client";

import React, { createContext, type PropsWithChildren } from "react";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { ThemeSetting } from "@dynamic-labs/sdk-react-core/src/lib/context/ThemeContext";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import { WagmiProvider } from "wagmi";
import { EvmNetwork } from "@dynamic-labs/sdk-react-core";
import { type Chain } from "viem";
import { defaultBeraNetworkConfig, wagmiConfig } from "~/config/defaultBeraJsConfig";
import { dynamicWalletKey } from "@bera/config";
import { BeraJsProvider } from "@bera/berajs";

export interface NetworkConfig {
  isTestnet?: boolean;
  chain: Chain;
  evmNetwork: EvmNetwork;
}

interface IBeraConfig extends PropsWithChildren {
  darkTheme?: boolean;
}

export interface IBeraConfigAPI {
  networkConfig: NetworkConfig;
  darkTheme?: boolean;
  chains?: any;
}

export const BeraWagmi = createContext<IBeraConfigAPI | undefined>(undefined);

const queryClient = new QueryClient();

const Provider: React.FC<IBeraConfig> = ({
  children,
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
    <BeraWagmi.Provider value={{ networkConfig: defaultBeraNetworkConfig }}>
      <DynamicContextProvider
        settings={{
          initialAuthenticationMode: "connect-only",
          environmentId: dynamicWalletKey,
          walletConnectors: [EthereumWalletConnectors],
          overrides: { evmNetworks: [defaultBeraNetworkConfig.evmNetwork] },
        }}
        theme={theme ?? "auto"}
      >
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <DynamicWagmiConnector>
              <BeraJsProvider>{children}</BeraJsProvider>
            </DynamicWagmiConnector>
          </QueryClientProvider>
        </WagmiProvider>
      </DynamicContextProvider>
    </BeraWagmi.Provider>
  );
};
export default Provider;
