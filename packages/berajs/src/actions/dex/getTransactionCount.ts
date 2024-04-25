import { Address, PublicClient } from "viem";

export interface GetTransactionCount {
  address: string | undefined;
  publicClient: PublicClient | undefined;
}

export type GetTransactionCountResponse = number | undefined;

export const getTransactionCount = async ({
  address,
  publicClient,
}: GetTransactionCount): Promise<GetTransactionCountResponse> => {
  if (!publicClient) return undefined;
  if (address) {
    const transactionCount = await publicClient.getTransactionCount({
      address: address as Address,
    });
    return transactionCount;
  }

  return 0;
};
