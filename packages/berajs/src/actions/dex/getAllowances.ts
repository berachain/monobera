import { PublicClient, erc20Abi, formatUnits } from "viem";

import { AllowanceToken, BeraConfig, Token } from "~/types";

export interface IGetAllowancesRequest {
  tokens: Token[] | undefined;
  account: `0x${string}` | undefined;
  config: BeraConfig;
  spender: string | undefined;
  publicClient: PublicClient | undefined;
}

interface Call {
  abi: typeof erc20Abi;
  address: `0x${string}`;
  functionName: string;
  args: any[];
}

/**
 * fetch the allowances of a given token array
 */

export const getAllowances = async ({
  tokens,
  account,
  config,
  spender,
  publicClient,
}: IGetAllowancesRequest): Promise<AllowanceToken[] | undefined> => {
  if (!publicClient || !tokens || !spender) return undefined;
  if (account) {
    const call: Call[] = tokens.map((item: Token) => ({
      address: item.address as `0x${string}`,
      abi: erc20Abi,
      functionName: "allowance",
      args: [account, spender],
    }));

    const result = await publicClient.multicall({
      contracts: call,
      multicallAddress: config.contracts?.multicallAddress,
    });

    const allowances = result.map((item: any, index: number) => {
      const token = tokens[index];
      if (item.error) {
        return { balance: 0, ...token };
      }

      const resultAllowanceToken: AllowanceToken = {
        allowance: item.result,
        formattedAllowance: formatUnits(item.result, token?.decimals || 18),
        ...token,
      } as AllowanceToken;
      return resultAllowanceToken;
    });
    return allowances as AllowanceToken[];
  }

  return undefined;
};
