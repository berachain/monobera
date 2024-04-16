import { Address, PublicClient } from "viem";

/**
 * fetch the current bera balance of a given address
 */

export const getTransactionCount = async ({
  address,
  publicClient,
}: {
  address: string | undefined;
  publicClient: PublicClient | undefined;
}): Promise<number | undefined> => {
  if (!publicClient) return undefined;
  if (address) {
    const transactionCount = await publicClient.getTransactionCount({
      address: address as Address,
    });
    return transactionCount;
  }

  return 0;
};
