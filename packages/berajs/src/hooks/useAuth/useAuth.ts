import { useCallback, useReducer } from "react";
import { useConnect, useDisconnect, useSwitchNetwork } from "wagmi";

import { initialState, reducer } from "~/utils/stateReducer";
import { ConnectorNames } from "~/config";
import { useBeraConfig, useKeplr } from "~/contexts";
import { connectorLocalStorageKey } from ".";
import { KeplrNotInstalledError, KeplrOutdatedError } from "./error";

export interface useAuthApi {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  login: (connectorId: string) => Promise<void>;
  logout: () => Promise<void>;
}

export interface IuseAuth {
  onSuccess?: () => void;
  onError?: (e?: Error) => void;
  onLoading?: () => void;
  onLogoutSuccess?: () => void;
  onLogoutError?: (e?: Error) => void;
}

const useAuth = ({
  onSuccess,
  onError,
  onLoading,
  onLogoutError,
  onLogoutSuccess,
}: IuseAuth = {}) => {
  const [state] = useReducer(reducer, initialState);
  const { loginCosmos, logoutCosmos } = useKeplr();
  const { networkConfig } = useBeraConfig();
  const { connectAsync, connectors } = useConnect({
    chainId: networkConfig.chain.id,
  });
  // const { chains, error, isLoading, pendingChainId, switchNetwork } =
  // useSwitchNetwork({
  //   chainId: networkConfig.chain.id,
  // })
  const { disconnect } = useDisconnect();
  // const { switchNetworkAsync } = useSwitchNetwork({    chainId: networkConfig.chain.id,
  // });

  const login = useCallback(
    async (connectorID: ConnectorNames | string) => {
      try {
        onLoading && onLoading();
        if (connectorID === ConnectorNames.Keplr) {
          // @ts-ignore
          if (!window.keplr) {
            throw new KeplrNotInstalledError();
          }
          // @ts-ignore
          if (!window.keplr.experimentalSuggestChain) {
            throw new KeplrOutdatedError();
          }
          loginCosmos();
          localStorage?.setItem(connectorLocalStorageKey, connectorID);
          onSuccess && onSuccess();
          return;
        }
        const connector = connectors.find((c) => c.id === connectorID);
        localStorage?.setItem(connectorLocalStorageKey, connectorID);
        await connectAsync({ connector, chainId: networkConfig.chain.id });
        onSuccess && onSuccess();
        return;
      } catch (e: any) {
        onError && onError(e);
        return;
      }
    },
    [onLoading, connectors, connectAsync, onSuccess, loginCosmos, onError],
  );

  const logout = useCallback(() => {
    try {
      logoutCosmos();
      disconnect();
      localStorage?.removeItem(connectorLocalStorageKey);
    } catch (e: any) {
      onLogoutError && onLogoutError(e);
    } finally {
      onLogoutSuccess && onLogoutSuccess();
    }
  }, [logoutCosmos, disconnect, onLogoutError, onLogoutSuccess]);

  return {
    isLoading: state.confirmState === "loading",
    isSuccess: state.confirmState === "success",
    isError: state.confirmState === "fail",
    login,
    logout,
  };
};

export default useAuth;
