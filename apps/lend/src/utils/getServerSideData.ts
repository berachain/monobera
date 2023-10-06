import { lendEndpointUrl } from "@bera/config";
import { type Address } from "wagmi";

export interface RateItem {
  asset_address: Address;
  time: string;
  rate: string;
}

export async function getGraphData(
  address: Address,
  requestType: "utilization" | "interest",
  interval: "1D" | "7D" | "30D" | "ALL",
  rate_type?: "supply" | "variable",
): Promise<RateItem[]> {
  const res = await fetch(
    `${lendEndpointUrl}/${requestType}/${address}/${interval}${
      requestType === "interest" ? `?rate_type=${rate_type}` : ""
    }`,
  );
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}
