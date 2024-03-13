import { useCallback, useReducer } from "react";
import { useDisconnect } from "wagmi";

import { initialState, reducer } from "~/utils/stateReducer";
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

const useAuth = ({ onLogoutError, onLogoutSuccess }: IuseAuth = {}) => {
  const [state] = useReducer(reducer, initialState);
  const { disconnect } = useDisconnect();
  const logout = useCallback(() => {
    try {
      disconnect();
      localStorage?.removeItem(connectorLocalStorageKey);
    } catch (e: any) {
      onLogoutError?.(e);
    } finally {
      onLogoutSuccess?.();
    }
  }, [disconnect, onLogoutError, onLogoutSuccess]);

  return {
    isLoading: state.confirmState === "loading",
    isSuccess: state.confirmState === "success",
    isError: state.confirmState === "fail",
    logout,
  };
};

export default useAuth;
