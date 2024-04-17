import { Address, PublicClient, formatEther } from "viem";

/**
 * fetch the current bera balance of a given address
 */

export const getBeraBalance = async ({
  address,
  publicClient,
}: {
  address: string | undefined;
  publicClient: PublicClient | undefined;
}): Promise<number | undefined> => {
  if (!publicClient) return undefined;
  if (address) {
    try {
      const balance = await publicClient.getBalance({
        address: address as Address,
      });
      return Number(formatEther(balance));
    } catch (e) {
      console.error(e);
      return 0;
    }
  }

  return 0;
};
