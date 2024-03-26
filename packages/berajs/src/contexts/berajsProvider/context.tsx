"use client";

import React, {
  createContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { useAccount, useConnect } from "wagmi";

import { useAuth } from "~/hooks";
import { useBeraConfig } from "../berajsConfig";

export interface IBeraJsAPI {
  account: `0x${string}` | undefined;
  error: Error | undefined;
  isConnected: boolean;
  isWrongNetwork?: boolean;
  isReady?: boolean;
  logout: () => void;
  setError: (error: Error | undefined) => void;
}

export const BeraJsContext = createContext<IBeraJsAPI | undefined>(undefined);

const BeraJsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { logout } = useAuth();
  const { networkConfig } = useBeraConfig();
  const { error: evmError } = useConnect();
  const { address: account, status } = useAccount();
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isMounted, setIsMounted] = useState(false);
  const { chain } = useAccount();

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
        isWrongNetwork: networkConfig.chain.id === chain?.id ? false : true,
        isReady: useMemo(
          () =>
            !evmError &&
            account &&
            isMounted &&
            networkConfig.chain.id === chain?.id,
          [evmError, account, isMounted, chain?.id, status, networkConfig],
        ),
        logout,
        setError,
      }}
    >
      {children}
    </BeraJsContext.Provider>
  );
};
export default BeraJsProvider;
