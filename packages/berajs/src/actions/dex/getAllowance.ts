import { Address, PublicClient, erc20Abi, formatUnits } from "viem";

import { AllowanceToken, Token } from "~/types";

export interface GetAllowance {
  account: Address | undefined;
  token: Token | undefined;
  spender: Address;
  publicClient: PublicClient | undefined;
}

export type GetAllowanceResponse = AllowanceToken | undefined;

export const getAllowance = async ({
  account,
  token,
  spender,
  publicClient,
}: GetAllowance): Promise<GetAllowanceResponse> => {
  if (!publicClient) return undefined;
  if (account && token && spender && token.address) {
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
