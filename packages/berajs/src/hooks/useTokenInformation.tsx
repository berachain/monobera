"use client";

import { useCallback, useReducer, useState } from "react";
import { erc20ABI, usePublicClient } from "wagmi";

import { getContracts } from "~/api/contracts";
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

interface Call {
  abi: any;
  address: `0x${string}`;
  functionName: any;
  args: [];
}

const useTokenInformation = (): useTokenInformationApi => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [tokenInformation, setTokenInformation] = useState<Token | undefined>(
    undefined,
  );

  const publicClient = usePublicClient();

  const read = useCallback(
    async ({
      address,
      isDefault = false,
    }: IuseTokenInformation): Promise<void> => {
      dispatch({ type: ActionEnum.LOADING });
      try {
        const call: Call[] = [
          {
            abi: erc20ABI,
            address: address as `0x${string}`,
            functionName: "decimals",
            args: [],
          },
          {
            abi: erc20ABI,
            address: address as `0x${string}`,
            functionName: "symbol",
            args: [],
          },
          {
            abi: erc20ABI,
            address: address as `0x${string}`,
            functionName: "name",
            args: [],
          },
        ];
        const result = await publicClient.multicall({
          contracts: call,
          multicallAddress: getContracts().multicall as `0x${string}`,
        });

        const formattedToken: Token = {
          address: address,
          decimals: result[0]?.result as unknown as number,
          symbol: result[1]?.result as unknown as string,
          name: result[2]?.result as unknown as string,
          default: isDefault,
        };

        dispatch({
          type: ActionEnum.SUCCESS,
        });
        setTokenInformation(formattedToken);
      } catch (e: any) {
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
