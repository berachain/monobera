import { Address, erc20Abi } from "viem";

import { BeraConfig, Token } from "~/types";

export interface GetTokenInformation {
  address: Address;
  config: BeraConfig;
  publicClient: any;
}

export const getTokenInformation = async ({
  address,
  config,
  publicClient,
}: GetTokenInformation): Promise<Token | undefined> => {
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

    console.log("result", result);

    return {
      address,
      decimals: result[0].result,
      name: result[1].result,
      symbol: result[2].result,
    } as Token;
  } catch (e: any) {
    console.log(e);
    throw new Error("Error fetching token information");
  }
};
