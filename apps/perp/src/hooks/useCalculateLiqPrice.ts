import { useMemo, useState } from "react";
import BigNumber from "bignumber.js";

import { formatFromBaseUnit } from "~/utils/formatBigNumber";

export interface ICalculateLiqPrice {
  bfLong: string | undefined;
  bfShort: string | undefined;
  orderType: string | undefined;
  price: string | undefined;
  leverage: string | undefined;
}

export const useCalculateLiqPrice = ({
  bfLong,
  bfShort,
  orderType,
  price,
  leverage,
}: ICalculateLiqPrice): string | undefined => {
  const [liqPrice, setLiqPrice] = useState<string | undefined>(undefined);

  useMemo(() => {
    try {
      const formattedBorrowingL = formatFromBaseUnit(bfLong, 18);
      const formattedBorrowingS = formatFromBaseUnit(bfShort, 18);
      const long = orderType === "long";
      const openPrice = formatFromBaseUnit(price ?? "0", 10);

      const liqPriceDistance = openPrice
        .times(
          BigNumber(90)
            .minus(long ? formattedBorrowingL : formattedBorrowingS)
            .div(100),
        )
        .div(BigNumber(leverage ?? 2));

      const calculatedLiqPrice = long
        ? openPrice.minus(liqPriceDistance)
        : openPrice.plus(liqPriceDistance);

      const finalLiqPrice = calculatedLiqPrice.isGreaterThan(BigNumber(0))
        ? calculatedLiqPrice.toString(10)
        : "0";
      setLiqPrice(finalLiqPrice);
    } catch (e) {
      console.log(e);
      setLiqPrice(undefined);
    }
  }, [bfLong, bfShort, orderType, price, leverage]);

  return liqPrice;
};
