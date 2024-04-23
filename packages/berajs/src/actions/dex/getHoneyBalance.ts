import { Address, PublicClient, erc20Abi, formatUnits } from "viem";

import { BeraConfig, TokenBalance } from "~/types";

/**
 * fetch the current honey balance of a given address
 */

export const getHoneyBalance = async ({
  publicClient,
  config,
  account,
}: {
  publicClient: PublicClient | undefined;
  config: BeraConfig;
  account: string | undefined;
}): Promise<TokenBalance | undefined> => {
  if (!publicClient || !account) return undefined;
  if (config.contracts?.honeyAddress) {
    try {
      const result = await publicClient.readContract({
        address: config.contracts.honeyAddress,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [account as Address],
      });
      return {
        balance: result,
        formattedBalance: formatUnits(result, 18),
      };
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }
  return undefined;
};
