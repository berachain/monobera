import useSWR, { mutate } from "swr";
import { Address } from "viem";
import { usePublicClient } from "wagmi";

import { getAllowance } from "~/actions/dex/getAllowance";
import { useBeraJs } from "~/contexts";
import POLLING from "~/enum/polling";
import {
  AllowanceToken,
  DefaultHookOptions,
  DefaultHookReturnType,
  Token,
} from "~/types";

export type UsePollAllowanceArgs = {
  spender: Address;
  token: Token | undefined;
};

/**
 *
 * @brief Allows the user to poll the allowances of a given token array.
 *
 * @param contract the address of the ERC20 token contract
 * @param tokens   the list of tokens to poll allowances for
 */
export const usePollAllowance = (
  args: UsePollAllowanceArgs,
  options?: DefaultHookOptions,
): DefaultHookReturnType<AllowanceToken | undefined> => {
  const publicClient = usePublicClient();
  const { account } = useBeraJs();

  const method = "allowance";
  const QUERY_KEY = [
    account,
    args.token?.address.toLowerCase(),
    args.spender.toLowerCase(),
    method,
  ];

  const swrResponse = useSWR(
    QUERY_KEY,
    async () => {
      return getAllowance({
        account: account as Address,
        token: args.token,
        spender: args.spender,
        publicClient,
      });
    },
    {
      ...options?.opts,
      refreshInterval: options?.opts?.refreshInterval ?? POLLING.NORMAL,
    },
  );

  return {
    ...swrResponse,
    refresh: () => mutate(QUERY_KEY),
  };
};
