"use client";

import { useCallback, useReducer, useState } from "react";
import { useConfig, usePublicClient } from "wagmi";
import { getToken } from "@wagmi/core";

import { type Token } from "~/api/currency/tokens";
import { ActionEnum, initialState, reducer } from "../utils/stateReducer";

interface IuseTokenInformation {
  address: string;
  isDefault?: boolean;
}

export interface useTokenInformationApi {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  tokenInformation: Token | undefined;
  error: Error | undefined;
  read: (props: IuseTokenInformation) => Promise<void>;
}

const useTokenInformation = (): useTokenInformationApi => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [tokenInformation, setTokenInformation] = useState<Token | undefined>(
    undefined,
  );

  const publicClient = usePublicClient();
  const config = useConfig();
  const read = useCallback(
    async ({
      address,
      isDefault = false,
    }: IuseTokenInformation): Promise<void> => {
      dispatch({ type: ActionEnum.LOADING });
      try {
        const token = await getToken(config, {
          address: address as `0x${string}`,
        });

        const formattedToken: Token = {
          address: address,
          decimals: token.decimals,
          symbol: token.symbol as string,
          name: token.name as string,
          default: isDefault,
        };

        dispatch({
          type: ActionEnum.SUCCESS,
        });
        setTokenInformation(formattedToken);
      } catch (e: any) {
        console.log(e);
        setError(e);
        dispatch({
          type: ActionEnum.ERROR,
        });
        throw new Error(e);
      }
    },
    [publicClient],
  );

  return {
    isLoading: state.confirmState === "loading",
    isSuccess: state.confirmState === "success",
    isError: state.confirmState === "fail",
    tokenInformation,
    error,
    read,
  };
};

export default useTokenInformation;
