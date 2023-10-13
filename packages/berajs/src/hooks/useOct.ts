import { useCallback, useEffect, useReducer, useState } from "react";
import { Wallet } from "ethers";
import { Keccak } from "sha3";
import { useLocalStorage } from "usehooks-ts";
import { Address } from "viem";
import { ethersWalletToAccount } from "viem/ethers";
import { useSignMessage } from "wagmi";

import { decrypt, encrypt } from "~/utils/encoder";
import { ActionEnum, initialState, reducer, useBeraJs } from "..";
import lodash from 'lodash';

export enum LOCAL_STORAGE_KEYS {
  OCT_ENABLED = "oct_enabled",
  OCT_KEY = "bear",
}

interface IUseOct {
  onSuccess?: () => void;
  onError?: () => void;
  onLoading?: () => void;
}

const hash = new Keccak(256);

const KEY = "deezNuts";
export const useOct = ({ onSuccess, onError, onLoading }: IUseOct = {}) => {
  const [octMap, setOctMap] = useLocalStorage<Record<Address, boolean>>(
    LOCAL_STORAGE_KEYS.OCT_ENABLED,
    {},
  );
  const [octKeyMap, setOctKeyMap] = useLocalStorage<Record<string, string>>(LOCAL_STORAGE_KEYS.OCT_KEY, {});

  const [octAddress, setOctAddress] = useState("");

  const [octPrivKey, setOctPrivKey] = useState("");

  const [octAccount, setOctAccount] = useState<any | undefined>(undefined);

  const [state, dispatch] = useReducer(reducer, initialState);

  const {account} = useBeraJs()
  const { signMessageAsync } = useSignMessage({
    message: `You are enabling One Click Trading. Use at your own risk!`,
  });

  const generateKey = useCallback(async () => {
    dispatch({ type: ActionEnum.LOADING });
    onLoading && onLoading();
    try {
      const signedData = await signMessageAsync();

      hash.update(signedData);
      const privKey = hash.digest().toString("hex");
      const encodedString = encrypt(privKey, KEY);

      setOctKey(encodedString);

      hash.reset();
      dispatch({ type: ActionEnum.SUCCESS });
    } catch (e) {
      0;
      console.log(e);
      setOctAddress("");
      setOctPrivKey("");
      setOctAccount(undefined);
      dispatch({ type: ActionEnum.ERROR });
      onError && onError();
    }
  }, [onSuccess, onError, onLoading, account]);

  useEffect(() => {
    try {
      const octKey = getOctKey()
      if(!octKey) {
        return
      }
      const decodedString = decrypt(octKey, KEY);
      const account = ethersWalletToAccount(new Wallet(decodedString));

      setOctAccount(account);
      setOctAddress(account.address);
      setOctPrivKey(decodedString);
    } catch (e) {
      setOctAddress("");
      setOctPrivKey("");
      setOctAccount(undefined);
    }
  }, [account, octKeyMap, octMap]);

  const setOctEnabled = (value: boolean) => {

    if(account){
      const newMap = lodash.set(octMap, account, value)
      setOctMap(newMap)
    }
  }

  const isOctEnabled = () => {
    if(account) {
      return octMap[account] ?? false
    }
    return false
  }

  const setOctKey = (key: string) => {
    if(account) {
      const newMap = lodash.set(octKeyMap, account, key)
      setOctKeyMap(newMap)
    }
  }

  const getOctKey = (): string | undefined => {
    if(account) {
      return octKeyMap[account] ?? undefined
    }
    return undefined
  }
  return {
    isLoading: state.confirmState === "loading",
    isSubmitting: state.confirmState === "submitting",
    isSuccess: state.confirmState === "success",
    isError: state.confirmState === "fail",
    isOctEnabled,
    setOctEnabled,
    isOctGenerated: getOctKey !== undefined,
    isOctDelegated: false,
    getOctKey,
    octAddress,
    octAccount,
    octPrivKey,
    generateKey,
  };
};
