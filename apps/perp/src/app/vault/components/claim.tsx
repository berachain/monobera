"use client";

import Image from "next/image";
import {
  formatter,
  usePollBgtRewardsForAddress,
  usePollHoneyVaultBalance,
} from "@bera/berajs";
import { cloudinaryUrl, gTokenContractAddress } from "@bera/config";
import { ApyTooltip, Tooltip } from "@bera/shared-ui";
import { Skeleton } from "@bera/ui/skeleton";

import { usePollFeesApr } from "~/hooks/usePollFeesApr";

export default function Claim() {
  const { isLoading: isFeesAprLoading, useFeesApr } = usePollFeesApr();
  let feeApr = useFeesApr();
  feeApr = feeApr ? Number(feeApr.slice(0, -1)) : 0;

  const {
    isLoading: isHoneyVaultBalanceLoading,
    useFormattedHoneyVaultBalance,
  } = usePollHoneyVaultBalance();

  const honeyLocked = useFormattedHoneyVaultBalance();

  const { isLoading: isBgtRewardsLoading, useBgtApr } =
    usePollBgtRewardsForAddress({
      address: gTokenContractAddress,
    });

  const bgtApr = useBgtApr(honeyLocked);

  return (
    <div className="relative w-full overflow-hidden rounded-md border border-border bg-[#FEFCE8] px-10 py-8 dark:bg-[#231D14]">
      <Image
        src={`${cloudinaryUrl}/BERPS/HoneyVaultBanner2_vhuynl`}
        alt="honey-jar"
        width={1080}
        height={186}
        className="absolute bottom-0 right-0 block h-[186px] object-cover"
      />
      <div className=" relative inline-flex h-[52px] w-fit items-center justify-center gap-1 rounded-md border border-warning-foreground bg-muted px-3 py-2">
        <div className="font-['IBM Plex Sans'] text-3xl font-semibold leading-9 text-warning-foreground">
          {isHoneyVaultBalanceLoading ||
          isBgtRewardsLoading ||
          isFeesAprLoading ? (
            <Skeleton className="h-[28px] w-[80px]" />
          ) : (
            <p>{formatter.format((bgtApr ?? 0) + feeApr)}%</p>
          )}
        </div>
      </div>
      <div className=" relative mt-4 w-full text-xs text-muted-foreground">
        APY{" "}
        <Tooltip text="Please note: If your accrued BGT Rewards are less than 0.01, your balance will be displayed as '< 0.01'." />
      </div>
    </div>
  );
}
