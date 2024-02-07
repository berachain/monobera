import React from "react";
import {
  usePollReservesDataList,
  usePollReservesPrices,
  usePollUserAccountData,
} from "@bera/berajs";
import BigNumber from "bignumber.js";
import { formatUnits, parseUnits } from "viem";

import HoneyBorrowCard from "~/components/honey-borrow-card";

export default function AvailableBorrows({ assets }: { assets: any[] }) {
  const { useBaseCurrencyData } = usePollReservesDataList();
  const { data: baseCurrencyData } = useBaseCurrencyData();
  const { useReservesPrices } = usePollReservesPrices();
  const { data: reservesPrices } = useReservesPrices();
  const { useUserAccountData } = usePollUserAccountData();
  const { data } = useUserAccountData();
  assets.forEach((asset) => {
    if (reservesPrices && data && reservesPrices[asset.address]) {
      const tokenPrice = reservesPrices[asset.address].formattedPrice;
      const borrowBase = formatUnits(
        data.availableBorrowsBase,
        baseCurrencyData?.marketReferenceCurrencyDecimals ?? 8,
      );
      const formattedBalance = BigNumber(borrowBase)
        .div(tokenPrice)
        .times(0.99)
        .toFixed(asset.decimals);
      asset.formattedBalance = formattedBalance;
      asset.balance = parseUnits(formattedBalance, asset.decimals);
    }
  });
  return (
    <>
      <div className="mt-4">
        <div className="text-2xl font-semibold leading-8">Borrow Honey</div>
        <div className="text-sm text-muted-foreground">
          HONEY that can be borrowed against your deposited collateral
        </div>
      </div>

      <HoneyBorrowCard honeyAsset={assets[0]} />
    </>
  );
}
