import { type GlobalParams, type Market } from "@bera/proto/src";

export async function getMarkets(): Promise<Market[] | undefined> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PERPS_ENDPOINT_URL}/markets`,
    );
    const jsonRes = await res.json();
    return jsonRes.markets;
  } catch (e) {
    return [];
  }
}

export async function getGlobalParams(): Promise<GlobalParams | undefined> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PERPS_ENDPOINT_URL}/globalparams`,
    );
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
      max_pending_market_orders: "1000000",
      market_orders_timeout: "0",
      max_trades_per_pair: "1000000",
      global_oi_long: "148188691811081237025922024",
      global_oi_short: "11481661227866370572270086",
    };
  }
}

export async function getDailyPriceChange(): Promise<any | undefined> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PERPS_ENDPOINT_URL}/historical-prices/24h`,
    );
    const jsonRes = await res.json();
    return jsonRes.prices;
  } catch (e) {
    return [0, 0, 0];
  }
}

export async function getTradingSummary(): Promise<any | undefined> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PERPS_ENDPOINT_URL}/trading-summary?count_back=24&resolution=1h&action=sum`,
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
      `${process.env.NEXT_PUBLIC_PERPS_ENDPOINT_URL}/historical-summary/24h`,
    );
    const jsonRes = await res.json();
    const historicalSummary = jsonRes.result;

    return historicalSummary;
  } catch (e) {
    return [];
  }
}

export async function getFeesApr(): Promise<any | undefined> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PERPS_ENDPOINT_URL}/historical-rewards?count_back=3&resolution=1d`,
    );
    const jsonRes = await res.json();
    const historicalSummary = jsonRes.result;

    return historicalSummary;
  } catch (e) {
    return {
      apr: "0",
      combined_fees: "0",
      fees_to_bgt: "0",
      fees_to_honey: "0",
    };
  }
}
