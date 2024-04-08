import { multicallAddress } from "@bera/config";
import useSWR, { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";
import { erc20Abi, formatUnits } from "viem";
import { usePublicClient } from "wagmi";

import { type Token } from "~/api/currency/tokens";
import POLLING from "~/config/constants/polling";
import { useBeraJs } from "~/contexts";

const REFRESH_BLOCK_INTERVAL = POLLING.FAST;

interface AllowanceToken extends Token {
  allowance: bigint;
  formattedAllowance: string;
}

interface Call {
  abi: typeof erc20Abi;
  address: `0x${string}`;
  functionName: string;
  args: any[];
}

interface IUsePollAllowances {
  contract: string;
  tokens: Token[];
}

/**
 *
 * @brief Allows the user to poll the allowances of a given token array.
 *
 * @param contract the address of the ERC20 token contract
 * @param tokens   the list of tokens to poll allowances for
 */
export const usePollAllowances = ({ contract, tokens }: IUsePollAllowances) => {
  const publicClient = usePublicClient();
  const { mutate } = useSWRConfig();
  const { account } = useBeraJs();
  const QUERY_KEY = [account, tokens, contract, "allowances"];
  useSWR(
    QUERY_KEY,
    async () => {
      if (!publicClient) return undefined;
      if (account) {
        const call: Call[] = tokens.map((item: Token) => ({
          address: item.address as `0x${string}`,
          abi: erc20Abi,
          functionName: "allowance",
          args: [account, contract],
        }));

        const result = await publicClient.multicall({
          contracts: call,
          multicallAddress: multicallAddress,
        });

        const allowances = await Promise.all(
          result.map(async (item: any, index: number) => {
            const token = tokens[index];
            if (item.error) {
              await mutate([...QUERY_KEY, token?.address], {
                allowance: 0,
                formattedAllowance: "0",
                ...token,
              });
              return { balance: 0, ...token };
            }

            const resultAllowanceToken: AllowanceToken = {
              allowance: item.result,
              formattedAllowance: formatUnits(
                item.result,
                token?.decimals || 18,
              ),
              ...token,
            } as AllowanceToken;
            await mutate([...QUERY_KEY, token?.address], resultAllowanceToken);
            return resultAllowanceToken;
          }),
        );

        return allowances;
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
  const useCurrentAllowancesForContract = (): AllowanceToken[] => {
    const { data: assetWalletBalances = undefined } =
      useSWRImmutable(QUERY_KEY);
    return assetWalletBalances;
  };

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
    useCurrentAllowancesForContract,
    useSelectedAllowanceForContract,
    refresh: () => mutate(QUERY_KEY),
  };
};
