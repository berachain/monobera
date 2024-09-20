import {
  type Address,
  type PublicClient,
  erc20Abi,
  formatUnits,
  isAddress,
} from "viem";

import { multicall3Abi } from "~/abi";
import { ADDRESS_ZERO } from "~/config";
import type { BeraConfig } from "../../types";
import type { BalanceToken, Token } from "../../types/dex";

export interface GetWalletBalances {
  account: string | undefined;
  tokenList: Token[] | undefined;
  config: BeraConfig;
  publicClient: PublicClient | undefined;
}

interface Call {
  abi: any;
  address: Address;
  functionName: string;
  args: any[];
}

/**
 * fetch the balances of a given wallet address
 */

export const getWalletBalances = async ({
  account,
  tokenList,
  config,
  publicClient,
}: GetWalletBalances): Promise<BalanceToken[] | undefined> => {
  if (!publicClient) return undefined;
  if (!account || !tokenList) return undefined;
  if (!config.contracts?.multicallAddress) {
    throw new Error("Multicall address not found in config");
  }

  const filteredTokenList = tokenList.filter((token) =>
    isAddress(token.address),
  );
  if (account && filteredTokenList) {
    const call: Call[] = filteredTokenList.map((item: Token) => {
      if (item.address === ADDRESS_ZERO) {
        return {
          address: config.contracts?.multicallAddress as Address,
          abi: multicall3Abi,
          functionName: "getEthBalance",
          args: [account],
        };
      }
      return {
        address: item.address as Address,
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
          const token = filteredTokenList[index];
          if (item.error) {
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
          return resultBalanceToken;
        }),
      );
      return balances as BalanceToken[];
    } catch (error) {
      console.log(error);
    }
  }
  return undefined;
};
