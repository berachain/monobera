import { Address, PublicClient, erc20Abi, formatUnits, getAddress } from "viem";

import { multicall3Abi } from "~/abi";
import { BeraConfig } from "../../types";
import { Token } from "../../types/dex";
import { ADDRESS_ZERO } from "~/constants";

export interface IFetchWalletBalancesRequestArgs {
  account: string | undefined;
  tokenList: Token[] | undefined;
  externalTokenList: Token[] | undefined;
  config: BeraConfig;
  publicClient: PublicClient | undefined;
}

interface BalanceToken extends Token {
  balance: bigint;
  formattedBalance: string;
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
  externalTokenList,
  config,
  publicClient,
}: IFetchWalletBalancesRequestArgs): Promise<BalanceToken[] | undefined> => {
  if (!publicClient) return undefined;
  if (!account || !tokenList) return undefined;
  if (!config.contracts?.multicallAddress) {
    throw new Error("Multicall address not found in config");
  }
  if (account && tokenList) {
    const fullTokenList = [...tokenList, ...(externalTokenList ?? [])];
    const call: Call[] = fullTokenList.map((item: Token) => {
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
          const token = fullTokenList[index];
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
