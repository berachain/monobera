import { Address, PublicClient } from "viem";
import { BERA_VAULT_REWARDS_ABI } from "~/abi";

export interface GetUserVaultsInfo {
  account: string | undefined;
  vaultAddress: Address;
  publicClient: PublicClient | undefined;
}

export const getUserVaultsBalance = async ({
  account,
  vaultAddress,
  publicClient,
}: GetUserVaultsInfo): Promise<bigint> => {
  if (!publicClient) throw new Error("Missing public client");
  if (!account) throw new Error("Missing user account");
  if (!vaultAddress) throw new Error("Missing vault address");

  try {
    const result = await publicClient.readContract({
      address: vaultAddress,
      abi: BERA_VAULT_REWARDS_ABI,
      functionName: "balanceOf",
      args: [account as `0x${string}`],
    });

    return result as bigint;
  } catch (error) {
    console.log(error);
    return 0n;
  }
};
