import { useMemo, useState } from "react";
import BigNumber from "bignumber.js";

import { formatFromBaseUnit } from "~/utils/formatBigNumber";

interface ICalculateLiqPrice {
  orderType: string | undefined;
  price: string | undefined;
  leverage: string | undefined;
}

export const useCalculateLiqPrice = ({
  orderType,
  price,
  leverage,
}: ICalculateLiqPrice): string | undefined => {
  const [liqPrice, setLiqPrice] = useState<string | undefined>(undefined);

  useMemo(() => {
    try {
      const long = orderType === "long";
      const openPrice = BigNumber(price ?? "0");

      const liqPriceDistance = openPrice
        .times(BigNumber(90).div(100))
        .div(BigNumber(leverage ?? 2));

      const calculatedLiqPrice = long
        ? openPrice.minus(liqPriceDistance)
        : openPrice.plus(liqPriceDistance);

      const finalLiqPrice = calculatedLiqPrice.isGreaterThan(BigNumber(0))
        ? calculatedLiqPrice.toString(10)
        : "0";
      setLiqPrice(finalLiqPrice);
    } catch (e) {
      setLiqPrice(undefined);
    }
  }, [orderType, price, leverage]);

  return liqPrice;
};
