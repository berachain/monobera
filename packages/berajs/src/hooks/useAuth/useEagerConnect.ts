import { useEffect } from "react";
import { isMobile } from "react-device-detect";

import { connectorLocalStorageKey } from ".";
import { ConnectorNames } from "../../config";
import useAuth from "./useAuth";

const safeGetLocalStorageItem = () => {
  try {
    return (
      typeof window?.localStorage?.getItem === "function" &&
      (window?.localStorage?.getItem(
        connectorLocalStorageKey,
      ) as ConnectorNames)
    );
  } catch (err: any) {
    // Ignore Local Storage Browser error
    // - NS_ERROR_FILE_CORRUPTED
    // - QuotaExceededError
    console.error(`Local Storage error: ${err?.message}`);

    return null;
  }
};

const useEagerConnect = () => {
  const { login } = useAuth();

  useEffect(() => {
    const tryLogin = (c: ConnectorNames) => {
      setTimeout(() => login(c));
    };

    const connectorId = safeGetLocalStorageItem();

    if (connectorId) {
      // Prevent eager connect on mobile & coinbase wallet not injected, as it keeps trying deeplink to app store.
      if (
        connectorId === ConnectorNames.Coinbase &&
        isMobile &&
        window?.ethereum?.isCoinbaseWallet !== true
      ) {
        return;
      }
      tryLogin(connectorId);
    } else {
      // dapp browser
      if (isMobile && window.ethereum) {
        tryLogin(ConnectorNames.Injected);
      }
    }
  }, [login]);
};

export default useEagerConnect;
