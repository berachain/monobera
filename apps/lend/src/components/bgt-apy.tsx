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
import { TokenIcon, Tooltip } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";

export default function BGTApy() {
  const { useReservesDataList, useTotalBorrowed } = usePollReservesDataList();
  const { data } = useReservesDataList();
  const totalBorrowed = useTotalBorrowed();

  const { useBgtApr } = usePollBgtRewardsForAddress({
    address: lendHoneyDebtTokenAddress,
  });
  const bgtApr = useBgtApr(totalBorrowed) ?? 0; // is this apr or apy? i am confused
  const borrowApy =
    Number(data?.[honeyTokenAddress]?.variableBorrowAPY ?? "0") * 100;

  return (
    <div className="flex h-12 w-fit items-center justify-center gap-2 rounded-full bg-accent bg-opacity-10 pr-4 text-xl font-semibold sm:text-3xl">
      <Icons.honey className="h-10 w-10" />
      <Icons.bgt className="-ml-7 h-10 w-10" />
      {(bgtApr - borrowApy).toFixed(2)}% APY
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
          {bgtApy.toFixed(2)}%{" "}
          <TokenIcon address={bgtTokenAddress} size={"sm"} />
        </div>
      </div>

      <div className="mt-1 flex w-full justify-between leading-5">
        <div className="text-xs font-medium text-muted-foreground">
          Honey Borrow Apy
        </div>
        <div className="flex items-center gap-1 text-xs font-medium text-foreground">
          -{borrowApy.toFixed(2)}%
        </div>
      </div>

      <hr className="mb-2 mt-3 border-t border-accent" />

      <div className="flex w-full justify-between leading-5 text-accent">
        <div className="text-xs font-medium">Boosted Borrow APY</div>
        <div className="flex items-center gap-1 text-xs font-medium">
          {(bgtApy - borrowApy).toFixed(2)}%
        </div>
      </div>

      <div className="text-xs text-muted-foreground font-normal mt-2">
        Boosted APY is calculated by subtracting the borrow rate and adding the
        BGT Reward rate.
      </div>
    </div>
  );
};
