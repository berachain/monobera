"use client";

import { useCallback, useReducer } from "react";
import { usePublicClient } from "wagmi";

import { ActionEnum, initialState, reducer } from "~/utils/stateReducer";

interface IContractRead {
  address: `0x${string}`;
  abi: any[];
  contractMethod: string;
  params: any[];
}

export interface useContractReadApi {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  read: (props: IContractRead) => Promise<unknown[]>;
}

const useContractRead = (): useContractReadApi => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const publicClient = usePublicClient();

  const read = useCallback(
    async ({
      address,
      abi,
      contractMethod,
      params,
    }: IContractRead): Promise<unknown[]> => {
      dispatch({ type: ActionEnum.LOADING });
      try {
        const data = await publicClient.readContract({
          address: address,
          abi: abi,
          functionName: contractMethod,
          args: [...params],
        });
        dispatch({
          type: ActionEnum.SUCCESS,
        });
        if (Array.isArray(data)) {
          return data;
        } else {
          return [data];
        }
      } catch (e: any) {
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
    read,
  };
};

export default useContractRead;
