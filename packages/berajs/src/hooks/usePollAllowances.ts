import useSWR, { useSWRConfig } from "swr";
import { usePublicClient } from "wagmi";

import { useBeraJs } from "~/contexts";
import POLLING from "~/enum/polling";
import { getAllowances } from "../actions/dex";
import { AllowanceToken, DefaultHookReturnType } from "~/types/global";
import { Address } from "viem";

export interface UsePollAllowancesResponse
  extends DefaultHookReturnType<AllowanceToken[] | undefined> {
  useSelectedAllowance: (
    address: Address | undefined,
  ) => AllowanceToken | undefined;
  refetch: () => void;
}

/**
 *
 * @brief Allows the user to poll the allowances of a given token array.
 *
 * @param contract the address of the ERC20 token contract
 * @param tokens   the list of tokens to poll allowances for
 */
export const usePollAllowances = ({
  args,
  config,
  opts,
}: any): UsePollAllowancesResponse => {
  const publicClient = usePublicClient();
  const { mutate } = useSWRConfig();
  const { account } = useBeraJs();
  const QUERY_KEY = [account, args?.tokens, args?.spender, "allowances"];
  const swrResponse = useSWR<AllowanceToken[] | undefined>(
    QUERY_KEY,
    async () => {
      return getAllowances({
        tokens: args?.tokens,
        account,
        config,
        spender: args?.spender,
        publicClient,
      });
    },
    { ...opts, refreshInterval: opts?.refreshInterval ?? POLLING.NORMAL },
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
    refetch: () => void mutate(QUERY_KEY),
  };
};
