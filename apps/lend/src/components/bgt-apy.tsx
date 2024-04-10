"use client";

import {
  usePollBgtRewardsForAddress,
  usePollReservesDataList,
} from "@bera/berajs";
import {
  bgtTokenAddress,
  honeyTokenAddress,
  lendHoneyDebtTokenAddress,
} from "@bera/config";
import { FormattedNumber, TokenIcon, Tooltip } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";

export default function BGTApy() {
  const { useSelectedReserveData, useTotalBorrowed } =
    usePollReservesDataList();
  const honey = useSelectedReserveData(honeyTokenAddress);
  const totalBorrowed = useTotalBorrowed();

  const { useBgtApr } = usePollBgtRewardsForAddress({
    address: lendHoneyDebtTokenAddress,
  });
  const bgtApr = useBgtApr(totalBorrowed) ?? 0; // is this apr or apy? i am confused
  const borrowApy = Number(honey?.variableBorrowAPY ?? "0");

  return (
    <div className="flex h-12 w-fit items-center justify-center gap-2 rounded-full bg-accent bg-opacity-10 pr-4 text-xl font-semibold sm:text-3xl">
      <Icons.honey className="h-10 w-10" />
      <Icons.bgt className="-ml-7 h-10 w-10" />
      <FormattedNumber value={bgtApr - borrowApy} percent /> APY
      <Tooltip
        size={8}
        text={<BGTAPYTooltip bgtApy={bgtApr ?? 0} borrowApy={borrowApy} />}
      />
    </div>
  );
}

export const BGTAPYTooltip = ({
  bgtApy,
  borrowApy,
}: {
  bgtApy: number;
  borrowApy: number;
}) => {
  return (
    <div className="w-[220px]">
      <div className="flex w-full justify-between leading-5">
        <div className="text-xs font-medium text-muted-foreground">
          Honey Borrow Rewards
        </div>
        <div className="flex items-center gap-1 text-xs font-medium text-foreground">
          <FormattedNumber value={bgtApy} percent />{" "}
          <Icons.bgt className="h-3 w-3" />
        </div>
      </div>

      <div className="mt-1 flex w-full justify-between leading-5">
        <div className="text-xs font-medium text-muted-foreground">
          Honey Borrow Apy
        </div>
        <div className="flex items-center gap-1 text-xs font-medium text-foreground">
          <FormattedNumber value={-borrowApy} percent />
        </div>
      </div>

      <hr className="mb-2 mt-3 border-t border-accent" />

      <div className="flex w-full justify-between leading-5 text-accent">
        <div className="text-xs font-medium">Boosted Borrow APY</div>
        <FormattedNumber
          value={bgtApy - borrowApy}
          percent
          className="text-xs font-medium"
        />
      </div>

      <div className="mt-2 text-xs font-normal text-muted-foreground">
        Boosted APY is calculated by subtracting the borrow rate and adding the
        BGT Reward rate.
      </div>
    </div>
  );
};
