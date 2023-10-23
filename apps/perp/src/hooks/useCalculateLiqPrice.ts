import { useMemo, useState } from "react";
import { formatUnits } from "viem";

export interface ICalculateLiqPrice {
  bfLong: number | undefined;
  bfShort: number | undefined;
  orderType: string | undefined;
  price: number | undefined;
  leverage: number | undefined;
}

export const useCalculateLiqPrice = ({
  bfLong,
  bfShort,
  orderType,
  price,
  leverage,
}: ICalculateLiqPrice): number | undefined => {
  const [liqPrice, setLiqPrice] = useState<number | undefined>(undefined);

  useMemo(() => {
    try {
      const formattedBorrowingL = Number(
        formatUnits(BigInt(bfLong ?? "0"), 18),
      );
      const formattedBorrowingS = Number(
        formatUnits(BigInt(bfShort ?? "0"), 18),
      );
      const long = orderType === "long";
      const openPrice = price ?? 0;

      const liqPriceDistance =
        (openPrice *
          ((90 - (long ? formattedBorrowingL : formattedBorrowingS)) / 100)) /
        (leverage ?? 2);

      const calculatedLiqPrice = long
        ? openPrice - liqPriceDistance
        : openPrice + liqPriceDistance;

      const finalLiqPrice =
        calculatedLiqPrice > 0 ? Math.floor(calculatedLiqPrice) : 0;

      setLiqPrice(finalLiqPrice);
    } catch (e) {
      console.log(e);
      setLiqPrice(undefined);
    }
  }, [bfLong, bfShort, orderType, price, leverage]);

  return liqPrice;
};
