"use client";

import React, {
  createContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { useAccount, useConnect, useDisconnect, useNetwork } from "wagmi";

import { useAuth } from "~/hooks";

export interface IBeraJsAPI {
  account: `0x${string}` | undefined;
  error: Error | undefined;
  isConnected: boolean;
  isWrongNetwork?: boolean;
  isReady?: boolean;
  login: (connectorID: string) => void;
  logout: (connectorID: string) => void;
  setError: (error: Error | undefined) => void;
}

export const BeraJsContext = createContext<IBeraJsAPI | undefined>(undefined);

const BeraJsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { login, logout } = useAuth();
  const { error: evmError } = useConnect();
  const { address: account, status } = useAccount();
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isMounted, setIsMounted] = useState(false);
  const { chain } = useNetwork();

  useEffect(() => setIsMounted(true), []);

  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (isMounted) {
      try {
        const connectorId = localStorage.getItem("wagmi.wallet") || "";
        const connector = connectors.find(
          (c: any) => c.id === JSON.parse(connectorId),
        );
        if (connector === undefined) {
          console.log("Bad state, disconnecting");
          disconnect();
          localStorage.removeItem("wagmi.wallet");
          localStorage.removeItem("wagmi.metaMask.shimDisconnect");
          localStorage.removeItem("wagmi.cache");
          localStorage.removeItem("rk-recent");
          localStorage.removeItem("walletConnectState");
        }
        const state = localStorage.getItem("wagmi.connected") || "";
        if (!isConnected && state === "true" && connector !== undefined) {
          connect({
            connector,
          });
        }
      } catch (e) {
        console.log("Welcome to Berachain!");
        disconnect();
        return;
      }
    }
  }, [isConnected, isMounted, connectors]);

  useEffect(() => {
    localStorage.setItem("walletConnectState", isConnected.toString());
  }, [isConnected]);

  return (
    <BeraJsContext.Provider
      value={{
        account: account as `0x${string}`,
        error: evmError || error,
        isConnected: useMemo(
          () => (!evmError && account && isMounted ? true : false),
          [evmError, account, isMounted, status],
        ),
        isWrongNetwork: !chain?.unsupported ? false : true,
        isReady: useMemo(
          () =>
            !evmError && account && isMounted && chain?.unsupported === false,
          [evmError, account, isMounted, chain?.id, status],
        ),
        login,
        logout,
        setError,
      }}
    >
      {children}
    </BeraJsContext.Provider>
  );
};
export default BeraJsProvider;
