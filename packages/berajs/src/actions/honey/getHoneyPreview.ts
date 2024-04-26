import { Address, PublicClient, formatUnits, parseUnits } from "viem";

import { honeyRouterAbi } from "~/abi";
import { BeraConfig, Token } from "~/types";

export enum HoneyPreviewMethod {
  Mint = "previewMint",
  RequiredCollateral = "previewRequiredCollateral",
  Redeem = "previewRedeem",
  HoneyToRedeem = "previewHoneyToRedeem",
}

export interface HoneyPreviewArgs {
  client: PublicClient;
  config: BeraConfig;
  collateral: Token;
  amount: string;
  method: HoneyPreviewMethod;
}

/**
 * fetch the mint and redeem rate of all colleteral tokens
 */
export const getHoneyPreview = async ({
  client,
  config,
  collateral,
  amount,
  method,
}: HoneyPreviewArgs): Promise<string | undefined> => {
  try {
    if (!config.contracts?.honeyRouterAddress)
      throw new Error("missing contract address honeyRouterAddress");

    let formattedAmount = 0n;
    if (
      method === HoneyPreviewMethod.Mint ||
      method === HoneyPreviewMethod.HoneyToRedeem
    ) {
      formattedAmount = parseUnits(amount, collateral.decimals);
    } else {
      formattedAmount = parseUnits(amount, 18); //honey decimals
    }

    const result = (await client.readContract({
      address: config.contracts.honeyRouterAddress as Address,
      abi: honeyRouterAbi,
      functionName: method,
      args: [collateral.address, formattedAmount],
    })) as bigint;

    let formattedResult = "0";
    if (
      method === HoneyPreviewMethod.Mint ||
      method === HoneyPreviewMethod.HoneyToRedeem
    ) {
      formattedResult = formatUnits(result, 18); //honey decimals
    } else {
      formattedResult = formatUnits(result, collateral.decimals);
    }
    return formattedResult;
  } catch (e) {
    console.log("error", e);
    return undefined;
  }
};
