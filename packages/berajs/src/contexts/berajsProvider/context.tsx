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
  logout: (connectorID: string) => void;
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

  // useEffect(() => {
  //   if (isMounted) {
  //     try {
  //       console.log('status', status)
  //       console.log('oending conn', pendingConnector)
  //       console.log('connectors', adcc)
  //       const connectorId = localStorage.getItem("wagmi.wallet") || "";
  //       const connector = connectors.find(
  //         (c: any) => c.id === JSON.parse(connectorId),
  //       );
  //       if (connector === undefined) {
  //         console.log("Bad state, disconnecting");
  //         // disconnect();

  //         localStorage.setItem('wagmi.connected', 'true')
  //         // localStorage.setItem('walletConnectState', 'false')
  //         // localStorage.setItem('hasVisitedBefore', 'false')
  //         // localStorage.removeItem('rk-recent')
  //         // localStorage.removeItem('wagmi.wallet')
  //         // localStorage.clear();
  //         // reset();
  //         return;
  //       }
  //       const state = localStorage.getItem("wagmi.connected") || "";
  //       if (!isConnected && state === "true" && connector !== undefined) {
  //         connectAsync({
  //           connector,
  //         }).then((a)=>{
  //           console.log('a', a)
  //         });
  //       }
  //     } catch (e) {
  //       // console.log("Welcome to Berachain!");
  //       // disconnect();
  //       // reset();
  //       // location.reload();
  //       localStorage.setItem('wagmi.connected', 'true')

  //       // localStorage.setItem('wagmi.connected', 'false')
  //       // localStorage.setItem('walletConnectState', 'false')
  //       // localStorage.setItem('hasVisitedBefore', 'false')
  //       // localStorage.clear();

  //       return;
  //     }
  //   }
  // }, [isMounted]);

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
          () => !evmError && account && isMounted && chain !== undefined,
          [evmError, account, isMounted, chain?.id, status],
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
