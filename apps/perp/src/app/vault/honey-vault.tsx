"use client";

import Image from "next/image";
import {
  formatUsd,
  formatter,
  usePollBHoneySupply,
  usePollBgtRewardsForAddress,
  usePollHoneyVaultBalance,
} from "@bera/berajs";
import { cloudinaryUrl } from "@bera/config";
import { Skeleton } from "@bera/ui/skeleton";

export default function HoneyVault() {
  const {
    isLoading: isHoneyVaultBalanceLoading,
    useFormattedHoneyVaultBalance,
  } = usePollHoneyVaultBalance();

  const { isLoading: isBHoneySupplyLoading, useFormattedBHoneySupply } =
    usePollBHoneySupply();
  // const {isLoading: isBHoneyPriceLoading, useHoneyPrice} = usePollBHoneyPrice()

  const isLoading = isBHoneySupplyLoading || isHoneyVaultBalanceLoading;

  const honeyLocked = useFormattedHoneyVaultBalance();
  const bHoneySupply = useFormattedBHoneySupply();

  const { useBgtRewardsForAddress } = usePollBgtRewardsForAddress({
    address: process.env.NEXT_PUBLIC_GTOKEN_CONTRACT_ADDRESS,
  });

  const _ = useBgtRewardsForAddress();

  // console.log("bgt rewards", bgtRewards);

  const content = [
    {
      title: "Total value Locked",
      value: formatUsd(honeyLocked ?? 0),
      subtitle: "Worth of Honey",
    },
    {
      title: "bHONEY Price",
      value: "$1.69",
      subtitle: `bHONEY supply ${formatter.format(bHoneySupply)}`,
    },
    { title: "Vault APR%", value: "69,420%", subtitle: "In HONEY Yields" },
  ];
  return (
    <div className="relative w-full overflow-hidden rounded-md border border-border bg-gradient-to-r from-[#180B01] to-[#3B220F] p-8">
      <Image
        src={`${cloudinaryUrl}/BERPS/PRRBanner_hhx0kq`}
        alt="vault-bear"
        width={300}
        height={400}
        className=" absolute -bottom-[125px] -right-12 z-0"
      />
      <div className="mb-8 text-3xl font-semibold leading-9">
        🍯 Honey Vault
      </div>
      <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:gap-8">
        {content.map((item, index) => (
          <div key={index}>
            <div className=" text-xs font-medium leading-tight text-muted-foreground">
              {item.title}
            </div>
            <div className="mt-2 text-xl font-semibold leading-7">
              {isLoading ? <Skeleton className="h-[32px]" /> : item.value}
            </div>
            <div className="mt-1 text-xs leading-3 text-muted-foreground">
              {item.subtitle}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
