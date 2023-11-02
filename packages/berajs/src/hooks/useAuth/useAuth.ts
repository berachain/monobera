import { useCallback, useReducer } from "react";
import { useConnect, useDisconnect } from "wagmi";

import { initialState, reducer } from "~/utils/stateReducer";
import { type ConnectorNames } from "~/config";
import { useBeraConfig } from "~/contexts";
import { connectorLocalStorageKey } from ".";

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
  const { networkConfig } = useBeraConfig();
  const { connect, connectors } = useConnect({
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
    (connectorID: ConnectorNames | string) => {
      try {
        onLoading && onLoading();
        const connector = connectors.find((c) => c.id === connectorID);
        localStorage?.setItem(connectorLocalStorageKey, connectorID);
        connect({ connector, chainId: networkConfig.chain.id });
        onSuccess && onSuccess();
        return;
      } catch (e: any) {
        onError && onError(e);
        return;
      }
    },
    [onLoading, connectors, connect, onSuccess, onError],
  );

  const logout = useCallback(() => {
    try {
      disconnect();
      localStorage?.removeItem(connectorLocalStorageKey);
    } catch (e: any) {
      onLogoutError && onLogoutError(e);
    } finally {
      onLogoutSuccess && onLogoutSuccess();
    }
  }, [disconnect, onLogoutError, onLogoutSuccess]);

  return {
    isLoading: state.confirmState === "loading",
    isSuccess: state.confirmState === "success",
    isError: state.confirmState === "fail",
    login,
    logout,
  };
};

export default useAuth;
