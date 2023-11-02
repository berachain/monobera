import { useMemo, useState } from "react";
import { formatUnits } from "viem";

export interface ICalculatePnl {
  currentPrice: bigint | undefined;
  openPrice: bigint;
  leverage: number;
  size: number;
  buy: boolean;
  fees: number;
}

export const useCalculatePnl = ({
  buy,
  currentPrice,
  openPrice,
  leverage,
  levPosSize,
  borrowingFee,
  rolloverFee,
  fundingFee,
  closingFee,
}: IPnl): number | undefined => {
  const [pnl, setPnl] = useState<number | undefined>(undefined);

  useMemo(() => {
    try {
      const fees = borrowingFee + rolloverFee + fundingFee + closingFee;
      const posSize = Number(formatUnits(levPosSize ?? 0n, 18));
      const formattedOpenPrice = Number(formatUnits(openPrice ?? 0n, 10));

      const size = posSize / formattedOpenPrice;

      setPnl(
        getPnl({
          currentPrice,
          openPrice,
          leverage: Number(leverage),
          size,
          buy,
          fees: Number(formatUnits(fees, 18)),
        }),
      );
    } catch (e) {
      setPnl(undefined);
    }
  }, [currentPrice, openPrice, fundingFee, buy, currentPrice]);

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
  } else {
    return undefined;
  }
};

interface IPnl {
  buy: boolean;
  currentPrice: bigint;
  openPrice: bigint;
  leverage: bigint;
  levPosSize: bigint;
  borrowingFee: bigint;
  rolloverFee: bigint;
  fundingFee: bigint;
  closingFee: bigint;
}
// function calculateNetPnL({
//   buy,
//   currentPrice,
//   openPrice,
//   leverage,
//   levPosSize,
//   borrowingFee,
//   rolloverFee,
//   fundingFee,
//   closingFee,
// }: IPnl): number | undefined {
//   const PRECISION: bigint = 10n ** 18n;
//   const maxPnlP: bigint = 900n * PRECISION;

//   if (!currentPrice) {
//     return undefined;
//   }
//   let percentProfit: bigint =
//     ((buy
//       ? BigInt(currentPrice) - openPrice
//       : openPrice - BigInt(currentPrice)) *
//       100n *
//       PRECISION *
//       leverage) /
//     openPrice;
//   percentProfit = percentProfit > maxPnlP ? maxPnlP : percentProfit;

//   const currentDaiPos: bigint = levPosSize / (leverage * PRECISION);

//   const netProfitP: bigint =
//     percentProfit - (borrowingFee * 100n * PRECISION) / currentDaiPos;

//   const netPnL: bigint =
//     currentDaiPos +
//     (currentDaiPos * netProfitP) / (100n * PRECISION) -
//     rolloverFee -
//     fundingFee;

//   // if (netPnL <= (currentDaiPos * ((100n - 90n) / 100n)) || netPnL <= maxPnlP) {
//   //   return 0;
//   // }

//   const np = netPnL - closingFee;
//   return Number(formatUnits(np, 18));
// }
