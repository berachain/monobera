import { useMemo, useState } from "react";

export interface ICalculateLiqPrice {
  bfLong: string | undefined;
  bfShort: string | undefined;
  orderType: string | undefined;
  price: number | undefined;
  leverage: string | undefined;
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
      const formattedBorrowingL = Number(bfLong);
      const formattedBorrowingS = Number(bfShort);
      const long = orderType === "long";
      const openPrice = price ?? 0;

      const liqPriceDistance =
        (openPrice *
          ((90 - (long ? formattedBorrowingL : formattedBorrowingS)) / 100)) /
        (Number(leverage) ?? 2);

      const calculatedLiqPrice = long
        ? openPrice - liqPriceDistance
        : openPrice + liqPriceDistance;

      const finalLiqPrice =
        calculatedLiqPrice > 0 ? Math.floor(calculatedLiqPrice * 100) / 100 : 0;

      setLiqPrice(finalLiqPrice);
    } catch (e) {
      console.log(e);
      setLiqPrice(undefined);
    }
  }, [bfLong, bfShort, orderType, price, leverage]);

  return liqPrice;
};
