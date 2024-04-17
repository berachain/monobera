import { Address, PublicClient } from "viem";

export interface IFetchTransactionCountArgs {
  address: string | undefined;
  publicClient: PublicClient | undefined;
}

/**
 * fetch the transaction count of a given address
 */

export const getTransactionCount = async ({
  address,
  publicClient,
}: IFetchTransactionCountArgs): Promise<number | undefined> => {
  if (!publicClient) return undefined;
  if (address) {
    const transactionCount = await publicClient.getTransactionCount({
      address: address as Address,
    });
    return transactionCount;
  }

  return 0;
};
