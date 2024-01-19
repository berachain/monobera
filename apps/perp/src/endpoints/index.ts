import { type GlobalParams, type Market } from "@bera/proto/src";

export async function getMarkets(): Promise<Market[] | undefined> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PERPS_ENDPOINT_URL}/markets`,
    );
    const jsonRes = await res.json();
    return jsonRes.markets;
  } catch (e) {
    return undefined;
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
    return undefined;
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
    return undefined;
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
    return undefined;
  }
}

export async function getFeesApr(): Promise<any | undefined> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PERPS_ENDPOINT_URL}/historical-rewards?count_back=1&resolution=1w`,
    );
    const jsonRes = await res.json();
    const historicalSummary = jsonRes.result;

    return historicalSummary;
  } catch (e) {
    return undefined;
  }
}
