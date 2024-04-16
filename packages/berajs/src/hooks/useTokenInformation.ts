import { useCallback, useReducer, useState } from "react";
import { useConfig, usePublicClient } from "wagmi";
import { multicall } from "@wagmi/core";
import { Address, erc20Abi } from "viem";

import { ActionEnum, initialState, reducer } from "../utils/stateReducer";
import { multicallAddress } from "@bera/config";
import { Token } from "..";

interface IuseTokenInformation {
  address: Address;
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
    async ({ address }: IuseTokenInformation): Promise<void> => {
      dispatch({ type: ActionEnum.LOADING });
      try {
        const result = await multicall(config as any, {
          contracts: [
            {
              address: address,
              abi: erc20Abi,
              functionName: "decimals",
            },
            {
              address: address,
              abi: erc20Abi,
              functionName: "name",
            },
            {
              address: address,
              abi: erc20Abi,
              functionName: "symbol",
            },
          ],
          multicallAddress: multicallAddress,
        });

        console.log({ result });
        dispatch({
          type: ActionEnum.SUCCESS,
        });
        setTokenInformation(undefined);
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
