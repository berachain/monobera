import { useMemo, useState } from "react";
import { formatUnits } from "viem";

import { type IMarketOrder } from "~/app/berpetuals/components/order-history";

export interface ICalculatePnl {
  currentPrice: bigint | undefined;
  openPosition: IMarketOrder;
}

interface IPnl {
  currentPrice: bigint;
  openPosition: IMarketOrder;
}

export const useCalculatePnl = ({
  openPosition,
  currentPrice,
}: IPnl): number | undefined => {
  const [pnl, setPnl] = useState<number | undefined>(undefined);

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

  return pnl;
};

export const getPnl = ({ currentPrice, openPosition }: ICalculatePnl) => {
  if (currentPrice && openPosition) {
    const collateral = BigInt(openPosition.position_size);
    const openPrice = BigInt(openPosition.open_price);
    const fees =
      BigInt(openPosition.borrowing_fee) +
      BigInt(openPosition.rollover_fee) +
      BigInt(openPosition.funding_rate) +
      BigInt(openPosition.closing_fee);
    const leverage = BigInt(openPosition.leverage);

    const pnl =
      collateral +
      ((openPrice - BigInt(currentPrice)) *
        (leverage * collateral) *
        (openPosition.buy === true ? -1n : 1n)) /
        openPrice -
      fees;

    const formattedPnl = Number(formatUnits(pnl - collateral, 18));

    return formattedPnl;
  } else {
    return undefined;
  }
};
