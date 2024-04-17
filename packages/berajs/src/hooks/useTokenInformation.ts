import { useCallback, useReducer, useState } from "react";
import { Address } from "viem";
import { useConfig, usePublicClient } from "wagmi";

import { getTokenInformation } from "~/actions/dex";
import { DefaultHookTypes, Token } from "..";
import { initialState, reducer } from "../utils/stateReducer";

interface IUseTokenInformation {
  address: Address;
  isDefault?: boolean;
}

export interface IUseTokenInformationApi {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  tokenInformation: Token | undefined;
  error: Error | undefined;
  read: (props: IUseTokenInformation) => Promise<void>;
}

const useTokenInformation = ({
  config: beraConfig,
}: DefaultHookTypes): IUseTokenInformationApi => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [tokenInformation, setTokenInformation] = useState<Token | undefined>(
    undefined,
  );

  const publicClient = usePublicClient();
  const config = useConfig();
  const read = useCallback(
    async ({ address }: IUseTokenInformation): Promise<void> => {
      getTokenInformation({
        dispatch,
        address,
        config,
        beraConfig,
        setTokenInformation,
        setError,
      });
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
