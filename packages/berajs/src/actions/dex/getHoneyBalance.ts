import { Address, PublicClient, erc20Abi, formatUnits } from "viem";
import { TokenBalance } from "~/types";

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
}): Promise<TokenBalance | undefined> => {
  const { account, erc20HoneyAddress } = args;
  try {
    const result = await publicClient.readContract({
      address: erc20HoneyAddress,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: [account as Address],
    });
    return {
      balance: result ?? 0n,
      formattedBalance: formatUnits(result ?? 0n, 18),
    };
  } catch (e) {
    console.error(e);
    return undefined;
  }
};
