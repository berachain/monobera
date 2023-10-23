"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { formatUsd, usePollHoneyBalance } from "@bera/berajs";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";
import { formatUnits } from "viem";

import { HONEY_IMG } from "~/utils/marketImages";
import { usePricesSocket } from "~/hooks/usePricesSocket";
import { CustomizeInput } from "./components/customize-input";
import { LeverageSlider } from "./components/leverage-slider";
import { LongShortTab } from "./components/long-short-tab";
import { PlaceOrder } from "./components/place-order";
import { TPSL } from "./components/tpsl";
import { type IMarket } from "./page";
import { type OrderType } from "./type";

interface ICreatePosition {
  market: IMarket;
}

export default function CreatePosition({ market }: ICreatePosition) {
  const [form, setForm] = useState<OrderType>({
    assets: "BTC",
    orderType: "long",
    optionType: "market",
    amount: undefined,
    quantity: undefined,
    price: undefined,
    leverage: 2,
    tp: 0,
    sl: 0,
  });

  const { useMarketIndexPrice } = usePricesSocket();
  const price = useMarketIndexPrice(Number(market.pair_index) ?? 0);
  const honeyPrice = 1;
  const { useHoneyBalance } = usePollHoneyBalance();
  const honeyBalance = useHoneyBalance();

  useMemo(() => {
    const honeyAmountPrice = (form.amount ?? 0) * honeyPrice;
    const leveragedHoneyPrice = honeyAmountPrice * (form.leverage ?? 1);
    const newQuantity = leveragedHoneyPrice / price;
    setForm({ ...form, quantity: newQuantity });
  }, [honeyPrice, form.amount, form.leverage]);
  return (
    <div className="w-full flex-shrink-0 pb-10 lg:min-h-screen-250 lg:w-[400px] lg:border-r lg:border-border">
      <LongShortTab
        value={form.orderType}
        valueOnChange={(value) => setForm({ ...form, orderType: value })}
      />
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
            value={form.amount}
            onChange={(e) => {
              console.log(e);
              setForm({ ...form, amount: Number(e) });
            }}
            subTitle={
              <div className="flex items-center gap-1">
                Balance: {honeyBalance ?? 0}
                <div
                  onClick={() => setForm({ ...form, amount: honeyBalance })}
                  className="cursor-pointer rounded bg-secondary px-1 py-[2px] text-[10px] text-secondary-foreground hover:bg-background"
                >
                  MAX
                </div>
              </div>
            }
            endAdornment={
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                {" "}
                <Image
                  src={HONEY_IMG}
                  alt={"selectedMarket"}
                  width={24}
                  height={24}
                  className="rounded-full"
                />{" "}
                HONEY
              </div>
            }
          />
          <CustomizeInput
            title="Quantity"
            subTitle={`Leverage: ${form.leverage}x`}
            value={form.quantity}
            endAdornment={
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Image
                  src={market.imageUri ?? ""}
                  alt={"selectedMarket"}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
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
          defaultValue={form.leverage}
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
        <PlaceOrder
          form={form}
          price={price}
          pairIndex={Number(market.pair_index) ?? 0}
          openingFee={Number(
            formatUnits(BigInt(market.pair_fixed_fee?.open_fee_p ?? "0"), 18),
          )}
          bfLong={Number(
            formatUnits(BigInt(market.pair_borrowing_fee?.bf_long ?? "0"), 18),
          )}
          bfShort={Number(
            formatUnits(BigInt(market.pair_borrowing_fee?.bf_short ?? "0"), 18),
          )}
        />
      </div>
    </div>
  );
}
