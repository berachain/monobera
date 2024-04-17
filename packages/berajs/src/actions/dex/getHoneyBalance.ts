import { Address, PublicClient, erc20Abi } from "viem";

import { BeraConfig } from "~/types";

/**
 * fetch the current honey balance of a given address
 */

export const getHoneyBalance = async ({
  publicClient,
  config,
  isConnected,
  account,
}: {
  publicClient: PublicClient | undefined;
  config: BeraConfig;
  isConnected: boolean;
  account: string | undefined;
}): Promise<bigint | undefined> => {
  if (!publicClient) return undefined;
  if (isConnected && config.contracts?.honeyAddress) {
    try {
      const result = await publicClient.readContract({
        address: config.contracts.honeyAddress,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [account as Address],
      });
      return result;
    } catch (e) {
      console.error(e);
    }
  }
  return undefined;
};
