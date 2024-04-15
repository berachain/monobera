import { FormatReserveUSDResponse, formatReserves } from "@aave/math-utils";
import { Address, PublicClient } from "viem";

import { lendUIDataProviderABI } from "~/config";
import { getReservesHumanized } from "~/utils";

export interface ReserveData extends FormatReserveUSDResponse {
  aTokenAddress: Address;
  variableDebtTokenAddress: Address;
}

export interface BaseCurrencyData {
  marketReferenceCurrencyDecimals: number;
  marketReferenceCurrencyPriceInUsd: string;
  networkBaseTokenPriceInUsd: string;
  networkBaseTokenPriceDecimals: number;
}

/**
 * Retrieves the user account data.
 * @param {PublicClient} client
 * @param {Address} uiDataProviderAddress ui data provider contract.
 * @param {Address} addressProviderAddress address provider contract.
 * @returns {UserAccountData | undefined}
 */
export const getReserveData = async ({
  client,
  uiDataProviderAddress,
  addressProviderAddress,
}: {
  client: PublicClient;
  uiDataProviderAddress: Address;
  addressProviderAddress: Address;
}): Promise<
  | {
      formattedReserves: ReserveData[];
      baseCurrencyData: BaseCurrencyData;
    }
  | undefined
> => {
  try {
    const result = (await client.readContract({
      address: uiDataProviderAddress,
      abi: lendUIDataProviderABI,
      functionName: "getReservesData",
      args: [addressProviderAddress],
    })) as [any[], any];

    const currentTimestamp = Math.floor(Date.now() / 1000);
    const { reservesData, baseCurrencyData } = getReservesHumanized(
      result[0],
      result[1],
    );

    const formattedReserves = formatReserves({
      reserves: reservesData,
      currentTimestamp,
      marketReferenceCurrencyDecimals:
        baseCurrencyData.marketReferenceCurrencyDecimals,
      marketReferencePriceInUsd:
        baseCurrencyData.marketReferenceCurrencyPriceInUsd,
    });
    return { formattedReserves, baseCurrencyData };
  } catch (e) {
    console.log("getReserveDataError:", e);
    return undefined;
  }
};
