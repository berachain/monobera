"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { formatUsd, usePollHoneyBalance } from "@bera/berajs";
import { type GlobalParams } from "@bera/proto/src";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";
import { parseUnits } from "ethers";
import { formatUnits } from "viem";

import { HONEY_IMG } from "~/utils/marketImages";
import { useCalculateLiqPrice } from "~/hooks/useCalculateLiqPrice";
import { usePricesSocket } from "~/hooks/usePricesSocket";
import { CustomizeInput } from "./components/customize-input";
import { LeverageSlider } from "./components/leverage-slider";
import { LongShortTab } from "./components/long-short-tab";
import { PlaceOrder } from "./components/place-order";
import { TPSL } from "./components/tpsl";
import { type IMarket } from "./page";
import { type OrderType } from "./type";
import { getSafeNumber } from "../../../../bgt-station/src/utils/getSafeNumber";

export interface ICreatePosition {
  market: IMarket;
  params: GlobalParams;
}

export function CreatePosition({ market, params }: ICreatePosition) {
  const [givenHoney, setGivenHoney] = useState<boolean>(true);

  const asset = market.name.split("-")[0] as string;
  const initialState: OrderType = {
    assets: asset,
    orderType: "long",
    optionType: "market",
    limitPrice: undefined,
    amount: "",
    quantity: undefined,
    price: undefined,
    leverage: 2,
    tp: "",
    sl: "",
  };
  const [form, setForm] = useState<OrderType>(initialState);

  const { useMarketIndexPrice } = usePricesSocket();
  const rawPrice = useMarketIndexPrice(Number(market.pair_index) ?? 0);
  const honeyPrice = 1;
  const { useHoneyBalance, useRawHoneyBalance } = usePollHoneyBalance();
  const honeyBalance = useHoneyBalance();
  const rawHoneyBalance = useRawHoneyBalance();
  const formattedPrice = Number(formatUnits(BigInt(rawPrice ?? 0), 10));

  const maxLeverage = Number(params.max_leverage ?? 0);
  const formattedMaxCollateral = Number(
    formatUnits(BigInt(params.max_pos_honey ?? 0), 18),
  );

  const safeAmount = form.amount === "" ? "0" : form.amount;
  useMemo(() => {
    const honeyAmountPrice = getSafeNumber(safeAmount) * honeyPrice;
    const leveragedHoneyPrice = honeyAmountPrice * (form.leverage ?? 1);
    if (form.optionType === "market") {
      if (givenHoney) {
        const newQuantity = leveragedHoneyPrice / formattedPrice;
        setForm({ ...form, quantity: newQuantity.toString() });
        return;
      }
      if (!givenHoney && form.quantity !== undefined) {
        const newAmount =
          (Number(form.quantity) / (form.leverage ?? 1)) *
          (formattedPrice / honeyPrice);
        setForm({ ...form, amount: newAmount.toString() });
        return;
      }

      return;
    }
    if (form.optionType === "limit") {
      if (givenHoney) {
        const newQuantity = leveragedHoneyPrice / (form.limitPrice ?? 0);
        setForm({ ...form, quantity: newQuantity.toString() });
      } else if (
        !givenHoney &&
        form.quantity !== undefined &&
        form.limitPrice !== undefined
      ) {
        const newAmount =
          (Number(form.quantity) / (form.leverage ?? 1)) *
          (form.limitPrice / honeyPrice);
        setForm({ ...form, amount: newAmount.toString() });
        return;
      }
      return;
    }
  }, [
    honeyPrice,
    form.amount,
    form.leverage,
    form.optionType,
    form.limitPrice,
    form.quantity,
    rawPrice,
  ]);

  const formattedBfLong = formatUnits(
    BigInt(market.pair_borrowing_fee?.bf_long ?? "0"),
    18,
  );
  const formattedBfShort = formatUnits(
    BigInt(market.pair_borrowing_fee?.bf_short ?? "0"),
    18,
  );

  const liqPrice = useCalculateLiqPrice({
    bfLong: formattedBfLong,
    bfShort: formattedBfShort,
    orderType: form.orderType,
    price: form.optionType === "market" ? formattedPrice : form.limitPrice,
    leverage: form.leverage?.toString(),
  });

  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (
      form.amount &&
      form.leverage &&
      Number(safeAmount) * form.leverage > formattedMaxCollateral
    ) {
      setError(
        `Max position size is ${formattedMaxCollateral.toLocaleString()} HONEY.`,
      );
    } else if (form.amount && Number(safeAmount) < 0) {
      setError("Collateral must be positive.");
    } else if (form.amount && Number(safeAmount) < 10) {
      setError("Min Collateral is 10 HONEY.");
    } else if (
      form.leverage &&
      (form.leverage < 2 || form.leverage > maxLeverage)
    ) {
      setError(`Leverage must be between 2x and ${maxLeverage}x.`);
    } else if (
      rawHoneyBalance &&
      rawHoneyBalance < (parseUnits(safeAmount, 18) ?? 0n)
    ) {
      setError("Insufficient balance.");
    } else if (
      form.optionType === "market"
        ? form.orderType === "long"
          ? form.tp && Number(form.tp) < formattedPrice
          : form.tp && Number(form.tp) > formattedPrice
        : form.orderType === "long"
          ? form.tp && Number(form.tp) < (form.limitPrice ?? 0)
          : form.tp && Number(form.tp) > (form.limitPrice ?? 0)
    ) {
      if (Number(form.tp).toFixed(0) === "0") {
        setError(undefined);
        return;
      }
      setError("Invalid Take Profit Price.");
    } else if (
      form.optionType === "market"
        ? form.orderType === "long"
          ? form.sl && Number(form.sl) > formattedPrice
          : form.sl && Number(form.sl) < formattedPrice
        : form.orderType === "long"
          ? form.sl && Number(form.sl) > (form.limitPrice ?? 0)
          : form.sl && Number(form.sl) < (form.limitPrice ?? 0)
    ) {
      if (Number(form.sl).toFixed(0) === "0") {
        setError(undefined);
        return;
      }
      setError("Invalid Stop Loss Price.");
    } else {
      setError(undefined);
    }
  }, [
    form.amount,
    form.leverage,
    form.tp,
    form.sl,
    form.orderType,
    form.price,
    formattedPrice,
  ]);

  return (
    <div className="m-2 flex h-[calc(100%-8px)] w-[calc(100%-16px)] flex-shrink-0 flex-col overflow-auto rounded-md border border-border lg:mt-0 lg:w-[400px]">
      <LongShortTab
        value={form.orderType}
        valueOnChange={(value) => setForm({ ...form, orderType: value })}
      />
      <div className="flex w-full flex-col overflow-auto">
        <Tabs
          defaultValue={form.optionType}
          onValueChange={(value) =>
            setForm({ ...form, optionType: value as "market" | "limit" })
          }
          className="m-4"
        >
          <TabsList className="w-full rounded-sm">
            <TabsTrigger
              value={"market"}
              key={"market"}
              className="w-full rounded-sm"
            >
              Market
            </TabsTrigger>
            <TabsTrigger
              value={"limit"}
              key={"limit"}
              className="w-full rounded-sm"
            >
              Limit
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="mx-4 mb-4 flex w-[calc(100%-32px)] flex-col">
          <div className="flex flex-col gap-2">
            <CustomizeInput
              title="Amount"
              value={form.amount}
              isExceeding={
                rawHoneyBalance &&
                rawHoneyBalance < (parseUnits(safeAmount, 18) ?? 0n)
              }
              onChange={(e) => {
                setGivenHoney(true);
                setForm({ ...form, amount: e });
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
              disabled={rawPrice === undefined}
              subTitle={`Leverage: ${form.leverage}x`}
              value={form.quantity?.toString()}
              onChange={(e) => {
                setGivenHoney(false);
                setForm({ ...form, quantity: e });
              }}
              endAdornment={
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Image
                    src={market.imageUri ?? ""}
                    alt={"selectedMarket"}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  {market.name.split("-")[0]}
                </div>
              }
            />
            {form.optionType === "limit" && (
              <CustomizeInput
                title="Price"
                subTitle={`Mark: ${formatUsd(formattedPrice)}`}
                value={form.limitPrice?.toString()}
                onSubtitleClick={() => {
                  setForm({
                    ...form,
                    limitPrice: Number(formattedPrice.toFixed(2)),
                  });
                }}
                onChange={(e) => {
                  setForm({ ...form, limitPrice: Number(e) });
                }}
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
            maxLeverage={maxLeverage}
            onValueChange={(value: number) =>
              setForm({ ...form, leverage: value })
            }
          />
          <TPSL
            className="my-4"
            leverage={form.leverage ?? 2}
            formattedPrice={
              form.optionType === "market"
                ? rawPrice === undefined
                  ? undefined
                  : formattedPrice
                : form.limitPrice
            }
            long={form.orderType === "long"}
            tp={form.tp}
            liqPrice={liqPrice}
            sl={form.sl}
            tpslOnChange={(value) =>
              setForm({ ...form, tp: value.tp, sl: value.sl })
            }
          />
          <PlaceOrder
            form={form}
            error={error}
            price={rawPrice}
            pairIndex={Number(market.pair_index) ?? 0}
            openingFee={Number(
              formatUnits(BigInt(market.pair_fixed_fee?.open_fee_p ?? "0"), 10),
            )}
            bfLong={formattedBfLong}
            bfShort={formattedBfShort}
            liqPrice={liqPrice}
          />
        </div>
      </div>
    </div>
  );
}
