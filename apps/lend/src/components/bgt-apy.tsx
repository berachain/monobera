"use client";

import {
  usePollBgtRewardsForAddress,
  usePollReservesDataList,
} from "@bera/berajs";
import { lendHoneyDebtTokenAddress } from "@bera/config";
import { Tooltip } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";

export default function BGTApy() {
  const { useReservesDataList } = usePollReservesDataList();
  const { data } = useReservesDataList();

  let displayBorrowed = 0;
  Object.keys(data ?? {}).forEach(
    (key) => (displayBorrowed += Number(data[key].totalDebt)),
  );

  const { useBgtApr } = usePollBgtRewardsForAddress({
    address: lendHoneyDebtTokenAddress,
  });
  const bgtApr = useBgtApr(displayBorrowed);

  return (
    <div className="flex h-12 w-fit items-center justify-center gap-2 rounded-full bg-accent bg-opacity-10 pr-4 text-xl font-semibold sm:text-3xl">
      <Icons.honey className="h-10 w-10" />
      <Icons.bgt className="-ml-7 h-10 w-10" />
      {(bgtApr ?? 0).toFixed(2)}% APY
      <Tooltip text="hi" size={8} />
    </div>
  );
}
