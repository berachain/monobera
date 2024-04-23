import { Address, PublicClient, formatEther, formatUnits } from "viem";
import { TokenBalance } from "~/types";

/**
 * fetch the current bera balance of a given address
 */

export const getBeraBalance = async ({
  account,
  publicClient,
}: {
  account: string | undefined;
  publicClient: PublicClient | undefined;
}): Promise<TokenBalance | undefined> => {
  if (!publicClient) return undefined;
  if (account) {
    try {
      const result = await publicClient.getBalance({
        address: account as Address,
      });
      return {
        balance: result,
        formattedBalance: formatEther(result),
      };
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }
};
