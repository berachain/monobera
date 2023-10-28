import { type GlobalParams, type Market } from "@bera/proto/src";

export async function getMarkets(): Promise<Market | undefined> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_PERPS_URL}/markets`);
    const jsonRes = await res.json();
    return jsonRes.markets;
  } catch (e) {
    return undefined;
  }
}

export async function getGlobalParams(): Promise<GlobalParams | undefined> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PERPS_URL}/globalparams`,
    );
    const jsonRes = await res.json();
    return jsonRes.global_params;
  } catch (e) {
    return undefined;
  }
}
