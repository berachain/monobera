import { useMemo, useState } from "react";
import BigNumber from "bignumber.js";

import { formatFromBaseUnit } from "~/utils/formatBigNumber";
import type { IMarketOrder } from "~/types/order-history";

interface ICalculatePnl {
  currentPrice: string | undefined;
  openPosition: IMarketOrder;
}

interface IPnl {
  openPosition: IMarketOrder;
  currentPrice: string | undefined;
}

export const useCalculatePnl = ({
  openPosition,
  currentPrice,
}: IPnl): string | undefined => {
  const [pnl, setPnl] = useState<BigNumber | undefined>(undefined);

  useMemo(() => {
    try {
      setPnl(
        getPnl({
          currentPrice,
          openPosition,
        }),
      );
    } catch (e) {
      setPnl(undefined);
    }
  }, [currentPrice, openPosition]);

  return pnl ? pnl.toString(10) : undefined;
};

export const getPnl = ({ currentPrice, openPosition }: ICalculatePnl) => {
  if (currentPrice && openPosition) {
    const collateral = BigNumber(openPosition.position_size);
    const formattedCollateral = formatFromBaseUnit(
      openPosition.position_size,
      18,
    );
    const openPrice = BigNumber(openPosition.open_price);
    const fees = BigNumber(openPosition.borrowing_fee)
      .plus(BigNumber(openPosition.rollover_fee))
      .plus(BigNumber(openPosition.funding_rate))
      .plus(BigNumber(openPosition.closing_fee));
    const leverage = BigNumber(openPosition.leverage);

    const pnl = openPrice
      .minus(BigNumber(currentPrice))
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
