import BigNumber from "bignumber.js";
import { Address, PublicClient, formatUnits } from "viem";
import { honeyRouterAbi } from "~/abi";
import { BeraConfig } from "~/types/global";

export interface CollateralRates {
  mintFee: number;
  redeemFee: number;
}

export interface CollateralRatesMap {
  [key: Address]: CollateralRates;
}

export interface collateralRatesArgs {
  client: PublicClient;
  config: BeraConfig;
  collateralList: Address[];
}

/**
 * fetch the mint and redeem rate of all colleteral tokens
 */
export const getCollateralRates = async ({
  client,
  config,
  collateralList,
}: collateralRatesArgs): Promise<CollateralRatesMap | undefined> => {
  try {
    const calls: any[] = [];
    collateralList.forEach((collateral: Address) => {
      calls.push({
        address: config.contracts!.honeyRouterAddress,
        abi: honeyRouterAbi,
        functionName: "getMintRate",
        args: [collateral],
      });
      calls.push({
        address: config.contracts!.honeyRouterAddress,
        abi: honeyRouterAbi,
        functionName: "getRedeemRate",
        args: [collateral],
      });
    });

    const results = await client.multicall({
      contracts: calls,
      multicallAddress: config.contracts!.multicallAddress,
    });
    const obj: Record<Address, CollateralRates> = {};
    results.map((result: any, index: number) => {
      const collateral = collateralList[Math.floor(index / 2)] as Address;
      if (!obj[collateral]) obj[collateral] = { mintFee: 0, redeemFee: 0 };
      if (index % 2 === 0) {
        if (result.status === "success") {
          obj[collateral]!.mintFee = BigNumber(1)
            .minus(BigNumber(formatUnits(result.result, 18)))
            .toNumber();
        }
      } else {
        if (result.status === "success") {
          obj[collateral]!.redeemFee = BigNumber(1)
            .minus(BigNumber(formatUnits(result.result, 18)))
            .toNumber();
        }
      }
    });
    return obj;
  } catch (e) {
    console.log(e);
    return undefined;
  }
};
