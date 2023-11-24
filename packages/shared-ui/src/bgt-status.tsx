"use client";

import React from "react";
import {
  formatter,
  usePollBgtBalance,
  usePollDelegatorUnbonding,
  usePollPrices,
  usePollTotalDelegated,
} from "@bera/berajs";
import { beraTokenAddress, bgtTokenAddress } from "@bera/config";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@bera/ui/popover";
import { Skeleton } from "@bera/ui/skeleton";

import { BGTIcon } from "./bgt-icon";
import { TokenIcon } from "./token-icon";

export function BGTStatusBtn() {
  const [openPopover, setOpenPopover] = React.useState(true);
  const [openModal, setOpenModal] = React.useState(false);

  const { usePrice } = usePollPrices();
  const { data: price } = usePrice(beraTokenAddress);
  const { useBgtBalance } = usePollBgtBalance();
  const userBalance = useBgtBalance();
  const { useTotalDelegatorDelegated } = usePollTotalDelegated();
  const total = useTotalDelegatorDelegated();
  const { useDelegatorTotalUnbonding } = usePollDelegatorUnbonding();
  const totalUnbonding = useDelegatorTotalUnbonding();

  return (
    <div>
      <div className="hidden sm:block">
        <Popover open={openPopover} onOpenChange={setOpenPopover}>
          <PopoverTrigger asChild>
            <div className="flex h-11 w-fit cursor-pointer items-center rounded-full border border-warning-foreground bg-warning px-2 font-medium">
              <div className="px-2 text-sm text-warning-foreground">
                12.80K BGT
              </div>
              <div className="flex h-7 items-center rounded-full bg-gradient-to-br from-amber-300 to-amber-400 px-3 text-xs">
                469.69 Claimable
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent
            className="flex h-fit w-[324px] flex-col gap-4 rounded-md p-4"
            align="end"
          >
            <Status />
          </PopoverContent>
        </Popover>
      </div>
      <div className="block sm:hidden">
        <div
          className="flex h-11 w-fit cursor-pointer items-center rounded-full border border-warning-foreground bg-warning px-2 font-medium"
          onClick={() => setOpenModal(true)}
        >
          <div className="px-2 text-sm text-warning-foreground">12.80K BGT</div>
          <div className="flex h-7 items-center rounded-full bg-gradient-to-br from-amber-300 to-amber-400 px-3 text-xs">
            469.69 Claimable
          </div>
        </div>
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogContent className="flex h-[80vh] max-h-[734px] min-h-[456px] flex-col gap-8 p-8 pt-16 ">
            <Status />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

function Status() {
  const { usePrice } = usePollPrices();
  const { data: price } = usePrice(beraTokenAddress);
  const { useBgtBalance } = usePollBgtBalance();
  const userBalance = useBgtBalance();
  const { useTotalDelegatorDelegated } = usePollTotalDelegated();
  const bgtTotalDelegated = useTotalDelegatorDelegated();
  const { useDelegatorTotalUnbonding } = usePollDelegatorUnbonding();
  const totalUnbonding = useDelegatorTotalUnbonding();

  const data = [
    {
      background: "#FBBF24",
      stroke: "#78350F",
      text: "Available",
      amoumt: userBalance,
    },
    {
      background: "#FBBF24",
      stroke: "#78350F",
      text: "Staked on BGT Station",
      amoumt: bgtTotalDelegated ?? 0,
    },
    {
      background: "#FBBF24",
      stroke: "#78350F",
      text: "In Unbonding Queue",
      amoumt: totalUnbonding ?? 0,
    },
    {
      background: "#FBBF24",
      stroke: "#78350F",
      text: "Claimable Rewards",
      amoumt: userBalance,
    },
  ];
  return (
    <>
      <div className="flex flex-col gap-1 py-2 text-center">
        <div className="text-sm font-medium leading-6 text-muted-foreground">
          Total Balance
        </div>
        <div className="text-3xl font-semibold leading-9">12800.69 BGT</div>
      </div>

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
                "$" + formatter.format(Number(item.amoumt) * Number(price))
              ) : (
                <Skeleton className="h-8 w-16" />
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
