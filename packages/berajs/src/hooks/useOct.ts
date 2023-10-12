import { useCallback, useReducer, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { useSignMessage } from "wagmi";
import { reducer, initialState, ActionEnum } from "..";
import { Keccak } from 'sha3';
import { ethersWalletToAccount } from 'viem/ethers' 
import { Wallet } from 'ethers'

export enum LOCAL_STORAGE_KEYS {
    OCT_ENABLED = 'oct_enabled',
    OCT_KEY='oct_key'
  }


  interface IUseOct {
    onSuccess?: () => void;
    onError?: () => void;
    onLoading?: () => void;

  }

  const hash = new Keccak(256);

export const useOct = ({
    onSuccess,
    onError,
    onLoading,
}: IUseOct) => {
    const [isOctEnabled, setIsOctEnabled] = useLocalStorage(
        LOCAL_STORAGE_KEYS.OCT_ENABLED,
        false,
    );
    const [octKey, setOctKey] = useLocalStorage(
        LOCAL_STORAGE_KEYS.OCT_KEY,
        '',
    );

    const [state, dispatch] = useReducer(reducer, initialState);

    const { signMessageAsync } = useSignMessage({
        message: `You are enabling One Click Trading. Use at your own risk!`,
      })
    
    const generateKey = useCallback(
        async() => {
            dispatch({ type: ActionEnum.LOADING });
            onLoading && onLoading();
            try {
                const signedData = await signMessageAsync()

                console.log(signedData)

                hash.update(signedData)
                const privKey = hash.digest().toString()
                console.log(privKey)

                const account = ethersWalletToAccount(new Wallet(privKey))

                console.log(account.address)
                hash.reset()
                dispatch({ type: ActionEnum.SUCCESS });
            } catch(e) {
                console.log(e);
                dispatch({ type: ActionEnum.ERROR });
                onError && onError();
            }
        }, []
    )
    return {
        octKey,
        isOctEnabled,
        setIsOctEnabled,
        generateKey,
    }
}
