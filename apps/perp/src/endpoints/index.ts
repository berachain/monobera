import { perpsEndpoint, perpsPricesBenchmark } from "@bera/config";
import { type GlobalParams, type Market } from "@bera/proto/src";
import { PriceUpdate } from "@pythnetwork/hermes-client";
import { PricesMap } from "~/types/prices";

import { PYTH_IDS, USDC_USD_INDEX } from "~/utils/constants";
import { formatUsdcPythPrice } from "~/utils/formatPyth";

export async function getMarkets(): Promise<Market[] | undefined> {
  try {
    const res = await fetch(`${perpsEndpoint}/markets`);
    const jsonRes = await res.json();
    return jsonRes.markets;
  } catch (e) {
    return [];
  }
}

export async function getGlobalParams(): Promise<GlobalParams | undefined> {
  try {
    const res = await fetch(`${perpsEndpoint}/globalparams`);
    const jsonRes = await res.json();
    return jsonRes.global_params;
  } catch (e) {
    return {
      group_index: "0",
      group_name: "crypto",
      max_leverage: "100",
      min_leverage: "2",
      max_collateral_p: "10",
      max_pos_honey: "100000000000000000000000",
      current_epoch: "92",
      max_trades_per_pair: "1000000",
      global_oi_long: "148188691811081237025922024",
      global_oi_short: "11481661227866370572270086",
    };
  }
}

export async function getDailyPriceChange(): Promise<any | undefined> {
  try {
    const oneDayAgoUnix =
      Math.floor(new Date().getTime() / 1000) - 24 * 60 * 60;
    const url = `${perpsPricesBenchmark}/v1/updates/price/${oneDayAgoUnix}?${PYTH_IDS.map(
      (item) => `ids=${item.id}`,
    ).join("&")}`;
    const res = await fetch(url);
    const jsonRes = (await res.json()) as PriceUpdate;

    if (jsonRes?.parsed) {
      const formattedPrices = PYTH_IDS.reduce<PricesMap>((acc, pythMapItem) => {
        const priceFeed = jsonRes.parsed!.find(
          (item) => `0x${item.id}` === pythMapItem.id,
        );
        if (priceFeed) {
          acc[pythMapItem.pairIndex] = priceFeed;
        }
        return acc;
      }, {});

      return (
        (formattedPrices &&
          Object.keys(formattedPrices).reduce(
            (acc: Record<string, string>, key) => {
              if (
                key === USDC_USD_INDEX ||
                formattedPrices[USDC_USD_INDEX] === undefined
              )
                return acc;
              acc[key] = formatUsdcPythPrice(
                formattedPrices[key as "string"].price,
                formattedPrices[USDC_USD_INDEX].price,
              );
              return acc;
            },
            {},
          )) ??
        {}
      );
    }
    return {};
  } catch (e) {
    return {};
  }
}

export async function getTradingSummary(): Promise<any | undefined> {
  try {
    const res = await fetch(
      `${perpsEndpoint}/trading-summary?count_back=24&resolution=1h&action=sum`,
    );
    const jsonRes = await res.json();
    const tradingSummary = jsonRes.result[0];

    return {
      volume: tradingSummary.volume,
      num_trades: tradingSummary.num_trades,
    };
  } catch (e) {
    return {
      volume: 0,
      num_trades: 0,
    };
  }
}

export async function getHistoricalSummary(): Promise<any | undefined> {
  try {
    const res = await fetch(
      `${perpsEndpoint}/trading-summary/markets?countBack=24&resolution="1h"`,
    );
    const jsonRes = await res.json();
    const historicalSummary = jsonRes.result;
    return historicalSummary ?? [];
  } catch (e) {
    return [];
  }
}
