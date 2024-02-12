import { useCallback, useEffect, useReducer, useState } from "react";
import lodash from "lodash";
import { Keccak } from "sha3";
import { mutate } from "swr";
import { useLocalStorage } from "usehooks-ts";
import { createWalletClient, http, type Address } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { useSignMessage } from "wagmi";

import { decrypt, encrypt } from "~/utils/encoder";
import {
  ActionEnum,
  initialState,
  reducer,
  useBeraConfig,
  useBeraJs,
  usePollBeraBalance,
  usePollTransactionCount,
} from "..";
import { useIsDelegated } from "./modules/perps";

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
  const [octKeyMap, setOctKeyMap] = useLocalStorage<Record<string, string>>(
    LOCAL_STORAGE_KEYS.OCT_KEY,
    {},
  );

  const [octAddress, setOctAddress] = useState("");

  const [octPrivKey, setOctPrivKey] = useState("");

  const [octAccount, setOctAccount] = useState<any | undefined>(undefined);

  const [state, dispatch] = useReducer(reducer, initialState);

  const { account } = useBeraJs();
  const { signMessageAsync } = useSignMessage({
    message: "You are enabling One Click Trading. Use at your own risk!",
  });
  const { networkConfig } = useBeraConfig();
  const generateKey = useCallback(async () => {
    dispatch({ type: ActionEnum.LOADING });
    onLoading?.();
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
      onError?.();
    }
  }, [onSuccess, onError, onLoading, account]);

  useEffect(() => {
    try {
      const octKey = getOctKey();
      if (!octKey) {
        return;
      }
      const decodedString = decrypt(octKey, KEY);
      const account = privateKeyToAccount(decodedString);
      const client = createWalletClient({
        account,
        chain: networkConfig.chain,
        transport: http(),
      });
      setOctAccount(client);
      setOctAddress(account.address);
      setOctPrivKey(decodedString);
    } catch (e) {
      console.log(e);
      setOctAddress("");
      setOctPrivKey("");
      setOctAccount(undefined);
    }
  }, [account, octKeyMap, octMap]);

  const setOctEnabled = (value: boolean) => {
    if (account) {
      const newMap = lodash.set(octMap, account, value);
      setOctMap(newMap);
    }
  };

  const isOctEnabled = () => {
    if (account) {
      return octMap[account] ?? false;
    }
    return false;
  };

  const setOctKey = (key: string) => {
    if (account) {
      const newMap = lodash.set(octKeyMap, account, key);
      setOctKeyMap(newMap);
    }
  };

  const getOctKey = (): string | undefined => {
    if (account) {
      return octKeyMap[account] ?? undefined;
    }
    return undefined;
  };

  const { isDelegated, QUERY_KEY } = useIsDelegated();

  const refetchDelegated = () => {
    void mutate(QUERY_KEY);
  };

  const { useBalance } = usePollBeraBalance({
    address: octAddress,
  });
  const { useTransactionCount } = usePollTransactionCount({
    address: octAddress,
  });

  const octBalance = useBalance();
  const octTxCount = useTransactionCount();

  const isOctUnfunded = octBalance === undefined || octBalance === 0;
  const isOctBalanceLow = octBalance !== undefined && octBalance < 0.1;

  return {
    isGenLoading: state.confirmState === "loading",
    isGenSubmitting: state.confirmState === "submitting",
    isGenSuccess: state.confirmState === "success",
    isGenError: state.confirmState === "fail",
    refetchDelegated,
    isOctEnabled,
    setOctEnabled,
    isOctUnfunded,
    isOctBalanceLow,
    octBalance,
    isOctGenerated: getOctKey() !== undefined,
    isOctDelegated: isDelegated,
    isOctReady:
      isOctEnabled() &&
      getOctKey() !== undefined &&
      isDelegated &&
      !isOctUnfunded,
    getOctKey,
    octAddress,
    octAccount,
    octTxCount,
    octPrivKey,
    generateKey,
  };
};
