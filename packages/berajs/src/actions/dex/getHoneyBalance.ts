import { Address, PublicClient, erc20Abi } from "viem";

import { useBeraJs } from "~/contexts";
import { BeraConfig } from "~/types";

/**
 * fetch the current honey balance of a given address
 */

export const getHoneyBalance = async ({
  publicClient,
  config,
}: {
  publicClient: PublicClient | undefined;
  config: BeraConfig;
}): Promise<bigint | undefined> => {
  if (!publicClient) return undefined;
  const { isConnected, account } = useBeraJs();
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
