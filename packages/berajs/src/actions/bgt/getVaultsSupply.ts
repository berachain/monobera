import { Address, PublicClient } from "viem";

import { BERA_VAULT_REWARDS_ABI } from "~/abi";

export interface GetVaultsSupply {
  vaultAddress: Address;
  publicClient: PublicClient | undefined;
}

export const getVaultsSupply = async ({
  vaultAddress,
  publicClient,
}: GetVaultsSupply): Promise<bigint> => {
  if (!publicClient) throw new Error("Missing public client");
  if (!vaultAddress) throw new Error("Missing vault address");
  try {
    const result = await publicClient.readContract({
      address: vaultAddress,
      abi: BERA_VAULT_REWARDS_ABI,
      functionName: "totalSupply",
      args: [],
    });
    return result as bigint;
  } catch (error) {
    console.log(error);
    return 0n;
  }
};
