import useSWR, { mutate } from "swr";
import useSWRImmutable from "swr/immutable";
import { erc20Abi, formatUnits } from "viem";
import { usePublicClient } from "wagmi";

import { getAllowance } from "~/actions/dex/getAllowance";
import { useBeraJs } from "~/contexts";
import { Token } from "~/types";

const REFRESH_BLOCK_INTERVAL = 10000;

interface AllowanceToken extends Token {
  allowance: bigint;
  formattedAllowance: string;
}

export interface IUsePollAllowanceRequest {
  contract: string;
  token?: Token;
}

export interface IUsePollAllowanceResponse {
  isLoading: boolean;
  isValidating: boolean;
  useAllowance: () => AllowanceToken;
  refresh: () => void;
}

/**
 *
 * @brief Allows the user to poll the allowances of a given token array.
 *
 * @param contract the address of the ERC20 token contract
 * @param tokens   the list of tokens to poll allowances for
 */
export const usePollAllowance = ({
  contract,
  token,
}: IUsePollAllowanceRequest): IUsePollAllowanceResponse => {
  const publicClient = usePublicClient();
  const { account } = useBeraJs();

  const method = "allowance";
  const QUERY_KEY = [
    account,
    token?.address.toLowerCase(),
    contract.toLowerCase(),
    method,
  ];

  const { isLoading, isValidating } = useSWR(
    QUERY_KEY,
    async () => {
      return getAllowance({
        account,
        token,
        contract,
        publicClient,
      });
    },
    {
      refreshInterval: REFRESH_BLOCK_INTERVAL,
    },
  );

  /**
   *
   * @returns the current allowances for the given contract
   */
  const useAllowance = (): AllowanceToken => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };

  return {
    isLoading,
    isValidating,
    useAllowance,
    refresh: () => mutate(QUERY_KEY),
  };
};
