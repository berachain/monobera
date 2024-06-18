"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { formatter, useBgtApy, usePollHoneyVaultBalance } from "@bera/berajs";
import { bhoneyVaultContractAddress, cloudinaryUrl } from "@bera/config";
import { FormattedNumber, Tooltip, WobbleCard } from "@bera/shared-ui";
import { Skeleton } from "@bera/ui/skeleton";

import { usePollFeesApr } from "~/hooks/usePollFeesApr";

export default function Claim() {
  const { isLoading: isFeesAprLoading, useFeesApr } = usePollFeesApr();
  const [init, setInit] = useState(false);
  let feeApr = useFeesApr();
  feeApr = feeApr ? Number(feeApr.slice(0, -1)) : 0;

  const {
    isLoading: isHoneyVaultBalanceLoading,
    useFormattedHoneyVaultBalance,
  } = usePollHoneyVaultBalance();

  const honeyLocked = useFormattedHoneyVaultBalance();

  const { isLoading: isBgtAprLoading, data: bgtApr } = useBgtApy(
    {
      receiptTokenAddress: bhoneyVaultContractAddress,
      tvlInHoney: honeyLocked,
    },
    { opts: { keepPreviousData: true } },
  );

  useEffect(() => {
    if (!init && isBgtAprLoading === false) {
      setInit(true);
    }
  }, [init, bgtApr, honeyLocked]);

  return (
    <div className="relative w-full overflow-hidden rounded-md border border-border bg-[#FEFCE8] px-0 py-0  dark:bg-[#231D14]">
      <Image
        src={`${cloudinaryUrl}/BERPS/vault_banner_dark_bg`}
        alt="honey-jar-dark"
        fill={true}
        className="hidden h-auto w-full object-cover object-right dark:block"
      />
      <Image
        src={`${cloudinaryUrl}/BERPS/vault_banner_light_bg`}
        alt="honey-jar-light"
        fill={true}
        className="h-auto w-full object-cover object-right dark:hidden"
      />
      <WobbleCard
        className=""
        containerClassName="bg-transparent w-full z-2 h-full absolute"
      >
        <Image
          src={`${cloudinaryUrl}/BERPS/vault_banner_bear_final`}
          alt="honey-jar-dark"
          fill={true}
          className="h-auto w-full object-cover object-right"
        />
      </WobbleCard>
      <div className=" relative inline-flex h-[52px] w-fit items-center justify-center gap-1 rounded-md border border-warning-foreground bg-muted px-3 py-2 mt-8 ml-10 ">
        <div className="font-['IBM Plex Sans'] text-3xl font-semibold leading-9 text-warning-foreground">
          {isHoneyVaultBalanceLoading || isFeesAprLoading || !init ? (
            <Skeleton className="h-[28px] w-[80px]" />
          ) : (
            <FormattedNumber
              value={parseFloat(bgtApr ?? "0") + parseFloat(feeApr)}
              percent
              compact
              showIsSmallerThanMin
            />
          )}
        </div>
      </div>
      <div className="relative mt-4 w-fit rounded-md border border-border bg-muted px-3 py-1 text-sm text-muted-foreground ml-10 mb-8">
        APY
        <Tooltip
          text={
            <>
              APY (Annual Percentage Yield) is calculated based on the fees and
              rewards <br />
              generated by this vault over the last 24 hours. The APY displayed
              is <br />
              algorithmic and subject to change.
            </>
          }
          className="mb-1 ml-1"
        />
      </div>
    </div>
  );
}
