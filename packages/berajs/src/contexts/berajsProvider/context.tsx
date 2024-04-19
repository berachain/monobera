"use client";

import React, {
  createContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { useAccount, useChains } from "wagmi";

import { defaultBeraConfig } from "~/constants/defaultBeraConfig";
import { TransactionStoreProvider } from "~/hooks";
import { BeraConfig } from "~/types";
import { CrocEnvContextProvider } from "../crocenv";

export interface IBeraJsAPI {
  account: `0x${string}` | undefined;
  isConnected: boolean;
  isWrongNetwork?: boolean;
  isReady?: boolean;
  config: BeraConfig;
}

export const BeraJsContext = createContext<IBeraJsAPI | undefined>(undefined);

const BeraJsProvider: React.FC<
  PropsWithChildren<{ configOverride?: BeraConfig }>
> = ({ children, configOverride }) => {
  const chains = useChains();
  const { address: account, status } = useAccount();
  const [isMounted, setIsMounted] = useState(false);
  const { chain } = useAccount();

  useEffect(() => setIsMounted(true), []);

  const isWrongNetwork = useMemo(() => {
    return !chains.some((c) => c.id === chain?.id);
  }, [chains, chain?.id]);
  return (
    <BeraJsContext.Provider
      value={{
        account: account as `0x${string}`,
        isConnected: useMemo(
          () => (account && isMounted ? true : false),
          [account, isMounted, status],
        ),
        isWrongNetwork,
        isReady: useMemo(
          () => account && isMounted && !isWrongNetwork,
          [account, isMounted, chain?.id, status, isWrongNetwork],
        ),
        config: configOverride ?? defaultBeraConfig,
      }}
    >
      <TransactionStoreProvider>
        <CrocEnvContextProvider>{children}</CrocEnvContextProvider>
      </TransactionStoreProvider>
    </BeraJsContext.Provider>
  );
};
export default BeraJsProvider;
