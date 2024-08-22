"use client";

import { type GlobalParams } from "@bera/proto/src";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";

import { CustomizeInput } from "../berpetuals/components/customize-input";
import { LeverageSlider } from "../berpetuals/components/leverage-slider";
import { LongShortTab } from "../berpetuals/components/long-short-tab";

export function LandingCard1({ params }: { params: GlobalParams }) {
  return (
    <div className="w-[268px] overflow-hidden rounded-xl bg-background shadow-light-shadow dark:shadow-dark-shadow">
      <LongShortTab />
      <div className="w-full px-4 py-6">
        <Tabs defaultValue={"market"} className="mb-4">
          <TabsList variant="outline" className="w-full rounded-sm">
            <TabsTrigger
              value={"market"}
              key={"market"}
              variant="outline"
              className="w-full rounded-l-sm"
            >
              Market
            </TabsTrigger>
            <TabsTrigger
              value={"limit"}
              key={"limit"}
              variant="outline"
              className="w-full rounded-r-sm"
            >
              Limit
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex flex-col gap-2">
          <CustomizeInput
            title="Amount"
            subTitle={
              <div className="flex items-center gap-1">
                Balance: 420.69
                <div className="cursor-pointer rounded bg-secondary px-1 py-[2px] text-[10px] text-secondary-foreground hover:bg-background">
                  MAX
                </div>
              </div>
            }
            endAdornment={
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                {" "}
                <Avatar className="h-5 w-5">
                  <AvatarImage
                    src={
                      "https://raw.githubusercontent.com/berachain/default-token-list/main/src/assets/honey.png"
                    }
                    className="rounded-full"
                  />
                  <AvatarFallback>honey</AvatarFallback>
                </Avatar>{" "}
                HONEY
              </div>
            }
          />
          <CustomizeInput
            title="Quantity"
            subTitle={`Leverage: ${10.0}x`}
            endAdornment={
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                {" "}
                <Avatar className="h-5 w-5">
                  <AvatarImage
                    src={
                      "https://raw.githubusercontent.com/berachain/default-token-list/main/src/assets/honey.png"
                    }
                    className="rounded-full"
                  />
                  <AvatarFallback>BTC</AvatarFallback>
                </Avatar>{" "}
                HONEY
              </div>
            }
          />
        </div>
        <LeverageSlider
          maxLeverage={Number(params.max_leverage ?? "100")}
          defaultValue={80}
        />
      </div>
    </div>
  );
}
