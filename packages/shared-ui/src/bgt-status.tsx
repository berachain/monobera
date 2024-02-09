"use client";

import React from "react";
import {
  formatter,
  usePollBgtBalance,
  usePollDelegatorUnbonding,
  usePollTotalDelegated,
  // usePollUserAllBGTRewards,
  useTokenHoneyPrice,
} from "@bera/berajs";
import { beraTokenAddress } from "@bera/config";
// import { beraTokenAddress, dexUrl, lendUrl, perpsUrl } from "@bera/config";
import { cn } from "@bera/ui";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@bera/ui/accordion";
// import { Button } from "@bera/ui/button";
// import { Icons } from "@bera/ui/icons";
import { Popover, PopoverContent, PopoverTrigger } from "@bera/ui/popover";
import { Skeleton } from "@bera/ui/skeleton";

// import { formatEther } from "viem";

import { BGTIcon } from "./bgt-icon";

export function BGTStatusBtn() {
  const [openPopover, setOpenPopover] = React.useState(false);
  const { useBgtBalance } = usePollBgtBalance();
  const userBalance = useBgtBalance();
  const { useTotalDelegatorDelegated } = usePollTotalDelegated();
  const bgtTotalDelegated = useTotalDelegatorDelegated();
  const { useDelegatorTotalUnbonding } = usePollDelegatorUnbonding();
  const totalUnbonding = useDelegatorTotalUnbonding();
  // const { data: bgtRewards, isLoading } = usePollUserAllBGTRewards();

  const totalBGT =
    Number(userBalance) +
    Number(bgtTotalDelegated ?? "0") +
    Number(totalUnbonding ?? "0");

  // @ts-ignore
  // const totalClaimableBGT: bigint =
  // isLoading || !bgtRewards || bgtRewards.length !== 3
  //   ? 0n //@ts-ignore
  //   : (bgtRewards[0] ?? 0n) + (bgtRewards[1] ?? 0n) + (bgtRewards[2] ?? 0n);

  return (
    <div className="hidden sm:block">
      <Popover open={openPopover} onOpenChange={setOpenPopover}>
        <PopoverTrigger asChild>
          <div className="group flex h-10 w-fit cursor-pointer items-center rounded-md border border-accent bg-warning px-1 font-medium hover:bg-hover">
            {/* <BGTIcon bg="#FBBF24" stroke="#78350F" size="24" /> */}
            <div className="px-2 text-sm text-warning-foreground">
              {formatter.format(totalBGT)} BGT
            </div>
            {/* <div className="flex h-7 items-center rounded-full border border-accent bg-gradient-to-br from-stone-50 to-yellow-50 px-3 text-xs text-primary group-hover:from-orange-200 group-hover:to-yellow-400 dark:from-stone-700 dark:to-yellow-950 group-hover:dark:from-lime-900 group-hover:dark:to-yellow-700 lg:hidden xl:flex">
              {/* @ts-ignore */}
            {/* {formatter.format(formatEther(totalClaimableBGT))} Claimable */}
            {/* </div> */}
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="flex h-fit w-[324px] flex-col gap-4 rounded-md p-4"
          align="end"
        >
          <div className={"flex flex-col gap-1 py-2 text-center"}>
            <div className="text-sm font-medium leading-6 text-muted-foreground">
              Total Balance
            </div>
            <TotalBGT />
          </div>
          <BGTStatusDetails />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function TotalBGT({ className }: { className?: string }) {
  const { useBgtBalance } = usePollBgtBalance();
  const userBalance = useBgtBalance();
  const { useTotalDelegatorDelegated } = usePollTotalDelegated();
  const bgtTotalDelegated = useTotalDelegatorDelegated();
  const { useDelegatorTotalUnbonding } = usePollDelegatorUnbonding();
  const totalUnbonding = useDelegatorTotalUnbonding();

  const totalBGT =
    Number(userBalance) +
    Number(bgtTotalDelegated ?? "0") +
    Number(totalUnbonding ?? "0");

  return (
    <div className={cn("text-3xl font-semibold leading-9", className)}>
      {totalBGT.toFixed(2)} BGT
    </div>
  );
}

export function BGTStatusDetails() {
  const { data: price } = useTokenHoneyPrice(beraTokenAddress);
  const { useBgtBalance } = usePollBgtBalance();
  const userBalance = useBgtBalance();
  const { useTotalDelegatorDelegated } = usePollTotalDelegated();
  const bgtTotalDelegated = useTotalDelegatorDelegated();
  const { useDelegatorTotalUnbonding } = usePollDelegatorUnbonding();
  const totalUnbonding = useDelegatorTotalUnbonding();
  // const { data: bgtRewards, isLoading } = usePollUserAllBGTRewards();

  // const totalClaimableBGT: bigint = //@ts-ignore
  //   isLoading || !bgtRewards || bgtRewards.length !== 3
  //     ? 0n //@ts-ignore
  //     : (bgtRewards[0] ?? 0n) + (bgtRewards[1] ?? 0n) + (bgtRewards[2] ?? 0n);

  const data = [
    {
      background: "#FBBF24",
      stroke: "#78350F",
      text: "Available",
      amoumt: userBalance,
    },
    {
      background: "#DBDBDB",
      stroke: "#4B4B4B",
      text: "Staked on BGT Station",
      amoumt: bgtTotalDelegated ?? 0,
    },
    {
      background: "#FFD3B2",
      stroke: "#94003F",
      text: "In Unbonding Queue",
      amoumt: totalUnbonding ?? 0,
    },
    // {
    //   background: "#EFF199",
    //   stroke: "#526E02",
    //   text: "Claimable Rewards", //@ts-ignore
    //   amoumt: Number(formatEther(totalClaimableBGT)),
    // },
  ];
  return (
    <>
      <div>
        {data.map((item, index) => (
          <div
            className="flex items-center justify-between gap-5 border-t border-border py-2"
            key={index}
          >
            <div className="flex items-center gap-4">
              <BGTIcon bg={item.background} stroke={item.stroke} size="32" />
              <div className="font-medium">
                <div className="flex-1 text-sm font-medium leading-6">
                  {formatter.format(item.amoumt)} BGT
                </div>
                <div className="text-xs font-medium leading-5 text-muted-foreground">
                  {item.text}
                </div>
              </div>
            </div>
            <div className="whitespace-nowrap text-sm font-medium">
              {userBalance && price ? (
                `$${formatter.format(Number(item.amoumt) * Number(price))}`
              ) : (
                <Skeleton className="h-8 w-16" />
              )}
            </div>
          </div>
        ))}
        {/* <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionContent>
              <div className="flex w-full">
                <div className="flex w-8 justify-center text-border">
                  <svg
                    width="6"
                    height="80"
                    viewBox="0 0 6 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.000162492 2.50012C0.000162553 1.11941 1.19407 0.000121889 2.66683 0.000121954C4.13959 0.000122018 5.3335 1.11941 5.3335 2.50012C5.3335 3.72062 4.40059 4.73684 3.16683 4.95625L3.16683 75.044C4.40059 75.2634 5.33349 76.2796 5.33349 77.5001C5.33349 78.8808 4.13959 80.0001 2.66683 80.0001C1.19407 80.0001 0.000159153 78.8808 0.000159214 77.5001C0.000159267 76.2796 0.933062 75.2634 2.16683 75.044L2.16683 4.95625C0.933065 4.73684 0.000162439 3.72062 0.000162492 2.50012Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className="flex w-full flex-col gap-1">
                  <div className="flex w-full justify-between">
                    <div className="flex items-center gap-2">
                      <Icons.bexFav className="h-4 w-4" />
                      BEX
                    </div>
                    <div className="flex items-center gap-1">
                      {" "}
                      {isLoading ? (
                        <Skeleton className="w-20" />
                      ) : (
                        <div className="font-medium">
                          {" "}
                          {!isLoading &&
                            formatter.format(
                              //@ts-ignore
                              bgtRewards !== undefined
                                ? formatEther((bgtRewards as bigint[])[0] ?? 0n)
                                : 0,
                            )}{" "}
                          BGT{" "}
                        </div>
                      )}
                      <Button
                        className="flex items-center gap-1 text-xs text-muted-foreground"
                        variant={"ghost"}
                        size="sm"
                        onClick={() => window.open(`${dexUrl}/rewards`)}
                      >
                        {" "}
                        Claim <Icons.externalLink className="block h-4 w-4" />{" "}
                      </Button>
                    </div>
                  </div>
                  <div className="flex w-full justify-between">
                    <div className="flex items-center gap-2">
                      <Icons.bendFav className="h-4 w-4" />
                      BEND
                    </div>
                    <div className="flex items-center gap-1">
                      {isLoading ? (
                        <Skeleton className="w-20" />
                      ) : (
                        <div className="font-medium">
                          {" "}
                          {!isLoading &&
                            formatter.format(
                              //@ts-ignore
                              bgtRewards !== undefined
                                ? formatEther((bgtRewards as bigint[])[1] ?? 0n)
                                : 0,
                            )}{" "}
                          BGT{" "}
                        </div>
                      )}
                      <Button
                        className="flex items-center gap-1 text-xs text-muted-foreground"
                        variant={"ghost"}
                        size="sm"
                        onClick={() => window.open(`${lendUrl}/dashboard`)}
                      >
                        {" "}
                        Claim <Icons.externalLink className="block h-4 w-4" />{" "}
                      </Button>
                    </div>
                  </div>
                  <div className="flex w-full justify-between">
                    <div className="flex items-center gap-2">
                      <Icons.berpsFav className="h-4 w-4" />
                      BERPS
                    </div>
                    <div className="flex items-center gap-1">
                      {" "}
                      {isLoading ? (
                        <Skeleton className="w-20" />
                      ) : (
                        <div className="font-medium">
                          {" "}
                          {!isLoading &&
                            formatter.format(
                              //@ts-ignore
                              bgtRewards !== undefined
                                ? formatEther((bgtRewards as bigint[])[2] ?? 0n)
                                : 0,
                            )}{" "}
                          BGT{" "}
                        </div>
                      )}
                      <Button
                        className="flex items-center gap-1 text-xs text-muted-foreground"
                        variant={"ghost"}
                        size="sm"
                        onClick={() => window.open(`${perpsUrl}/vault`)}
                      >
                        {" "}
                        Claim <Icons.externalLink className="block h-4 w-4" />{" "}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
            <AccordionTrigger
              disabled
              className="flex h-7 w-full cursor-pointer justify-center bg-muted text-foreground focus:outline-none      "
            >
              <Icons.chevronsDown className="block h-6 w-6 items-center" />
            </AccordionTrigger>
          </AccordionItem>
        </Accordion> */}
      </div>
    </>
  );
}
