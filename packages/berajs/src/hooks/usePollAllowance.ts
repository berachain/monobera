import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits } from "viem";
import { erc20ABI, usePublicClient } from "wagmi";

import { type Token } from "~/api/currency/tokens";
import { useBeraJs } from "~/contexts";

const REFRESH_BLOCK_INTERVAL = 20000;

interface AllowanceToken extends Token {
  allowance: bigint;
  formattedAllowance: string;
}

interface IUsePollAllowances {
  contract: string;
  token?: Token;
}

/**
 *
 * @brief Allows the user to poll the allowances of a given token array.
 *
 * @param contract the address of the ERC20 token contract
 * @param tokens   the list of tokens to poll allowances for
 */
export const usePollAllowance = ({ contract, token }: IUsePollAllowances) => {
  const publicClient = usePublicClient();
  const { account, error } = useBeraJs();

  const method = "allowance";
  const QUERY_KEY = [account, token?.address, contract, method];

  useSWR(
    QUERY_KEY,
    async () => {
      if (account && !error && token) {
        const allowance = await publicClient.readContract({
          address: token.address as `0x${string}`,
          abi: erc20ABI,
          functionName: method,
          args: [account, contract as `0x${string}`],
        });

        return {
          ...token,
          allowance: allowance,
          formattedAllowance: formatUnits(allowance, token.decimals),
        };
      }

      return undefined;
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
    useAllowance,
  };
};
