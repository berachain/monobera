import { Address, PublicClient } from "viem";
import { BeraConfig } from "~/types";
import { tradingAbi } from "~/abi";

export interface getIsDelegatedProps {
  args: { account: Address };
  config: BeraConfig;
  client: PublicClient;
}
/**
 * Given a user account, check if the user has delegated their positions.
 *
 * @returns boolean indicating if the user has delegated their positions.
 */
export const getIsDelegated = async ({
  args: { account },
  config,
  client,
}: getIsDelegatedProps) => {
  if (!client) {
    console.error("Public client not found");
    return false;
  }
  if (!config.contracts?.perpsTradingContractAddress) {
    console.error("Perps trading contract address not found");
    return false;
  }
  try {
    const result = await client.readContract({
      address: config.contracts.perpsTradingContractAddress,
      abi: tradingAbi,
      functionName: "delegations",
      args: [account],
    });
    return (
      result !== undefined &&
      result !== "0x0000000000000000000000000000000000000000"
    );
  } catch (e) {
    console.error(e);
    return false;
  }
};
