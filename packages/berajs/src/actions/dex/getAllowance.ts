import { Address, PublicClient, erc20Abi, formatUnits } from "viem";

import { Token } from "../../types";

export interface IGetAllowanceRequest {
  account: Address | undefined;
  token: Token | undefined;
  contract: Address;
  publicClient: PublicClient | undefined;
}

export interface IGetAllowanceResponse {
  token: Token;
  allowance: bigint;
  formattedAllowance: string;
}

/**
 * fetch the allowance of a given token
 */

export const getAllowance = async ({
  account,
  token,
  contract,
  publicClient,
}: IGetAllowanceRequest): Promise<IGetAllowanceResponse | undefined> => {
  if (!publicClient) return undefined;
  if (account && token) {
    const allowance = await publicClient.readContract({
      address: token.address,
      abi: erc20Abi,
      functionName: "allowance",
      args: [account, contract],
    });

    return {
      token: token,
      allowance: allowance,
      formattedAllowance: formatUnits(allowance, token.decimals),
    };
  }

  return undefined;
};
