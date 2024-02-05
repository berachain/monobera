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
      const tokenPrice = parseUnits(
        asset.reserveData.formattedPriceInMarketReferenceCurrency,
        baseCurrencyData?.marketReferenceCurrencyDecimals ?? 8,
      );
      asset.balance = data.availableBorrowsBase / tokenPrice;
      asset.formattedBalance = BigNumber(
        formatUnits(
          data.availableBorrowsBase,
          baseCurrencyData?.marketReferenceCurrencyDecimals ?? 8,
        ),
      )
        .dividedBy(asset.reserveData.formattedPriceInMarketReferenceCurrency)
        .toString();
    }
  });
  return (
    <>
      <div>
        <div className="text-2xl font-semibold leading-loose">Borrow Honey</div>
        <div className="text-sm leading-5 text-muted-foreground">
          HONEY that can be borrowed against your deposited collateral
        </div>
      </div>
      <HoneyBorrowCard honeyAsset={assets[0]} />
    </>
  );
}
