import { Address, PublicClient } from "viem";
import { governanceTimelockAbi } from "~/abi";

export interface GetCancellerRoleArgs {
  client: PublicClient;
  timelockAddress: Address;
}

export const getCancellerRole = async ({
  client,
  timelockAddress,
}: GetCancellerRoleArgs): Promise<Address> => {
  if (!timelockAddress) {
    throw new Error("Timelock address not found in config");
  }

  return await client.readContract({
    abi: governanceTimelockAbi,
    address: timelockAddress,
    functionName: "CANCELLER_ROLE",
  });
};
