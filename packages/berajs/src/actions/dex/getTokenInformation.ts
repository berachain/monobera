import { multicall } from "@wagmi/core";
import { Address, erc20Abi } from "viem";

import { BeraConfig } from "../../types";
import { ActionEnum } from "../../utils/stateReducer";

interface FetchTokenPriceInformationArgs {
  dispatch: (action: { type: ActionEnum }) => void;
  address: Address;
  config: BeraConfig;
  setTokenInformation: (tokenInformation: any) => void;
  setError: (error: Error) => void;
}

/**
 * read the token information
 */

export const getTokenInformation = async ({
  dispatch,
  address,
  config,
  setTokenInformation,
  setError,
}: FetchTokenPriceInformationArgs): Promise<void> => {
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
      multicallAddress: config.contracts?.multicallAddress,
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
};
