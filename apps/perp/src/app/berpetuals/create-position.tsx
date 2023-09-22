"use client";

import { useState } from "react";
import { formatUsd } from "@bera/berajs";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";

import { CustomizeInput } from "./components/customize-input";
import { LeverageSlider } from "./components/leverage-slider";
import { LongShortTab } from "./components/long-short-tab";
import { PlaceOrder } from "./components/place-order";
import { TPSL } from "./components/tpsl";
import { type OrderType } from "./type";

export default function CreatePosition() {
  const [form, setForm] = useState<OrderType>({
    assets: "BTC",
    orderType: "long",
    optionType: "market",
    amount: undefined,
    quantity: undefined,
    price: undefined,
    leverage: 0,
    tp: undefined,
    sl: undefined,
  });

  return (
    <div className="w-full flex-shrink-0 pb-10 lg:w-[400px] lg:border-r lg:border-border lg:min-h-screen-250">
      <LongShortTab />
      <div className="w-full px-4 py-6">
        <Tabs
          defaultValue={form.optionType}
          onValueChange={(value) =>
            setForm({ ...form, optionType: value as "market" | "limit" })
          }
          className="mb-4"
        >
          <TabsList className="w-full rounded-lg">
            <TabsTrigger
              value={"market"}
              key={"market"}
              className="w-full rounded-lg"
            >
              Market
            </TabsTrigger>
            <TabsTrigger
              value={"limit"}
              key={"limit"}
              className="w-full rounded-lg"
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
                Balance: 0.00
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
            subTitle={`Leverage: ${form.leverage}x`}
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
          {form.optionType === "limit" && (
            <CustomizeInput
              title="Price"
              subTitle={`Mark: ${formatUsd(25316.12)}`}
              endAdornment={
                <div className="flex items-center text-sm text-muted-foreground">
                  USD
                </div>
              }
            />
          )}
        </div>
        <LeverageSlider
          onValueChange={(value: number) =>
            setForm({ ...form, leverage: value })
          }
        />
        <TPSL
          className="my-8"
          tpslOnChange={(value) =>
            setForm({ ...form, tp: value.tp, sl: value.sl })
          }
        />
        <PlaceOrder form={form} />
      </div>
    </div>
  );
}
