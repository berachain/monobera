"use client";

import Image from "next/image";
import {
  formatter,
  usePollBgtRewardsForAddress,
  usePollHoneyVaultBalance,
} from "@bera/berajs";
import { cloudinaryUrl } from "@bera/config";
import { ApyTooltip } from "@bera/shared-ui";
import { Skeleton } from "@bera/ui/skeleton";
import type { Address } from "viem";

import { usePollFeesApr } from "~/hooks/usePollFeesApr";

export default function Claim() {
  const { isLoading: isFeesAprLoading, useFeesApr } = usePollFeesApr();
  let feeApr = useFeesApr();
  feeApr = feeApr ? Number(feeApr.slice(0, -1)) : 0;

  const {
    // isLoading: isHoneyVaultBalanceLoading,
    useFormattedHoneyVaultBalance,
  } = usePollHoneyVaultBalance();

  const honeyLocked = useFormattedHoneyVaultBalance();

  const {
    isLoading: isBgtRewardsLoading,
    useBgtApr,
    useBgtRewardsForAddress,
  } = usePollBgtRewardsForAddress({
    address: process.env.NEXT_PUBLIC_GTOKEN_CONTRACT_ADDRESS as Address,
  });

  const _ = useBgtRewardsForAddress();

  const bgtApr = useBgtApr(honeyLocked);

  const isLoading = false;
  return (
    <div className="relative w-full overflow-hidden rounded-md border border-border dark:bg-[#231D14] bg-[#FEFCE8] px-10 py-8">
      <div className=" relative z-10 inline-flex h-[52px] w-fit items-center justify-center gap-1 rounded-md border border-yellow-600 bg-stone-900 px-3 py-2">
        <div className="font-['IBM Plex Sans'] text-3xl font-semibold leading-9 text-yellow-600">
          {isLoading || isBgtRewardsLoading || isFeesAprLoading ? (
            <Skeleton className="h-[28px] w-[80px]" />
          ) : (
            <p>{formatter.format((bgtApr ?? 0) + feeApr)}%</p>
          )}
        </div>
      </div>
      <div className=" relative z-10 mt-4 w-full text-xs text-muted-foreground">
        APY <ApyTooltip />
      </div>
      <Image
        src={`${cloudinaryUrl}/BERPS/HoneyVaultBanner2_vhuynl`}
        alt="honey-jar"
        width={1080}
        height={186}
        className="absolute bottom-0 right-0 z-0 block h-[186px] object-cover"
      />
    </div>
  );
}
