import { Address, PublicClient } from "viem";

import { lendPoolImplementationABI } from "~/config";

export interface UserAccountData {
  totalCollateralBase: bigint;
  totalDebtBase: bigint;
  availableBorrowsBase: bigint;
  currentLiquidationThreshold: bigint;
  ltv: bigint;
  healthFactor: bigint;
}

/**
 * Retrieves the user account data.
 * @param {PublicClient} client
 * @param {Address} contractAddress pool poxy contract.
 * @param {Address} accountAddress user account.
 * @returns {UserAccountData | undefined}
 */
export const getUserAccountData = async ({
  client,
  contractAddress,
  accountAddress,
}: {
  client: PublicClient;
  contractAddress: Address;
  accountAddress: Address;
}): Promise<UserAccountData | undefined> => {
  try {
    const result = await client.readContract({
      address: contractAddress,
      abi: lendPoolImplementationABI,
      functionName: "getUserAccountData",
      args: [accountAddress],
    });
    const [
      totalCollateralBase,
      totalDebtBase,
      availableBorrowsBase,
      currentLiquidationThreshold,
      ltv,
      healthFactor,
    ] = result as [bigint, bigint, bigint, bigint, bigint, bigint];

    return {
      totalCollateralBase,
      totalDebtBase,
      availableBorrowsBase,
      currentLiquidationThreshold,
      ltv,
      healthFactor,
    };
  } catch (e) {
    console.log("getUserAccountDataError:", e);
    return undefined;
  }
};
