import { useCallback, useEffect, useReducer, useState } from "react";
import BigNumber from "bignumber.js";
import lodash from "lodash";
import { Keccak } from "sha3";
import { mutate } from "swr";
import { useLocalStorage } from "usehooks-ts";
import { createWalletClient, http, type Address } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { useChains, useSignMessage } from "wagmi";

import { decrypt, encrypt } from "~/utils/encoder";
import {
  ActionEnum,
  BeraConfig,
  initialState,
  reducer,
  useBeraJs,
  usePollEstimateFeesPerGas,
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

interface IUseOctOptions {
  beraConfigOverride?: BeraConfig;
}

// Average gas amount for one transaction on perps
const ESTIMATED_GAS_AMT_FOR_ONE_TXN = 1500000;

const hash = new Keccak(256);

const KEY = "deezNuts";
export const useOct = (
  { onSuccess, onError, onLoading }: IUseOct = {},
  options?: IUseOctOptions,
) => {
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

  const { data: feesPerGasEstimate } = usePollEstimateFeesPerGas();

  const { account, config: beraConfig } = useBeraJs();
  const { signMessageAsync } = useSignMessage();
  const chains = useChains();
  const generateKey = useCallback(async () => {
    dispatch({ type: ActionEnum.LOADING });
    onLoading?.();
    try {
      const signedData = await signMessageAsync({
        message: "You are enabling One Click Trading. Use at your own risk!",
      });

      hash.update(signedData);
      const privKey = hash.digest().toString("hex");
      const encodedString = encrypt(privKey, KEY);

      setOctKey(encodedString);

      hash.reset();
      dispatch({ type: ActionEnum.SUCCESS });
    } catch (e) {
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
        chain: chains[0],
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

  const setOctEnabled = useCallback(
    (value: boolean) => {
      if (account) {
        const newMap = lodash.set(octMap, account, value);
        setOctMap(newMap);
      }
    },
    [account, octMap, setOctMap],
  );

  const isOctEnabled = useCallback(() => {
    if (account) {
      return octMap[account] ?? false;
    }
    return false;
  }, [account, octMap]);

  const setOctKey = useCallback(
    (key: string) => {
      if (account) {
        const newMap = lodash.set(octKeyMap, account, key);
        setOctKeyMap(newMap);
      }
    },
    [account, octKeyMap, setOctKeyMap],
  );

  const getOctKey = useCallback(() => {
    if (account) {
      return octKeyMap[account] ?? undefined;
    }
    return undefined;
  }, [account, octKeyMap]);

  const { data: isDelegated, refresh } = useIsDelegated();

  const { data: octBalance } = usePollBeraBalance({
    address: octAddress as Address,
  });
  const { data: octTxCount } = usePollTransactionCount({
    address: octAddress as Address,
  });

  const isOctUnfunded = octBalance === undefined || octBalance.balance === 0n;

  const maxFeePerGas = feesPerGasEstimate?.maxFeePerGas?.toString();

  const perpsGasAmt =
    ESTIMATED_GAS_AMT_FOR_ONE_TXN * Number(maxFeePerGas ?? "1");

  const octTxnsLeft = BigNumber((octBalance?.balance ?? "0").toString())
    .div(perpsGasAmt)
    .dp(0)
    .toString(10);

  const isOctBalanceLow = octBalance !== undefined && Number(octTxnsLeft) < 100;

  return {
    isGenLoading: state.confirmState === "loading",
    isGenSubmitting: state.confirmState === "submitting",
    isGenSuccess: state.confirmState === "success",
    isGenError: state.confirmState === "fail",
    refetchDelegated: () => {
      refresh();
    },
    isOctEnabled,
    setOctEnabled,
    isOctUnfunded,
    octTxnsLeft,
    perpsGasAmt,
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
