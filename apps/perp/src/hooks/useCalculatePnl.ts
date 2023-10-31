import { useMemo, useState } from "react";
import { formatUnits } from "ethers";

export interface ICalculatePnl {
  currentPrice: bigint | undefined;
  openPrice: bigint;
  leverage: number;
  size: number;
  buy: boolean;
  fees: number;
}

export const useCalculatePnl = ({
  currentPrice,
  openPrice,
  leverage,
  size,
  buy,
  fees,
}: ICalculatePnl): number | undefined => {
  const [pnl, setPnl] = useState<number | undefined>(undefined);

  useMemo(() => {
    try {
      setPnl(
        getPnl({
          currentPrice,
          openPrice,
          leverage,
          size,
          buy,
          fees,
        }),
      );
    } catch (e) {
      setPnl(undefined);
    }
  }, [currentPrice, openPrice, fees, buy]);

  return pnl;
};

export const getPnl = ({
  currentPrice,
  openPrice,
  leverage,
  size,
  buy,
  fees,
}: ICalculatePnl) => {
  const formattedCurrentPrice = Number(formatUnits(currentPrice ?? 0n, 10));
  const formattedOpenPrice = Number(formatUnits(openPrice ?? 0n, 10));
  if (currentPrice) {
    if (buy) {
      const PnL =
        ((formattedCurrentPrice - formattedOpenPrice) * size) /
        formattedOpenPrice;
      return PnL * leverage - fees;
    } else {
      const PnL =
        ((formattedOpenPrice - formattedCurrentPrice) * size) /
        formattedOpenPrice;
      return PnL * leverage - fees;
    }
    return undefined;
  } else {
    return undefined;
  }
};
