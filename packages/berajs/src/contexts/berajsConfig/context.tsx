"use client";

import React, { PropsWithChildren, createContext } from "react";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
// import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

import { NetworkConfig } from "../../config/types";
import { TransactionStoreProvider } from "../../hooks/transactions/TransactionStoreContext";
import useEagerConnect from "../../hooks/useAuth/useEagerConnect";
import { BeraJsProvider } from "../berajsProvider";
import { CosmosWalletProvider } from "../keplrProvider/context";

interface IBeraConfig extends PropsWithChildren {
  networkConfig: NetworkConfig;
  autoConnect?: boolean;
}

export interface IBeraConfigAPI {
  networkConfig: NetworkConfig;
  autoConnect: boolean;
}

export const BeraConfigContext = createContext<IBeraConfigAPI | undefined>(
  undefined,
);

function EagerConnect() {
  useEagerConnect();
  return null;
}

const BeraConfig: React.FC<IBeraConfig> = ({
  children,
  networkConfig,
  autoConnect = false,
}) => {
  const { chains, publicClient } = configureChains(
    [networkConfig.chain],
    [
      jsonRpcProvider({
        rpc: (chain) => ({ http: chain.rpcUrls.default.http[0] }),
      }),
    ],
  );

  // TODO make this configurable
  const config = createConfig({
    autoConnect: autoConnect,
    connectors: [
      new InjectedConnector({ chains }),
      // new WalletConnectConnector({
      //   chains,
      //   options: {
      //     projectId: networkConfig.chain.name,
      //     isNewChainsStale: true
      //   },
      // }),
    ],
    publicClient,
  });

  return (
    <BeraConfigContext.Provider value={{ networkConfig, autoConnect }}>
      <WagmiConfig config={config}>
        <CosmosWalletProvider>
          <BeraJsProvider>
            <TransactionStoreProvider>
              {children}
              {autoConnect ? <EagerConnect /> : null}
            </TransactionStoreProvider>
          </BeraJsProvider>
        </CosmosWalletProvider>
      </WagmiConfig>
    </BeraConfigContext.Provider>
  );
};
export default BeraConfig;
