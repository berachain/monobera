import { useMemo, useState } from "react";
import BigNumber from "bignumber.js";

import { formatFromBaseUnit, formatToBaseUnit } from "~/utils/formatBigNumber";
import type { IOpenTrade, IMarketOrder } from "~/types/order-history";
import { type OpenTrade } from "@bera/proto/src";

interface ICalculatePnl {
  currentPrice: string | undefined;
  openPosition: IOpenTrade | IMarketOrder | OpenTrade;
  positionSize: string;
}

interface IPnl {
  openPosition: IOpenTrade | IMarketOrder | OpenTrade;
  currentPrice: string | undefined;
  positionSize: string;
}

export const useCalculatePnl = ({
  openPosition,
  currentPrice,
  positionSize,
}: IPnl): string | undefined => {
  const [pnl, setPnl] = useState<BigNumber | undefined>(undefined);

  useMemo(() => {
    try {
      setPnl(
        getPnl({
          currentPrice,
          openPosition,
          positionSize,
        }),
      );
    } catch (e) {
      setPnl(undefined);
    }
  }, [currentPrice, openPosition]);

  return pnl ? pnl.toString(10) : undefined;
};

export const getPnl = ({
  currentPrice,
  openPosition,
  positionSize,
}: ICalculatePnl) => {
  if (currentPrice && openPosition) {
    const collateral = BigNumber(positionSize);
    const formattedCollateral = formatFromBaseUnit(positionSize, 18);
    const openPrice = BigNumber(openPosition.open_price || "0");
    const fees = BigNumber(openPosition.borrowing_fee || "0")
      .plus(BigNumber(openPosition.rollover_fee || "0"))
      .plus(BigNumber(openPosition.funding_fee || "0"))
      .plus(BigNumber(openPosition.closing_fee || "0"));
    const leverage = BigNumber(openPosition.leverage);

    const pnl = openPrice
      .minus(formatToBaseUnit(currentPrice, 10))
      .times(leverage.times(collateral))
      .times(openPosition.buy ? -1 : 1)
      .div(openPrice)
      .minus(fees);
    const formattedPnl = formatFromBaseUnit(pnl, 18);
    if (formattedPnl.lte(formattedCollateral.negated())) {
      return formattedCollateral.negated();
    }

    return formattedPnl;
  }
  return undefined;
};
