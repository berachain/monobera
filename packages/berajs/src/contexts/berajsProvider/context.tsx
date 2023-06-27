"use client";

import React, { createContext, useState, type PropsWithChildren } from "react";
import { useAccount, useConnect } from "wagmi";

import { useAuth } from "~/hooks";

export interface IBeraJsAPI {
  account: `0x${string}` | undefined;
  error: Error | undefined;
  isConnected: boolean;
  login: (connectorID: string) => Promise<void>;
  logout: (connectorID: string) => void;
  setError: (error: Error | undefined) => void;
}

export const BeraJsContext = createContext<IBeraJsAPI | undefined>(undefined);

const BeraJsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { login, logout } = useAuth();
  const { error: evmError } = useConnect();
  const { address: account } = useAccount();
  const [error, setError] = useState<Error | undefined>(undefined);

  return (
    <BeraJsContext.Provider
      value={{
        account: account as `0x${string}`,
        error: evmError || error,
        isConnected: !evmError && account ? true : false,
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
