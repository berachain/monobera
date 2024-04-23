import { Address, PublicClient, erc20Abi, formatUnits } from "viem";

import { AllowanceToken, Token } from "~/types";

export interface IGetAllowanceRequest {
  account: Address | undefined;
  token: Token | undefined;
  spender: Address;
  publicClient: PublicClient | undefined;
}

/**
 * fetch the allowance of a given token
 */

export const getAllowance = async ({
  account,
  token,
  spender,
  publicClient,
}: IGetAllowanceRequest): Promise<AllowanceToken | undefined> => {
  if (!publicClient) return undefined;
  if (account && token) {
    const allowance = await publicClient.readContract({
      address: token.address,
      abi: erc20Abi,
      functionName: "allowance",
      args: [account, spender],
    });

    return {
      ...token,
      allowance: allowance,
      formattedAllowance: formatUnits(allowance, token.decimals),
    };
  }

  return undefined;
};
