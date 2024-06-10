import { Address, PublicClient, erc20Abi, formatEther } from "viem";

export interface GetTokenTotalSupply {
  token: Address;
  publicClient: PublicClient | undefined;
}

export const getTokenTotalSupply = async ({
  token,
  publicClient,
}: GetTokenTotalSupply): Promise<string> => {
  if (!publicClient) throw new Error("Missing public client");
  if (!token) throw new Error("Missing token address");
  try {
    const result = await publicClient.readContract({
      address: token,
      abi: erc20Abi,
      functionName: "totalSupply",
      args: [],
    });
    return formatEther(result ?? 0n);
  } catch (error) {
    console.log(error);
    return "0";
  }
};
