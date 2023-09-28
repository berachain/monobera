"use client";

import React, { createContext, type PropsWithChildren } from "react";
import {
  RainbowKitProvider,
  connectorsForWallets,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  ledgerWallet,
  trustWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

import { type NetworkConfig } from "~/config/types";
import { BeraJsProvider } from "~/contexts/berajsProvider";
import { TransactionStoreProvider } from "~/hooks/transactions/TransactionStoreContext";

interface IBeraConfig extends PropsWithChildren {
  networkConfig?: NetworkConfig;
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
}) => {

  if(!networkConfig) {
    return <>{children}</>
  }
  const { chains, publicClient } = configureChains(
    [networkConfig.chain],
    [
      jsonRpcProvider({
        rpc: (chain: any) => ({ http: chain.rpcUrls.default.http[0] || "" }),
      }),
    ],
  );

  const projectId = "berachain";
  const { wallets } = getDefaultWallets({
    appName: "My RainbowKit App",
    projectId,
    chains,
  });
  const connectors = connectorsForWallets([
    ...wallets,
    {
      groupName: "Recommended",
      wallets: [
        argentWallet({ projectId, chains }),
        trustWallet({ projectId, chains }),
        ledgerWallet({ projectId, chains }),
      ],
    },
  ]);

  // // TODO make this configurable
  // const config = createConfig({
  //   autoConnect,
  //   connectors,
  //   publicClient,
  // });

  const config = createConfig({
    autoConnect: autoConnect,
    connectors: connectors,
    publicClient,
  });

  console.log(config)
  console.log(chains)
  return (
    <BeraConfigContext.Provider value={{ networkConfig, autoConnect }}>
      <WagmiConfig config={config}>
        <RainbowKitProvider
          chains={chains}
          // theme={darkTheme ? rainbowDarkTheme() : lightTheme()}
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
