import React from "react";
import HoneyBorrowCard from "~/components/honey-borrow-card";

export default function HoneyBorrow() {
  // const { useBaseCurrencyData } = usePollReservesDataList();
  // const { data: baseCurrencyData } = useBaseCurrencyData();
  // const { useReservesPrices } = usePollReservesPrices();
  // const { data: reservesPrices } = useReservesPrices();
  // const { useUserAccountData } = usePollUserAccountData();
  // const { data } = useUserAccountData();

  // if (reservesPrices && data && reservesPrices[honeyAddress]) {
  //   const tokenPrice = reservesPrices[honeyAddress].formattedPrice;
  //   const borrowBase = formatUnits(
  //     data.availableBorrowsBase,
  //     baseCurrencyData?.marketReferenceCurrencyDecimals ?? 8,
  //   );
  //   const formattedBalance = BigNumber(borrowBase)
  //     .div(tokenPrice)
  //     .times(0.99)
  //     .toFixed(18);
  //   honey.formattedBalance = formattedBalance;
  //   honey.balance = parseUnits(formattedBalance, 18);
  // }

  return (
    <>
      <div className="mt-4">
        <div className="text-2xl font-semibold leading-8">Borrow Honey</div>
        <div className="text-sm text-muted-foreground">
          HONEY that can be borrowed against your deposited collateral
        </div>
      </div>
      <HoneyBorrowCard />
    </>
  );
}
