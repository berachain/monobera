import { Address, erc20Abi } from "viem";

import { BeraConfig, Token } from "~/types";

export interface GetTokenInformation {
  address: Address;
  config: BeraConfig;
  publicClient: any;
}

export type GetTokenInformationResponse = Token | undefined;

export const getTokenInformation = async ({
  address,
  config,
  publicClient,
}: GetTokenInformation): Promise<GetTokenInformationResponse> => {
  try {
    if (!config.contracts?.multicallAddress) {
      throw new Error("Multicall address not found in config");
    }
    const result = await publicClient.multicall({
      contracts: [
        {
          address: address,
          abi: erc20Abi,
          functionName: "decimals",
        },
        {
          address: address,
          abi: erc20Abi,
          functionName: "name",
        },
        {
          address: address,
          abi: erc20Abi,
          functionName: "symbol",
        },
      ],
      multicallAddress: config.contracts?.multicallAddress,
    });
    const token = {
      address,
      decimals: result[0].result,
      name: result[1].result,
      symbol: result[2].result,
    };
    if (
      typeof token.decimals !== "number" ||
      typeof token.name !== "string" ||
      typeof token.symbol !== "string"
    )
      throw new Error("Invalid ERC20 token");
    return token as Token;
  } catch (e: any) {
    console.log(e);
    throw new Error("Error fetching token information");
  }
};
