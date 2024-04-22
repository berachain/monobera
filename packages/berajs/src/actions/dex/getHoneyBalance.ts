import { Address, PublicClient, erc20Abi } from "viem";

interface HoneyBalanceArgs {
  account: Address;
  erc20HoneyAddress: Address;
}

/**
 * fetch the current honey balance of a given address
 **/
export const getHoneyBalance = async ({
  publicClient,
  args,
}: {
  publicClient: PublicClient;
  args: HoneyBalanceArgs;
}): Promise<bigint | undefined> => {
  const { account, erc20HoneyAddress } = args;
  try {
    const result = await publicClient.readContract({
      address: erc20HoneyAddress,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: [account as Address],
    });
    return result;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};
