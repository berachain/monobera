import { PublicClient, erc20Abi, formatUnits } from "viem";

import { BeraConfig, Token } from "../../types";

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

/**
 * fetch the allowances of a given token array
 */

export const getAllowances = async ({
  tokens,
  account,
  config,
  contract,
  publicClient,
  queryKey,
  mutate,
}: {
  tokens: Token[];
  account: `0x${string}` | undefined;
  config: BeraConfig;
  method: string;
  contract: string;
  queryKey: string[];
  publicClient: PublicClient | undefined;
  mutate: (key: any, data: any) => void;
}) => {
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
      multicallAddress: config.contracts?.multicallAddress,
    });

    const allowances = await Promise.all(
      result.map(async (item: any, index: number) => {
        const token = tokens[index];
        if (item.error) {
          await mutate([...queryKey, token?.address], {
            allowance: 0,
            formattedAllowance: "0",
            ...token,
          });
          return { balance: 0, ...token };
        }

        const resultAllowanceToken: AllowanceToken = {
          allowance: item.result,
          formattedAllowance: formatUnits(item.result, token?.decimals || 18),
          ...token,
        } as AllowanceToken;
        await mutate([...queryKey, token?.address], resultAllowanceToken);
        return resultAllowanceToken;
      }),
    );

    return allowances;
  }

  return undefined;
};
