import { useMemo, useState } from "react";
import { formatUnits } from "ethers";

export interface ICalculatePnl {
  currentPrice: bigint | undefined;
  openPrice: bigint;
  leverage: number;
  levPosSize: bigint;
  borrowingFee: bigint;
  rolloverFee: bigint;
  fundingFee: bigint;
  closingFee: bigint;
  buy: boolean;
}

export const useCalculatePnl = ({
  currentPrice,
  openPrice,
  leverage,
  levPosSize,
  borrowingFee,
  rolloverFee,
  fundingFee,
  closingFee,
  buy,
}: ICalculatePnl): number | undefined => {
  const [pnl, setPnl] = useState<number | undefined>(undefined);

  console.log({
    currentPrice,
    openPrice,
    leverage,
    levPosSize,
    borrowingFee,
    rolloverFee,
    fundingFee,
    closingFee,
    buy,
  });

  const maxPnlP = 900;

  const formattedCurrentPrice = Number(formatUnits(currentPrice ?? 0n, 10));
  const formattedOpenPrice = Number(formatUnits(openPrice ?? 0n, 10));
  const formattedLevPosSize = Number(formatUnits(levPosSize ?? 0n, 18));
  const formattedBorrowingFee = Number(formatUnits(borrowingFee ?? 0n, 18));
  const formattedRolloverFee = Number(formatUnits(rolloverFee ?? 0n, 18));
  const formattedFundingFee = Number(formatUnits(fundingFee ?? 0n, 18));
  const formattedClosingFee = Number(formatUnits(closingFee ?? 0n, 18));

  console.log({
    formattedCurrentPrice,
    formattedOpenPrice,
    formattedLevPosSize,
    formattedBorrowingFee,
    formattedRolloverFee,
    formattedFundingFee,
    formattedClosingFee,
  });

  useMemo(() => {
    try {
      if (currentPrice) {
        let percentProfit = 0;

        if (buy) {
          percentProfit =
            ((formattedCurrentPrice - formattedOpenPrice) * 100 * leverage) /
            formattedOpenPrice;
        } else {
          percentProfit =
            ((formattedOpenPrice - formattedCurrentPrice) * 100 * leverage) /
            formattedOpenPrice;
        }
        percentProfit = percentProfit > maxPnlP ? maxPnlP : percentProfit;

        const currentDaiPos = formattedLevPosSize / leverage;
        const netProfitP =
          percentProfit - (formattedBorrowingFee * 100) / currentDaiPos;

        let netPnL =
          currentDaiPos +
          (currentDaiPos * netProfitP) / 100 -
          formattedRolloverFee -
          formattedFundingFee;

        if (netPnL <= (currentDaiPos * (100 - 90)) / 100) {
          return 0;
        }

        netPnL -= formattedClosingFee;
        const formattedPnl = netPnL;
        setPnl(formattedPnl);
        return;
      } else {
        setPnl(undefined);
      }
    } catch (e) {
      console.log(e);
      setPnl(undefined);
    }
  }, [currentPrice, openPrice]);

  return pnl;
};
