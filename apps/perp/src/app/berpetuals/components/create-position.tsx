"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { usePollWalletBalances } from "@bera/berajs";
import { type GlobalParams } from "@bera/proto/src";
import { FormattedNumber, usePrevious } from "@bera/shared-ui";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";
import BigNumber from "bignumber.js";

import { MAX_GAIN, MAX_STOP_LOSS } from "~/utils/constants";
import { formatFromBaseUnit, formatToBaseUnit } from "~/utils/formatBigNumber";
import { getPriceFromPercent } from "~/utils/getPriceFromPercent";
import { HONEY_IMG } from "~/utils/marketImages";
import { useCalculateLiqPrice } from "~/hooks/useCalculateLiqPrice";
import { useClientLocalStorage } from "~/hooks/useClientLocalStorage";
import { usePricesSocket } from "~/hooks/usePricesSocket";
import type { IMarket } from "~/types/market";
import type { OrderType } from "~/types/order-type";
import { CustomizeInput } from "./customize-input";
import { LeverageSlider } from "./leverage-slider";
import { LongShortTab } from "./long-short-tab";
import { PlaceOrder } from "./place-order";
import { TPSL } from "./tpsl";
import { honeyTokenAddress } from "@bera/config";

interface ICreatePosition {
  market: IMarket;
  params: GlobalParams;
}

const HONEY_PRICE = "1";

export function CreatePosition({ market, params }: ICreatePosition) {
  const [givenHoney, setGivenHoney] = useState<boolean>(true);
  const [orderType, setOrderType] = useClientLocalStorage(
    "PERPS_ORDER_TYPE",
    "long",
  );
  const [optionType, setOptionType] = useClientLocalStorage(
    "PERPS_OPTION_TYPE",
    "market",
  );

  const asset = market.name.split("-")[0] as string;
  const initialState: OrderType = {
    assets: asset,
    orderType: (orderType ?? "long") as "long" | "short",
    optionType: (optionType ?? "market") as "market" | "limit",
    limitPrice: undefined,
    amount: "",
    quantity: "",
    price: undefined,
    leverage: "2",
    tp: "",
    sl: "",
  };
  const [form, setForm] = useState<OrderType>(initialState);
  const prevOrderType = usePrevious(form.orderType);

  useEffect(() => {
    if (orderType !== form.orderType) {
      setForm((prev) => ({
        ...prev,
        orderType: (orderType ?? "long") as "long" | "short",
      }));
    }
  }, [orderType, form.orderType]);

  useEffect(() => {
    if (optionType !== form.optionType) {
      setForm((prev) => ({
        ...prev,
        optionType: (optionType ?? "market") as "market" | "limit",
        tp: "",
        sl: "",
      }));
    }
  }, [optionType, form.optionType]);

  const { useMarketIndexPrice } = usePricesSocket();
  const {useSelectedWalletBalance} = usePollWalletBalances();
  const honeyBalanceData = useSelectedWalletBalance(honeyTokenAddress);
  const honeyBalance = honeyBalanceData?.formattedBalance ?? "0"; // string
  const rawHoneyBalance = honeyBalanceData?.balance ?? 0n; // bigint
  const rawHoneyBalanceBN = BigNumber(
    rawHoneyBalance ? rawHoneyBalance.toString() : "0",
  ); // BigNumber
  const rawPrice = useMarketIndexPrice(Number(market.pair_index) ?? 0); // string
  const priceBN = useMemo(
    () => formatFromBaseUnit(rawPrice ?? 0, 10),
    [rawPrice],
  ); // BigNumber
  const formattedPrice = useMemo(() => priceBN.toString(10) ?? "0", [priceBN]); // string

  const maxLeverage = params.max_leverage ?? "0";
  const formattedMaxCollateralBN = formatFromBaseUnit(
    params.max_pos_honey ?? 0,
    18,
  );

  const safeAmount = form.amount === "" ? "0" : form.amount; // string

  // wrapped in useCallback to avoid unnecessary re-renders in TPSL component
  const handleTPSLChange = useCallback(
    (value: string, key: string) => {
      if (BigNumber(value).isFinite() || value === "") {
        setForm((prev) => ({ ...prev, [key]: value }));
      }
    },
    [setForm],
  );

  // calculate quantity and amount based on user input
  useEffect(() => {
    const honeyAmountPrice = BigNumber(safeAmount).times(HONEY_PRICE);
    const leverageBN = BigNumber(form.leverage ?? "2");
    const quantityBN = BigNumber(form.quantity ?? "0");
    const leveragedHoneyPriceBN = honeyAmountPrice.times(leverageBN);
    const limitPriceBN = BigNumber(form.limitPrice ?? "0");

    if (form.optionType === "market" && rawPrice !== undefined) {
      if (givenHoney) {
        const newQuantity = leveragedHoneyPriceBN.div(priceBN);
        setForm((prev) => ({
          ...prev,
          quantity:
            newQuantity.isNaN() || !newQuantity.isFinite()
              ? "0"
              : newQuantity.toString(10),
        }));
        return;
      }
      if (!givenHoney && form.quantity !== undefined) {
        const newAmount = quantityBN
          .div(leverageBN)
          .times(priceBN.div(HONEY_PRICE));
        setForm((prev) => ({
          ...prev,
          amount:
            newAmount.isNaN() || !newAmount.isFinite()
              ? "0"
              : newAmount.toString(10),
        }));
        return;
      }
      return;
    }

    if (form.optionType === "limit") {
      if (givenHoney) {
        const newQuantity = leveragedHoneyPriceBN.div(limitPriceBN);
        setForm((prev) => ({
          ...prev,
          quantity:
            newQuantity.isNaN() || !newQuantity.isFinite()
              ? "0"
              : newQuantity.toString(10),
        }));
      } else if (
        !givenHoney &&
        form.quantity !== undefined &&
        form.limitPrice !== undefined
      ) {
        const newAmount = quantityBN
          .div(leverageBN)
          .times(limitPriceBN.div(HONEY_PRICE));
        setForm((prev) => ({
          ...prev,
          amount:
            newAmount.isNaN() || !newAmount.isFinite()
              ? "0"
              : newAmount.toString(10),
        }));
        return;
      }
      return;
    }
  }, [
    form.amount,
    form.leverage,
    form.optionType,
    form.limitPrice,
    form.quantity,
    setForm,
    rawPrice,
    givenHoney,
    priceBN,
  ]);

  const liqPrice = useCalculateLiqPrice({
    bfLong: market.pair_borrowing_fee?.bf_long ?? "0",
    bfShort: market.pair_borrowing_fee?.bf_short ?? "0",
    orderType: form.orderType,
    price: form.optionType === "market" ? rawPrice : form.limitPrice,
    leverage: form.leverage,
  });

  const [error, setError] = useState<string | undefined>(undefined);

  // check for invalid inputs
  useEffect(() => {
    const maxTp = getPriceFromPercent(
      form.orderType === "long",
      MAX_GAIN,
      form.leverage ?? "2",
      form.optionType === "market" ? formattedPrice : form.limitPrice ?? "0",
    ).toString(10);
    const maxSl = getPriceFromPercent(
      form.orderType === "long",
      MAX_STOP_LOSS,
      form.leverage ?? "2",
      form.optionType === "market" ? formattedPrice : form.limitPrice ?? "0",
    ).toString(10);
    const safeAmountBN = BigNumber(safeAmount);
    const leverageBN = BigNumber(form.leverage ?? "2");
    const tpBN = BigNumber(form.tp ?? "0");
    const slBN = BigNumber(form.sl ?? "0");
    const minTP =
      form.optionType === "market" ? formattedPrice : form.limitPrice ?? "0";
    const minSL =
      form.optionType === "market" ? formattedPrice : form.limitPrice ?? "0";

    if (!form.amount) {
      setError("An amount/collateral must be set.");
    } else if (
      form.amount &&
      safeAmountBN.times(leverageBN).gt(formattedMaxCollateralBN)
    ) {
      setError(
        `Maximum position size is ${formattedMaxCollateralBN.toString(
          10,
        )} HONEY.`,
      );
    } else if (form.tp === "") {
      setError("Take Profit must be set.");
    } else if (form.amount && safeAmountBN.lt(0)) {
      setError("Amount/Collateral must be positive.");
    } else if (form.amount && safeAmountBN.lt(10)) {
      setError("Minimum Amount/Collateral is 10 HONEY.");
    } else if (
      leverageBN.lt(2) ||
      leverageBN.gt(maxLeverage) ||
      !form.leverage
    ) {
      setError(`Leverage must be between 2x and ${maxLeverage}x.`);
    } else if (
      rawHoneyBalance &&
      rawHoneyBalanceBN.lt(formatToBaseUnit(safeAmount, 18) ?? 0)
    ) {
      setError("Insufficient balance.");
    } else if (
      form.optionType === "limit" &&
      (!form.limitPrice || form.limitPrice === "0")
    ) {
      setError("Invalid Limit Price.");
    } else if (
      form.tp &&
      (form.orderType === "long"
        ? tpBN.lt(minTP) || tpBN.gt(maxTp)
        : tpBN.gt(minTP) || tpBN.lt(maxTp))
    ) {
      setError("Invalid Take Profit Price.");
    } else if (
      form.sl &&
      (form.orderType === "long"
        ? slBN.gt(minSL) || slBN.lt(maxSl)
        : slBN.lt(minSL) || slBN.gt(maxSl))
    ) {
      setError("Invalid Stop Loss Price.");
    } else if (form.optionType === "limit" && rawPrice) {
      if (
        form.orderType === "long" &&
        BigNumber(form.limitPrice ?? "0").gt(formattedPrice)
      ) {
        setError(
          "Limit Prices must be set below the current price for long positions.",
        );
        return;
      }
      if (
        form.orderType === "short" &&
        BigNumber(form.limitPrice ?? "0").lt(formattedPrice)
      ) {
        setError(
          "Limit Prices must be set above the current price for short positions.",
        );
        return;
      }
      setError(undefined);
    } else {
      setError(undefined);
    }
  }, [
    form.amount,
    form.leverage,
    form.tp,
    form.sl,
    form.limitPrice,
    form.orderType,
    form.price,
    formattedPrice,
    rawHoneyBalance,
    rawHoneyBalanceBN,
  ]);

  const balanceExceeding = rawHoneyBalanceBN.isLessThan(
    formatToBaseUnit(safeAmount, 18),
  );

  return (
    <div className="m-2 flex h-[calc(100%-8px)] w-[calc(100%-16px)] flex-shrink-0 flex-col overflow-auto rounded-md border border-border lg:mt-0 lg:w-[400px]">
      <LongShortTab
        value={form.orderType}
        valueOnChange={(value) => setOrderType(value)}
      />
      <div className="flex w-full flex-col overflow-auto">
        <Tabs
          value={form.optionType}
          onValueChange={(value) => setOptionType(value)}
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
              isExceeding={balanceExceeding}
              onChange={(e) => {
                setGivenHoney(true);
                setForm({ ...form, amount: e });
              }}
              subTitle={
                <div className="flex items-center gap-1">
                  {(
                    <FormattedNumber
                      value={honeyBalance ?? "0"}
                      compact={false}
                      compactThreshold={999_999_999_999}
                      prefixText="Balance: "
                    />
                  ) ?? "0"}
                  <div
                    onClick={() => setForm({ ...form, amount: honeyBalance })}
                    className="cursor-pointer rounded bg-secondary px-1 py-[2px] text-[10px] text-secondary-foreground hover:bg-background"
                  >
                    MAX
                  </div>
                </div>
              }
              endAdornment={
                <div className="pointer-events-none flex items-center gap-1 pl-3 pr-6 text-sm text-muted-foreground">
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
              value={form.quantity}
              isExceeding={balanceExceeding}
              onChange={(e) => {
                setGivenHoney(false);
                setForm({ ...form, quantity: e });
              }}
              endAdornment={
                <div className="pointer-events-none flex items-center gap-1 pl-3 pr-6 text-sm text-muted-foreground">
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
                subTitle={
                  <FormattedNumber
                    value={rawPrice === undefined ? "0" : formattedPrice}
                    compact={false}
                    compactThreshold={999_999_999_999}
                    symbol="USD"
                    prefixText="Mark: "
                  />
                }
                value={form.limitPrice?.toString()}
                onSubtitleClick={() => {
                  setForm({
                    ...form,
                    limitPrice: rawPrice === undefined ? "0" : formattedPrice,
                  });
                }}
                onChange={(e) => {
                  setForm({ ...form, limitPrice: e });
                }}
                endAdornment={
                  <div className="pointer-events-none flex items-center pl-3 text-sm text-muted-foreground">
                    USD
                  </div>
                }
              />
            )}
          </div>
          <LeverageSlider
            defaultValue={Number(form.leverage)}
            maxLeverage={Number(maxLeverage)}
            onValueChange={(value: string) => {
              setForm((prev) => ({
                ...prev,
                leverage: value,
              }));
            }}
          />
          <TPSL
            key={form.optionType}
            className="my-8"
            leverage={form.leverage ?? "2"}
            formattedPrice={
              form.optionType === "market" ? formattedPrice : form.limitPrice
            }
            long={form.orderType === "long"}
            tp={form.tp}
            liqPrice={liqPrice}
            sl={form.sl}
            tpslOnChange={handleTPSLChange}
          />
          <PlaceOrder
            form={form}
            error={error}
            price={rawPrice}
            formattedPrice={formattedPrice}
            pairIndex={market.pair_index ?? "0"}
            openingFee={market.pair_fixed_fee?.open_fee_p ?? "0"}
            bfLong={market.pair_borrowing_fee?.bf_long ?? "0"}
            bfShort={market.pair_borrowing_fee?.bf_short ?? "0"}
            liqPrice={liqPrice}
          />
        </div>
      </div>
    </div>
  );
}
