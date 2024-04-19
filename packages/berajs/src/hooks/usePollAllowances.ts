import useSWR, { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient } from "wagmi";

import { useBeraJs } from "~/contexts";
import POLLING from "~/enum/polling";
import { Token } from "~/types";
import { getAllowances } from "../actions/dex";
import {
  AllowanceToken,
  DefaultHookProps,
  DefaultHookReturnType,
} from "~/types/global";
import { Address } from "viem";

type UsePollAllowancesRequest = DefaultHookProps<
  {
    spender: Address;
    tokens: Token[];
  },
  true
>;

export interface UsePollAllowancesResponse
  extends DefaultHookReturnType<AllowanceToken[] | undefined> {
  useSelectedAllowanceForContract: (address: string) => AllowanceToken;
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
}: UsePollAllowancesRequest): UsePollAllowancesResponse => {
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
  const useSelectedAllowanceForContract = (address: string): AllowanceToken => {
    const { data: assetWalletBalances = undefined } = useSWRImmutable([
      ...QUERY_KEY,
      address,
    ]);
    return assetWalletBalances;
  };

  return {
    ...swrResponse,
    useSelectedAllowanceForContract,
    refetch: () => void mutate(QUERY_KEY),
  };
};
