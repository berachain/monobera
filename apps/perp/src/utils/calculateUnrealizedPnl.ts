import { type OpenTrade } from "@bera/proto/src";
import { getPnl } from "../hooks/useCalculatePnl";
import BigNumber from "bignumber.js";
import { OpenPositionData } from "~/types/market";

export const calculateUnrealizedPnl = (
  data: OpenPositionData,
  marketPrices: Record<string, string>,
) => {
  const openPositions = data?.result;
  const totalPositions = data?.pagination?.total_items ?? 0;
  if (totalPositions > 10) {
    return undefined;
  }

  if (!Array.isArray(openPositions) || openPositions.length === 0) {
    return "0";
  }

  const totalUnrealizedPnl = openPositions?.reduce(
    (acc: BigNumber, position: OpenTrade) => {
      const currentPrice = marketPrices[position?.pair_index ?? ""] ?? "0";
      if (currentPrice === "0") {
        return acc; // Skip this position if the current price is not available
      }

      const pnl = getPnl({
        currentPrice,
        openPosition: position,
        positionSize: position.position_size,
      });

      return acc.plus(pnl ?? 0);
    },
    BigNumber(0),
  );

  return totalUnrealizedPnl.isNaN() ? "0" : totalUnrealizedPnl.toString(10);
};
