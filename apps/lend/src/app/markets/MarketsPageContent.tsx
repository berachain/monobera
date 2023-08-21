"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Dropdown, HoneyBanner, RT, SearchInput } from "@bera/shared-ui";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { Button } from "@bera/ui/button";
import { Switch } from "@bera/ui/switch";

import StatusBanner from "~/components/status-banner";
import TokenCard from "~/components/token-card";
import { useMarkets, type Market } from "~/hooks/useMarkets";
import { market_table_columns } from "./market-table-column";

export default function MarketsPageContent() {
  const [tableView, setUseTableView] = React.useState(false);
  const markets = useMarkets();
  const sortOptions = ["Deposit-APY", "Total-Borrows", "Systems"];
  const [sortBy, setSortBy] = React.useState<string>(sortOptions[2]!);
  const router = useRouter();
  const ref = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (tableView && window.innerWidth < 1024) {
        setUseTableView(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [tableView]);

  const marketData = React.useMemo(
    () =>
      markets.map((market) => ({
        market: (
          <div className="flex w-[130px] items-center gap-2 text-sm font-medium leading-none">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="font-bold">
                {market.title}
              </AvatarFallback>
            </Avatar>
            {market.title}
          </div>
        ),
        total_supplied: (
          <div className="flex w-[156px] flex-col pl-1">
            <div className="font-base text-base font-medium">
              {market.totalSupply}
            </div>
            <div className="text-xs font-medium leading-tight text-muted-foreground">
              $164.74 Million
            </div>
          </div>
        ),
        supply_apy: (
          <div className="w-[85px] text-base text-success-foreground">
            12.38%
          </div>
        ),
        total_borrowed: (
          <div className="flex w-[156px] flex-col pl-1 text-base">
            <div>{market.dailyBorrows}</div>
            <div className="text-xs font-medium leading-tight text-muted-foreground">
              $42,164.74
            </div>
          </div>
        ),
        borrow_apy_variable: (
          <div className="w-[138px] pl-4 text-base text-success-foreground">
            12.38%
          </div>
        ),
        borrow_apy_stable: (
          <div className="w-[138px] pl-4 text-base text-success-foreground">
            12.38%
          </div>
        ),
        details: (
          <Button
            variant={"outline"}
            onClick={() =>
              router.push(
                "/markets/address=0x20f33CE90A13a4b5E7697E3544c3083B8F8A51D4",
              )
            }
          >
            details{" "}
          </Button>
        ),
      })),
    [markets, sortBy],
  );

  return (
    <>
      <div className="mb-12">
        <HoneyBanner />
      </div>
      <div className="mb-12">
        <StatusBanner />
      </div>
      <div className="flex flex-row justify-between">
        <div>
          <h2 className="mb-2 text-5xl font-bold">All Markets</h2>
          <p className="text-muted-foreground">
            You must supply collateral in order to borrow funds.
          </p>
        </div>
        <div className="hidden items-center gap-4 lg:flex ">
          <p className="text-sm text-muted-foreground">Switch to table view</p>
          <Switch
            id="use-tableview"
            checked={tableView}
            onCheckedChange={(checked: boolean) => setUseTableView(checked)}
            ref={ref}
          />
        </div>
      </div>
      <div className="mt-6 flex justify-between gap-4">
        <div className="flex-1">
          <SearchInput placeholder="Search for BAAVE Markets..." />
        </div>
        <Dropdown
          selected={sortBy}
          selectionList={sortOptions}
          onSelect={setSortBy}
          className="hidden md:block"
        />
      </div>
      <div className="mt-6">
        {tableView ? (
          <RT columns={market_table_columns} data={marketData} />
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {markets.map((market: Market, index) => (
              <TokenCard market={market} key={index} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
