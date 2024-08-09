"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@bera/ui/popover";
import { Button } from "@bera/ui/button";
import {
  useUserVaults,
  useClaimableFees,
  useSubgraphTokenInformation,
} from "@bera/berajs";
import { beraTokenAddress, bgtUrl } from "@bera/config";
import { Icons } from "@bera/ui/icons";
import { FormattedNumber } from "./formatted-number";
import Link from "next/link";

export function BGTStatusBtn() {
  const [openPopover, setOpenPopover] = React.useState(false);
  return (
    <div className="hidden sm:block">
      <Popover open={openPopover} onOpenChange={setOpenPopover}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className="w-[110px] flex flex-row text-sm line-clamp-1"
          >
            ✨ Rewards
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="flex h-fit w-[324px] flex-col gap-4 rounded-md p-4"
          align="end"
        >
          <BGTStatusDetails />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function BGTStatusDetails() {
  const { data: userVaultInfo, isLoading: isTotalBgtRewardsLoading } =
    useUserVaults();

  const { data: beraInfo } = useSubgraphTokenInformation({
    tokenAddress: beraTokenAddress,
  });
  const {
    data: claimableFees,
    isLoading: isClaimableFeesLoading,
    refresh,
  } = useClaimableFees();
  const [isDataReady, setIsDataReady] = useState(false);

  useEffect(() => {
    if (!isTotalBgtRewardsLoading && !isClaimableFeesLoading && !isDataReady) {
      setIsDataReady(true);
    }
  }, [isTotalBgtRewardsLoading, isClaimableFeesLoading]);

  const totalBgtRewardValue = useMemo(() => {
    if (!userVaultInfo?.totalBgtRewards || !beraInfo?.usdValue) return 0;
    return (
      parseFloat(userVaultInfo?.totalBgtRewards ?? "0") *
      parseFloat(beraInfo?.usdValue ?? "0")
    );
  }, [userVaultInfo, beraInfo]);

  console.log(totalBgtRewardValue + parseFloat(claimableFees ?? "0"));
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm font-semibold">Unclaimed Rewards</p>
        <FormattedNumber
          value={totalBgtRewardValue + parseFloat(claimableFees ?? "0")}
          className="text-sm font-medium text-muted-foreground"
          symbol="USD"
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="w-full justify-between flex flex-row items-center">
          <div className="flex flex-row items-center text-sm gap-2 font-medium">
            <Icons.bgt className="w-6 h-6" /> BGT
          </div>
          <div className="flex flex-col gap-0 items-end">
            <FormattedNumber
              className="text-sm font-medium"
              value={userVaultInfo?.totalBgtRewards ?? "0"}
              compact
            />
            <FormattedNumber
              className="text-xs font-medium text-muted-foreground"
              value={totalBgtRewardValue}
              symbol="USD"
              compact
            />
          </div>
        </div>
        <div className="w-full justify-between flex flex-row items-center">
          <div className="flex flex-row items-center text-sm gap-2 font-medium">
            <Icons.honey className="w-6 h-6" /> HONEY
          </div>
          <div className="flex flex-col gap-0 items-end">
            <FormattedNumber
              className="text-sm font-medium"
              value={claimableFees}
              compact
            />
            <FormattedNumber
              className="text-xs font-medium text-muted-foreground"
              value={claimableFees}
              symbol="USD"
              compact
            />
          </div>
        </div>
      </div>
      <Button className="w-full" disabled>
        Coming Soon
      </Button>
      <Link href={`${bgtUrl}/rewards`}>
        <Button className="w-full mt-[-8px]" variant={"ghost"}>
          View Breakdown
        </Button>
      </Link>
    </div>
  );
}
