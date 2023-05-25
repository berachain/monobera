"use client";

import { Buffer } from "buffer";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { Key } from "@keplr-wallet/types";
import { useAccount, useConnect } from "wagmi";

import { ethToBera } from "../../utils/evmToBera";
import useBeraConfig from "../berajsConfig/hooks";

interface KeplrProvider extends React.PropsWithChildren {
  children: React.ReactNode;
}

export interface KeplrContextApi {
  account: string | undefined;
  error: Error | undefined;
  bech32Address: string | undefined;
  key: Key | undefined;
  loginCosmos: () => void;
  logoutCosmos: () => void;
  updateAccount: () => void;
}

export const KeplrContext = createContext<KeplrContextApi | undefined>(
  undefined,
);

export const CosmosWalletProvider: React.FC<KeplrProvider> = ({ children }) => {
  const [account, setAccount] = useState<string | undefined>(undefined);
  const [bech32Address, setBech32Address] = useState<string | undefined>(
    undefined,
  );
  const [error, setError] = useState<Error | undefined>(undefined);
  const [key, setKey] = useState<Key | undefined>(undefined);

  const { networkConfig } = useBeraConfig();
  const { address: evmAccount } = useAccount();
  const { error: evmError } = useConnect();

  // if evm wallet connected, fetch associated bech32Address
  useEffect(() => {
    if (evmAccount && !evmError) {
      const x = ethToBera(evmAccount);
      setBech32Address(x);
    }
  }, [evmAccount, evmError]);

  const clearError = useCallback(() => {
    setError(undefined);
  }, [setError]);

  const updateAccount = useCallback(async () => {
    // @ts-ignore
    const keplrKey = await window?.keplr.getKey(networkConfig.chainId);
    const hexAddress = "0x" + Buffer.from(keplrKey.address).toString("hex");
    setAccount(hexAddress);
    setBech32Address(keplrKey.bech32Address);
    setKey(keplrKey);
    clearError();
  }, [clearError, networkConfig.chainId]);

  const loginCosmos = useCallback(async () => {
    try {
      // @ts-ignore
      await window.keplr.experimentalSuggestChain(networkConfig);
      // @ts-ignore
      await window.keplr.enable(networkConfig.chainId);
      updateAccount();
      window.addEventListener("keplr_keystorechange", () => {
        updateAccount();
      });
    } catch (e: any) {
      setError(e);
    }
  }, [networkConfig, updateAccount]);

  const logoutCosmos = useCallback(() => {
    setAccount(undefined);
    setBech32Address(undefined);
    clearError();
  }, [setAccount, setBech32Address, clearError]);

  return (
    <KeplrContext.Provider
      value={{
        account,
        error,
        bech32Address,
        key,
        loginCosmos,
        logoutCosmos,
        updateAccount,
      }}
    >
      {children}
    </KeplrContext.Provider>
  );
};
