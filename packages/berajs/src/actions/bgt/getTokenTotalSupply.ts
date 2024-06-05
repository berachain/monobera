import { Address, PublicClient, erc20Abi } from "viem";

export interface GetBGTInfo {
  token: Address;
  publicClient: PublicClient | undefined;
}

export const getTokenTotalSupply = async ({
  token,
  publicClient,
}: GetBGTInfo): Promise<bigint | undefined> => {
  if (!publicClient) throw new Error("Missing public client");
  if (!token) throw new Error("Missing token address");
  try {
    const result = await publicClient.readContract({
      address: token,
      abi: erc20Abi,
      functionName: "totalSupply",
      args: [],
    });
    return result as bigint;
  } catch (error) {
    console.log(error);
    return 0n;
  }
};