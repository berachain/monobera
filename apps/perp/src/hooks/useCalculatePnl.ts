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
    const formattedCollateral = Number(
      formatUnits(BigInt(openPosition.position_size), 18),
    );

    const openPrice = BigInt(openPosition.open_price);
    const fees =
      BigInt(openPosition.borrowing_fee) +
      BigInt(openPosition.rollover_fee) +
      BigInt(openPosition.funding_rate) +
      BigInt(openPosition.closing_fee);
    const leverage = BigInt(openPosition.leverage);

    const pnl =
      ((openPrice - BigInt(currentPrice)) *
        (leverage * collateral) *
        (openPosition.buy === true ? -1n : 1n)) /
        openPrice -
      fees;

    const formattedPnl = Number(formatUnits(pnl, 18));

    const minPos = formattedCollateral;

    if (formattedPnl <= -minPos) {
      return -minPos;
    }

    return formattedPnl;
  }
  return undefined;
};
