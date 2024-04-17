import { PublicClient, erc20Abi, formatUnits } from "viem";

import { Token } from "../../types";

interface IGetAllowanceResponse {
  token: Token;
  allowance: bigint;
  formattedAllowance: string;
}

/**
 * fetch the current bera balance of a given address
 */

export const getAllowance = async ({
  account,
  token,
  contract,
  publicClient,
}: {
  account: `0x${string}` | undefined;
  token: Token | undefined;
  contract: string;
  publicClient: PublicClient | undefined;
}): Promise<IGetAllowanceResponse | undefined> => {
  if (!publicClient) return undefined;
  if (account && token) {
    const allowance = await publicClient.readContract({
      address: token.address as `0x${string}`,
      abi: erc20Abi,
      functionName: "allowance",
      args: [account, contract as `0x${string}`],
    });

    return {
      token: token,
      allowance: allowance,
      formattedAllowance: formatUnits(allowance, token.decimals),
    };
  }

  return undefined;
};
