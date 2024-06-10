import { Address, PublicClient } from "viem";

import { BERA_VAULT_REWARDS_ABI } from "~/abi";

export interface IncentiveInfo {
  minIncentiveRate: bigint;
  incentiveRate: bigint;
  amountRemaining: bigint;
}

export const getIncentivesInfo = async (
  publicClient: PublicClient | undefined,
  token: Address,
  vault: Address,
): Promise<IncentiveInfo|undefined> => {
  if (!publicClient) throw new Error("Missing public client");
  if (!token) throw new Error("Missing token address");
  if (!vault) throw new Error("Missing vault address");
  try {
    const result = (await publicClient.readContract({
      address: vault,
      abi: BERA_VAULT_REWARDS_ABI,
      functionName: "incentives",
      args: [token],
    })) as [bigint, bigint, bigint];
    return {
      minIncentiveRate: result[0],
      incentiveRate: result[1],
      amountRemaining: result[2],
    };
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
