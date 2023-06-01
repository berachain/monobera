"use client";

import React, { createContext, useState, type PropsWithChildren } from "react";
import { useAccount, useConnect } from "wagmi";

import { useKeplr } from "~/contexts/keplrProvider/hooks";
import { useAuth } from "~/hooks";

export interface IBeraJsAPI {
  bech32Address: string | undefined;
  account: `0x${string}` | undefined;
  error: Error | undefined;
  isConnected: boolean;
  login: (connectorID: string) => Promise<void>;
  logout: (connectorID: string) => void;
  setError: (error: Error | undefined) => void;
}

export const BeraJsContext = createContext<IBeraJsAPI | undefined>(undefined);

const BeraJsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const {
    account: cosmosAccount,
    error: cosmosError,
    bech32Address,
  } = useKeplr();
  const { login, logout } = useAuth();
  const { error: evmError } = useConnect();
  const { address: account } = useAccount();
  const [error, setError] = useState<Error | undefined>(undefined);

  return (
    <BeraJsContext.Provider
      value={{
        bech32Address: bech32Address,
        account: (account || cosmosAccount) as `0x${string}`,
        error: evmError || cosmosError || error,
        isConnected:
          !evmError && !cosmosError && (account || cosmosAccount)
            ? true
            : false,
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
