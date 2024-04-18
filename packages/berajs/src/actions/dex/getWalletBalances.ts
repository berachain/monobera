import { Address, PublicClient, erc20Abi, formatUnits, getAddress } from "viem";

import { MULTICALL3_ABI } from "~/abi";
import { BeraConfig } from "../../types";
import { Token } from "../../types/dex";

export interface IFetchWalletBalancesRequestArgs {
  account: string | undefined;
  tokenList: Token[] | undefined;
  externalTokenList: Token[] | undefined;
  queryKey: (string | boolean | Token[] | undefined)[];
  config: BeraConfig;
  publicClient: PublicClient | undefined;
  mutate: (key: any, data: any) => void;
}

interface BalanceToken extends Token {
  balance: bigint;
  formattedBalance: string;
}

interface Call {
  abi: any;
  address: `0x${string}`;
  functionName: string;
  args: any[];
}

/**
 * fetch the balances of a given wallet address
 */

export const getWalletBalances = async ({
  account,
  tokenList,
  externalTokenList,
  queryKey,
  config,
  publicClient,
  mutate,
}: IFetchWalletBalancesRequestArgs): Promise<any | undefined> => {
  if (!publicClient) return undefined;
  if (!account || !tokenList) return undefined;
  if (!config.contracts?.multicallAddress) {
    throw new Error("Multicall address not found in config");
  }
  if (!config.contracts?.bgtTokenAddress) {
    throw new Error("BGT token address not found in config");
  }

  if (!config.contracts?.nativeTokenAddress) {
    throw new Error("Native token address not found in config");
  }
  if (account && tokenList) {
    const fullTokenList = [...tokenList, ...(externalTokenList ?? [])].filter(
      (token: Token) => token.address !== config.contracts?.bgtTokenAddress,
    );
    const call: Call[] = fullTokenList.map((item: Token) => {
      if (item.address === config.contracts?.nativeTokenAddress) {
        return {
          address: config.contracts?.multicallAddress as Address,
          abi: MULTICALL3_ABI,
          functionName: "getEthBalance",
          args: [account],
        };
      }
      return {
        address: item.address as `0x${string}`,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [account],
      };
    });
    try {
      const result = await publicClient.multicall({
        contracts: call,
        multicallAddress: config.contracts?.multicallAddress,
      });

      const balances = await Promise.all(
        result.map(async (item: any, index: number) => {
          const token = fullTokenList[index];
          if (item.error) {
            await mutate([...queryKey, getAddress(token?.address ?? "")], {
              balance: 0n,
              formattedBalance: "0",
              ...token,
            });
            return { balance: 0n, formattedBalance: "0", ...token };
          }
          const formattedBalance = formatUnits(
            item.result,
            token?.decimals || 18,
          );

          const resultBalanceToken: BalanceToken = {
            balance: item.result,
            formattedBalance: formattedBalance.includes("e")
              ? "0"
              : formattedBalance,
            ...token,
          } as BalanceToken;
          await mutate([...queryKey, token?.address], resultBalanceToken);
          return resultBalanceToken;
        }),
      );
      return balances;
    } catch (error) {
      console.log(error);
    }
  }

  return 0;
};
