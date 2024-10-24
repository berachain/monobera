import useSWR, { useSWRConfig } from "swr";
import { Address } from "viem";
import { usePublicClient } from "wagmi";

import { useBeraJs } from "~/contexts";
import POLLING from "~/enum/polling";
import { Token } from "~/types";
import {
  AllowanceToken,
  DefaultHookOptions,
  DefaultHookReturnType,
} from "~/types/global";
import { getAllowances } from "../../actions/dex";

export type UsePollAllowancesArgs = {
  spender: string;
  tokens: Token[];
};
export interface UsePollAllowancesResponse
  extends DefaultHookReturnType<AllowanceToken[] | undefined> {
  useSelectedAllowance: (
    address: Address | undefined,
  ) => AllowanceToken | undefined;
}

/**
 *
 * @brief Allows the user to poll the allowances of a given token array.
 *
 * @param contract the address of the ERC20 token contract
 * @param tokens   the list of tokens to poll allowances for
 */
export const usePollAllowances = (
  args: UsePollAllowancesArgs,
  options?: DefaultHookOptions,
): UsePollAllowancesResponse => {
  const publicClient = usePublicClient();
  const { account, config: beraConfig } = useBeraJs();
  const QUERY_KEY = [account, args?.tokens, args?.spender, "allowances"];
  const swrResponse = useSWR<AllowanceToken[] | undefined>(
    QUERY_KEY,
    async () => {
      return getAllowances({
        tokens: args?.tokens,
        account,
        config: options?.beraConfigOverride ?? beraConfig,
        spender: args?.spender,
        publicClient,
      });
    },
    {
      ...options?.opts,
      refreshInterval: options?.opts?.refreshInterval ?? POLLING.NORMAL,
    },
  );

  /**
   *
   * @param address the address of the token to get the allowance for
   * @returns the current allowance for the contract for that token
   */
  const useSelectedAllowance = (
    address: Address | undefined,
  ): AllowanceToken | undefined => {
    if (!address) return undefined;
    return swrResponse.data?.find(
      (item: AllowanceToken) => item.address === address,
    );
  };

  return {
    ...swrResponse,
    useSelectedAllowance,
    refresh: () => swrResponse?.mutate?.(),
  };
};
