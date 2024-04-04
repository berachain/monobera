"use client";

import React, {
  createContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { useAccount } from "wagmi";

import { useBeraConfig } from "../berajsConfig";

export interface IBeraJsAPI {
  account: `0x${string}` | undefined;
  isConnected: boolean;
  isWrongNetwork?: boolean;
  isReady?: boolean;
}

export const BeraJsContext = createContext<IBeraJsAPI | undefined>(undefined);

const BeraJsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { networkConfig } = useBeraConfig();
  const { address: account, status } = useAccount();
  const [isMounted, setIsMounted] = useState(false);
  const { chain } = useAccount();

  useEffect(() => setIsMounted(true), []);

  return (
    <BeraJsContext.Provider
      value={{
        account: account as `0x${string}`,
        isConnected: useMemo(
          () => (account && isMounted ? true : false),
          [account, isMounted, status],
        ),
        isWrongNetwork: networkConfig.chain.id === chain?.id ? false : true,
        isReady: useMemo(
          () => account && isMounted && networkConfig.chain.id === chain?.id,
          [account, isMounted, chain?.id, status, networkConfig],
        ),
      }}
    >
      {children}
    </BeraJsContext.Provider>
  );
};
export default BeraJsProvider;
