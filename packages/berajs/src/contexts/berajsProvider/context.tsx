"use client";

import React, {
  createContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { useAccount, useConnect, useNetwork } from "wagmi";

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
          [evmError, account, isMounted, chain, status],
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
