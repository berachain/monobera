import { lendEndpointUrl } from "@bera/config";
import { type Address } from "viem";

export interface RateItem {
  asset_address: Address;
  time: string;
  rate: string;
}

export async function getGraphData(
  address: Address,
  interval: "1d" | "7d" | "30d" | "all",
  rate_type?: "supply" | "variable",
): Promise<RateItem[]> {
  const res = await fetch(
    `${lendEndpointUrl}/interest/${address}/${interval}?rate_type=${rate_type}`,
  );
  if (!res.ok) {
    // throw new Error("Failed to fetch data");
    return [];
  }
  return res.json();
}
