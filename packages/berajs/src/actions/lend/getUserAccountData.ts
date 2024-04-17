import { Address, PublicClient } from "viem";

import { LEND_POOL_IMPLEMENTATION_ABI } from "~/abi";
import { BeraConfig } from "~/types";

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
  config,
  account,
}: {
  client: PublicClient;
  config: BeraConfig;
  account: Address;
}): Promise<UserAccountData | undefined> => {
  try {
    const result = await client.readContract({
      address: config.contracts!.lendPoolProxyAddress,
      abi: LEND_POOL_IMPLEMENTATION_ABI,
      functionName: "getUserAccountData",
      args: [account],
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
