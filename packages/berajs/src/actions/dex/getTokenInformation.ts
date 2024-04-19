import { multicall } from "@wagmi/core";
import { Address, erc20Abi } from "viem";

import { BeraConfig } from "../../types";
import { ActionEnum } from "../../utils/stateReducer";

interface IFetchTokenPriceInformationArgs {
  dispatch: (action: { type: ActionEnum }) => void;
  address: Address;
  config: any;
  beraConfig: BeraConfig;
  setTokenInformation: (tokenInformation: any) => void;
  setError: (error: Error) => void;
}

export const getTokenInformation = async ({
  dispatch,
  address,
  config,
  beraConfig,
  setTokenInformation,
  setError,
}: IFetchTokenPriceInformationArgs): Promise<void> => {
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
      multicallAddress: beraConfig.contracts?.multicallAddress,
    });

    console.log({ result });
    dispatch({
      type: ActionEnum.SUCCESS,
    });
    // TODO: fix this
    setTokenInformation(undefined);
  } catch (e: any) {
    console.log(e);
    setError(e);
    dispatch({
      type: ActionEnum.ERROR,
    });
    throw new Error(e);
  }
};
